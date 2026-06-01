'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function AdminSidebar() {
  const pathname = usePathname()
  const { t, isRTL } = useLanguage()

  const navItems = [
    { href: '/admin', label: t.admin.overview, icon: LayoutDashboard },
    { href: '/admin/products', label: t.admin.products, icon: Package },
    { href: '/admin/orders', label: t.admin.orders, icon: ShoppingCart },
    { href: '/admin/customers', label: t.admin.customers, icon: Users },
    { href: '/admin/analytics', label: t.admin.analytics, icon: BarChart3 },
    { href: '/admin/settings', label: t.admin.settings, icon: Settings },
  ]

  return (
    <aside className="admin-sidebar w-64 flex flex-col">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-dark-border">
        <Link href="/" className="block">
          <div className="text-lg font-serif text-gradient-gold tracking-wider">
            {isRTL ? 'عقدي الفريد' : 'Aqdi Alfareed'}
          </div>
          <div className="text-[10px] tracking-widest text-white/30 uppercase mt-0.5">
            {t.admin.dashboard}
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/admin' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group
                ${isActive
                  ? 'bg-gold/15 text-gold border border-gold/20'
                  : 'text-white/50 hover:text-white hover:bg-dark-card'
                }`}
            >
              <Icon size={18} className={isActive ? 'text-gold' : 'group-hover:text-gold/70 transition-colors'} />
              <span className="flex-1">{label}</span>
              {isActive && (
                <ChevronRight size={14} className={`text-gold/50 ${isRTL ? 'rotate-180' : ''}`} />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-dark-border space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white hover:bg-dark-card transition-all"
        >
          <ChevronRight size={18} className={isRTL ? '' : 'rotate-180'} />
          <span>{isRTL ? 'العودة للمتجر' : 'Back to Store'}</span>
        </Link>
        {/* CONNECT: Wire logout to Firebase Auth / Supabase Auth signOut */}
        <button
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all w-full"
        >
          <LogOut size={18} />
          <span>{t.admin.logout}</span>
        </button>
      </div>
    </aside>
  )
}
