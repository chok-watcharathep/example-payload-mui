import { TextField } from '@mui/material'
import { useTranslations } from 'next-intl'
import { useController, useFormContext } from 'react-hook-form'

import type { ReviewFormFields } from '@/frontend/features/product/interfaces'

const ReviewInformationFields = () => {
  const tReviewForm = useTranslations('product.reviewForm')
  const { control } = useFormContext<ReviewFormFields>()
  const nameField = useController({
    name: 'name',
    control,
  })
  const emailField = useController({
    name: 'email',
    control,
  })

  return (
    <>
      <TextField
        {...nameField.field}
        label={tReviewForm('name')}
        value={nameField.field.value ?? ''}
        error={!!nameField.fieldState.error}
        helperText={nameField.fieldState.error?.message}
      />
      <TextField
        {...emailField.field}
        label={tReviewForm('email')}
        value={emailField.field.value ?? ''}
        error={!!emailField.fieldState.error}
        helperText={emailField.fieldState.error?.message}
      />
    </>
  )
}

export default ReviewInformationFields
