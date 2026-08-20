import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import TestimonialCard from '../ui/TestimonialCard';
import { testimonials as staticTestimonials } from '../../data/siteContent';
import { testimonialsApi } from '../../services/resources';

export default function TestimonialsSection() {
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
    <section className="py-20 md:py-28 bg-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="آراء العملاء" title="ماذا يقول عملاؤنا" />

        {loading ? (
          <div className="flex justify-center py-10 text-slate-soft">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
