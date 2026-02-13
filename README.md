# 🎯 Qoyod Bonus Dashboard - لوحة تحكم البونص

لوحة تحكم احترافية مبنية بـ React لعرض وإدارة بونص المبيعات من Qoyod API.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.8-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.6-cyan)

## ✨ المميزات

- ✅ **واجهة احترافية** - تصميم عصري بـ Tailwind CSS
- ✅ **Dark Mode** - وضع داكن/فاتح
- ✅ **رسوم بيانية** - مخططات تفاعلية بـ Recharts
- ✅ **تصدير Excel** - تنزيل التقارير بصيغة Excel
- ✅ **تفاصيل الفروع** - عرض تفاصيل كل فرع في نافذة منبثقة
- ✅ **Responsive** - يعمل على جميع الشاشات
- ✅ **RTL Support** - دعم كامل للعربية
- ✅ **Real-time Data** - بيانات حية من API

## 📸 لقطات الشاشة

### الصفحة الرئيسية
- بطاقات الإحصائيات
- رسم بياني للمقارنة
- بطاقات الفروع

### تفاصيل الفرع
- جدول تفاصيل المعاملات
- تصدير Excel لكل فرع

## 🚀 التثبيت والتشغيل

### المتطلبات
- Node.js 18+
- npm أو yarn
- Backend API يعمل على المنفذ 3000

### 1. فك الضغط والتثبيت

```bash
unzip qoyod-bonus-dashboard.zip
cd qoyod-bonus-dashboard
npm install
```

### 2. إعداد ملف البيئة

```bash
cp .env.example .env
```

عدّل ملف `.env`:

```env
# للتطوير المحلي
VITE_API_URL=http://localhost:3000

# أو بعد نشر Backend على Render
# VITE_API_URL=https://your-api.onrender.com
```

### 3. تشغيل المشروع

```bash
# تطوير
npm run dev

# بناء للإنتاج
npm run build

# معاينة البناء
npm run preview
```

سيعمل Dashboard على: `http://localhost:5173`

## 📁 هيكل المشروع

```
qoyod-bonus-dashboard/
├── index.html                  # HTML الرئيسي
├── package.json               # إعدادات المشروع
├── vite.config.js            # إعدادات Vite
├── tailwind.config.js        # إعدادات Tailwind
├── .env.example              # مثال ملف البيئة
│
└── src/
    ├── main.jsx              # نقطة الدخول
    ├── App.jsx               # المكون الرئيسي
    ├── index.css             # الأنماط العامة
    │
    ├── components/           # المكونات
    │   ├── Navbar.jsx
    │   ├── StatCard.jsx
    │   ├── BranchCard.jsx
    │   ├── BonusChart.jsx
    │   ├── LoadingSpinner.jsx
    │   ├── ErrorAlert.jsx
    │   └── BranchDetailsModal.jsx
    │
    ├── pages/                # الصفحات
    │   └── Dashboard.jsx
    │
    ├── services/             # خدمات API
    │   └── api.js
    │
    └── utils/                # أدوات مساعدة
        ├── exportExcel.js
        └── helpers.js
```

## 🎨 المكونات الرئيسية

### 1. Dashboard (الصفحة الرئيسية)
```jsx
<Dashboard />
```
- نموذج البحث (السنة/الشهر)
- بطاقات الإحصائيات
- رسم بياني
- شبكة الفروع

### 2. StatCard (بطاقة إحصائية)
```jsx
<StatCard 
  title="إجمالي المبيعات"
  value="50,000 ريال"
  icon={DollarSign}
  color="blue"
/>
```

### 3. BranchCard (بطاقة فرع)
```jsx
<BranchCard 
  branchName="الرياض"
  data={branchData}
  onClick={handleClick}
/>
```

### 4. BonusChart (رسم بياني)
```jsx
<BonusChart data={bonusData} />
```

## 🔧 الوظائف الرئيسية

### تصدير Excel
```javascript
import { exportToExcel } from './utils/exportExcel';

// تصدير جميع الفروع
exportToExcel(bonusData, period);

// تصدير فرع واحد
exportBranchToExcel(branchName, branchData, period);
```

### استدعاء API
```javascript
import { bonusAPI } from './services/api';

// حساب البونص
const response = await bonusAPI.calculateBonus(2026, 2);

// الحصول على بونص فرع
const branchData = await bonusAPI.getBranchBonus('الرياض', 2026, 2);
```

## 🌐 النشر على Vercel

### الطريقة الأولى: من خلال GitHub

1. **رفع المشروع على GitHub**

```bash
git init
git add .
git commit -m "Initial dashboard commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO
git push -u origin main
```

2. **ربط Vercel**

- سجل دخول على [vercel.com](https://vercel.com)
- New Project
- Import من GitHub
- اختر المستودع `qoyod-bonus-dashboard`
- اضغط Deploy

3. **إعداد Environment Variables**

في Vercel Dashboard:
- Settings → Environment Variables
- أضف: `VITE_API_URL` = رابط Backend على Render

### الطريقة الثانية: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel

# أو للإنتاج مباشرة
vercel --prod
```

## 🔗 ربط Backend و Frontend

### 1. نشر Backend على Render

اتبع التعليمات في Backend README لنشره على Render. ستحصل على رابط مثل:
```
https://qoyod-bonus-api.onrender.com
```

### 2. تحديث Frontend

في ملف `.env`:
```env
VITE_API_URL=https://qoyod-bonus-api.onrender.com
```

### 3. إعادة النشر

```bash
npm run build
vercel --prod
```

## 🐛 استكشاف الأخطاء

### خطأ: "فشل الاتصال بالخادم"

**الحل:**
1. تأكد من تشغيل Backend على المنفذ 3000
2. تحقق من `VITE_API_URL` في `.env`
3. افتح Console في المتصفح لرؤية التفاصيل

### خطأ: "CORS"

**الحل:** أضف في Backend (`index.js`):

```javascript
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend.vercel.app'],
}));
```

### Dark Mode لا يعمل

**الحل:**
```bash
# امسح cache المتصفح أو
localStorage.clear()
```

## 📊 استخدام Dashboard

1. **اختر السنة والشهر** من القوائم المنسدلة
2. **اضغط "عرض التقرير"** لجلب البيانات
3. **شاهد الإحصائيات** في البطاقات العلوية
4. **قارن الأداء** في الرسم البياني
5. **اضغط على أي فرع** لرؤية التفاصيل
6. **صدّر Excel** للتقارير

## 🎨 التخصيص

### تغيير الألوان

في `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#YOUR_COLOR',
        600: '#YOUR_COLOR',
      },
    },
  },
}
```

### إضافة صفحات جديدة

1. أنشئ ملف في `src/pages/`
2. أضف Route في `src/App.jsx`

```jsx
<Route path="/new-page" element={<NewPage />} />
```

## 📦 المكتبات المستخدمة

| المكتبة | الاستخدام |
|---------|-----------|
| React | إطار العمل الأساسي |
| Vite | Build Tool |
| TailwindCSS | التنسيق |
| React Router | التوجيه |
| Recharts | الرسوم البيانية |
| Axios | طلبات HTTP |
| XLSX | تصدير Excel |
| Lucide React | الأيقونات |
| Day.js | التعامل مع التواريخ |

## 🔐 الأمان

- ✅ لا توجد أسرار في Frontend
- ✅ جميع المفاتيح في Backend
- ✅ CORS محمي
- ✅ Input Validation

## 📝 ملاحظات

- Dashboard يعتمد كلياً على Backend API
- تأكد من تشغيل Backend أولاً
- للنشر الإنتاجي، استخدم HTTPS

## 🆘 الدعم

للمشاكل أو الأسئلة:
1. تحقق من Console في المتصفح
2. تحقق من Backend logs
3. راجع Network Tab للطلبات الفاشلة

---

**صُنع بـ ❤️ مع React + Vite + Tailwind**
