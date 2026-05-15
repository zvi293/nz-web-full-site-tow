# NZ-web — Premium Web Studio

אתר React/Vite פרימיום עם **Pre-Rendering (SSG)** ו-SEO ברמה גבוהה.
האתר לא מוגש לגוגל כ-SPA ריק — כל עמוד נבנה כ-HTML סטטי מלא וקריא.

## התקנה והרצה (פיתוח)

```bash
npm install
npm run dev
```

## בנייה לפרודקשן

```bash
npm run build
```

פקודת ה-build מריצה שלושה שלבים:

1. `vite build` — בניית ה-Client (JS/CSS עם hashing).
2. `vite build --ssr src/entry-server.jsx` — בניית bundle צד-שרת (זמני, נמחק בסוף).
3. `node prerender.mjs` — רינדור כל נתיב ל-HTML סטטי מלא.

התוצאה ב-`dist/`:

```
dist/index.html            →  /
dist/portfolio/index.html  →  /portfolio
dist/about/index.html      →  /about
dist/contact/index.html    →  /contact
```

כל קובץ כזה כולל את כל התוכן הסופי בתוך `#root` + תגיות SEO מלאות ב-`<head>`,
ולאחר טעינת ה-JS הוא עובר **hydration** והופך לאפליקציה אינטראקטיבית.

## איך זה לא נקרא כ-SPA

- **תוכן סטטי לכל נתיב** — גוגל מקבל HTML מלא, לא `<div id="root"></div>` ריק.
- **נתיבים אמיתיים** — `/`, `/portfolio`, `/about`, `/contact` (History API), לא state בלבד.
- **SEO סטטי ב-`<head>`** — title, description, canonical, hreflang, Open Graph,
  Twitter Cards ו-JSON-LD (`@graph`: Organization, WebSite, WebPage, BreadcrumbList, FAQPage)
  מוזרקים בזמן build — לא דרך JavaScript.
- **`sitemap.xml` + `robots.txt`** עם הנתיבים האמיתיים.
- Netlify מגיש את הקבצים הסטטיים לפני ה-redirect, וה-SPA fallback נשאר רק לנתיבים לא מוכרים.

## קבצים מרכזיים

- `src/App.jsx` — האתר, הקומפוננטות, ה-routing ו-`ROUTES` (מקור אמת ל-SEO).
- `src/main.jsx` — נקודת כניסה (hydrate אם הדף עבר pre-render, אחרת render רגיל).
- `src/entry-server.jsx` — נקודת כניסה צד-שרת (build-time בלבד).
- `src/seo.js` — בניית מטא-תגיות ו-JSON-LD לכל נתיב.
- `src/styles.css` — מערכת העיצוב (Dark · Luxurious · Neon).
- `prerender.mjs` — שלב ה-SSG שמייצר את עמודי ה-HTML הסטטיים.
- `index.html` — תבנית בסיס (כולל סמן `<!--app-head-->` שמוחלף ב-build).
- `public/` — `logo.svg`, `og-image.svg`, `site.webmanifest`, `sitemap.xml`, `robots.txt`.

## תיקון הבאנר הנגלל הקיים

הבאנר הנגלל המקורי נשמר ושודרג (לא נוסף באנר חדש): צבע אמיתי, קונטרסט, Glow,
מסגרת מדורגת וריווח תקין, מוגבל לרוחב מתאים ועובד היטב גם במובייל.
