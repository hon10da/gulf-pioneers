import { ShieldCheck, Clock, PackageCheck, Users } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const points = [
  {
    icon: ShieldCheck,
    title: 'تعامل آمن',
    desc: 'تغليف مخصص للقطع الحساسة والزجاجية يحميها من أي ضرر أثناء النقل.',
  },
  {
    icon: Clock,
    title: 'التزام بالمواعيد',
    desc: 'ننظم كل مرحلة من العملية حتى تسير الأمور حسب الجدول المتفق عليه.',
  },
  {
    icon: PackageCheck,
    title: 'فريق متخصص',
    desc: 'أيدٍ مدرّبة على فك وتركيب مختلف أنواع الأثاث بدقة واحترافية.',
  },
  {
    icon: Users,
    title: 'تواصل واضح',
    desc: 'نتابع معك من أول استفسار وحتى التسليم النهائي، بدون تعقيد.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="لماذا رواد الخليج"
          title="نهتم بأثاثك كما نهتم بأثاثنا"
          subtitle="أسلوب عمل منظم من أول خطوة إلى آخر قطعة تُركَّب في موقعها الجديد."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((point) => {
            const Icon = point.icon;
            return (
              <div key={point.title} className="text-center p-6">
                <div className="w-14 h-14 rounded-2xl bg-sand-dark flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-6 h-6 text-gold-dark" strokeWidth={1.75} />
                </div>
                <h3 className="font-bold text-ink mb-2">{point.title}</h3>
                <p className="text-sm text-slate-soft leading-relaxed">{point.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
