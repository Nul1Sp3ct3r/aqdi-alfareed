'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, CreditCard, Smartphone, Banknote, Shield, ArrowRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'

type PaymentMethod = 'credit_card' | 'mada' | 'apple_pay' | 'cash'

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const { t, lang, isRTL } = useLanguage()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mada')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    city: '', district: '', street: '', building: '', postalCode: '',
  })

  const set = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }))

  // CONNECT: Submit to your backend API / Firebase / Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call delay
    await new Promise(r => setTimeout(r, 1500))

    // CONNECT: Create order in database, trigger WhatsApp notification, etc.
    // Example:
    // await createOrder({ customer: formData, items, total, paymentMethod })
    // await sendWhatsAppConfirmation({ phone: formData.phone, orderId })

    setIsSuccess(true)
    clearCart()
    setIsSubmitting(false)
  }

  if (isSuccess) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-dark-deeper pt-20 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4 py-20">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-emerald-400" />
            </div>
            <h2 className="text-2xl font-serif text-white mb-3">
              {lang === 'ar' ? 'تم تأكيد طلبك!' : 'Order Confirmed!'}
            </h2>
            <p className="text-white/50 mb-8">
              {lang === 'ar'
                ? 'شكراً لك على طلبك. سنتواصل معك قريباً عبر الواتساب لتأكيد التفاصيل.'
                : 'Thank you for your order. We will contact you via WhatsApp shortly to confirm the details.'}
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/shop"><Button variant="gold" fullWidth size="lg">{t.cart.continueShopping}</Button></Link>
              <Link href="/"><Button variant="ghost" fullWidth>{lang === 'ar' ? 'الرئيسية' : 'Home'}</Button></Link>
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
      <main className="min-h-screen bg-dark-deeper pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-3xl font-serif text-white mb-8">{t.checkout.title}</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Customer Info */}
                <FormSection title={t.checkout.customerInfo}>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label={t.checkout.firstName} required>
                      <input className="input-luxury" required value={formData.firstName}
                        onChange={e => set('firstName', e.target.value)}
                        placeholder={lang === 'ar' ? 'نورة' : 'Sarah'} />
                    </FormField>
                    <FormField label={t.checkout.lastName} required>
                      <input className="input-luxury" required value={formData.lastName}
                        onChange={e => set('lastName', e.target.value)}
                        placeholder={lang === 'ar' ? 'الأحمدي' : 'Al-Ahmadi'} />
                    </FormField>
                  </div>
                  <FormField label={t.checkout.email} required>
                    <input type="email" className="input-luxury" required value={formData.email}
                      onChange={e => set('email', e.target.value)}
                      placeholder={lang === 'ar' ? 'بريدك@مثال.com' : 'your@email.com'} />
                  </FormField>
                  <FormField label={t.checkout.phone} required>
                    <input type="tel" className="input-luxury" required value={formData.phone}
                      onChange={e => set('phone', e.target.value)}
                      placeholder={lang === 'ar' ? '+966 5X XXX XXXX' : '+966 5X XXX XXXX'}
                      dir="ltr" />
                  </FormField>
                </FormSection>

                {/* Delivery Address */}
                <FormSection title={t.checkout.deliveryAddress}>
                  <FormField label={t.checkout.city} required>
                    <select className="input-luxury" required value={formData.city}
                      onChange={e => set('city', e.target.value)}>
                      <option value="">{lang === 'ar' ? 'اختاري المدينة' : 'Select city'}</option>
                      {['الرياض', 'جدة', 'مكة المكرمة', 'المدينة المنورة', 'الدمام', 'الخبر', 'أبها', 'تبوك'].map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </FormField>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label={t.checkout.district} required>
                      <input className="input-luxury" required value={formData.district}
                        onChange={e => set('district', e.target.value)}
                        placeholder={lang === 'ar' ? 'حي العليا' : 'Al-Olaya District'} />
                    </FormField>
                    <FormField label={t.checkout.street} required>
                      <input className="input-luxury" required value={formData.street}
                        onChange={e => set('street', e.target.value)}
                        placeholder={lang === 'ar' ? 'شارع الأمير ...' : 'Prince Street'} />
                    </FormField>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label={t.checkout.building}>
                      <input className="input-luxury" value={formData.building}
                        onChange={e => set('building', e.target.value)}
                        placeholder={lang === 'ar' ? '١٢ب' : '12B'} />
                    </FormField>
                    <FormField label={t.checkout.postalCode}>
                      <input className="input-luxury" value={formData.postalCode}
                        onChange={e => set('postalCode', e.target.value)}
                        placeholder="12345" dir="ltr" />
                    </FormField>
                  </div>
                </FormSection>

                {/* Payment Method */}
                {/* CONNECT: Integrate payment gateway (Stripe, Tamara, Moyasar, etc.) */}
                <FormSection title={t.checkout.paymentMethod}>
                  <div className="space-y-3">
                    {[
                      { id: 'mada' as const, label: t.checkout.mada, icon: CreditCard, desc: lang === 'ar' ? 'ادفع ببطاقة مدى' : 'Pay with Mada card' },
                      { id: 'credit_card' as const, label: t.checkout.creditCard, icon: CreditCard, desc: lang === 'ar' ? 'فيزا / ماستر كارد' : 'Visa / Mastercard' },
                      { id: 'apple_pay' as const, label: t.checkout.applePay, icon: Smartphone, desc: lang === 'ar' ? 'ادفع بـ Apple Pay' : 'Pay with Apple Pay' },
                      { id: 'cash' as const, label: t.checkout.cashOnDelivery, icon: Banknote, desc: lang === 'ar' ? 'ادفعي عند الاستلام' : 'Pay when you receive' },
                    ].map(({ id, label, icon: Icon, desc }) => (
                      <label
                        key={id}
                        className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200
                          ${paymentMethod === id
                            ? 'border-gold bg-gold/10 text-white'
                            : 'border-dark-border bg-dark-card text-white/60 hover:border-gold/30'
                          }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={id}
                          checked={paymentMethod === id}
                          onChange={() => setPaymentMethod(id)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0
                          ${paymentMethod === id ? 'border-gold' : 'border-dark-muted'}`}>
                          {paymentMethod === id && <div className="w-2 h-2 rounded-full bg-gold" />}
                        </div>
                        <Icon size={20} className={paymentMethod === id ? 'text-gold' : ''} />
                        <div>
                          <div className={`font-medium text-sm ${paymentMethod === id ? 'text-gold' : ''}`}>{label}</div>
                          <div className="text-xs text-white/40 mt-0.5">{desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </FormSection>
              </div>

              {/* Order Summary */}
              <div>
                <div className="sticky top-28">
                  <div className="p-6 bg-dark-card rounded-2xl border border-dark-border">
                    <h2 className="font-semibold text-white text-lg mb-5">{t.checkout.orderSummary}</h2>

                    {/* Items */}
                    <div className="space-y-3 mb-5 max-h-60 overflow-y-auto no-scrollbar">
                      {items.map(item => (
                        <div key={item.product.id} className="flex gap-3">
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-dark-muted">
                            <Image src={item.product.images[0]} alt={item.product.name[lang]}
                              fill className="object-cover" sizes="56px" />
                            <span className="absolute -top-1 -end-1 w-4.5 h-4.5 bg-gold text-dark-deeper text-[9px] font-bold rounded-full flex items-center justify-center">
                              {item.quantity}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-white/70 line-clamp-2">{item.product.name[lang]}</p>
                            <p className="text-gold text-xs font-semibold mt-1">
                              {(item.product.price * item.quantity).toLocaleString()} {t.common.sar}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 pt-4 border-t border-dark-border mb-5">
                      <div className="flex justify-between text-sm text-white/60">
                        <span>{t.checkout.subtotal}</span>
                        <span>{subtotal.toLocaleString()} {t.common.sar}</span>
                      </div>
                      <div className="flex justify-between text-sm text-white/60">
                        <span>{t.checkout.shipping}</span>
                        <span className="text-emerald-400">{t.checkout.free}</span>
                      </div>
                      <div className="flex justify-between font-bold text-base pt-2 border-t border-dark-border">
                        <span className="text-white">{t.checkout.total}</span>
                        <span className="text-gold text-xl">{subtotal.toLocaleString()} {t.common.sar}</span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="gold"
                      fullWidth
                      size="lg"
                      disabled={isSubmitting || items.length === 0}
                      className="gap-2"
                    >
                      {isSubmitting
                        ? (lang === 'ar' ? 'جاري التأكيد...' : 'Processing...')
                        : t.checkout.placeOrder
                      }
                    </Button>

                    <div className="flex items-center justify-center gap-2 mt-4 text-white/30 text-xs">
                      <Shield size={12} />
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
    <div className="p-6 bg-dark-card rounded-2xl border border-dark-border">
      <h2 className="text-lg font-semibold text-white mb-5 pb-4 border-b border-dark-border">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/60 mb-1.5">
        {label}{required && <span className="text-gold ms-1">*</span>}
      </label>
      {children}
    </div>
  )
}
