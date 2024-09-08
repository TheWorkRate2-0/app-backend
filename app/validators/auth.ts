import vine from '@vinejs/vine'

/**
 * Validates the user's creation action
 */
export const createAuthValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(1),
    public_pic: vine.string().nullable().optional(),
    email: vine
      .string()
      .trim()
      .email({ host_whitelist: ['outlook.com', 'gmail.com', 'yahoo.com'] })
      .unique(async (db, value) => {
        const user = await db.from('users').whereNotNull('password').where('email', value).first()
        return !user
      }),
    password: vine.string().minLength(8).maxLength(32).confirmed(),
  })
)

/**
 * Validates the user's update action
 */
export const updateAuthValidator = vine.compile(
  vine.object({
    password: vine.string().minLength(8).maxLength(32).confirmed(),
  })
)

/**
 * Validates google auth token from frontend
 */
export const googleAuthValidator = vine.compile(
  vine.object({
    code: vine.string().trim(),
  })
)

/**
 * Validates verify email token
 */
export const verifyEmailValidator = vine.compile(
  vine.object({
    token: vine.string().trim(),
  })
)
