'use client'

import { useTranslations } from 'next-intl'

const ExampleLanguage = () => {
  const t = useTranslations('home')

  return (
    <div>
      <h1>{t('goToAdminPanel')}</h1>
    </div>
  )
}

export default ExampleLanguage
