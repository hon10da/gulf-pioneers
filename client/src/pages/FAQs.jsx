import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import FAQItem from '../components/ui/FAQItem';
import { faqs as staticFaqs } from '../data/siteContent';
import { faqsApi } from '../services/resources';

export default function FAQs() {
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
    <>
      <div className="bg-ink py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading dark eyebrow="الأسئلة الشائعة" title="عندك سؤال؟ عندنا إجابة" />
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-10 text-slate-soft">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          ) : (
            faqs.map((faq, i) => (
              <FAQItem key={faq._id || i} question={faq.question} answer={faq.answer} defaultOpen={i === 0} />
            ))
          )}
        </div>
      </section>
    </>
  );
}
