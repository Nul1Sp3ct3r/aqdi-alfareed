'use client'

import { ReactNode } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { useLanguage } from '@/context/LanguageContext'

// CONNECT: Wrap with authentication guard
// Example: if (!user || !user.isAdmin) redirect('/login')

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { lang } = useLanguage()

  return (
    <div className="flex min-h-screen bg-dark-deeper">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
