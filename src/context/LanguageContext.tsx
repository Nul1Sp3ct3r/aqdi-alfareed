'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Language, Direction } from '@/types'
import { getTranslations, T } from '@/lib/translations'

interface LanguageContextType {
  lang: Language
  dir: Direction
  t: T
  setLang: (lang: Language) => void
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  // Default to Arabic for Gulf/Saudi audience
  const [lang, setLangState] = useState<Language>('ar')

  useEffect(() => {
    // CONNECT: Replace with user preference from Firebase Auth or Supabase user profile
    const savedLang = localStorage.getItem('aqdi-lang') as Language
    if (savedLang && (savedLang === 'ar' || savedLang === 'en')) {
      setLangState(savedLang)
    }
  }, [])

  useEffect(() => {
    // Apply dir and lang to the document root for full RTL support
    const dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.dir = dir
    document.documentElement.lang = lang
    localStorage.setItem('aqdi-lang', lang)
  }, [lang])

  const setLang = (newLang: Language) => {
    setLangState(newLang)
  }

  const dir: Direction = lang === 'ar' ? 'rtl' : 'ltr'
  const t = getTranslations(lang)
  const isRTL = lang === 'ar'

  return (
    <LanguageContext.Provider value={{ lang, dir, t, setLang, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
