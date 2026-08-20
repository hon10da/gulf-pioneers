import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Package } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-ink overflow-hidden">
      {/* خطوط هندسية زخرفية خفيفة تلمّح لصناديق منظمة (بدون اعتماد على صور خارجية) */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true">
        <div className="grid grid-cols-6 gap-3 p-6 h-full">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="border border-white rounded-lg" />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-gold-light text-sm font-bold bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <ShieldCheck className="w-4 h-4" />
            نقل وتغليف أثاث في جدة والمناطق المجاورة
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.15] mb-6">
            ننقل أثاثك بعناية،
            <br />
            <span className="text-gold-light">من باب إلى باب</span>
          </h1>

          <p className="text-white/70 text-lg leading-relaxed max-w-xl mb-10">
            فريق متخصص في تغليف وفك وتركيب ونقل الأثاث المنزلي والمكتبي، بأسلوب منظم
            يحفظ مقتنياتك سليمة من اللحظة الأولى حتى التسليم في موقعك الجديد.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-ink font-bold px-7 py-3.5 rounded-lg transition-colors"
            >
              اطلب عرض سعر
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-bold px-7 py-3.5 rounded-lg transition-colors"
            >
              <Package className="w-4 h-4" />
              خدماتنا
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
