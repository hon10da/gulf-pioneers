import ResourceManager from '../../components/admin/ResourceManager';
import { servicesApi } from '../../services/resources';

const fields = [
  { name: 'title', label: 'العنوان', required: true },
  { name: 'slug', label: 'الـ Slug (إنجليزي، بدون مسافات)', required: true },
  { name: 'shortDescription', label: 'وصف مختصر', type: 'textarea', required: true },
  { name: 'description', label: 'وصف تفصيلي', type: 'textarea' },
  { name: 'order', label: 'الترتيب', type: 'number' },
  { name: 'isActive', label: 'مفعّلة (تظهر في الموقع)', type: 'checkbox' },
];

const columns = [
  { key: 'title', label: 'العنوان' },
  { key: 'slug', label: 'Slug' },
  {
    key: 'isActive',
    label: 'الحالة',
    render: (item) => (item.isActive ? 'مفعّلة' : 'غير مفعّلة'),
  },
];

export default function Services() {
  return (
    <ResourceManager
      title="إدارة الخدمات"
      listFn={servicesApi.list}
      createFn={servicesApi.create}
      updateFn={servicesApi.update}
      removeFn={servicesApi.remove}
      fields={fields}
      columns={columns}
      emptyDefaults={{ title: '', slug: '', shortDescription: '', description: '', order: 0, isActive: true }}
    />
  );
}
