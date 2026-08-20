import { useEffect, useState } from 'react';
import { ImageIcon, Loader2 } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import { galleryApi } from '../services/resources';

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    galleryApi
      .list()
      .then((res) => {
        if (!active) return;
        setItems(res.data?.data?.items || []);
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
          <SectionHeading
            dark
            eyebrow="معرض الأعمال"
            title="لمحة من مشاريعنا"
            subtitle={items.length > 0 ? undefined : 'سيتم تحديث هذا المعرض بصور حقيقية من أعمالنا قريباً.'}
          />
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-10 text-slate-soft">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {items.length > 0
                ? items.map((item) => (
                    <div key={item._id} className="aspect-square rounded-2xl overflow-hidden border border-black/5">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  ))
                : Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-2xl bg-sand-dark border border-black/5 flex items-center justify-center"
                    >
                      <ImageIcon className="w-8 h-8 text-ink/20" strokeWidth={1.5} />
                    </div>
                  ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
