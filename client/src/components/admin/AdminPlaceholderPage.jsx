import { Construction } from 'lucide-react';

/**
 * مكون مؤقت يُستخدم لكل صفحات الأدمن التي لم تُبنَ بتفاصيلها الكاملة بعد
 * (Services, Gallery, Testimonials, FAQs, Quotes, Contact, Settings).
 * سيتم استبدال كل واحدة بصفحة CRUD حقيقية في مرحلة لاحقة عند بناء الـ APIs الخاصة بها.
 */
export default function AdminPlaceholderPage({ title, description }) {
  return (
    <div className="bg-white rounded-2xl border border-black/5 p-10 text-center">
      <div className="w-14 h-14 rounded-2xl bg-sand-dark flex items-center justify-center mx-auto mb-5">
        <Construction className="w-6 h-6 text-gold-dark" strokeWidth={1.75} />
      </div>
      <h2 className="font-bold text-ink text-lg mb-2">{title}</h2>
      <p className="text-sm text-slate-soft max-w-md mx-auto">
        {description || 'هذا القسم قيد الإنشاء، وسيتم ربطه بواجهة API الخاصة به في مرحلة لاحقة.'}
      </p>
    </div>
  );
}
