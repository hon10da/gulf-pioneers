import SectionHeading from '../ui/SectionHeading';
import { processSteps } from '../../data/siteContent';

export default function ProcessSteps() {
  return (
    <section className="py-20 md:py-28 bg-ink relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          dark
          eyebrow="آلية العمل"
          title="رحلة نقل أثاثك في 4 خطوات"
          subtitle="عملية واضحة ومنظمة من أول تواصل حتى التسليم النهائي."
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* خط الاتصال بين الخطوات - يظهر فقط على الشاشات الكبيرة */}
          <div className="hidden md:block absolute top-8 right-[12.5%] left-[12.5%] h-px bg-white/10" />

          {processSteps.map((step) => (
            <div key={step.number} className="relative text-center md:text-right">
              <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto md:mx-0 mb-6 relative z-10">
                <span className="font-display font-extrabold text-xl text-gold-light">
                  {step.number}
                </span>
              </div>
              <h3 className="font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
