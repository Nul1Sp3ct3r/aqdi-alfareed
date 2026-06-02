'use client'
import { useState } from 'react'
import Image from 'next/image'
import { TrendingUp, TrendingDown, Package, ShoppingCart, Users, DollarSign, Plus, Edit, Trash2, Eye, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { adminStats, mockOrders, mockCustomers, products } from '@/data/products'

type Tab = 'overview' | 'products' | 'orders' | 'customers'

export default function AdminPage() {
  const { t, lang } = useLanguage()
  const [tab, setTab] = useState<Tab>('overview')
  const [addOpen, setAddOpen] = useState(false)

  const statCards = [
    { label: t.admin.totalSales,     value: `${adminStats.totalSales.toLocaleString()} ${t.common.sar}`, growth: adminStats.salesGrowth,  icon: DollarSign,  color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { label: t.admin.totalOrders,    value: adminStats.totalOrders.toString(),                           growth: adminStats.ordersGrowth, icon: ShoppingCart, color: 'text-blue-400',   bg: 'bg-blue-500/10' },
    { label: t.admin.totalProducts,  value: adminStats.totalProducts.toString(),                         growth: 0,                       icon: Package,      color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: t.admin.totalCustomers, value: adminStats.totalCustomers.toString(),                        growth: 12.8,                    icon: Users,        color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  ]

  const statusStyle: Record<string, string> = {
    delivered: 'text-emerald-400 bg-emerald-500/10', shipped: 'text-blue-400 bg-blue-500/10',
    processing: 'text-amber-400 bg-amber-500/10', pending: 'text-white/40 bg-white/5', cancelled: 'text-red-400 bg-red-500/10',
  }
  const statusLabel: Record<string, string> = {
    delivered: t.admin.delivered, shipped: t.admin.shipped, processing: t.admin.processing, pending: t.admin.pending, cancelled: t.admin.cancelled,
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: t.admin.overview }, { id: 'products', label: t.admin.products },
    { id: 'orders',   label: t.admin.orders },   { id: 'customers', label: t.admin.customers },
  ]

  return (
    <div className="p-6 md:p-8 overflow-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">{t.admin.dashboard}</h1>
        <p className="text-white/30 text-sm mt-1">{lang === 'ar' ? 'مرحباً بك في لوحة تحكم عقدي الفريد' : 'Welcome to the admin panel'}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-white/5 rounded-xl border border-white/8 mb-8 overflow-x-auto no-scroll">
        {tabs.map(tb => (
          <button key={tb.id} onClick={() => setTab(tb.id)}
            className={`flex-1 min-w-max px-5 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap
              ${tab === tb.id ? 'bg-[#B9922F] text-white' : 'text-white/35 hover:text-white'}`}
          >{tb.label}</button>
        ))}
      </div>

      {/* Overview */}
      {tab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {statCards.map(({ label, value, growth, icon: Icon, color, bg }) => (
              <div key={label} className="p-5 bg-white/5 rounded-xl border border-white/8 hover:border-[#B9922F]/30 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
                    <Icon size={18} className={color} strokeWidth={1.5} />
                  </div>
                  {growth !== 0 && (
                    <span className={`flex items-center gap-1 text-xs font-medium ${growth > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {growth > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{Math.abs(growth)}%
                    </span>
                  )}
                </div>
                <div className="text-2xl font-bold text-white mb-1">{value}</div>
                <div className="text-xs text-white/30">{label}</div>
              </div>
            ))}
          </div>

          {/* Recent orders */}
          <div className="bg-white/5 rounded-xl border border-white/8 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
              <h2 className="font-medium text-white">{lang === 'ar' ? 'آخر الطلبات' : 'Recent Orders'}</h2>
              <button onClick={() => setTab('orders')} className="text-xs text-[#B9922F]/70 hover:text-[#B9922F] transition-colors flex items-center gap-1">
                {lang === 'ar' ? 'عرض الكل' : 'View All'}<ChevronRight size={12} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-white/8">
                  {[t.admin.orderId, t.admin.customer, t.admin.date, t.admin.amount, t.admin.status].map(h => (
                    <th key={h} className="text-start text-[10px] text-white/25 font-medium uppercase tracking-widest px-5 py-3">{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {mockOrders.map(o => (
                    <tr key={o.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                      <td className="px-5 py-4 text-sm text-[#B9922F] font-mono">{o.id}</td>
                      <td className="px-5 py-4 text-sm text-white">{o.customerName}</td>
                      <td className="px-5 py-4 text-sm text-white/35">{o.date}</td>
                      <td className="px-5 py-4 text-sm text-white font-medium">{o.total.toLocaleString()} {t.common.sar}</td>
                      <td className="px-5 py-4"><span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[o.status]}`}>{statusLabel[o.status]}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Products */}
      {tab === 'products' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-medium text-white">{t.admin.products} ({products.length})</h2>
            <button onClick={() => setAddOpen(!addOpen)}
              className="btn bg-[#B9922F] text-white text-sm rounded-lg px-4 py-2.5 gap-2 hover:bg-[#D4AF37] transition-colors">
              <Plus size={15} />{t.admin.addProduct}
            </button>
          </div>
          {addOpen && (
            <div className="p-5 bg-white/5 rounded-xl border border-[#B9922F]/30 space-y-4">
              <h3 className="font-medium text-white text-sm">{t.admin.addProduct}</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: lang === 'ar' ? 'الاسم (عربي)' : 'Name (Arabic)', ph: 'عقد الياسمين' },
                  { label: lang === 'ar' ? 'الاسم (إنجليزي)' : 'Name (English)', ph: 'Jasmine Necklace' },
                  { label: t.admin.productPrice, ph: '0', type: 'number' },
                  { label: t.admin.productStock, ph: '10', type: 'number' },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-xs text-white/35 mb-1.5">{f.label}</label>
                    <input type={f.type || 'text'} placeholder={f.ph} className="input-clean bg-white/5 border-white/15 text-white placeholder:text-white/25 focus:border-[#B9922F]" />
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button className="btn bg-[#B9922F] text-white text-xs rounded px-4 py-2.5 hover:bg-[#D4AF37] transition-colors">{t.common.save}</button>
                <button onClick={() => setAddOpen(false)} className="btn text-white/40 hover:text-white text-xs px-4 py-2.5 transition-colors">{t.common.cancel}</button>
              </div>
            </div>
          )}
          <div className="bg-white/5 rounded-xl border border-white/8 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-white/8">
                  {['', t.admin.productName, t.admin.productPrice, t.admin.productCategory, t.admin.productStock, t.admin.productStatus, t.admin.action].map(h => (
                    <th key={h} className="text-start text-[10px] text-white/25 font-medium uppercase tracking-widest px-4 py-3">{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                      <td className="px-4 py-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[#030303] shrink-0">
                          <Image src={p.images[0]} alt={p.name[lang]} fill className="object-cover" sizes="40px" />
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-white font-medium max-w-[160px] truncate">{p.name[lang]}</td>
                      <td className="px-4 py-4 text-sm text-[#B9922F] font-semibold">{p.price.toLocaleString()}</td>
                      <td className="px-4 py-4 text-sm text-white/40">{p.category}</td>
                      <td className="px-4 py-4 text-sm text-white/50">{p.stockCount ?? '—'}</td>
                      <td className="px-4 py-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${p.inStock ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>
                          {p.inStock ? t.admin.inStock : t.admin.outOfStock}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 text-white/20 hover:text-blue-400 transition-colors"><Eye size={14} /></button>
                          <button className="p-1.5 text-white/20 hover:text-[#B9922F] transition-colors"><Edit size={14} /></button>
                          <button className="p-1.5 text-white/20 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Orders */}
      {tab === 'orders' && (
        <div className="bg-white/5 rounded-xl border border-white/8 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/8"><h2 className="font-medium text-white">{t.admin.orders} ({mockOrders.length})</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-white/8">
                {[t.admin.orderId, t.admin.customer, t.admin.date, t.admin.amount, t.admin.status, t.admin.action].map(h => (
                  <th key={h} className="text-start text-[10px] text-white/25 font-medium uppercase tracking-widest px-5 py-3">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {mockOrders.map(o => (
                  <tr key={o.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="px-5 py-4 text-sm text-[#B9922F] font-mono">{o.id}</td>
                    <td className="px-5 py-4"><div className="text-sm text-white">{o.customerName}</div><div className="text-xs text-white/25">{o.customerEmail}</div></td>
                    <td className="px-5 py-4 text-sm text-white/35">{o.date}</td>
                    <td className="px-5 py-4 text-sm text-white font-medium">{o.total.toLocaleString()} {t.common.sar}</td>
                    <td className="px-5 py-4"><span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[o.status]}`}>{statusLabel[o.status]}</span></td>
                    <td className="px-5 py-4"><button className="text-xs text-[#B9922F]/60 hover:text-[#B9922F] transition-colors">{t.admin.view}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Customers */}
      {tab === 'customers' && (
        <div className="bg-white/5 rounded-xl border border-white/8 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/8"><h2 className="font-medium text-white">{t.admin.customers} ({mockCustomers.length})</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-white/8">
                {[lang === 'ar' ? 'العميل' : 'Customer', lang === 'ar' ? 'الطلبات' : 'Orders', lang === 'ar' ? 'الإجمالي' : 'Total', lang === 'ar' ? 'تاريخ التسجيل' : 'Joined', t.admin.action].map(h => (
                  <th key={h} className="text-start text-[10px] text-white/25 font-medium uppercase tracking-widest px-5 py-3">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {mockCustomers.map(c => (
                  <tr key={c.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B9922F] to-[#D4AF37] flex items-center justify-center text-white font-bold text-sm shrink-0">{c.name.charAt(0)}</div>
                        <div><div className="text-sm text-white">{c.name}</div><div className="text-xs text-white/25">{c.email}</div></div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-white">{c.orders}</td>
                    <td className="px-5 py-4 text-sm text-[#B9922F] font-semibold">{c.totalSpent.toLocaleString()} {t.common.sar}</td>
                    <td className="px-5 py-4 text-sm text-white/35">{c.joinDate}</td>
                    <td className="px-5 py-4"><button className="text-xs text-[#B9922F]/60 hover:text-[#B9922F] transition-colors">{t.admin.view}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
