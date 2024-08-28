import env from '#start/env'
import User from '#models/user'
import Roles from '#enums/roles'
import Token from '#models/token'
import Statuses from '#enums/statuses'
import { OAuth2Client } from 'google-auth-library'
import type { HttpContext } from '@adonisjs/core/http'
import CrowdsourceData from '#models/crowdsource_datum'
import CrowdsourceTargets from '#models/crowdsource_target'
import { createAuthValidator, googleAuthValidator, verifyEmailValidator } from '#validators/auth'

export default class AuthController {
  async signup({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(createAuthValidator)
    const preRegisteredUser = await User.findBy({
      password: null,
      auth_type: 'google',
      email_verified: true,
      email: payload.email,
      status_id: Statuses.suspended,
    })

    if (preRegisteredUser) {
      const user = await this.signupPreRegUser(preRegisteredUser, payload)
      if (!user)
        return response.badRequest({
          errors: [{ message: 'User information mismatch. Please try again' }],
        })

      const loggedInResponse = await this.authenticateUser(auth, user)
      return response.json(loggedInResponse)
    } else {
      const user = await User.create(payload)
      try {
        await user.save()
        response.json({
          data: { name: user.name },
          message: `You're account has been created. Please vefify your email to sign in.`,
        })
      } catch (errors) {
        console.log(errors)
        return response.badRequest({ errors: errors })
      }
    }
  }

  async googleAuth({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(googleAuthValidator)
    const userInfo: any = await this.verifyCode(payload.code).catch((errors) => {
      return response.badRequest({
        errors: [{ message: 'Token verification failed.' }],
      })
    })

    const user = await User.findBy('email', userInfo.email)
    if (user) {
      const hasPassword = await user.hasPassword()
      if (hasPassword) {
        if (user.authType !== 'google')
          return response.badRequest({
            errors: [
              {
                message:
                  'Your account is not linked to gmail. Please sign in with your email and password.',
              },
            ],
          })
        else {
          const loggedInResponse = await this.authenticateUser(auth, user)
          return response.json(loggedInResponse)
        }
      } else return response.json({ data: userInfo, message: 'Google verification passed' })
    } else {
      const newUser = await User.create({ ...userInfo, auth_type: 'google' })
      try {
        await newUser.save()
        return response.json({ data: userInfo, message: 'Google verification passed' })
      } catch (errors) {
        console.log(errors)
        return response.badRequest({ errors: errors })
      }
    }
  }

  async login({ auth, request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    if (user.statusId !== Statuses.active) {
      return response.badRequest({
        errors: [{ message: 'Invalid user credentials' }],
      })
    }
    const loggedInResponse = await this.authenticateUser(auth, user)

    return response.json(loggedInResponse)
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    response.json({ message: 'We miss you already.' })
  }

  async connect({ auth, response }: HttpContext) {
    await auth.check()
    const status = { isAuthenticated: false, user: null }

    if (auth.isAuthenticated) {
      const user = auth.user!
      await User.loadRelations(user)
      Object.assign(status, { user: user, isAuthenticated: true })
    }
    return response.json(status)
  }

  async verifyEmail({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(verifyEmailValidator)
    const user = await Token.getTokenUser(payload.token, 'VERIFY_EMAIL')

    if (user && !auth.user) {
      const data = { email_verified: true }
      if (user.roleId === Roles.user) Object.assign(data, { status_id: Statuses.active })
      await user.merge(data).save()
      await Token.expireTokens(user, 'verifyEmailTokens')
      return response.json({
        message: "Your email address has been verified. You'll be redirected to login shortly.",
      })
    }

    if (!user) {
      return response.badRequest({
        errors: [
          { message: 'Your token is invalid or has expired. Please try and login to confirm.' },
        ],
      })
    }
  }

  /**
   * Show individual record
   */
  async show({}: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({}: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({}: HttpContext) {}

  // async crowdsourceData({ auth, response }: HttpContext) {
  //   try {
  //     const data = await CrowdsourceData.findByOrFail('created_by', auth.user!.id)
  //     await CrowdsourceData.loadRelations(data)
  //     return response.json(data)
  //   } catch (error) {
  //     return response.notFound({
  //       errors: [{ message: 'No associated career profile found.' }],
  //     })
  //   }
  // }

  // async prepareUserData(user: User) {
  //   await user.load('role')
  //   await user.load('status')
  //   await User.checkCrowdsource(user)
  //   return user
  // }

  async signupPreRegUser(user: User, payload: any) {
    const searchPayload = { email: payload.email }
    const persistancePayload = { ...payload, status_id: Statuses.active }
    if (payload.name === user.name && payload.email === user.email) {
      const updateUser = await User.updateOrCreate(searchPayload, persistancePayload)
      await updateUser.sendGoogleRegEmail()
      return updateUser
    } else return false
  }

  async authenticateUser(auth: any, user: User) {
    await auth.use('web').login(user)
    await auth.authenticate()
    await User.loadRelations(user)
    const headline = user.newlyCreated ? 'Welcome' : 'Welcome Back'
    return { data: user, message: `${headline} ${user.name}` }
  }

  async verifyCode(code: string) {
    console.log('code', code)
    const CLIENT_ID = env.get('GOOGLE_CLIENT_ID')
    const REDIRECT_URL = env.get('GOOGLE_REDIRECT_URL')
    const CLIENT_SECRET = env.get('GOOGLE_CLIENT_SECRET')

    console.log('client id', CLIENT_ID)
    console.log('redirect url', REDIRECT_URL)
    console.log('client secret', CLIENT_SECRET)

    const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
    console.log('client', client)
    const result = await client.getToken(code)
    console.log('result', result)

    if (result.tokens) {
      const user = await this.verifyToken(result.tokens.id_token!)
      return user
    } else return result
  }

  async verifyToken(token: string) {
    const CLIENT_ID = env.get('GOOGLE_CLIENT_ID')
    const client = new OAuth2Client(CLIENT_ID)
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    })
    console.log('ticket', ticket)
    if (ticket) {
      const payload = ticket.getPayload()
      console.log('payload', payload)
      return {
        name: payload!['name'],
        email: payload!['email'],
        public_pic: payload!['picture'],
        email_verified: payload!['email_verified'],
      }
    } else return ticket
  }
}
