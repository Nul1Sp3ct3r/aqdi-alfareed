'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, CreditCard, Smartphone, Banknote, Shield } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'

type PaymentMethod = 'credit_card' | 'mada' | 'apple_pay' | 'cash'

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const { t, lang, isRTL } = useLanguage()
  const [payment, setPayment] = useState<PaymentMethod>('mada')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', city: '', district: '', street: '', building: '', postalCode: '' })

  const set = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }))

  // CONNECT: Create order in Firebase/Supabase, trigger WhatsApp notification
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1400))
    setSuccess(true)
    clearCart()
    setSubmitting(false)
  }

  if (success) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-cream flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4 py-20">
            <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={38} className="text-emerald-600" />
            </div>
            <h2 className="text-2xl display-serif text-ink mb-3">{lang === 'ar' ? 'تم تأكيد طلبك!' : 'Order Confirmed!'}</h2>
            <p className="text-ink-muted mb-8 text-sm leading-relaxed">
              {lang === 'ar' ? 'شكراً لك. سنتواصل معك قريباً عبر الواتساب لتأكيد التفاصيل.' : 'Thank you! We\'ll contact you soon via WhatsApp to confirm the details.'}
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/shop"><button className="btn btn-gold rounded w-full py-4 text-sm tracking-wide">{t.cart.continueShopping}</button></Link>
              <Link href="/"><button className="btn btn-ghost w-full text-ink-muted">{lang === 'ar' ? 'الرئيسية' : 'Home'}</button></Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">
        <div className="bg-jet-deep py-10">
          <div className="container">
            <span className="label-luxury block mb-2">{isRTL ? 'أتمّي شراءك' : 'Complete Your Order'}</span>
            <h1 className="display-serif text-3xl md:text-4xl text-white">{t.checkout.title}</h1>
          </div>
        </div>

        <div className="container py-10">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Customer Info */}
                <FormSection title={t.checkout.customerInfo}>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label={t.checkout.firstName} required>
                      <input className="input-clean" required value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder={lang === 'ar' ? 'نورة' : 'Sarah'} />
                    </FormField>
                    <FormField label={t.checkout.lastName} required>
                      <input className="input-clean" required value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder={lang === 'ar' ? 'الأحمدي' : 'Al-Ahmadi'} />
                    </FormField>
                  </div>
                  <FormField label={t.checkout.email} required>
                    <input type="email" className="input-clean" required value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" dir="ltr" />
                  </FormField>
                  <FormField label={t.checkout.phone} required>
                    <input type="tel" className="input-clean" required value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+966 5X XXX XXXX" dir="ltr" />
                  </FormField>
                </FormSection>

                {/* Delivery */}
                <FormSection title={t.checkout.deliveryAddress}>
                  <FormField label={t.checkout.city} required>
                    <select className="input-clean" required value={form.city} onChange={e => set('city', e.target.value)}>
                      <option value="">{lang === 'ar' ? 'اختاري المدينة' : 'Select city'}</option>
                      {['الرياض', 'جدة', 'مكة المكرمة', 'المدينة المنورة', 'الدمام', 'الخبر', 'أبها', 'تبوك'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </FormField>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label={t.checkout.district} required>
                      <input className="input-clean" required value={form.district} onChange={e => set('district', e.target.value)} />
                    </FormField>
                    <FormField label={t.checkout.street} required>
                      <input className="input-clean" required value={form.street} onChange={e => set('street', e.target.value)} />
                    </FormField>
                  </div>
                </FormSection>

                {/* Payment */}
                {/* CONNECT: Integrate Moyasar, Stripe, or Tamara payment gateway */}
                <FormSection title={t.checkout.paymentMethod}>
                  <div className="space-y-3">
                    {[
                      { id: 'mada' as const, label: t.checkout.mada, icon: CreditCard },
                      { id: 'credit_card' as const, label: t.checkout.creditCard, icon: CreditCard },
                      { id: 'apple_pay' as const, label: t.checkout.applePay, icon: Smartphone },
                      { id: 'cash' as const, label: t.checkout.cashOnDelivery, icon: Banknote },
                    ].map(({ id, label, icon: Icon }) => (
                      <label key={id} className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all
                        ${payment === id ? 'border-gold bg-gold/5' : 'border-[#E8DEC8] bg-white hover:border-gold/40'}`}>
                        <input type="radio" name="payment" value={id} checked={payment === id} onChange={() => setPayment(id)} className="sr-only" />
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${payment === id ? 'border-gold' : 'border-[#C8BFA8]'}`}>
                          {payment === id && <div className="w-2 h-2 rounded-full bg-gold" />}
                        </div>
                        <Icon size={18} className={payment === id ? 'text-gold' : 'text-ink-muted'} />
                        <span className={`font-medium text-sm ${payment === id ? 'text-gold' : 'text-ink'}`}>{label}</span>
                      </label>
                    ))}
                  </div>
                </FormSection>
              </div>

              {/* Summary */}
              <div>
                <div className="sticky top-28">
                  <div className="p-6 bg-white rounded-xl border border-[#E8DEC8] shadow-card">
                    <h2 className="font-semibold text-ink text-lg mb-5 display-serif">{t.checkout.orderSummary}</h2>
                    <div className="space-y-3 mb-5 max-h-60 overflow-y-auto no-scroll">
                      {items.map(item => (
                        <div key={item.product.id} className="flex gap-3">
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[#080808] shrink-0">
                            <Image src={item.product.images[0]} alt={item.product.name[lang]} fill className="object-cover" sizes="56px" />
                            <span className="absolute -top-1 -end-1 w-4.5 h-4.5 bg-gold text-white text-[9px] font-bold rounded-full flex items-center justify-center">{item.quantity}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-ink/70 line-clamp-2">{item.product.name[lang]}</p>
                            <p className="text-gold text-xs font-bold mt-1">{(item.product.price * item.quantity).toLocaleString()} {t.common.sar}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2 pt-4 border-t border-[#E8DEC8] mb-5">
                      <div className="flex justify-between text-sm text-ink-muted"><span>{t.checkout.subtotal}</span><span>{subtotal.toLocaleString()} {t.common.sar}</span></div>
                      <div className="flex justify-between text-sm text-ink-muted"><span>{t.checkout.shipping}</span><span className="text-emerald-600 font-medium">{t.checkout.free}</span></div>
                      <div className="flex justify-between font-bold text-base pt-2 border-t border-[#E8DEC8]">
                        <span className="text-ink">{t.checkout.total}</span>
                        <span className="text-gold text-xl">{subtotal.toLocaleString()} {t.common.sar}</span>
                      </div>
                    </div>
                    <button type="submit" disabled={submitting || items.length === 0}
                      className="btn btn-gold w-full py-4 rounded tracking-wide text-sm"
                    >
                      {submitting ? (lang === 'ar' ? 'جاري التأكيد...' : 'Processing...') : t.checkout.placeOrder}
                    </button>
                    <div className="flex items-center justify-center gap-2 mt-4 text-xs text-ink-muted">
                      <Shield size={12} className="text-gold" />
                      {lang === 'ar' ? 'دفع آمن ومشفر' : 'Secure encrypted payment'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-6 bg-white rounded-xl border border-[#E8DEC8] shadow-card">
      <h2 className="font-semibold text-ink text-base mb-5 pb-4 border-b border-[#E8DEC8] display-serif">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-ink-muted mb-1.5">
        {label}{required && <span className="text-gold ms-1">*</span>}
      </label>
      {children}
    </div>
  )
}
