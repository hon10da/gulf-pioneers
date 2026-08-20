import { useEffect, useState } from 'react';
import { FileText, Mail, Package, Image, Plus, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dashboardApi } from '../../services/resources';

const quickActions = [
  { label: 'إضافة خدمة', to: '/admin/services' },
  { label: 'إضافة صورة للمعرض', to: '/admin/gallery' },
  { label: 'إضافة تقييم عميل', to: '/admin/testimonials' },
];

const STATUS_LABELS = {
  pending: 'قيد الانتظار',
  contacted: 'تم التواصل',
  completed: 'مكتمل',
  cancelled: 'ملغي',
};

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    dashboardApi
      .stats()
      .then((res) => setStats(res.data.data))
      .catch((err) => setError(err.response?.data?.message || 'تعذر تحميل الإحصائيات.'))
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: 'طلبات عروض الأسعار (قيد الانتظار)', value: stats?.pendingQuotes, icon: FileText },
    { label: 'رسائل التواصل الجديدة', value: stats?.newContactMessages, icon: Mail },
    { label: 'الخدمات المفعّلة', value: stats?.activeServices, icon: Package },
    { label: 'صور المعرض', value: stats?.galleryCount, icon: Image },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-ink">نظرة عامة</h1>
        <p className="text-sm text-slate-soft mt-1">ملخص سريع عن نشاط الموقع.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-10 text-slate-soft">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white rounded-2xl border border-black/5 p-5">
                  <div className="w-10 h-10 rounded-xl bg-sand-dark flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-gold-dark" strokeWidth={1.75} />
                  </div>
                  <p className="text-2xl font-extrabold text-ink">{stat.value ?? 0}</p>
                  <p className="text-xs text-slate-soft mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-black/5 p-6">
              <h2 className="font-bold text-ink mb-4">آخر طلبات عروض الأسعار</h2>
              {stats?.recentQuotes?.length > 0 ? (
                <div className="space-y-3">
                  {stats.recentQuotes.map((q) => (
                    <div key={q._id} className="flex items-center justify-between border-b border-black/5 pb-3 last:border-0">
                      <div>
                        <p className="text-sm font-bold text-ink">{q.name}</p>
                        <p className="text-xs text-slate-soft">{q.phone}</p>
                      </div>
                      <span className="text-xs bg-sand-dark text-ink px-2.5 py-1 rounded-full">
                        {STATUS_LABELS[q.status] || q.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-sm text-slate-soft">لا توجد طلبات بعد.</div>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-black/5 p-6">
              <h2 className="font-bold text-ink mb-4">إجراءات سريعة</h2>
              <div className="space-y-2">
                {quickActions.map((action) => (
                  <Link
                    key={action.to}
                    to={action.to}
                    className="flex items-center gap-2 text-sm font-medium text-ink bg-sand-dark hover:bg-gold hover:text-ink rounded-lg px-3 py-2.5 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-black/5 p-6">
            <h2 className="font-bold text-ink mb-4">آخر رسائل التواصل</h2>
            {stats?.recentMessages?.length > 0 ? (
              <div className="space-y-3">
                {stats.recentMessages.map((m) => (
                  <div key={m._id} className="flex items-center justify-between border-b border-black/5 pb-3 last:border-0">
                    <div>
                      <p className="text-sm font-bold text-ink">{m.name}</p>
                      <p className="text-xs text-slate-soft">{m.subject || m.message?.slice(0, 40)}</p>
                    </div>
                    <span className="text-xs bg-sand-dark text-ink px-2.5 py-1 rounded-full">{m.status}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-sm text-slate-soft">لا توجد رسائل بعد.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
