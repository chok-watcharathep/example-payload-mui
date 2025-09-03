'use client'

import { Collapsible, useAllFormFields } from '@payloadcms/ui'

const LinkCurriculumSummaryUiField = () => {
  const allFormFields = useAllFormFields()

  return (
    <Collapsible header="Summary">
      We can fetch data from payload and custom any UI here
      {allFormFields.map((field) => field.name).join(', ')}
      <Collapsible header="Sub Summary">
        {allFormFields.map((field) => field.name).join(', ')}
      </Collapsible>
    </Collapsible>
  )
}

export default LinkCurriculumSummaryUiField
