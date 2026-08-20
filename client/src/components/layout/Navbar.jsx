import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'الرئيسية' },
  { to: '/services', label: 'خدماتنا' },
  { to: '/gallery', label: 'معرض الأعمال' },
  { to: '/testimonials', label: 'آراء العملاء' },
  { to: '/faqs', label: 'الأسئلة الشائعة' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink/95 backdrop-blur-sm border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="font-display font-extrabold text-lg text-white leading-tight">
            رواد الخليج
            <span className="block text-[11px] font-normal text-gold-light tracking-wide">
              لنقل وتغليف الأثاث
            </span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-gold-light' : 'text-white/80 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:0578485506"
            className="flex items-center gap-2 text-sm text-white/80 hover:text-white"
          >
            <Phone className="w-4 h-4" />
            0578485506
          </a>
          <Link
            to="/contact"
            className="bg-gold hover:bg-gold-light text-ink font-bold text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            اطلب عرض سعر
          </Link>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden text-white p-2"
          aria-label="فتح القائمة"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-ink border-t border-white/10 px-4 pb-6 pt-2">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 text-sm font-medium border-b border-white/5 ${
                    isActive ? 'text-gold-light' : 'text-white/80'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 block text-center bg-gold text-ink font-bold text-sm px-5 py-3 rounded-lg"
          >
            اطلب عرض سعر
          </Link>
        </div>
      )}
    </header>
  );
}
