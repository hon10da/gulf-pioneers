import ResourceManager from '../../components/admin/ResourceManager';
import { quotesApi } from '../../services/resources';

const STATUS_LABELS = {
  pending: 'قيد الانتظار',
  contacted: 'تم التواصل',
  completed: 'مكتمل',
  cancelled: 'ملغي',
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
  { key: 'fromLocation', label: 'من' },
  { key: 'toLocation', label: 'إلى' },
  { key: 'notes', label: 'ملاحظات' },
];

const columns = [
  { key: 'name', label: 'الاسم' },
  { key: 'phone', label: 'الجوال' },
  { key: 'status', label: 'الحالة', render: (item) => STATUS_LABELS[item.status] || item.status },
];

export default function Quotes() {
  return (
    <ResourceManager
      title="طلبات عروض الأسعار"
      listFn={quotesApi.list}
      updateFn={quotesApi.update}
      removeFn={quotesApi.remove}
      fields={fields}
      columns={columns}
      detailFields={detailFields}
      allowCreate={false}
    />
  );
}
