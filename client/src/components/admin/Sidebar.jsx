import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Image,
  Quote,
  HelpCircle,
  FileText,
  Mail,
  Settings,
  X,
} from 'lucide-react';

const links = [
  { to: '/admin', label: 'الرئيسية', icon: LayoutDashboard, end: true },
  { to: '/admin/services', label: 'الخدمات', icon: Package },
  { to: '/admin/gallery', label: 'معرض الأعمال', icon: Image },
  { to: '/admin/testimonials', label: 'آراء العملاء', icon: Quote },
  { to: '/admin/faqs', label: 'الأسئلة الشائعة', icon: HelpCircle },
  { to: '/admin/quotes', label: 'طلبات عروض الأسعار', icon: FileText },
  { to: '/admin/contact', label: 'رسائل التواصل', icon: Mail },
  { to: '/admin/settings', label: 'الإعدادات', icon: Settings },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* خلفية شفافة على الموبايل عند فتح القائمة */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 right-0 h-screen w-64 bg-ink text-white z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
        dir="rtl"
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
          <span className="font-display font-extrabold text-sm">
            رواد الخليج <span className="text-gold-light">Admin</span>
          </span>
          <button onClick={onClose} className="lg:hidden text-white/70">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-gold text-ink' : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon className="w-4.5 h-4.5" strokeWidth={1.75} />
                {link.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
