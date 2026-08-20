import { useEffect, useState } from 'react';
import { Loader2, Save, Settings as SettingsIcon } from 'lucide-react';
import { settingsApi } from '../../services/resources';

const initialForm = {
  siteName: '',
  tagline: '',
  phone: '',
  whatsapp: '',
  email: '',
  address: '',
  workingHours: '',
  facebook: '',
  instagram: '',
  twitter: '',
  logo: '',
  seoTitle: '',
  seoDescription: '',
};

export default function Settings() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await settingsApi.get();

        const settings = res.data.data.settings;

        setForm({
          ...initialForm,
          ...settings,
        });
      } catch (err) {
        setError(
          err.response?.data?.message ||
            'تعذر تحميل إعدادات الموقع.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setSuccess('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const res = await settingsApi.update(form);

      const settings = res.data.data.settings;

      setForm({
        ...initialForm,
        ...settings,
      });

      setSuccess('تم حفظ إعدادات الموقع بنجاح.');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'حدث خطأ أثناء حفظ الإعدادات.'
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex items-center gap-2 text-slate-soft">
          <Loader2 className="w-5 h-5 animate-spin" />
          جاري تحميل الإعدادات...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sand-dark flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-ink" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-ink">
                إعدادات الموقع
              </h1>

              <p className="text-sm text-slate-soft mt-1">
                إدارة بيانات ومعلومات الموقع الأساسية
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          form="settings-form"
          disabled={saving}
          className="flex items-center gap-2 bg-ink hover:bg-ink-light text-white font-bold px-5 py-2.5 rounded-lg transition-colors disabled:opacity-60"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}

          {saving ? 'جاري الحفظ...' : 'حفظ التعديلات'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm">
          {success}
        </div>
      )}

      <form
        id="settings-form"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <section className="bg-white rounded-2xl border border-black/5 p-6">
          <h2 className="font-bold text-ink text-lg mb-5">
            معلومات الموقع
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field
              label="اسم الموقع"
              name="siteName"
              value={form.siteName}
              onChange={handleChange}
            />

            <Field
              label="الوصف المختصر"
              name="tagline"
              value={form.tagline}
              onChange={handleChange}
            />

            <Field
              label="رقم الهاتف"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />

            <Field
              label="رقم WhatsApp"
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
            />

            <Field
              label="البريد الإلكتروني"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />

            <Field
              label="ساعات العمل"
              name="workingHours"
              value={form.workingHours}
              onChange={handleChange}
            />

            <div className="md:col-span-2">
              <Field
                label="العنوان"
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2">
              <Field
                label="رابط الشعار Logo"
                name="logo"
                value={form.logo}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-black/5 p-6">
          <h2 className="font-bold text-ink text-lg mb-5">
            روابط التواصل الاجتماعي
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Field
              label="Facebook"
              name="facebook"
              value={form.facebook}
              onChange={handleChange}
              placeholder="https://facebook.com/..."
            />

            <Field
              label="Instagram"
              name="instagram"
              value={form.instagram}
              onChange={handleChange}
              placeholder="https://instagram.com/..."
            />

            <Field
              label="Twitter / X"
              name="twitter"
              value={form.twitter}
              onChange={handleChange}
              placeholder="https://x.com/..."
            />
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-black/5 p-6">
          <h2 className="font-bold text-ink text-lg mb-5">
            إعدادات SEO
          </h2>

          <div className="space-y-5">
            <Field
              label="SEO Title"
              name="seoTitle"
              value={form.seoTitle}
              onChange={handleChange}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                SEO Description
              </label>

              <textarea
                name="seoDescription"
                value={form.seoDescription}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-lg border border-gray-300 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink resize-none"
              />
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder = '',
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink"
      />
    </div>
  );
}