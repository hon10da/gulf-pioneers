import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import ServiceCard from '../ui/ServiceCard';
import { services as staticServices } from '../../data/siteContent';
import { servicesApi } from '../../services/resources';
import { Package } from 'lucide-react';

export default function ServicesOverview() {
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
          // بيانات API لا تحتوي icon (component) — نستخدم أيقونة افتراضية موحّدة
          setServices(items.map((s) => ({ ...s, slug: s.slug || s._id, icon: Package })));
        }
        // لو القائمة فارغة، نُبقي البيانات الثابتة كـ fallback بدل شاشة فارغة
      })
      .catch(() => {
        // فشل الطلب (مثلاً الباك اند غير مشغّل) → نُبقي البيانات الثابتة بصمت
      })
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
        <SectionHeading
          eyebrow="خدماتنا"
          title="كل ما يحتاجه أثاثك في مكان واحد"
          subtitle="من التغليف إلى التركيب، نغطي كل مراحل عملية النقل."
        />

        {loading ? (
          <div className="flex justify-center py-10 text-slate-soft">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.slug || service._id} service={service} />
            ))}
          </div>
        )}

        <div className="text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-ink font-bold hover:text-gold-dark transition-colors"
          >
            عرض كل الخدمات
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
