'use client'
import { useState } from 'react'
import Image from 'next/image'
import { TrendingUp, TrendingDown, Package, ShoppingCart, Users, DollarSign, Plus, Edit, Trash2, Eye, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { adminStats, mockOrders, mockCustomers, products } from '@/data/products'
import Button from '@/components/ui/Button'

type Tab = 'overview' | 'products' | 'orders' | 'customers'

export default function AdminPage() {
  const { t, lang } = useLanguage()
  const [tab, setTab] = useState<Tab>('overview')
  const [addOpen, setAddOpen] = useState(false)

  const statCards = [
    { label: t.admin.totalSales,     value: `${adminStats.totalSales.toLocaleString()} ${t.common.sar}`, growth: adminStats.salesGrowth,   icon: DollarSign, color: 'text-gold',      bg: 'bg-gold/8' },
    { label: t.admin.totalOrders,    value: adminStats.totalOrders.toString(),                            growth: adminStats.ordersGrowth,  icon: ShoppingCart, color: 'text-blue-400', bg: 'bg-blue-500/8' },
    { label: t.admin.totalProducts,  value: adminStats.totalProducts.toString(),                          growth: 0,                        icon: Package,    color: 'text-purple-400', bg: 'bg-purple-500/8' },
    { label: t.admin.totalCustomers, value: adminStats.totalCustomers.toString(),                         growth: 12.8,                     icon: Users,      color: 'text-emerald-400', bg: 'bg-emerald-500/8' },
  ]

  const statusStyle: Record<string, string> = {
    delivered:  'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20',
    shipped:    'text-blue-400 bg-blue-500/10 border border-blue-500/20',
    processing: 'text-amber-400 bg-amber-500/10 border border-amber-500/20',
    pending:    'text-white/40 bg-ink-lifted border border-ink-border',
    cancelled:  'text-red-400 bg-red-500/10 border border-red-500/20',
  }
  const statusLabel: Record<string, string> = {
    delivered: t.admin.delivered, shipped: t.admin.shipped,
    processing: t.admin.processing, pending: t.admin.pending, cancelled: t.admin.cancelled,
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview',  label: t.admin.overview },
    { id: 'products',  label: t.admin.products },
    { id: 'orders',    label: t.admin.orders },
    { id: 'customers', label: t.admin.customers },
  ]

  return (
    <div className="p-6 md:p-8 overflow-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="display-serif text-3xl text-white">{t.admin.dashboard}</h1>
        <p className="text-white/30 text-sm mt-1">
          {lang === 'ar' ? 'مرحباً بك في لوحة تحكم عقدي الفريد' : 'Welcome to the Aqdi Alfareed admin panel'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-ink-card rounded-2xl border border-ink-border mb-8 overflow-x-auto no-scroll">
        {tabs.map(tb => (
          <button key={tb.id} onClick={() => setTab(tb.id)}
            className={`flex-1 min-w-max px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap
              ${tab === tb.id ? 'bg-gold text-ink-deep shadow-sm' : 'text-white/35 hover:text-white'}`}
          >{tb.label}</button>
        ))}
      </div>

      {/* Overview */}
      {tab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {statCards.map(({ label, value, growth, icon: Icon, color, bg }) => (
              <div key={label} className="p-6 bg-ink-card rounded-2xl border border-ink-border hover:border-gold-border transition-colors">
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-11 h-11 rounded-2xl ${bg} border border-white/5 flex items-center justify-center`}>
                    <Icon size={19} className={color} strokeWidth={1.5} />
                  </div>
                  {growth !== 0 && (
                    <span className={`flex items-center gap-1 text-xs font-medium ${growth > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {growth > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {Math.abs(growth)}%
                    </span>
                  )}
                </div>
                <div className="text-2xl font-bold text-white mb-1">{value}</div>
                <div className="text-xs text-white/30">{label}</div>
              </div>
            ))}
          </div>

          {/* Recent orders */}
          <div className="bg-ink-card rounded-2xl border border-ink-border overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-ink-border">
              <h2 className="font-medium text-white">{lang === 'ar' ? 'آخر الطلبات' : 'Recent Orders'}</h2>
              <button onClick={() => setTab('orders')} className="text-xs text-gold/60 hover:text-gold transition-colors flex items-center gap-1">
                {lang === 'ar' ? 'عرض الكل' : 'View All'} <ChevronRight size={12} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-ink-border">
                  {[t.admin.orderId, t.admin.customer, t.admin.date, t.admin.amount, t.admin.status].map(h => (
                    <th key={h} className="text-start text-2xs text-white/25 font-medium uppercase tracking-widest px-6 py-3">{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {mockOrders.map(o => (
                    <tr key={o.id} className="border-b border-ink-border/50 hover:bg-ink-lifted transition-colors">
                      <td className="px-6 py-4 text-sm text-gold font-mono">{o.id}</td>
                      <td className="px-6 py-4 text-sm text-white">{o.customerName}</td>
                      <td className="px-6 py-4 text-sm text-white/35">{o.date}</td>
                      <td className="px-6 py-4 text-sm text-white font-medium">{o.total.toLocaleString()} {t.common.sar}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[o.status]}`}>
                          {statusLabel[o.status]}
                        </span>
                      </td>
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
            <Button variant="gold" size="sm" className="gap-2" onClick={() => setAddOpen(!addOpen)}>
              <Plus size={15} />{t.admin.addProduct}
            </Button>
          </div>

          {/* Add product form */}
          {/* CONNECT: Wire this to Firebase/Supabase to create a real product */}
          {addOpen && (
            <div className="p-6 bg-ink-card rounded-2xl border border-gold/20 space-y-4">
              <h3 className="font-medium text-white">{t.admin.addProduct}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: lang === 'ar' ? 'الاسم (عربي)' : 'Name (Arabic)',   ph: 'عقد الياسمين' },
                  { label: lang === 'ar' ? 'الاسم (إنجليزي)' : 'Name (English)', ph: 'Jasmine Necklace' },
                  { label: t.admin.productPrice, ph: '0', type: 'number' },
                  { label: t.admin.productStock, ph: '10', type: 'number' },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-xs text-white/35 mb-1.5">{f.label}</label>
                    <input type={f.type || 'text'} placeholder={f.ph} className="input-ink" />
                  </div>
                ))}
                <div>
                  <label className="block text-xs text-white/35 mb-1.5">{t.admin.productCategory}</label>
                  <select className="input-ink">
                    <option value="necklaces">{lang === 'ar' ? 'العقود' : 'Necklaces'}</option>
                    <option value="earrings">{lang === 'ar' ? 'الأقراط' : 'Earrings'}</option>
                    <option value="rings">{lang === 'ar' ? 'الخواتم' : 'Rings'}</option>
                    <option value="bracelets">{lang === 'ar' ? 'الأساور' : 'Bracelets'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/35 mb-1.5">{t.admin.productMaterial}</label>
                  <select className="input-ink">
                    <option value="silver">{lang === 'ar' ? 'فضة' : 'Silver'}</option>
                    <option value="gold">{lang === 'ar' ? 'ذهب' : 'Gold'}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs text-white/35 mb-1.5">
                  {lang === 'ar' ? 'رابط الصورة (مؤقت — سيُستبدل بـ Firebase Storage)' : 'Image URL (temp — will be replaced by Firebase Storage)'}
                </label>
                <input type="url" placeholder="/images/products/..." className="input-ink" />
              </div>
              <div className="flex gap-3">
                <Button variant="gold" size="sm">{t.common.save}</Button>
                <Button variant="ghost" size="sm" onClick={() => setAddOpen(false)}>{t.common.cancel}</Button>
              </div>
            </div>
          )}

          {/* Products table with real images */}
          <div className="bg-ink-card rounded-2xl border border-ink-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-ink-border">
                  {['', t.admin.productName, t.admin.productPrice, t.admin.productCategory, t.admin.productStock, t.admin.productStatus, t.admin.action].map(h => (
                    <th key={h} className="text-start text-2xs text-white/25 font-medium uppercase tracking-widest px-4 py-3">{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} className="border-b border-ink-border/50 hover:bg-ink-lifted transition-colors">
                      {/* Real product thumbnail */}
                      <td className="px-4 py-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-ink-deep shrink-0">
                          <Image src={p.images[0]} alt={p.name[lang]} fill className="object-cover" sizes="40px" />
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-white font-medium max-w-[180px] truncate">{p.name[lang]}</td>
                      <td className="px-4 py-4 text-sm text-gold font-semibold">{p.price.toLocaleString()}</td>
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
                          <button className="p-1.5 text-white/20 hover:text-gold transition-colors"><Edit size={14} /></button>
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
        <div className="bg-ink-card rounded-2xl border border-ink-border overflow-hidden">
          <div className="px-6 py-4 border-b border-ink-border">
            <h2 className="font-medium text-white">{t.admin.orders} ({mockOrders.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-ink-border">
                {[t.admin.orderId, t.admin.customer, t.admin.date, t.admin.amount, t.admin.status, t.admin.action].map(h => (
                  <th key={h} className="text-start text-2xs text-white/25 font-medium uppercase tracking-widest px-6 py-3">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {mockOrders.map(o => (
                  <tr key={o.id} className="border-b border-ink-border/50 hover:bg-ink-lifted transition-colors">
                    <td className="px-6 py-4 text-sm text-gold font-mono">{o.id}</td>
                    <td className="px-6 py-4"><div className="text-sm text-white">{o.customerName}</div><div className="text-xs text-white/25">{o.customerEmail}</div></td>
                    <td className="px-6 py-4 text-sm text-white/35">{o.date}</td>
                    <td className="px-6 py-4 text-sm text-white font-medium">{o.total.toLocaleString()} {t.common.sar}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[o.status]}`}>{statusLabel[o.status]}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-xs text-gold/60 hover:text-gold transition-colors">{t.admin.view}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Customers */}
      {tab === 'customers' && (
        <div className="bg-ink-card rounded-2xl border border-ink-border overflow-hidden">
          <div className="px-6 py-4 border-b border-ink-border">
            <h2 className="font-medium text-white">{t.admin.customers} ({mockCustomers.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-ink-border">
                {[lang === 'ar' ? 'العميل' : 'Customer', lang === 'ar' ? 'الطلبات' : 'Orders', lang === 'ar' ? 'الإجمالي' : 'Total Spent', lang === 'ar' ? 'تاريخ التسجيل' : 'Joined', t.admin.action].map(h => (
                  <th key={h} className="text-start text-2xs text-white/25 font-medium uppercase tracking-widest px-6 py-3">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {mockCustomers.map(c => (
                  <tr key={c.id} className="border-b border-ink-border/50 hover:bg-ink-lifted transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center text-ink-deep font-bold text-sm">{c.name.charAt(0)}</div>
                        <div>
                          <div className="text-sm text-white">{c.name}</div>
                          <div className="text-xs text-white/25">{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white">{c.orders}</td>
                    <td className="px-6 py-4 text-sm text-gold font-semibold">{c.totalSpent.toLocaleString()} {t.common.sar}</td>
                    <td className="px-6 py-4 text-sm text-white/35">{c.joinDate}</td>
                    <td className="px-6 py-4"><button className="text-xs text-gold/60 hover:text-gold transition-colors">{t.admin.view}</button></td>
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
