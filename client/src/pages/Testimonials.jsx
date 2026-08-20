import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import TestimonialCard from '../components/ui/TestimonialCard';
import CTASection from '../components/home/CTASection';
import { testimonials as staticTestimonials } from '../data/siteContent';
import { testimonialsApi } from '../services/resources';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(staticTestimonials);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    testimonialsApi
      .listPublished()
      .then((res) => {
        if (!active) return;
        const items = res.data?.data?.items || [];
        if (items.length > 0) {
          setTestimonials(items.map((t) => ({ name: t.customerName, text: t.comment })));
        }
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <div className="bg-ink py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading dark eyebrow="آراء العملاء" title="ماذا يقول عملاؤنا" />
        </div>
      </div>

      <section className="py-20 bg-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-10 text-slate-soft">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <TestimonialCard key={i} testimonial={t} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
