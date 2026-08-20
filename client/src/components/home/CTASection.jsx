import { Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-16 md:py-20 bg-gold">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-ink mb-2">
            جاهز لنقل أثاثك بأمان؟
          </h2>
          <p className="text-ink/70">تواصل معنا الآن واحصل على عرض سعر مجاني.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-ink hover:bg-ink-light text-white font-bold px-7 py-3.5 rounded-lg transition-colors"
          >
            اطلب عرض سعر
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <a
            href="https://wa.me/966578485506"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border-2 border-ink text-ink font-bold px-7 py-3.5 rounded-lg hover:bg-ink hover:text-white transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            تواصل عبر واتساب
          </a>
        </div>
      </div>
    </section>
  );
}
