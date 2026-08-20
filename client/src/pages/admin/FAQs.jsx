import ResourceManager from '../../components/admin/ResourceManager';
import { faqsApi } from '../../services/resources';

const fields = [
  { name: 'question', label: 'السؤال', required: true },
  { name: 'answer', label: 'الإجابة', type: 'textarea', required: true },
  { name: 'category', label: 'التصنيف (اختياري)' },
  { name: 'order', label: 'الترتيب', type: 'number' },
  { name: 'isPublished', label: 'منشور (يظهر في الموقع)', type: 'checkbox' },
];

const columns = [
  { key: 'question', label: 'السؤال' },
  { key: 'isPublished', label: 'الحالة', render: (item) => (item.isPublished ? 'منشور' : 'مسودة') },
];

export default function FAQs() {
  return (
    <ResourceManager
      title="إدارة الأسئلة الشائعة"
      listFn={faqsApi.listAdmin}
      createFn={faqsApi.create}
      updateFn={faqsApi.update}
      removeFn={faqsApi.remove}
      fields={fields}
      columns={columns}
      emptyDefaults={{ question: '', answer: '', category: '', order: 0, isPublished: true }}
    />
  );
}
