'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Settings, LogOut, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function AdminSidebar() {
  const pathname = usePathname()
  const { t, isRTL } = useLanguage()

  const items = [
    { href: '/admin',              label: t.admin.overview,   icon: LayoutDashboard },
    { href: '/admin/products',     label: t.admin.products,   icon: Package },
    { href: '/admin/orders',       label: t.admin.orders,     icon: ShoppingCart },
    { href: '/admin/customers',    label: t.admin.customers,  icon: Users },
    { href: '/admin/analytics',    label: t.admin.analytics,  icon: BarChart3 },
    { href: '/admin/settings',     label: t.admin.settings,   icon: Settings },
  ]

  return (
    <aside className="w-60 shrink-0 flex flex-col min-h-screen bg-ink border-e border-ink-border">
      {/* Brand */}
      <div className="px-5 py-6 border-b border-ink-border">
        <Link href="/" className="block">
          <div className="text-lg font-display font-light text-gradient-gold tracking-[0.1em] leading-none">
            {isRTL ? 'عقدي الفريد' : 'Aqdi Alfareed'}
          </div>
          <div className="text-2xs tracking-[0.3em] text-white/20 uppercase mt-1">{t.admin.dashboard}</div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
          return (
            <Link key={href} href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group
                ${active ? 'bg-gold/12 text-gold border border-gold/15' : 'text-white/35 hover:text-white hover:bg-ink-lifted'}`}
            >
              <Icon size={17} strokeWidth={1.5} className={active ? 'text-gold' : 'group-hover:text-gold/60 transition-colors'} />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight size={13} className={`text-gold/40 ${isRTL ? 'rotate-180' : ''}`} />}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-ink-border space-y-0.5">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/30 hover:text-white hover:bg-ink-lifted transition-all">
          <ChevronRight size={17} className={isRTL ? '' : 'rotate-180'} strokeWidth={1.5} />
          <span>{isRTL ? 'العودة للمتجر' : 'Back to Store'}</span>
        </Link>
        {/* CONNECT: Wire to Firebase Auth / Supabase Auth signOut */}
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/25 hover:text-red-400 hover:bg-red-500/8 transition-all w-full">
          <LogOut size={17} strokeWidth={1.5} />
          <span>{t.admin.logout}</span>
        </button>
      </div>
    </aside>
  )
}
