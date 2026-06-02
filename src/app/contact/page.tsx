'use client'
import { useState } from 'react'
import { MessageCircle, Instagram, Mail, Clock, MapPin, Send, CheckCircle } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useLanguage } from '@/context/LanguageContext'
import { siteConfig } from '@/lib/config'

export default function ContactPage() {
  const { t, lang, isRTL } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const set = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }))

  // CONNECT: Wire to email service (Resend, EmailJS, Firebase Functions)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSending(true)
    await new Promise(r => setTimeout(r, 1200))
    setSent(true); setSending(false)
  }

  const channels = [
    { icon: MessageCircle, title: t.contact.whatsapp, text: t.contact.whatsappText, action: t.contact.whatsappButton, href: siteConfig.whatsappUrl, cls: 'bg-[#25d366]/10 border-[#25d366]/25 hover:border-[#25d366]/50', iconCls: 'text-[#25d366] bg-[#25d366]/10' },
    { icon: Instagram,     title: t.contact.instagram, text: t.contact.instagramText, action: t.contact.instagramButton, href: siteConfig.instagramUrl, cls: 'bg-pink-50 border-pink-200 hover:border-pink-300', iconCls: 'text-pink-500 bg-pink-50' },
    { icon: Mail,          title: t.contact.email, text: t.contact.emailText, action: siteConfig.contactEmail, href: `mailto:${siteConfig.contactEmail}`, cls: 'bg-blue-50 border-blue-200 hover:border-blue-300', iconCls: 'text-blue-500 bg-blue-50' },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">
        <div className="bg-jet-deep py-16">
          <div className="container text-center">
            <span className="label-luxury block mb-4">{isRTL ? 'كيف يمكننا مساعدتك؟' : 'How can we help?'}</span>
            <h1 className={`text-white font-bold leading-tight mb-4 ${isRTL ? 'display-arabic text-4xl' : 'display-serif text-4xl'}`}>{t.contact.title}</h1>
            <div className="h-[2px] w-12 bg-gold mx-auto" />
          </div>
        </div>

        <div className="container section-y">
          {/* Channels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {channels.map(({ icon: Icon, title, text, action, href, cls, iconCls }) => (
              <a key={title} href={href} target="_blank" rel="noopener noreferrer"
                className={`block p-6 bg-white rounded-xl border transition-all hover:-translate-y-1 hover:shadow-card-hover ${cls}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${iconCls}`}>
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-ink mb-2">{title}</h3>
                <p className="text-sm text-ink-muted mb-4 leading-relaxed">{text}</p>
                <span className="text-sm font-medium text-gold">{action}</span>
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="p-7 bg-white rounded-xl border border-[#E8E2D6] shadow-card">
              <h2 className="display-serif text-xl text-ink mb-6">{t.contact.form.title}</h2>
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
                    <CheckCircle size={28} className="text-emerald-600" />
                  </div>
                  <p className="text-ink-muted text-sm">{t.contact.form.success}</p>
                  <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                    className="text-gold text-sm hover:text-[#D4AF37] transition-colors">
                    {lang === 'ar' ? 'إرسال رسالة أخرى' : 'Send another message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-ink-muted mb-1.5">{t.contact.form.name} *</label>
                    <input type="text" required value={form.name} onChange={e => set('name', e.target.value)} className="input-clean" placeholder={t.contact.form.namePlaceholder} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-muted mb-1.5">{t.contact.form.email} *</label>
                    <input type="email" required value={form.email} onChange={e => set('email', e.target.value)} className="input-clean" dir="ltr" placeholder={t.contact.form.emailPlaceholder} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-muted mb-1.5">{t.contact.form.subject}</label>
                    <input type="text" value={form.subject} onChange={e => set('subject', e.target.value)} className="input-clean" placeholder={t.contact.form.subjectPlaceholder} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ink-muted mb-1.5">{t.contact.form.message} *</label>
                    <textarea required rows={5} value={form.message} onChange={e => set('message', e.target.value)} className="input-clean resize-none" placeholder={t.contact.form.messagePlaceholder} />
                  </div>
                  <button type="submit" disabled={sending}
                    className="btn btn-gold w-full py-3.5 rounded tracking-wide text-sm gap-2"
                  >
                    <Send size={16} />
                    {sending ? (lang === 'ar' ? 'جاري الإرسال...' : 'Sending...') : t.contact.form.send}
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="space-y-4">
              {[
                { icon: Clock,  title: t.contact.workingHours, text: t.contact.workingHoursText },
                { icon: MapPin, title: t.contact.location,     text: t.contact.locationText },
                { icon: MessageCircle, title: lang === 'ar' ? 'الطلب عبر واتساب' : 'WhatsApp Orders', text: lang === 'ar' ? 'أتمّي طلبك مباشرة عبر واتساب وسنساعدك في اختيار أفضل المجوهرات المناسبة لك.' : 'Complete your order directly via WhatsApp and we will help you choose the best jewelry for you.' },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4 p-5 bg-white rounded-xl border border-[#E8E2D6] shadow-card">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-medium text-ink mb-1">{title}</h3>
                    <p className="text-sm text-ink-muted leading-relaxed">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
