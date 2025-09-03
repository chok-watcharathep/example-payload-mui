'use client'

import { useAllFormFields } from '@payloadcms/ui'

const LinkCurriculumSummaryUiField = () => {
  const allFormFields = useAllFormFields()

  return <div>{allFormFields.map((field) => field.name).join(', ')}</div>
}

export default LinkCurriculumSummaryUiField
