import vine from '@vinejs/vine'

/**
 * Validates the crowdsource data creation action
 */
export const storeValidator = vine.compile(
  vine.object({
    age_id: vine.number(),
    city_id: vine.number(),
    contract_term_id: vine.number(),
    country_id: vine.number(),
    pay_currency_id: vine.number(),
    education_id: vine.number(),
    employee_type_id: vine.number(),
    experience_id: vine.number(),
    gender_id: vine.number(),
    job_family_id: vine.number(),
    company: vine.string(),
    company_type_id: vine.number(),
    position: vine.string(),
    salary: vine.number(),
    sector_id: vine.number(),
    staff_count_id: vine.number(),
    benefits: vine.array(
      vine.object({
        id: vine.number(),
        amount: vine.number().optional(),
      })
    ),
  })
)

export const targetsValidator = vine.compile(
  vine.object({
    retention_strategy: vine.string().maxLength(500),
    considerations: vine.string().maxLength(500),
    sector_id: vine.number(),
    targeted_pay_id: vine.number(),
    salary: vine.number(),
    period_id: vine.number(),
  })
)
