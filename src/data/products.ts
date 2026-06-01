import { Product, CategoryInfo, Testimonial, AdminStats, Customer, Order } from '@/types'

// CONNECT: Replace this mock data with real API calls to Firebase/Supabase
// Example: const products = await supabase.from('products').select('*')

export const products: Product[] = [
  {
    id: '1',
    name: { ar: 'عقد الياسمين الفضي', en: 'Silver Jasmine Necklace' },
    description: {
      ar: 'عقد أنيق مصنوع من الفضة الخالصة 925 مع تصميم زهرة الياسمين الرقيق. يتميز بسلسلة ناعمة وقلادة مرصعة بتفاصيل دقيقة تعكس الجمال الطبيعي. مثالي للهدايا والمناسبات الخاصة.',
      en: 'An elegant necklace crafted from 925 sterling silver with a delicate jasmine flower design. Features a fine chain and a pendant with intricate details reflecting natural beauty. Perfect for gifts and special occasions.'
    },
    shortDescription: {
      ar: 'عقد فضي بتصميم زهرة الياسمين الأنيق',
      en: 'Elegant silver necklace with jasmine flower design'
    },
    price: 285,
    material: 'silver',
    category: 'necklaces',
    images: [
      'https://placehold.co/600x600/1a1a1a/d4af37',
      'https://placehold.co/600x600/111111/c0c0c0',
      'https://placehold.co/600x600/0d0d0d/d4af37',
    ],
    isNew: true,
    isBestSeller: false,
    inStock: true,
    stockCount: 15,
    sku: 'NK-SLV-001',
    weight: '8g',
    careInstructions: {
      ar: 'احتفظي بالمجوهرات في كيس ناعم بعيداً عن الرطوبة. نظفيها بقطعة قماش ناعمة.',
      en: 'Store in a soft pouch away from moisture. Clean with a soft cloth.'
    },
    tags: ['jasmine', 'elegant', 'gift', 'silver'],
    rating: 4.8,
    reviewCount: 124
  },
  {
    id: '2',
    name: { ar: 'عقد القمر الذهبي', en: 'Gold Moon Necklace' },
    description: {
      ar: 'عقد ذهبي فاخر مستوحى من جمال القمر، مصنوع من الذهب 18 قيراط. يتميز بقلادة هلال ذهبي لامع مع لمسات نجمة صغيرة. قطعة راقية تضيف لمسة من الفخامة.',
      en: 'A luxurious gold necklace inspired by the beauty of the moon, crafted in 18K gold. Features a shining gold crescent pendant with tiny star accents. An exquisite piece that adds a touch of luxury.'
    },
    shortDescription: {
      ar: 'عقد ذهبي مستوحى من جمال القمر والنجوم',
      en: 'Gold necklace inspired by the moon and stars'
    },
    price: 680,
    originalPrice: 820,
    material: 'gold',
    category: 'necklaces',
    images: [
      'https://placehold.co/600x600/1a1a1a/d4af37',
      'https://placehold.co/600x600/0d0d0d/e8c94d',
    ],
    isNew: false,
    isBestSeller: true,
    inStock: true,
    stockCount: 8,
    sku: 'NK-GLD-002',
    weight: '12g',
    careInstructions: {
      ar: 'تجنبي ملامسة العطور والمواد الكيميائية. نظفيها بمحلول تنظيف خاص بالذهب.',
      en: 'Avoid contact with perfumes and chemicals. Clean with gold-specific cleaning solution.'
    },
    tags: ['moon', 'luxury', 'gold', 'bestseller'],
    rating: 4.9,
    reviewCount: 203
  },
  {
    id: '3',
    name: { ar: 'أقراط الورد الذهبية', en: 'Gold Rose Earrings' },
    description: {
      ar: 'أقراط ذهبية على شكل وردة بأوراق دقيقة مصنوعة بحرفية عالية من الذهب 18 قيراط. تتميز بتصميم ثلاثي الأبعاد يجعلها تتألق في أي مناسبة.',
      en: 'Gold earrings in the shape of a rose with delicate petals crafted with high artistry in 18K gold. Features a 3D design that makes them sparkle on any occasion.'
    },
    shortDescription: {
      ar: 'أقراط ذهبية بتصميم الوردة الأنيق',
      en: 'Gold earrings with elegant rose design'
    },
    price: 450,
    material: 'gold',
    category: 'earrings',
    images: [
      'https://placehold.co/600x600/1a1a1a/d4af37',
      'https://placehold.co/600x600/111111/e8c94d',
    ],
    isNew: true,
    isBestSeller: true,
    inStock: true,
    stockCount: 20,
    sku: 'ER-GLD-003',
    weight: '6g',
    careInstructions: {
      ar: 'احتفظي بالأقراط في صندوق المجوهرات. تجنبي النوم وهي عليك.',
      en: 'Store earrings in a jewelry box. Avoid sleeping while wearing them.'
    },
    tags: ['rose', 'elegant', 'gold', 'new'],
    rating: 4.7,
    reviewCount: 89
  },
  {
    id: '4',
    name: { ar: 'أقراط الهلال الفضية', en: 'Silver Crescent Earrings' },
    description: {
      ar: 'أقراط هلال فضية بتصميم إسلامي أنيق مصنوعة من الفضة 925. قطعة فاخرة تجمع بين الأصالة والحداثة، مثالية للاستخدام اليومي والمناسبات.',
      en: 'Silver crescent earrings with an elegant Islamic design crafted from 925 silver. A luxurious piece combining authenticity and modernity, perfect for daily wear and occasions.'
    },
    shortDescription: {
      ar: 'أقراط فضية بتصميم الهلال الأنيق',
      en: 'Silver earrings with elegant crescent design'
    },
    price: 195,
    material: 'silver',
    category: 'earrings',
    images: [
      'https://placehold.co/600x600/1a1a1a/c0c0c0',
      'https://placehold.co/600x600/0d0d0d/e0e0e0',
    ],
    isNew: false,
    isBestSeller: false,
    inStock: true,
    stockCount: 30,
    sku: 'ER-SLV-004',
    weight: '4g',
    tags: ['crescent', 'silver', 'daily', 'islamic'],
    rating: 4.6,
    reviewCount: 67
  },
  {
    id: '5',
    name: { ar: 'خاتم الألماس الذهبي', en: 'Gold Diamond Ring' },
    description: {
      ar: 'خاتم ذهبي فاخر مرصع بحجر ألماس طبيعي لامع، مصنوع من الذهب 18 قيراط. تصميم كلاسيكي خالد يناسب الخطوبة والزواج وكل المناسبات الخاصة.',
      en: 'A luxurious gold ring set with a natural sparkling diamond, crafted in 18K gold. A timeless classic design suitable for engagements, weddings, and all special occasions.'
    },
    shortDescription: {
      ar: 'خاتم ذهبي فاخر مرصع بالألماس الطبيعي',
      en: 'Luxurious gold ring set with natural diamond'
    },
    price: 1250,
    material: 'gold',
    category: 'rings',
    images: [
      'https://placehold.co/600x600/1a1a1a/d4af37',
      'https://placehold.co/600x600/111111/f0dc82',
    ],
    isNew: false,
    isBestSeller: true,
    inStock: true,
    stockCount: 5,
    sku: 'RG-GLD-005',
    weight: '5g',
    sizes: ['5', '6', '7', '8', '9'],
    careInstructions: {
      ar: 'نظفي الخاتم بفرشاة ناعمة وصابون خفيف. احتفظي به بعيداً عن المواد الكيميائية.',
      en: 'Clean the ring with a soft brush and mild soap. Keep away from chemicals.'
    },
    tags: ['diamond', 'luxury', 'engagement', 'gold'],
    rating: 5.0,
    reviewCount: 312
  },
  {
    id: '6',
    name: { ar: 'خاتم اللانهاية الفضي', en: 'Silver Infinity Ring' },
    description: {
      ar: 'خاتم فضي بتصميم رمز اللانهاية الجميل، مصنوع من الفضة 925. يرمز إلى الحب الأبدي والصداقة الدائمة. تصميم عصري أنيق للاستخدام اليومي.',
      en: 'A silver ring with a beautiful infinity symbol design, crafted from 925 silver. Symbolizes eternal love and lasting friendship. A modern elegant design for daily wear.'
    },
    shortDescription: {
      ar: 'خاتم فضي بتصميم رمز اللانهاية',
      en: 'Silver ring with infinity symbol design'
    },
    price: 165,
    material: 'silver',
    category: 'rings',
    images: [
      'https://placehold.co/600x600/1a1a1a/c0c0c0',
      'https://placehold.co/600x600/111111/e0e0e0',
    ],
    isNew: true,
    isBestSeller: false,
    inStock: true,
    stockCount: 25,
    sku: 'RG-SLV-006',
    weight: '3g',
    sizes: ['5', '6', '7', '8', '9'],
    tags: ['infinity', 'silver', 'love', 'daily'],
    rating: 4.5,
    reviewCount: 45
  },
  {
    id: '7',
    name: { ar: 'سوار السلسلة الذهبية', en: 'Gold Chain Bracelet' },
    description: {
      ar: 'سوار ذهبي أنيق بتصميم سلسلة كلاسيكية مصنوع من الذهب 18 قيراط. يتميز بإبزيم محكم وبريق ذهبي فاخر يكمل أي إطلالة. مثالي للمناسبات والاستخدام اليومي.',
      en: 'An elegant gold bracelet with a classic chain design crafted in 18K gold. Features a secure clasp and a luxurious gold shimmer that complements any look. Perfect for occasions and daily wear.'
    },
    shortDescription: {
      ar: 'سوار ذهبي بتصميم سلسلة كلاسيكية أنيقة',
      en: 'Gold bracelet with classic elegant chain design'
    },
    price: 520,
    material: 'gold',
    category: 'bracelets',
    images: [
      'https://placehold.co/600x600/1a1a1a/d4af37',
      'https://placehold.co/600x600/0d0d0d/e8c94d',
    ],
    isNew: false,
    isBestSeller: true,
    inStock: true,
    stockCount: 12,
    sku: 'BR-GLD-007',
    weight: '10g',
    tags: ['chain', 'gold', 'classic', 'bestseller'],
    rating: 4.8,
    reviewCount: 156
  },
  {
    id: '8',
    name: { ar: 'سوار الحظ الفضي', en: 'Silver Lucky Charm Bracelet' },
    description: {
      ar: 'سوار فضي مميز مزين بقلادات حظ صغيرة تحمل معاني جميلة، مصنوع من الفضة 925. تصميم بوهيمي أنيق يضيف لمسة مميزة لأي إطلالة. هدية رائعة للأحبة.',
      en: 'A distinctive silver bracelet adorned with small lucky charms carrying beautiful meanings, crafted from 925 silver. An elegant bohemian design that adds a distinctive touch to any look. A wonderful gift for loved ones.'
    },
    shortDescription: {
      ar: 'سوار فضي مزين بقلادات الحظ الجميلة',
      en: 'Silver bracelet adorned with beautiful lucky charms'
    },
    price: 220,
    originalPrice: 280,
    material: 'silver',
    category: 'bracelets',
    images: [
      'https://placehold.co/600x600/1a1a1a/c0c0c0',
      'https://placehold.co/600x600/111111/e0e0e0',
    ],
    isNew: false,
    isBestSeller: false,
    inStock: true,
    stockCount: 18,
    sku: 'BR-SLV-008',
    weight: '7g',
    tags: ['charm', 'silver', 'lucky', 'gift'],
    rating: 4.4,
    reviewCount: 78
  },
  {
    id: '9',
    name: { ar: 'عقد النجمة الفضية', en: 'Silver Star Necklace' },
    description: {
      ar: 'عقد فضي رقيق بقلادة نجمة لامعة مصنوع من الفضة 925. تصميم بسيط وأنيق يناسب كل المناسبات والأوقات. يمكن ارتداؤه منفرداً أو مع قلادات أخرى.',
      en: 'A delicate silver necklace with a shining star pendant crafted from 925 silver. A simple and elegant design suitable for all occasions and times. Can be worn alone or layered with other necklaces.'
    },
    shortDescription: {
      ar: 'عقد فضي رقيق بقلادة نجمة لامعة',
      en: 'Delicate silver necklace with shining star pendant'
    },
    price: 175,
    material: 'silver',
    category: 'necklaces',
    images: [
      'https://placehold.co/600x600/1a1a1a/c0c0c0',
      'https://placehold.co/600x600/0d0d0d/e0e0e0',
    ],
    isNew: false,
    isBestSeller: false,
    inStock: true,
    stockCount: 22,
    sku: 'NK-SLV-009',
    weight: '5g',
    tags: ['star', 'silver', 'delicate', 'layering'],
    rating: 4.5,
    reviewCount: 91
  },
  {
    id: '10',
    name: { ar: 'أقراط الحلقة الذهبية', en: 'Gold Hoop Earrings' },
    description: {
      ar: 'أقراط حلقة ذهبية كلاسيكية بقطر متوسط، مصنوعة من الذهب 18 قيراط بسطح أملس لامع. تصميم خالد يناسب كل الأذواق والمناسبات.',
      en: 'Classic medium-diameter gold hoop earrings crafted in 18K gold with a smooth shining surface. A timeless design that suits all tastes and occasions.'
    },
    shortDescription: {
      ar: 'أقراط حلقة ذهبية كلاسيكية لامعة',
      en: 'Classic shining gold hoop earrings'
    },
    price: 380,
    material: 'gold',
    category: 'earrings',
    images: [
      'https://placehold.co/600x600/1a1a1a/d4af37',
      'https://placehold.co/600x600/111111/e8c94d',
    ],
    isNew: false,
    isBestSeller: true,
    inStock: true,
    stockCount: 35,
    sku: 'ER-GLD-010',
    weight: '8g',
    tags: ['hoop', 'gold', 'classic', 'everyday'],
    rating: 4.9,
    reviewCount: 187
  },
  {
    id: '11',
    name: { ar: 'سوار التنس الذهبي', en: 'Gold Tennis Bracelet' },
    description: {
      ar: 'سوار تنس ذهبي فاخر مرصع بأحجار كريمة شفافة، مصنوع من الذهب 18 قيراط. يتميز بتصميم كلاسيكي راقٍ يجعله قطعة استثمارية رائعة.',
      en: 'A luxurious gold tennis bracelet set with transparent gemstones, crafted in 18K gold. Features a refined classic design making it a wonderful investment piece.'
    },
    shortDescription: {
      ar: 'سوار تنس ذهبي فاخر مرصع بالأحجار الكريمة',
      en: 'Luxurious gold tennis bracelet set with gemstones'
    },
    price: 890,
    material: 'gold',
    category: 'bracelets',
    images: [
      'https://placehold.co/600x600/1a1a1a/d4af37',
      'https://placehold.co/600x600/0d0d0d/f0dc82',
    ],
    isNew: true,
    isBestSeller: false,
    inStock: true,
    stockCount: 6,
    sku: 'BR-GLD-011',
    weight: '15g',
    tags: ['tennis', 'gold', 'luxury', 'gemstone'],
    rating: 4.9,
    reviewCount: 43
  },
  {
    id: '12',
    name: { ar: 'طقم هدايا الأناقة الذهبي', en: 'Gold Elegance Gift Set' },
    description: {
      ar: 'طقم هدايا ذهبي فاخر يتضمن عقداً وأقراطاً وسواراً مصنوعة من الذهب 18 قيراط. يأتي في صندوق هدايا فاخر مع شهادة ضمان. الهدية المثالية للمناسبات الخاصة والأعياد.',
      en: 'A luxurious gold gift set including a necklace, earrings, and bracelet crafted in 18K gold. Comes in a luxurious gift box with a warranty certificate. The perfect gift for special occasions and celebrations.'
    },
    shortDescription: {
      ar: 'طقم هدايا ذهبي فاخر: عقد وأقراط وسوار',
      en: 'Luxurious gold gift set: necklace, earrings & bracelet'
    },
    price: 1480,
    originalPrice: 1750,
    material: 'gold',
    category: 'giftSets',
    images: [
      'https://placehold.co/600x600/0d0d0d/d4af37',
      'https://placehold.co/600x600/1a1a1a/e8c94d',
    ],
    isNew: false,
    isBestSeller: true,
    inStock: true,
    stockCount: 10,
    sku: 'GS-GLD-012',
    weight: '30g',
    tags: ['gift', 'set', 'gold', 'luxury', 'occasion'],
    rating: 5.0,
    reviewCount: 267
  },
  {
    id: '13',
    name: { ar: 'طقم الأناقة الفضي', en: 'Silver Elegance Gift Set' },
    description: {
      ar: 'طقم هدايا فضي راقٍ يتضمن عقداً وأقراطاً وخاتماً مصنوعة من الفضة 925. تصميم متناسق وأنيق يأتي في صندوق هدايا مميز. مثالي للأعياد والمناسبات الخاصة.',
      en: 'A refined silver gift set including a necklace, earrings, and ring crafted from 925 silver. A harmonious and elegant design that comes in a distinctive gift box. Perfect for birthdays and special occasions.'
    },
    shortDescription: {
      ar: 'طقم هدايا فضي راقٍ: عقد وأقراط وخاتم',
      en: 'Refined silver gift set: necklace, earrings & ring'
    },
    price: 620,
    material: 'silver',
    category: 'giftSets',
    images: [
      'https://placehold.co/600x600/1a1a1a/c0c0c0',
      'https://placehold.co/600x600/0d0d0d/e0e0e0',
    ],
    isNew: true,
    isBestSeller: false,
    inStock: true,
    stockCount: 14,
    sku: 'GS-SLV-013',
    weight: '20g',
    tags: ['gift', 'set', 'silver', 'occasion'],
    rating: 4.7,
    reviewCount: 134
  },
  {
    id: '14',
    name: { ar: 'خاتم الوردة الذهبية', en: 'Gold Rose Ring' },
    description: {
      ar: 'خاتم ذهبي بتصميم وردة ثلاثية الأبعاد مرصعة بتفاصيل دقيقة، مصنوع من الذهب 18 قيراط. قطعة فنية رائعة تجمع بين الجمال والرقي.',
      en: 'A gold ring with a 3D rose design adorned with intricate details, crafted in 18K gold. A wonderful artistic piece combining beauty and sophistication.'
    },
    shortDescription: {
      ar: 'خاتم ذهبي بتصميم وردة ثلاثية الأبعاد',
      en: 'Gold ring with beautiful 3D rose design'
    },
    price: 750,
    material: 'gold',
    category: 'rings',
    images: [
      'https://placehold.co/600x600/1a1a1a/d4af37',
      'https://placehold.co/600x600/111111/e8c94d',
    ],
    isNew: true,
    isBestSeller: false,
    inStock: true,
    stockCount: 9,
    sku: 'RG-GLD-014',
    weight: '6g',
    sizes: ['5', '6', '7', '8'],
    tags: ['rose', 'gold', 'artistic', 'new'],
    rating: 4.8,
    reviewCount: 56
  },
  {
    id: '15',
    name: { ar: 'عقد الملكي الذهبي', en: 'Royal Gold Necklace' },
    description: {
      ar: 'عقد ذهبي ملكي فاخر بتصميم كلاسيكي راقٍ مرصع بأحجار كريمة، مصنوع من الذهب 18 قيراط. قطعة أيقونية تعبر عن الفخامة والأناقة الحقيقية.',
      en: 'A luxurious royal gold necklace with an exquisite classic design set with gemstones, crafted in 18K gold. An iconic piece expressing true luxury and elegance.'
    },
    shortDescription: {
      ar: 'عقد ذهبي ملكي فاخر بأحجار كريمة',
      en: 'Luxurious royal gold necklace with gemstones'
    },
    price: 1100,
    material: 'gold',
    category: 'necklaces',
    images: [
      'https://placehold.co/600x600/0d0d0d/d4af37',
      'https://placehold.co/600x600/1a1a1a/f0dc82',
    ],
    isNew: false,
    isBestSeller: true,
    inStock: true,
    stockCount: 7,
    sku: 'NK-GLD-015',
    weight: '18g',
    careInstructions: {
      ar: 'احتفظي بالعقد في كيس مبطن. تجنبي ملامسة العطور والمواد الكيميائية.',
      en: 'Store in a padded pouch. Avoid contact with perfumes and chemicals.'
    },
    tags: ['royal', 'gold', 'luxury', 'gemstone', 'bestseller'],
    rating: 5.0,
    reviewCount: 198
  },
]

export const categories: CategoryInfo[] = [
  {
    id: 'necklaces',
    name: { ar: 'العقود', en: 'Necklaces' },
    description: { ar: 'تشكيلة فاخرة من العقود الذهبية والفضية', en: 'Luxury collection of gold and silver necklaces' },
    image: 'https://placehold.co/400x500/111111/d4af37',
    count: products.filter(p => p.category === 'necklaces').length,
    icon: '📿',
  },
  {
    id: 'earrings',
    name: { ar: 'الأقراط', en: 'Earrings' },
    description: { ar: 'أقراط أنيقة لكل مناسبة', en: 'Elegant earrings for every occasion' },
    image: 'https://placehold.co/400x500/111111/c0c0c0',
    count: products.filter(p => p.category === 'earrings').length,
    icon: '✨',
  },
  {
    id: 'rings',
    name: { ar: 'الخواتم', en: 'Rings' },
    description: { ar: 'خواتم فاخرة بتصاميم استثنائية', en: 'Luxury rings with exceptional designs' },
    image: 'https://placehold.co/400x500/111111/d4af37',
    count: products.filter(p => p.category === 'rings').length,
    icon: '💍',
  },
  {
    id: 'bracelets',
    name: { ar: 'الأساور', en: 'Bracelets' },
    description: { ar: 'أساور رائعة تزين معصمك', en: 'Beautiful bracelets to adorn your wrist' },
    image: 'https://placehold.co/400x500/111111/c0c0c0',
    count: products.filter(p => p.category === 'bracelets').length,
    icon: '⚜️',
  },
  {
    id: 'giftSets',
    name: { ar: 'أطقم الهدايا', en: 'Gift Sets' },
    description: { ar: 'أطقم هدايا فاخرة للمناسبات الخاصة', en: 'Luxury gift sets for special occasions' },
    image: 'https://placehold.co/400x500/0d0d0d/d4af37',
    count: products.filter(p => p.category === 'giftSets').length,
    icon: '🎁',
  },
]

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'نورة الأحمدي',
    location: { ar: 'الرياض، السعودية', en: 'Riyadh, Saudi Arabia' },
    rating: 5,
    comment: {
      ar: 'جودة استثنائية وتغليف فاخر جداً. العقد أجمل مما توقعت وبلغ من الأناقة ما يفوق الوصف. خدمة العملاء ممتازة وسرعة التوصيل رائعة.',
      en: 'Exceptional quality and very luxurious packaging. The necklace is more beautiful than I expected and its elegance is beyond description. Excellent customer service and wonderful delivery speed.'
    },
    date: '2024-03-15',
  },
  {
    id: '2',
    name: 'فاطمة المطيري',
    location: { ar: 'جدة، السعودية', en: 'Jeddah, Saudi Arabia' },
    rating: 5,
    comment: {
      ar: 'اشتريت طقم الهدايا الذهبي لأختي في عيد ميلادها وكانت سعادتها لا توصف. المجوهرات فاخرة جداً وتستحق كل ريال. سأتسوق منكم دائماً.',
      en: 'I bought the gold gift set for my sister\'s birthday and her happiness was indescribable. The jewelry is very luxurious and worth every riyal. I will always shop from you.'
    },
    date: '2024-02-20',
  },
  {
    id: '3',
    name: 'ريم الزهراني',
    location: { ar: 'الدمام، السعودية', en: 'Dammam, Saudi Arabia' },
    rating: 5,
    comment: {
      ar: 'عقدي الفريد يستحق اسمه تماماً! كل قطعة فريدة بحد ذاتها. أسلوب التصميم راقٍ جداً والجودة عالية. أنصح الجميع بالتسوق من هنا.',
      en: 'Aqdi Alfareed fully deserves its name! Every piece is unique in itself. The design style is very refined and the quality is high. I recommend everyone to shop here.'
    },
    date: '2024-01-10',
  },
]

// CONNECT: Replace with real admin stats from your backend
export const adminStats: AdminStats = {
  totalSales: 148500,
  totalOrders: 324,
  totalProducts: products.length,
  totalCustomers: 187,
  salesGrowth: 24.5,
  ordersGrowth: 18.2,
}

// CONNECT: Replace with real customer data from your database
export const mockCustomers: Customer[] = [
  { id: 'C001', name: 'نورة الأحمدي', email: 'noura@example.com', phone: '+966 50 123 4567', orders: 5, totalSpent: 3200, joinDate: '2024-01-15' },
  { id: 'C002', name: 'فاطمة المطيري', email: 'fatima@example.com', phone: '+966 55 987 6543', orders: 3, totalSpent: 2100, joinDate: '2024-02-10' },
  { id: 'C003', name: 'ريم الزهراني', email: 'reem@example.com', phone: '+966 50 456 7890', orders: 7, totalSpent: 5800, joinDate: '2023-12-01' },
  { id: 'C004', name: 'سارة القحطاني', email: 'sara@example.com', phone: '+966 54 321 0987', orders: 2, totalSpent: 1500, joinDate: '2024-03-05' },
]

// CONNECT: Replace with real orders from your database
export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'نورة الأحمدي',
    customerEmail: 'noura@example.com',
    customerPhone: '+966 50 123 4567',
    items: [{ product: products[0], quantity: 1 }],
    subtotal: 285,
    shippingCost: 0,
    total: 285,
    status: 'delivered',
    date: '2024-03-15',
    address: { fullName: 'نورة الأحمدي', phone: '+966 50 123 4567', city: 'الرياض', district: 'العليا', street: 'شارع العليا', country: 'السعودية' },
    paymentMethod: 'credit_card',
  },
  {
    id: 'ORD-002',
    customerName: 'فاطمة المطيري',
    customerEmail: 'fatima@example.com',
    customerPhone: '+966 55 987 6543',
    items: [{ product: products[11], quantity: 1 }],
    subtotal: 1480,
    shippingCost: 0,
    total: 1480,
    status: 'shipped',
    date: '2024-03-20',
    address: { fullName: 'فاطمة المطيري', phone: '+966 55 987 6543', city: 'جدة', district: 'الروضة', street: 'شارع الأمير محمد', country: 'السعودية' },
    paymentMethod: 'mada',
  },
  {
    id: 'ORD-003',
    customerName: 'ريم الزهراني',
    customerEmail: 'reem@example.com',
    customerPhone: '+966 50 456 7890',
    items: [{ product: products[4], quantity: 1 }, { product: products[2], quantity: 1 }],
    subtotal: 1700,
    shippingCost: 0,
    total: 1700,
    status: 'processing',
    date: '2024-03-22',
    address: { fullName: 'ريم الزهراني', phone: '+966 50 456 7890', city: 'الدمام', district: 'الشاطئ', street: 'شارع الملك فهد', country: 'السعودية' },
    paymentMethod: 'apple_pay',
  },
]

export const getBestSellers = () => products.filter(p => p.isBestSeller)
export const getNewArrivals = () => products.filter(p => p.isNew)
export const getProductById = (id: string) => products.find(p => p.id === id)
export const getProductsByCategory = (category: string) => products.filter(p => p.category === category)
export const getRelatedProducts = (product: Product, limit = 4) =>
  products.filter(p => p.category === product.category && p.id !== product.id).slice(0, limit)
