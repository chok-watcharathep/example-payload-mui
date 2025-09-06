'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import { useController, useForm } from 'react-hook-form'

import { useReviewFormSchema } from '@/frontend/features/product/hooks'
import type { ReviewFormFields } from '@/frontend/features/product/interfaces'

interface ReviewFormProps {
  defaultValues?: Partial<ReviewFormFields>
}

const ReviewForm = ({ defaultValues }: ReviewFormProps) => {
  const tReviewForm = useTranslations('product.reviewForm')
  const tCommon = useTranslations('common')
  const reviewFormSchemaHook = useReviewFormSchema()

  const { control, handleSubmit } = useForm<ReviewFormFields>({
    resolver: zodResolver(reviewFormSchemaHook),
    defaultValues,
  })

  const nameField = useController({
    name: 'name',
    control,
  })
  const emailField = useController({
    name: 'email',
    control,
  })
  const messageField = useController({
    name: 'message',
    control,
  })

  const handleSubmitReviewForm = (formFields: ReviewFormFields) => {
    console.log(formFields)
  }

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(handleSubmitReviewForm)}>
      <Stack gap={2}>
        <Typography variant="h3">{tReviewForm('title')}</Typography>
        <Typography variant="body1">{tReviewForm('description')}</Typography>
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
        <TextField
          {...messageField.field}
          label={tReviewForm('message')}
          value={messageField.field.value ?? ''}
          error={!!messageField.fieldState.error}
          helperText={messageField.fieldState.error?.message}
        />
        <Box>
          <Button variant="contained" type="submit">
            {tCommon('submit')}
          </Button>
        </Box>
      </Stack>
    </Box>
  )
}

export default ReviewForm
