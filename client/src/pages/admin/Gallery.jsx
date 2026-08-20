import { useEffect, useState, useCallback } from 'react';
import { Plus, Trash2, Pencil, Loader2, ImageIcon, X } from 'lucide-react';
import { galleryApi } from '../../services/resources';
import Modal from '../../components/admin/Modal';

const emptyForm = { title: '', description: '', category: '', isFeatured: false, order: 0 };

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await galleryApi.list();
      setItems(res.data.data.items || []);
    } catch (err) {
      setError(err.response?.data?.message || 'تعذر تحميل الصور.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFile(null);
    setPreview(null);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title || '',
      description: item.description || '',
      category: item.category || '',
      isFeatured: !!item.isFeatured,
      order: item.order || 0,
    });
    setFile(null);
    setPreview(item.imageUrl);
    setModalOpen(true);
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingId && !file) {
      alert('الرجاء اختيار صورة.');
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (file) formData.append('image', file);

    setSaving(true);
    try {
      if (editingId) {
        await galleryApi.update(editingId, formData);
      } else {
        await galleryApi.create(formData);
      }
      setModalOpen(false);
      fetchItems();
    } catch (err) {
      alert(err.response?.data?.message || 'حدث خطأ أثناء الحفظ.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('هل تريد حذف هذه الصورة نهائياً (بما في ذلك من Cloudinary)؟')) return;
    try {
      await galleryApi.remove(id);
      fetchItems();
    } catch (err) {
      alert(err.response?.data?.message || 'تعذر الحذف.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-ink">إدارة معرض الأعمال</h1>
          <p className="text-sm text-slate-soft mt-1">{items.length} صورة</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-ink hover:bg-ink-light text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          إضافة صورة
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 p-6">
        {loading ? (
          <div className="p-10 text-center text-slate-soft flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            جارِ التحميل...
          </div>
        ) : error ? (
          <div className="p-10 text-center text-red-600 text-sm">{error}</div>
        ) : items.length === 0 ? (
          <div className="p-10 text-center text-slate-soft text-sm">لا توجد صور بعد.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div key={item._id} className="group relative rounded-xl overflow-hidden border border-black/5">
                <img src={item.imageUrl} alt={item.title} className="w-full aspect-square object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => openEdit(item)}
                    className="p-2 bg-white rounded-lg text-ink hover:bg-gold transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2 bg-white rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-xs px-2 py-1 truncate">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'تعديل الصورة' : 'إضافة صورة جديدة'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">الصورة</label>
            {preview ? (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-200 mb-2">
                <img src={preview} alt="معاينة" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                  }}
                  className="absolute top-2 left-2 bg-white rounded-full p-1 text-ink"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full aspect-video rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-ink transition-colors">
                <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">اضغط لاختيار صورة</span>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">العنوان</label>
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
              className="w-full rounded-lg border border-gray-300 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">الوصف (اختياري)</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={2}
              className="w-full rounded-lg border border-gray-300 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">التصنيف</label>
              <input
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">الترتيب</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm((f) => ({ ...f, order: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) => setForm((f) => ({ ...f, isFeatured: e.target.checked }))}
              className="w-4 h-4"
            />
            صورة مميزة
          </label>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-ink hover:bg-ink-light text-white font-bold py-2.5 rounded-lg transition-colors disabled:opacity-60"
          >
            {saving ? 'جارِ الرفع...' : 'حفظ'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
