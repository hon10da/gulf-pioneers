import { useEffect, useState } from 'react';
import { Package, Loader2 } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import ServiceCard from '../components/ui/ServiceCard';
import CTASection from '../components/home/CTASection';
import { services as staticServices } from '../data/siteContent';
import { servicesApi } from '../services/resources';

export default function Services() {
  const [services, setServices] = useState(staticServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    servicesApi
      .list()
      .then((res) => {
        if (!active) return;
        const items = res.data?.data?.items || [];
        if (items.length > 0) {
          setServices(items.map((s) => ({ ...s, slug: s.slug || s._id, icon: Package })));
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
          <SectionHeading
            dark
            eyebrow="خدماتنا"
            title="خدمات نقل وتغليف أثاث شاملة"
            subtitle="مهما كان حجم المهمة، لدينا الفريق والخبرة المناسبة لتنفيذها بعناية."
          />
        </div>
      </div>

      <section className="py-20 bg-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-10 text-slate-soft">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.slug || service._id} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
