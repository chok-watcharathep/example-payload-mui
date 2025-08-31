'use client'

import { useTranslations } from 'next-intl'

const ExampleLanguage = () => {
  const tHome = useTranslations('home')

  return (
    <div>
      <h1>{tHome('goToAdminPanel')}</h1>
    </div>
  )
}

export default ExampleLanguage
