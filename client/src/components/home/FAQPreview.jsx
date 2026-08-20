import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import FAQItem from '../ui/FAQItem';
import { faqs as staticFaqs } from '../../data/siteContent';
import { faqsApi } from '../../services/resources';

export default function FAQPreview() {
  const [faqs, setFaqs] = useState(staticFaqs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    faqsApi
      .listPublished()
      .then((res) => {
        if (!active) return;
        const items = res.data?.data?.items || [];
        if (items.length > 0) setFaqs(items);
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
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="الأسئلة الشائعة" title="عندك سؤال؟ عندنا إجابة" />

        {loading ? (
          <div className="flex justify-center py-10 text-slate-soft">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        ) : (
          <div>
            {faqs.slice(0, 4).map((faq, i) => (
              <FAQItem key={faq._id || i} question={faq.question} answer={faq.answer} defaultOpen={i === 0} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            to="/faqs"
            className="inline-flex items-center gap-2 text-ink font-bold hover:text-gold-dark transition-colors"
          >
            كل الأسئلة الشائعة
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
