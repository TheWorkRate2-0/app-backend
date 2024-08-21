/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const CrowdsourceController = () => import('#controllers/crowdsources_controller')
const AdminController = () => import('#controllers/admin_controller')
const AuthController = () => import('#controllers/auth_controller')
const AppController = () => import('#controllers/app_controller')

// router.get('/', async () => {
//   return {
//     hello: 'world',
//   }
// })

router.group(() => {
  router.get('/ages', [AppController, 'ages'])
  router.get('/cities', [AppController, 'cities'])
  router.get('/countries', [AppController, 'countries'])
  router.get('/gender-roles', [AppController, 'genderRoles'])
  router.get('/job-families', [AppController, 'jobFamilies'])
  router.get('/contract-terms', [AppController, 'contractTerms'])
  router.get('/employment', [AppController, 'employment'])
  router.get('/company-types', [AppController, 'companyTypes'])
  router.get('/education', [AppController, 'education'])
  router.get('/currencies', [AppController, 'currencies'])
  router.get('/staff-count', [AppController, 'staffCount'])
  router.get('/experience', [AppController, 'experience'])
  router.get('/benefits', [AppController, 'benefits'])
  router.get('/sectors', [AppController, 'sectors'])
})

router.group(() => {
  router
    .group(() => {
      router.get('/crowdsource/count', [CrowdsourceController, 'totalRecords'])
      router.post('/crowdsource/optional', [CrowdsourceController, 'storeOptional'])
    })
    .use(middleware.auth())

  router
    .resource('crowdsource', CrowdsourceController)
    .only(['update', 'index', 'store', 'show', 'destroy'])
    .use(['update', 'index', 'store', 'show', 'destroy'], middleware.auth())
})

router.group(() => {
  router
    .resource('auth', AuthController)
    .only(['update', 'destroy'])
    .use(['update', 'destroy'], middleware.auth())

  router.group(() => {
    router.post('auth/login', [AuthController, 'login'])
    router.post('auth/logout', [AuthController, 'logout'])
    router.post('auth/signup', [AuthController, 'signup'])
    router.post('auth/connect', [AuthController, 'connect'])
    router.post('auth/verify-google', [AuthController, 'googleAuth'])
    router.post('auth/verify-email', [AuthController, 'verifyEmail'])
  })
})

router
  .group(() => {
    router.get('/accounts', [AdminController, 'accounts'])
  })
  .use(middleware.auth())
