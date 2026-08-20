import { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import Modal from './Modal';

/**
 * صفحة إدارة عامة (List + Create + Edit + Delete) تُبنى بالكامل عبر إعدادات.
 * تُستخدم في: Services, Testimonials, FAQs — وبتخصيص بسيط في Quotes/Contact.
 *
 * props:
 * - title: عنوان الصفحة
 * - listFn: async () => axiosResponse (يجب أن يرجع { data: { items } })
 * - createFn / updateFn / removeFn: async (id?, data) => axiosResponse (اختيارية لو allowCreate=false)
 * - fields: [{ name, label, type: 'text'|'textarea'|'number'|'checkbox'|'select', options?, required? }]
 * - columns: [{ key, label, render?(item) }]
 * - allowCreate: هل يوجد نموذج إضافة (false لـ Quotes/Contact التي ينشئها العميل فقط)
 * - allowDelete: هل يوجد زر حذف
 * - emptyDefaults: القيم الافتراضية عند فتح نموذج إضافة جديد
 */
export default function ResourceManager({
  title,
  listFn,
  createFn,
  updateFn,
  removeFn,
  fields,
  columns,
  allowCreate = true,
  allowDelete = true,
  emptyDefaults = {},
  detailFields = [],
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyDefaults);
  const [saving, setSaving] = useState(false);
  const [viewingItem, setViewingItem] = useState(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await listFn();
      setItems(res.data.data.items || []);
    } catch (err) {
      setError(err.response?.data?.message || 'تعذر تحميل البيانات.');
    } finally {
      setLoading(false);
    }
  }, [listFn]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const openCreate = () => {
    setEditingId(null);
    setFormData(emptyDefaults);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingId(item._id);
    setViewingItem(item);
    const initial = {};
    fields.forEach((f) => {
      initial[f.name] = item[f.name] ?? emptyDefaults[f.name] ?? '';
    });
    setFormData(initial);
    setModalOpen(true);
  };

  const handleFieldChange = (name, value) => {
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updateFn(editingId, formData);
      } else {
        await createFn(formData);
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
    if (!window.confirm('هل أنت متأكد من الحذف؟ لا يمكن التراجع عن هذا الإجراء.')) return;
    try {
      await removeFn(id);
      fetchItems();
    } catch (err) {
      alert(err.response?.data?.message || 'تعذر الحذف.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-ink">{title}</h1>
          <p className="text-sm text-slate-soft mt-1">{items.length} عنصر</p>
        </div>
        {allowCreate && (
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-ink hover:bg-ink-light text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            إضافة جديد
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-slate-soft flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            جارِ التحميل...
          </div>
        ) : error ? (
          <div className="p-10 text-center text-red-600 text-sm">{error}</div>
        ) : items.length === 0 ? (
          <div className="p-10 text-center text-slate-soft text-sm">لا توجد بيانات بعد.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/5 text-right">
                  {columns.map((col) => (
                    <th key={col.key} className="px-5 py-3 font-bold text-ink whitespace-nowrap">
                      {col.label}
                    </th>
                  ))}
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id} className="border-b border-black/5 last:border-0">
                    {columns.map((col) => (
                      <td key={col.key} className="px-5 py-3 text-charcoal">
                        {col.render ? col.render(item) : String(item[col.key] ?? '—')}
                      </td>
                    ))}
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(item)}
                          className="p-2 text-slate-soft hover:text-ink hover:bg-sand-dark rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        {allowDelete && (
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-2 text-slate-soft hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'تعديل' : 'إضافة جديد'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {editingId && detailFields.length > 0 && viewingItem && (
            <div className="bg-sand-dark rounded-lg p-4 space-y-1.5 mb-2">
              {detailFields.map((df) => (
                <p key={df.key} className="text-sm">
                  <span className="font-bold text-ink">{df.label}: </span>
                  <span className="text-slate-soft">{viewingItem[df.key] || '—'}</span>
                </p>
              ))}
            </div>
          )}

          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>

              {field.type === 'textarea' ? (
                <textarea
                  value={formData[field.name] ?? ''}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  required={field.required}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink resize-none"
                />
              ) : field.type === 'checkbox' ? (
                <input
                  type="checkbox"
                  checked={!!formData[field.name]}
                  onChange={(e) => handleFieldChange(field.name, e.target.checked)}
                  className="w-4 h-4"
                />
              ) : field.type === 'select' ? (
                <select
                  value={formData[field.name] ?? ''}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  required={field.required}
                  className="w-full rounded-lg border border-gray-300 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink"
                >
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || 'text'}
                  value={formData[field.name] ?? ''}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  required={field.required}
                  className="w-full rounded-lg border border-gray-300 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink"
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-ink hover:bg-ink-light text-white font-bold py-2.5 rounded-lg transition-colors disabled:opacity-60"
          >
            {saving ? 'جارِ الحفظ...' : 'حفظ'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
