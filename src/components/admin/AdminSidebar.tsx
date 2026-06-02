'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Settings, LogOut, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function AdminSidebar() {
  const pathname = usePathname()
  const { t, isRTL } = useLanguage()

  const items = [
    { href: '/admin',           label: t.admin.overview,  icon: LayoutDashboard },
    { href: '/admin/products',  label: t.admin.products,  icon: Package },
    { href: '/admin/orders',    label: t.admin.orders,    icon: ShoppingCart },
    { href: '/admin/customers', label: t.admin.customers, icon: Users },
    { href: '/admin/analytics', label: t.admin.analytics, icon: BarChart3 },
    { href: '/admin/settings',  label: t.admin.settings,  icon: Settings },
  ]

  return (
    <aside className="w-56 shrink-0 flex flex-col min-h-screen bg-[#111] border-e border-white/8">
      {/* Brand */}
      <div className="px-5 py-6 border-b border-white/8">
        <Link href="/" className="block">
          <div className="text-base font-light text-transparent bg-clip-text bg-gradient-to-r from-[#B9922F] to-[#D4AF37] tracking-wider">
            {isRTL ? 'عقدي الفريد' : 'Aqdi Alfareed'}
          </div>
          <div className="text-[9px] tracking-[0.3em] text-white/20 uppercase mt-1">{t.admin.dashboard}</div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
          return (
            <Link key={href} href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group
                ${active ? 'bg-[#B9922F]/15 text-[#B9922F] border border-[#B9922F]/20' : 'text-white/35 hover:text-white hover:bg-white/5'}`}
            >
              <Icon size={16} strokeWidth={1.5} className={active ? 'text-[#B9922F]' : 'group-hover:text-[#B9922F]/60 transition-colors'} />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight size={12} className={`text-[#B9922F]/40 ${isRTL ? 'rotate-180' : ''}`} />}
            </Link>
          )
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/8 space-y-0.5">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/25 hover:text-white hover:bg-white/5 transition-all">
          <ChevronRight size={16} className={isRTL ? '' : 'rotate-180'} strokeWidth={1.5} />
          <span>{isRTL ? 'العودة للمتجر' : 'Back to Store'}</span>
        </Link>
        {/* CONNECT: Wire to auth signOut */}
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/25 hover:text-red-400 hover:bg-red-500/8 transition-all w-full">
          <LogOut size={16} strokeWidth={1.5} />
          <span>{t.admin.logout}</span>
        </button>
      </div>
    </aside>
  )
}
