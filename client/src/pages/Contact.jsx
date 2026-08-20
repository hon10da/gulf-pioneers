import { useState } from 'react';
import { Phone, MessageCircle, MapPin, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import { quotesApi } from '../services/resources';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', fromLocation: '', toLocation: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await quotesApi.create(form);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'تعذر إرسال الطلب، حاول مرة أخرى.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-ink py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            dark
            eyebrow="تواصل معنا"
            title="اطلب عرض سعرك المجاني"
            subtitle="عبّئ البيانات وسنتواصل معك في أقرب وقت، أو تواصل معنا مباشرة عبر واتساب."
          />
        </div>
      </div>

      <section className="py-20 bg-sand">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* معلومات التواصل */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="tel:0578485506"
              className="flex items-center gap-4 bg-white rounded-2xl border border-black/5 p-5 hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 rounded-xl bg-ink flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-gold-light" />
              </div>
              <div>
                <p className="text-xs text-slate-soft">اتصل بنا</p>
                <p className="font-bold text-ink">0578485506</p>
              </div>
            </a>

            <a
              href="https://wa.me/966578485506"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white rounded-2xl border border-black/5 p-5 hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 rounded-xl bg-ink flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-gold-light" />
              </div>
              <div>
                <p className="text-xs text-slate-soft">واتساب</p>
                <p className="font-bold text-ink">تواصل مباشر</p>
              </div>
            </a>

            <div className="flex items-center gap-4 bg-white rounded-2xl border border-black/5 p-5">
              <div className="w-11 h-11 rounded-xl bg-ink flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-gold-light" />
              </div>
              <div>
                <p className="text-xs text-slate-soft">نطاق الخدمة</p>
                <p className="font-bold text-ink">جدة والمناطق المجاورة</p>
              </div>
            </div>
          </div>

          {/* نموذج طلب عرض السعر */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-black/5 p-6 md:p-8">
            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle2 className="w-12 h-12 text-gold-dark mx-auto mb-4" />
                <h3 className="font-bold text-ink text-lg mb-2">تم استلام طلبك</h3>
                <p className="text-sm text-slate-soft">سنتواصل معك في أقرب وقت لتأكيد التفاصيل.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">الاسم</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-300 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">رقم الجوال</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      type="tel"
                      className="w-full rounded-lg border border-gray-300 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">من (الحي/الموقع)</label>
                    <input
                      name="fromLocation"
                      value={form.fromLocation}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">إلى (الحي/الموقع)</label>
                    <input
                      name="toLocation"
                      value={form.toLocation}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">تفاصيل إضافية</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink resize-none"
                    placeholder="حجم الأثاث تقريباً، هل يحتاج فك وتركيب، أي ملاحظات أخرى..."
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-ink hover:bg-ink-light text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-60"
                >
                  {submitting ? 'جارِ الإرسال...' : 'إرسال الطلب'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
