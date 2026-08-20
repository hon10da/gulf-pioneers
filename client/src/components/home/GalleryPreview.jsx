import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ImageIcon, ArrowLeft, Loader2 } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { galleryApi } from '../../services/resources';

export default function GalleryPreview() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    galleryApi
      .list()
      .then((res) => {
        if (!active) return;
        setItems((res.data?.data?.items || []).slice(0, 6));
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="معرض أعمالنا"
          title="لمحة من مشاريعنا"
          subtitle={items.length > 0 ? undefined : 'سيتم عرض صور حقيقية من أعمالنا هنا قريباً.'}
        />

        {loading ? (
          <div className="flex justify-center py-10 text-slate-soft">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {items.length > 0
              ? items.map((item) => (
                  <div key={item._id} className="aspect-square rounded-2xl overflow-hidden border border-black/5">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                ))
              : Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-2xl bg-sand-dark border border-black/5 flex items-center justify-center"
                  >
                    <ImageIcon className="w-8 h-8 text-ink/20" strokeWidth={1.5} />
                  </div>
                ))}
          </div>
        )}

        <div className="text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-ink font-bold hover:text-gold-dark transition-colors"
          >
            عرض المعرض كاملاً
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
