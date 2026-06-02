'use client'
import { ReactNode } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'

// CONNECT: Add authentication guard here
// Example: if (!user?.isAdmin) redirect('/login')

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0d0d0d]">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
