# Gulf Pioneers | رواد الخليج لنقل وتغليف الأثاث

موقع إلكتروني احترافي (Production-Ready) لشركة رواد الخليج لنقل وتغليف الأثاث، جدة - المملكة العربية السعودية.

> ⚠️ المشروع في مرحلة **Initialization** فقط. لا توجد صفحات أو APIs فعلية بعد.

## معلومات الشركة (مؤكدة)

- **الاسم:** شركة رواد الخليج لنقل وتغليف الأثاث (Gulf Pioneers)
- **الموقع:** جدة، المملكة العربية السعودية
- **نطاق الخدمة:** داخل جدة والمناطق المجاورة
- **الهاتف / واتساب:** 0578485506
- **Facebook:** https://www.facebook.com/share/1BoAu5yZPV/

## Tech Stack

### Frontend (`/client`)
- React 19 + Vite
- Tailwind CSS v4
- React Router
- Axios
- TanStack Query
- Framer Motion
- Lucide React

### Backend (`/server`)
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication (httpOnly cookies)
- Cloudinary (تخزين الصور الديناميكية)

## هيكل المشروع

```
gulf-pioneers/
├── client/     → React SPA (Public Website + Admin Dashboard)
└── server/     → REST API
```

## التشغيل محلياً

### Backend
```bash
cd server
npm install
cp .env.example .env   # ثم عدّل القيم
npm run dev
```
يعمل على: `http://localhost:5000`

### Frontend
```bash
cd client
npm install
cp .env.example .env   # ثم عدّل القيم
npm run dev
```
يعمل على: `http://localhost:5173`

## ملاحظات مهمة

- الموقع عربي بالكامل حالياً (RTL) مع بنية قابلة للتوسعة للإنجليزية مستقبلاً.
- لا يوجد Public Registration — Admin Login فقط.
- لا يوجد Online Payment — الاعتماد على Request Quote والتواصل المباشر فقط.
- لا توجد أسعار أو باقات ثابتة معروضة حالياً.

## حالة المشروع (Roadmap)

- [x] Phase 0 — Project Initialization
- [ ] Phase 1 — Backend Foundation (DB + Auth)
- [ ] Phase 2 — Backend Core APIs
- [ ] Phase 3 — Backend Forms APIs
- [ ] Phase 4 — Frontend Foundation
- [ ] Phase 5 — Public Pages
- [ ] Phase 6 — Conversion Pages (Contact / Request Quote)
- [ ] Phase 7 — Admin Auth + Dashboard Shell
- [ ] Phase 8 — Admin CRUD Screens
- [ ] Phase 9 — Admin Operational Screens
- [ ] Phase 10 — Polish
- [ ] Phase 11 — SEO Pass
- [ ] Phase 12 — Security & Deployment Prep
