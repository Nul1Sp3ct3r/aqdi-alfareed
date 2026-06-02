'use client'
import { Globe, User } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { siteConfig } from '@/lib/config'

export default function TopBar() {
  const { t, lang, setLang } = useLanguage()

  return (
    <div className="bg-[#050505] text-white/60 text-[11px] hidden md:block">
      <div className="container flex items-center justify-between h-9">
        {/* Left — shipping / contact */}
        <div className="flex items-center gap-5">
          <span className="text-white/50">{t.topBar.freeShipping}</span>
          <span className="text-white/20">|</span>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="hover:text-gold transition-colors tracking-wide"
          >
            {siteConfig.contactEmail}
          </a>
        </div>

        {/* Right — hours · language · account */}
        <div className="flex items-center gap-5">
          <span className="text-white/30 hidden lg:block">{t.topBar.hours}</span>

          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-1.5 text-white/55 hover:text-gold transition-colors font-medium tracking-widest"
          >
            <Globe size={11} strokeWidth={1.5} />
            {lang === 'ar' ? 'English' : 'العربية'}
          </button>

          <button className="flex items-center gap-1.5 text-white/55 hover:text-gold transition-colors">
            <User size={11} strokeWidth={1.5} />
            {t.topBar.myAccount}
          </button>
        </div>
      </div>
    </div>
  )
}
