'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'

const categoriesList = [
  {
    id: 'gold',
    nameAr: 'الذهب',
    nameEn: 'Gold',
    image: '/images/products/laurel-necklace.jpg',
    href: '/shop?material=gold',
  },
  {
    id: 'silver',
    nameAr: 'الفضة',
    nameEn: 'Silver',
    image: '/images/products/layered-necklace.jpg',
    href: '/shop?material=silver',
  },
  {
    id: 'necklaces',
    nameAr: 'القلائد',
    nameEn: 'Necklaces',
    image: '/images/products/crescent-necklace.jpg',
    href: '/shop?category=necklaces',
  },
  {
    id: 'earrings',
    nameAr: 'الحلقان',
    nameEn: 'Earrings',
    image: '/images/products/green-stone-earring.jpg',
    href: '/shop?category=earrings',
  },
  {
    id: 'rings',
    nameAr: 'الخواتم',
    nameEn: 'Rings',
    image: '/images/products/leaf-necklace.jpg',
    href: '/shop',
  },
  {
    id: 'gifts',
    nameAr: 'الهدايا والمناسبات',
    nameEn: 'Gift Sets',
    image: '/images/products/flower-necklace.jpg',
    href: '/shop',
  },
]

export default function CategoryCircles() {
  const { isRTL } = useLanguage()

  return (
    <section className="section-y bg-[#FAFAF8]">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="label-luxury block mb-3">
            {isRTL ? 'تسوق حسب الفئة' : 'Shop by Category'}
          </span>
          <h2 className={`text-[1.85rem] md:text-[2.2rem] font-bold text-ink leading-tight ${isRTL ? 'display-arabic' : 'display-serif'}`}>
            {isRTL ? 'مجموعات حصرية' : 'Exclusive Collections'}
          </h2>
          <div className="h-[2px] w-10 bg-gold mx-auto mt-4 opacity-70" />
        </div>

        {/* Circle grid */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {categoriesList.map(cat => (
            <Link
              key={cat.id}
              href={cat.href}
              className="flex flex-col items-center gap-3.5 group w-[88px] md:w-[104px]"
            >
              {/* Circle */}
              <div
                className="w-[88px] h-[88px] md:w-[104px] md:h-[104px] rounded-full overflow-hidden border-2 border-[#E8E2D6] group-hover:border-gold transition-all duration-300 shadow-sm group-hover:shadow-gold-sm"
                style={{ transition: 'border-color 0.3s, box-shadow 0.3s' }}
              >
                <div className="relative w-full h-full bg-[#080808]">
                  <Image
                    src={cat.image}
                    alt={isRTL ? cat.nameAr : cat.nameEn}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="112px"
                  />
                </div>
              </div>

              {/* Label */}
              <span className="text-xs text-ink-mid text-center font-semibold group-hover:text-gold transition-colors leading-tight tracking-wide">
                {isRTL ? cat.nameAr : cat.nameEn}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
