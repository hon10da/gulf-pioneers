import { Routes, Route } from 'react-router-dom';

import PublicLayout from './components/layout/PublicLayout';
import Home from './pages/Home';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import FAQs from './pages/FAQs';
import Contact from './pages/Contact';

import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminServices from './pages/admin/Services';
import AdminGallery from './pages/admin/Gallery';
import AdminTestimonials from './pages/admin/Testimonials';
import AdminFAQs from './pages/admin/FAQs';
import AdminQuotes from './pages/admin/Quotes';
import AdminContact from './pages/admin/Contact';
import AdminPlaceholderPage from './components/admin/AdminPlaceholderPage';
import Settings from './pages/admin/Settings';

function App() {
  return (
    <Routes>
      {/* ---- الموقع العام: لا يحتاج تسجيل دخول ---- */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* ---- تسجيل دخول الأدمن: بدون حماية ---- */}
      <Route path="/admin/login" element={<Login />} />

      {/* ---- منطقة الأدمن: محمية بالكامل خلف ProtectedRoute ---- */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="faqs" element={<AdminFAQs />} />
        <Route path="quotes" element={<AdminQuotes />} />
        <Route path="contact" element={<AdminContact />} />
        {/* الإعدادات لم تُبنَ بعد على مستوى الباك اند (Site Settings) — تبقى placeholder */}
        <Route path="settings" element={<Settings />} /> 
      </Route>
    </Routes>
  );
}

export default App;
