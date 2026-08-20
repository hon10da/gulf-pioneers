import Hero from '../components/home/Hero';
import WhyChooseUs from '../components/home/WhyChooseUs';
import ServicesOverview from '../components/home/ServicesOverview';
import ProcessSteps from '../components/home/ProcessSteps';
import GalleryPreview from '../components/home/GalleryPreview';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FAQPreview from '../components/home/FAQPreview';
import CTASection from '../components/home/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <ServicesOverview />
      <ProcessSteps />
      <GalleryPreview />
      <TestimonialsSection />
      <FAQPreview />
      <CTASection />
    </>
  );
}
