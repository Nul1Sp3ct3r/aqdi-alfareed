import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import NewArrivals from '@/components/home/NewArrivals'
import FeaturedCategories from '@/components/home/FeaturedCategories'
import BestSellers from '@/components/home/BestSellers'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import Testimonials from '@/components/home/Testimonials'
import InstagramGallery from '@/components/home/InstagramGallery'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <NewArrivals />
        <FeaturedCategories />
        <BestSellers />
        <WhyChooseUs />
        <Testimonials />
        <InstagramGallery />
      </main>
      <Footer />
    </>
  )
}
