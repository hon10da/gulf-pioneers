import { Link } from 'react-router-dom';
import { Phone, MapPin, MessageCircle } from 'lucide-react';

// أيقونة Facebook كـ SVG مخصص — غير متوفرة في نسخة lucide-react الحالية (أيقونات العلامات التجارية أُزيلت منها)
function FacebookIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.86c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70 pt-16 pb-8" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="font-display font-extrabold text-white text-lg mb-3">
            رواد الخليج <span className="text-gold-light">لنقل وتغليف الأثاث</span>
          </h3>
          <p className="text-sm leading-relaxed">
            نقل وتغليف احترافي للأثاث المنزلي والمكتبي داخل جدة والمناطق المجاورة، بعناية
            تحافظ على مقتنياتك من البداية للنهاية.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 text-sm">روابط سريعة</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/services" className="hover:text-gold-light transition-colors">خدماتنا</Link></li>
            <li><Link to="/gallery" className="hover:text-gold-light transition-colors">معرض الأعمال</Link></li>
            <li><Link to="/testimonials" className="hover:text-gold-light transition-colors">آراء العملاء</Link></li>
            <li><Link to="/faqs" className="hover:text-gold-light transition-colors">الأسئلة الشائعة</Link></li>
            <li><Link to="/contact" className="hover:text-gold-light transition-colors">اطلب عرض سعر</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 text-sm">تواصل معنا</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-gold-light shrink-0" />
              <a href="tel:0578485506" className="hover:text-gold-light transition-colors">0578485506</a>
            </li>
            <li className="flex items-center gap-2.5">
              <MessageCircle className="w-4 h-4 text-gold-light shrink-0" />
              <a
                href="https://wa.me/966578485506"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-light transition-colors"
              >
                واتساب
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-gold-light shrink-0" />
              <span>جدة، المملكة العربية السعودية</span>
            </li>
            <li className="flex items-center gap-2.5">
              <FacebookIcon className="w-4 h-4 text-gold-light shrink-0" />
              <a
                href="https://www.facebook.com/share/1BoAu5yZPV/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold-light transition-colors"
              >
                صفحتنا على فيسبوك
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-white/10 text-xs text-white/40 text-center">
        © {new Date().getFullYear()} رواد الخليج لنقل وتغليف الأثاث. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
