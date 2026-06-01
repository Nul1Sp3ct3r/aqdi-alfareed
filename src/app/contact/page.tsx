'use client'

import { useState } from 'react'
import { MessageCircle, Instagram, Mail, Clock, MapPin, Send, CheckCircle } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import { useLanguage } from '@/context/LanguageContext'
import { siteConfig } from '@/lib/config'

export default function ContactPage() {
  const { t, lang, isRTL } = useLanguage()
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSent, setIsSent] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const set = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }))

  // CONNECT: Wire to email service (Resend, EmailJS, Firebase Functions, etc.)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    await new Promise(r => setTimeout(r, 1200))
    setIsSent(true)
    setIsSending(false)
  }

  const contactChannels = [
    {
      icon: MessageCircle,
      title: t.contact.whatsapp,
      text: t.contact.whatsappText,
      action: t.contact.whatsappButton,
      href: siteConfig.whatsappUrl,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20 hover:border-emerald-500/40',
    },
    {
      icon: Instagram,
      title: t.contact.instagram,
      text: t.contact.instagramText,
      action: t.contact.instagramButton,
      href: siteConfig.instagramUrl,
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/20 hover:border-pink-500/40',
    },
    {
      icon: Mail,
      title: t.contact.email,
      text: t.contact.emailText,
      action: siteConfig.contactEmail,
      href: `mailto:${siteConfig.contactEmail}`,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20 hover:border-blue-500/40',
    },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-deeper pt-20">
        {/* Hero */}
        <div className="bg-dark border-b border-dark-border py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-gold/50" />
              <span className="text-xs tracking-[0.4em] text-gold/70 uppercase">{t.contact.title}</span>
              <div className="h-px w-8 bg-gold/50" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif text-white mb-3">{t.contact.title}</h1>
            <div className="h-0.5 w-12 bg-gradient-gold rounded-full mx-auto mb-4" />
            <p className="text-white/50 max-w-xl mx-auto">{t.contact.subtitle}</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          {/* Contact Channels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {contactChannels.map(({ icon: Icon, title, text, action, href, color, bgColor, borderColor }) => (
              <a
                key={title}
                href={href}
                className={`block p-6 bg-dark-card rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${borderColor}`}
              >
                <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center mb-4`}>
                  <Icon size={22} className={color} />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-white/50 mb-4 leading-relaxed">{text}</p>
                <span className={`text-sm font-medium ${color}`}>{action}</span>
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="p-6 md:p-8 bg-dark-card rounded-2xl border border-dark-border">
              <h2 className="text-xl font-serif text-white mb-6">{t.contact.form.title}</h2>

              {isSent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle size={30} className="text-emerald-400" />
                  </div>
                  <p className="text-white/70 text-sm">{t.contact.form.success}</p>
                  <button
                    onClick={() => { setIsSent(false); setFormData({ name: '', email: '', subject: '', message: '' }) }}
                    className="text-gold text-sm hover:text-gold-light transition-colors"
                  >
                    {lang === 'ar' ? 'إرسال رسالة أخرى' : 'Send another message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1.5">{t.contact.form.name} *</label>
                    <input
                      type="text" required value={formData.name}
                      onChange={e => set('name', e.target.value)}
                      placeholder={t.contact.form.namePlaceholder}
                      className="input-luxury"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1.5">{t.contact.form.email} *</label>
                    <input
                      type="email" required value={formData.email}
                      onChange={e => set('email', e.target.value)}
                      placeholder={t.contact.form.emailPlaceholder}
                      className="input-luxury" dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1.5">{t.contact.form.subject}</label>
                    <input
                      type="text" value={formData.subject}
                      onChange={e => set('subject', e.target.value)}
                      placeholder={t.contact.form.subjectPlaceholder}
                      className="input-luxury"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-1.5">{t.contact.form.message} *</label>
                    <textarea
                      required rows={5} value={formData.message}
                      onChange={e => set('message', e.target.value)}
                      placeholder={t.contact.form.messagePlaceholder}
                      className="input-luxury resize-none"
                    />
                  </div>
                  <Button
                    type="submit" variant="gold" fullWidth size="lg"
                    disabled={isSending} className="gap-2"
                  >
                    <Send size={16} />
                    {isSending ? (lang === 'ar' ? 'جاري الإرسال...' : 'Sending...') : t.contact.form.send}
                  </Button>
                </form>
              )}
            </div>

            {/* Info Cards */}
            <div className="space-y-5">
              {[
                { icon: Clock, title: t.contact.workingHours, text: t.contact.workingHoursText },
                { icon: MapPin, title: t.contact.location, text: t.contact.locationText },
                { icon: MessageCircle, title: lang === 'ar' ? 'الطلب عبر واتساب' : 'WhatsApp Orders', text: lang === 'ar' ? 'يمكنك إتمام طلبك مباشرة عبر واتساب وسنساعدك في اختيار أفضل المجوهرات المناسبة لك.' : 'You can complete your order directly via WhatsApp and we will help you choose the best jewelry for you.' },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4 p-5 bg-dark-card rounded-2xl border border-dark-border">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">{title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{text}</p>
                  </div>
                </div>
              ))}

              {/* FAQ shortcut */}
              <div className="p-5 bg-dark rounded-2xl border border-gold/15">
                <h3 className="font-medium text-gold mb-2">
                  {lang === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
                </h3>
                <ul className="space-y-2">
                  {[
                    lang === 'ar' ? 'هل المجوهرات أصلية ومضمونة؟' : 'Is the jewelry authentic and guaranteed?',
                    lang === 'ar' ? 'ما هي مناطق التوصيل؟' : 'What are the delivery areas?',
                    lang === 'ar' ? 'هل يمكن تخصيص المجوهرات؟' : 'Can jewelry be customized?',
                  ].map(q => (
                    <li key={q} className="text-sm text-white/50 flex items-start gap-2">
                      <span className="text-gold mt-0.5">•</span>{q}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
