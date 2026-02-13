# Qoyod Bonus Backend API

تطبيق backend لإدارة مكافآت Qoyod مبني باستخدام Node.js و Express.

## المتطلبات

- Node.js (v14 أو أعلى)
- npm أو yarn

## التثبيت المحلي

```bash
# استنساخ المستودع
git clone https://github.com/mansour42433/qoyod-bonus-backend.git
cd qoyod-bonus-backend

# تثبيت المكتبات
npm install

# نسخ ملف البيئة
cp .env.example .env

# تعديل المتغيرات في .env
# أضف مفتاح Qoyod API الخاص بك
```

## التشغيل

### في بيئة التطوير:
```bash
npm run dev
```

### في بيئة الإنتاج:
```bash
npm start
```

سيشتغل التطبيق على: `http://localhost:3000`

## المسارات الأساسية

- `GET /` - معلومات التطبيق
- `GET /health` - فحص صحة الخادم

## النشر على Render

1. اذهب إلى https://render.com
2. سجل دخول بـ GitHub
3. أنشئ Web Service جديد
4. اختر المستودع `qoyod-bonus-backend`
5. أضف الإعدادات:
   - **Runtime:** Node
   - **Build Command:** npm install
   - **Start Command:** npm start
6. في Environment Variables أضف: `QOYOD_API_KEY=your_key`

## الترخيص

ISC