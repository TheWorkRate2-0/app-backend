import vine from '@vinejs/vine'

/**
 * Validates city ensuring country id is provided
 */
export const cityValidator = vine.compile(
  vine.object({
    country: vine.number(),
  })
)

export const currencyValidator = vine.compile(
  vine.object({
    currency: vine.number().nullable().optional(),
    pay_id: vine.number().nullable().optional(),
  })
)
