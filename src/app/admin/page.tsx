'use client'

import { useState } from 'react'
import {
  TrendingUp, TrendingDown, Package, ShoppingCart, Users, DollarSign,
  Plus, Edit, Trash2, Eye, MoreVertical, ChevronRight
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { adminStats, mockOrders, mockCustomers, products } from '@/data/products'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

type AdminTab = 'overview' | 'products' | 'orders' | 'customers'

export default function AdminPage() {
  const { t, lang } = useLanguage()
  const [activeTab, setActiveTab] = useState<AdminTab>('overview')
  const [showAddProduct, setShowAddProduct] = useState(false)

  const statCards = [
    {
      label: t.admin.totalSales,
      value: `${adminStats.totalSales.toLocaleString()} ${t.common.sar}`,
      growth: adminStats.salesGrowth,
      icon: DollarSign,
      color: 'text-gold',
      bg: 'bg-gold/10',
    },
    {
      label: t.admin.totalOrders,
      value: adminStats.totalOrders.toString(),
      growth: adminStats.ordersGrowth,
      icon: ShoppingCart,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      label: t.admin.totalProducts,
      value: adminStats.totalProducts.toString(),
      growth: 0,
      icon: Package,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      label: t.admin.totalCustomers,
      value: adminStats.totalCustomers.toString(),
      growth: 12.8,
      icon: Users,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
  ]

  const statusColors: Record<string, string> = {
    delivered: 'text-emerald-400 bg-emerald-500/10',
    shipped: 'text-blue-400 bg-blue-500/10',
    processing: 'text-amber-400 bg-amber-500/10',
    pending: 'text-white/40 bg-dark-muted',
    cancelled: 'text-red-400 bg-red-500/10',
  }

  const statusLabels: Record<string, string> = {
    delivered: t.admin.delivered,
    shipped: t.admin.shipped,
    processing: t.admin.processing,
    pending: t.admin.pending,
    cancelled: t.admin.cancelled,
  }

  const tabs: { id: AdminTab; label: string }[] = [
    { id: 'overview', label: t.admin.overview },
    { id: 'products', label: t.admin.products },
    { id: 'orders', label: t.admin.orders },
    { id: 'customers', label: t.admin.customers },
  ]

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-white">{t.admin.dashboard}</h1>
          <p className="text-white/40 text-sm mt-1">
            {lang === 'ar' ? 'مرحباً بك في لوحة تحكم عقدي الفريد' : 'Welcome to Aqdi Alfareed Admin Panel'}
          </p>
        </div>
        {/* CONNECT: Add admin user info / logout here */}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-dark-card rounded-xl border border-dark-border mb-8 overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-max px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap
              ${activeTab === tab.id
                ? 'bg-gold text-dark-deeper shadow-sm'
                : 'text-white/50 hover:text-white'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {statCards.map(({ label, value, growth, icon: Icon, color, bg }) => (
              <div key={label} className="p-6 bg-dark-card rounded-2xl border border-dark-border hover:border-gold/20 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center`}>
                    <Icon size={20} className={color} />
                  </div>
                  {growth !== 0 && (
                    <div className={`flex items-center gap-1 text-xs font-medium
                      ${growth > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {growth > 0
                        ? <TrendingUp size={13} />
                        : <TrendingDown size={13} />
                      }
                      {Math.abs(growth)}%
                    </div>
                  )}
                </div>
                <div className="text-2xl font-bold text-white mb-1">{value}</div>
                <div className="text-xs text-white/40">{label}</div>
              </div>
            ))}
          </div>

          {/* Quick recent orders */}
          <div className="bg-dark-card rounded-2xl border border-dark-border overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-dark-border">
              <h2 className="font-semibold text-white">{lang === 'ar' ? 'آخر الطلبات' : 'Recent Orders'}</h2>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs text-gold hover:text-gold-light transition-colors flex items-center gap-1"
              >
                {lang === 'ar' ? 'عرض الكل' : 'View All'} <ChevronRight size={13} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-border">
                    {[t.admin.orderId, t.admin.customer, t.admin.date, t.admin.amount, t.admin.status].map(h => (
                      <th key={h} className="text-start text-xs text-white/30 font-medium uppercase tracking-wider px-6 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.slice(0, 3).map(order => (
                    <tr key={order.id} className="border-b border-dark-border/50 hover:bg-dark-hover transition-colors">
                      <td className="px-6 py-4 text-sm text-gold font-mono">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-white">{order.customerName}</td>
                      <td className="px-6 py-4 text-sm text-white/50">{order.date}</td>
                      <td className="px-6 py-4 text-sm text-white font-medium">{order.total.toLocaleString()} {t.common.sar}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                          {statusLabels[order.status]}
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
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-white">{t.admin.products} ({products.length})</h2>
            <Button variant="gold" size="sm" className="gap-2" onClick={() => setShowAddProduct(!showAddProduct)}>
              <Plus size={16} />
              {t.admin.addProduct}
            </Button>
          </div>

          {/* Add Product Form */}
          {/* CONNECT: Wire this form to create product in Firebase/Supabase */}
          {showAddProduct && (
            <div className="p-6 bg-dark-card rounded-2xl border border-gold/20 space-y-4">
              <h3 className="font-medium text-white">{t.admin.addProduct}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: lang === 'ar' ? 'اسم المنتج (عربي)' : 'Product Name (Arabic)', placeholder: 'عقد الياسمين' },
                  { label: lang === 'ar' ? 'اسم المنتج (إنجليزي)' : 'Product Name (English)', placeholder: 'Jasmine Necklace' },
                  { label: t.admin.productPrice, placeholder: '0.00', type: 'number' },
                  { label: t.admin.productStock, placeholder: '10', type: 'number' },
                ].map(field => (
                  <div key={field.label}>
                    <label className="block text-sm text-white/50 mb-1.5">{field.label}</label>
                    <input type={field.type || 'text'} placeholder={field.placeholder} className="input-luxury" />
                  </div>
                ))}
                <div>
                  <label className="block text-sm text-white/50 mb-1.5">{t.admin.productCategory}</label>
                  <select className="input-luxury">
                    <option value="necklaces">{lang === 'ar' ? 'العقود' : 'Necklaces'}</option>
                    <option value="earrings">{lang === 'ar' ? 'الأقراط' : 'Earrings'}</option>
                    <option value="rings">{lang === 'ar' ? 'الخواتم' : 'Rings'}</option>
                    <option value="bracelets">{lang === 'ar' ? 'الأساور' : 'Bracelets'}</option>
                    <option value="giftSets">{lang === 'ar' ? 'أطقم الهدايا' : 'Gift Sets'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-1.5">{t.admin.productMaterial}</label>
                  <select className="input-luxury">
                    <option value="gold">{lang === 'ar' ? 'ذهب' : 'Gold'}</option>
                    <option value="silver">{lang === 'ar' ? 'فضة' : 'Silver'}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-1.5">
                  {lang === 'ar' ? 'رابط الصورة' : 'Image URL'}
                  {' '}
                  <span className="text-white/30 text-xs">
                    {lang === 'ar' ? '(سيتم استبداله بـ Firebase Storage)' : '(Will be replaced with Firebase Storage)'}
                  </span>
                </label>
                <input type="url" placeholder="https://..." className="input-luxury" />
              </div>
              <div className="flex gap-3">
                <Button variant="gold" size="sm">{t.common.save}</Button>
                <Button variant="ghost" size="sm" onClick={() => setShowAddProduct(false)}>{t.common.cancel}</Button>
              </div>
            </div>
          )}

          {/* Products Table */}
          <div className="bg-dark-card rounded-2xl border border-dark-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-border">
                    {[t.admin.productName, t.admin.productPrice, t.admin.productCategory, t.admin.productMaterial, t.admin.productStock, t.admin.productStatus, t.admin.action].map(h => (
                      <th key={h} className="text-start text-xs text-white/30 font-medium uppercase tracking-wider px-5 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} className="border-b border-dark-border/50 hover:bg-dark-hover transition-colors">
                      <td className="px-5 py-4 text-sm text-white font-medium">{p.name[lang]}</td>
                      <td className="px-5 py-4 text-sm text-gold font-semibold">{p.price.toLocaleString()}</td>
                      <td className="px-5 py-4 text-sm text-white/60">{p.category}</td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-medium ${p.material === 'gold' ? 'text-gold' : 'text-silver'}`}>
                          {p.material === 'gold' ? '●' : '●'} {p.material === 'gold' ? t.common.sar.replace('SAR', 'Gold').replace('ر.س', 'ذهب') : t.common.sar.replace('SAR', 'Silver').replace('ر.س', 'فضة')}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-white/60">{p.stockCount ?? '—'}</td>
                      <td className="px-5 py-4">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${p.inStock ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>
                          {p.inStock ? t.admin.inStock : t.admin.outOfStock}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 text-white/30 hover:text-blue-400 transition-colors"><Eye size={15} /></button>
                          <button className="p-1.5 text-white/30 hover:text-gold transition-colors"><Edit size={15} /></button>
                          <button className="p-1.5 text-white/30 hover:text-red-400 transition-colors"><Trash2 size={15} /></button>
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
      {activeTab === 'orders' && (
        <div className="bg-dark-card rounded-2xl border border-dark-border overflow-hidden">
          <div className="px-6 py-4 border-b border-dark-border">
            <h2 className="font-semibold text-white">{t.admin.orders} ({mockOrders.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-border">
                  {[t.admin.orderId, t.admin.customer, t.admin.date, t.admin.amount, t.admin.status, t.admin.action].map(h => (
                    <th key={h} className="text-start text-xs text-white/30 font-medium uppercase tracking-wider px-6 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockOrders.map(order => (
                  <tr key={order.id} className="border-b border-dark-border/50 hover:bg-dark-hover transition-colors">
                    <td className="px-6 py-4 text-sm text-gold font-mono">{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-white">{order.customerName}</div>
                      <div className="text-xs text-white/30">{order.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/50">{order.date}</td>
                    <td className="px-6 py-4 text-sm text-white font-semibold">{order.total.toLocaleString()} {t.common.sar}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                        {statusLabels[order.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-xs text-gold hover:text-gold-light transition-colors">{t.admin.view}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Customers */}
      {activeTab === 'customers' && (
        <div className="bg-dark-card rounded-2xl border border-dark-border overflow-hidden">
          <div className="px-6 py-4 border-b border-dark-border">
            <h2 className="font-semibold text-white">{t.admin.customers} ({mockCustomers.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-border">
                  {[lang === 'ar' ? 'العميل' : 'Customer', lang === 'ar' ? 'الهاتف' : 'Phone', lang === 'ar' ? 'الطلبات' : 'Orders', lang === 'ar' ? 'الإنفاق الكلي' : 'Total Spent', lang === 'ar' ? 'تاريخ التسجيل' : 'Join Date', t.admin.action].map(h => (
                    <th key={h} className="text-start text-xs text-white/30 font-medium uppercase tracking-wider px-6 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockCustomers.map(customer => (
                  <tr key={customer.id} className="border-b border-dark-border/50 hover:bg-dark-hover transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center text-dark-deeper font-bold text-sm flex-shrink-0">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm text-white">{customer.name}</div>
                          <div className="text-xs text-white/30">{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/50" dir="ltr">{customer.phone}</td>
                    <td className="px-6 py-4 text-sm text-white">{customer.orders}</td>
                    <td className="px-6 py-4 text-sm text-gold font-semibold">{customer.totalSpent.toLocaleString()} {t.common.sar}</td>
                    <td className="px-6 py-4 text-sm text-white/50">{customer.joinDate}</td>
                    <td className="px-6 py-4">
                      <button className="text-xs text-gold hover:text-gold-light transition-colors">{t.admin.view}</button>
                    </td>
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
