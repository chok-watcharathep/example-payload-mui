import { useTranslations } from 'next-intl'
import { z, type ZodType } from 'zod'

import type { ReviewFormFields } from '@/frontend/features/product/interfaces'

const useReviewFormSchema = () => {
  const tError = useTranslations('error')

  const schema: ZodType<ReviewFormFields> = z.object({
    name: z
      .string({
        required_error: tError('form.required'),
        invalid_type_error: tError('form.required'),
      })
      .trim()
      .min(1, tError('form.required')),
    email: z
      .string({
        required_error: tError('form.required'),
        invalid_type_error: tError('form.required'),
      })
      .trim()
      .email(tError('form.email')),
    message: z
      .string({
        required_error: tError('form.required'),
        invalid_type_error: tError('form.required'),
      })
      .trim()
      .min(10, tError('form.minLength', { minLength: 10 })),
  })

  return schema
}

export default useReviewFormSchema
