import ResourceManager from '../../components/admin/ResourceManager';
import { contactApi } from '../../services/resources';

const STATUS_LABELS = {
  new: 'جديدة',
  read: 'مقروءة',
  replied: 'تم الرد',
  archived: 'مؤرشفة',
};

const fields = [
  {
    name: 'status',
    label: 'الحالة',
    type: 'select',
    required: true,
    options: Object.entries(STATUS_LABELS).map(([value, label]) => ({ value, label })),
  },
];

const detailFields = [
  { key: 'name', label: 'الاسم' },
  { key: 'phone', label: 'الجوال' },
  { key: 'email', label: 'البريد الإلكتروني' },
  { key: 'subject', label: 'الموضوع' },
  { key: 'message', label: 'الرسالة' },
];

const columns = [
  { key: 'name', label: 'الاسم' },
  { key: 'subject', label: 'الموضوع' },
  { key: 'status', label: 'الحالة', render: (item) => STATUS_LABELS[item.status] || item.status },
];

export default function Contact() {
  return (
    <ResourceManager
      title="رسائل التواصل"
      listFn={contactApi.list}
      updateFn={contactApi.update}
      removeFn={contactApi.remove}
      fields={fields}
      columns={columns}
      detailFields={detailFields}
      allowCreate={false}
    />
  );
}
