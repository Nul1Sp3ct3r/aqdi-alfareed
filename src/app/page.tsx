import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSlider from '@/components/home/HeroSlider'
import LatestProducts from '@/components/home/LatestProducts'
import CategoryCircles from '@/components/home/CategoryCircles'
import CollectionBanner from '@/components/home/CollectionBanner'
import BestSellers from '@/components/home/BestSellers'
import TipsSection from '@/components/home/TipsSection'
import InstagramGallery from '@/components/home/InstagramGallery'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSlider />
        <LatestProducts />
        <CategoryCircles />
        <CollectionBanner />
        <BestSellers />
        <TipsSection />
        <InstagramGallery />
      </main>
      <Footer />
    </>
  )
}
