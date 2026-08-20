import ResourceManager from '../../components/admin/ResourceManager';
import { testimonialsApi } from '../../services/resources';

const fields = [
  { name: 'customerName', label: 'اسم العميل', required: true },
  { name: 'rating', label: 'التقييم (1-5)', type: 'number', required: true },
  { name: 'comment', label: 'نص التقييم', type: 'textarea', required: true },
  { name: 'location', label: 'الموقع (اختياري)' },
  { name: 'order', label: 'الترتيب', type: 'number' },
  { name: 'isPublished', label: 'منشور (يظهر في الموقع)', type: 'checkbox' },
];

const columns = [
  { key: 'customerName', label: 'العميل' },
  { key: 'rating', label: 'التقييم' },
  { key: 'isPublished', label: 'الحالة', render: (item) => (item.isPublished ? 'منشور' : 'مسودة') },
];

export default function Testimonials() {
  return (
    <ResourceManager
      title="إدارة آراء العملاء"
      listFn={testimonialsApi.listAdmin}
      createFn={testimonialsApi.create}
      updateFn={testimonialsApi.update}
      removeFn={testimonialsApi.remove}
      fields={fields}
      columns={columns}
      emptyDefaults={{ customerName: '', rating: 5, comment: '', location: '', order: 0, isPublished: false }}
    />
  );
}
