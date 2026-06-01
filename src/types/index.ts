export type Language = 'ar' | 'en'
export type Direction = 'rtl' | 'ltr'
export type Material = 'silver' | 'gold'
export type CategoryId = 'necklaces' | 'earrings' | 'rings' | 'bracelets' | 'giftSets'
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface LocalizedString {
  ar: string
  en: string
}

// CONNECT: Replace this interface with your Firestore/Supabase schema
export interface Product {
  id: string
  name: LocalizedString
  description: LocalizedString
  shortDescription: LocalizedString
  price: number
  originalPrice?: number
  material: Material
  category: CategoryId
  images: string[]
  isNew: boolean
  isBestSeller: boolean
  inStock: boolean
  stockCount?: number
  sku: string
  weight?: string
  sizes?: string[]
  careInstructions?: LocalizedString
  tags: string[]
  rating?: number
  reviewCount?: number
}

export interface CartItem {
  product: Product
  quantity: number
  selectedSize?: string
}

export interface CategoryInfo {
  id: CategoryId
  name: LocalizedString
  description: LocalizedString
  image: string
  count: number
  icon: string
}

export interface Testimonial {
  id: string
  name: string
  location: LocalizedString
  rating: number
  comment: LocalizedString
  date: string
  avatar?: string
}

// CONNECT: Replace with your order schema from backend
export interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  items: CartItem[]
  subtotal: number
  shippingCost: number
  total: number
  status: OrderStatus
  date: string
  address: ShippingAddress
  paymentMethod: string
}

export interface ShippingAddress {
  fullName: string
  phone: string
  city: string
  district: string
  street: string
  building?: string
  postalCode?: string
  country: string
}

export interface AdminStats {
  totalSales: number
  totalOrders: number
  totalProducts: number
  totalCustomers: number
  salesGrowth: number
  ordersGrowth: number
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  orders: number
  totalSpent: number
  joinDate: string
}
