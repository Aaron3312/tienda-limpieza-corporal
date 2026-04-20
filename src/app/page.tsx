import CustomCursor from '@/components/home/CustomCursor';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import BenefitsSection from '@/components/home/BenefitsSection';
import BrandStory from '@/components/home/BrandStory';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CtaSection from '@/components/home/CtaSection';

export default function Home() {
  return (
    <>
      <CustomCursor />
      <div style={{ backgroundColor: '#F7F4EF', color: '#1C2B12' }}>
        <HeroSection />
        <FeaturedProducts />
        <BenefitsSection />
        <BrandStory />
        <TestimonialsSection />
        <CtaSection />
      </div>
    </>
  );
}
