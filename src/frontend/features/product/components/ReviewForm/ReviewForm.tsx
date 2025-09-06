'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import { FormProvider, useController, useForm } from 'react-hook-form'

import { useReviewFormSchema } from '@/frontend/features/product/hooks'
import type { ReviewFormFields } from '@/frontend/features/product/interfaces'

import ReviewInformationFields from './ReviewInformationFields'

interface ReviewFormProps {
  defaultValues?: Partial<ReviewFormFields>
  onSubmit: (formFields: ReviewFormFields) => void
}

const ReviewForm = ({ defaultValues, onSubmit }: ReviewFormProps) => {
  const tReviewForm = useTranslations('product.reviewForm')
  const tCommon = useTranslations('common')
  const reviewFormSchemaHook = useReviewFormSchema()

  const formHook = useForm<ReviewFormFields>({
    resolver: zodResolver(reviewFormSchemaHook),
    defaultValues,
  })

  const messageField = useController({
    name: 'message',
    control: formHook.control,
  })

  return (
    <FormProvider {...formHook}>
      <Box component="form" noValidate onSubmit={formHook.handleSubmit(onSubmit)}>
        <Stack gap={2}>
          <Typography variant="h3">{tReviewForm('title')}</Typography>
          <Typography variant="body1">{tReviewForm('description')}</Typography>
          {/* Example form fields separated */}
          <ReviewInformationFields />
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
    </FormProvider>
  )
}

export default ReviewForm
