import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Phone,
  MessageCircle,
  Globe,
  Rocket,
  Code2,
  ArrowLeft,
  Monitor,
  Mail,
  Menu,
  X,
  Briefcase,
  Users,
  ChevronDown,
  Check,
  Plus,
  Star,
  Sparkles,
  Search,
  PenTool,
  Cpu,
  TrendingUp,
  ShieldCheck,
  Zap,
  Clock,
  Layers,
  Target,
  Heart,
} from 'lucide-react';

/* ============================================================
   Constants & content
   ============================================================ */
export const CONTACT_INFO = Object.freeze({
  phone: '0587292029',
  whatsapp: '972587292029',
  email: 'nzweb295@gmail.com',
  site: 'https://nz-web.com/',
});

/* Default pre-filled WhatsApp message — opens ready-to-send when a visitor
   taps the floating icon or any "talk to us" WhatsApp button. */
const WHATSAPP_GREETING =
  'היי NZ-web! 👋 הגעתי דרך האתר ואשמח לשמוע פרטים על בניית אתר / מערכת.';

const WHATSAPP_URL = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
  WHATSAPP_GREETING
)}`;

const VIEWS = Object.freeze({
  HOME: 'home',
  PORTFOLIO: 'portfolio',
  ABOUT: 'about',
  CONTACT: 'contact',
  PRIVACY: 'privacy',
  ACCESSIBILITY: 'accessibility',
});

/* Canonical URL of THIS deployment (the agency site).
   CONTACT_INFO.site above points to the main brand site (nz-web.com). */
export const SITE_URL = 'https://nz-web-agency.netlify.app';

/* Single source of truth for routing + SEO metadata.
   Used by the app (client routing), useSEO, entry-server and prerender. */
export const ROUTES = Object.freeze([
  {
    path: '/',
    view: VIEWS.HOME,
    label: 'בית',
    title: 'NZ-web | סוכנות פרימיום לבניית אתרים ופיתוח מערכות Web',
    description:
      'NZ-web — סוכנות דיגיטל פרימיום לבניית אתרי תדמית יוקרתיים, דפי נחיתה ממירים ופיתוח מערכות Web מתקדמות. הופכים מבקרים ללקוחות משלמים.',
  },
  {
    path: '/portfolio',
    view: VIEWS.PORTFOLIO,
    label: 'עבודות',
    title: 'תיק עבודות נבחרות | NZ-web',
    description:
      'תיק העבודות של NZ-web — אתרי תדמית, חנויות אונליין, דפי נחיתה ומערכות Web. כל פרויקט נמדד בתוצאות עסקיות אמיתיות.',
  },
  {
    path: '/about',
    view: VIEWS.ABOUT,
    label: 'הסיפור שלנו',
    title: 'הסיפור שלנו | NZ-web — סוכנות דיגיטל פרימיום',
    description:
      'מי אנחנו ב-NZ-web — סוכנות פיתוח שמודדת את עצמה בשורת הרווח שלך. קוד נקי, עיצוב מרהיב, ארכיטקטורת SEO וליווי אישי.',
  },
  {
    path: '/contact',
    view: VIEWS.CONTACT,
    label: 'יצירת קשר',
    title: 'יצירת קשר | NZ-web',
    description:
      'מוכנים לשדרג את הנוכחות הדיגיטלית שלכם? צרו קשר עם NZ-web לשיחת אפיון — ללא עלות וללא התחייבות.',
  },
  {
    path: '/privacy-policy',
    view: VIEWS.PRIVACY,
    label: 'מדיניות פרטיות',
    nav: false,
    title: 'מדיניות פרטיות | NZ-web',
    description:
      'מדיניות הפרטיות של NZ-web מפרטת איזה מידע נאסף באתר, לאילו מטרות, למי הוא עשוי להימסר, כיצד הוא נשמר ומהן זכויות המשתמשים לפי הדין בישראל.',
  },
  {
    path: '/accessibility-statement',
    view: VIEWS.ACCESSIBILITY,
    label: 'הצהרת נגישות',
    nav: false,
    title: 'הצהרת נגישות | NZ-web',
    description:
      'הצהרת הנגישות של NZ-web מפרטת את התאמות הנגישות באתר, אופן השימוש בו, מגבלות ידועות ודרכי פנייה בנושא נגישות בהתאם לדין בישראל.',
  },
]);

const DEFAULT_ROUTE = ROUTES[0];

export const getRouteByPath = (pathname = '/') => {
  const clean = (pathname || '/').replace(/\/+$/, '') || '/';
  return ROUTES.find((route) => route.path === clean) || DEFAULT_ROUTE;
};

export const getRouteByView = (view) =>
  ROUTES.find((route) => route.view === view) || DEFAULT_ROUTE;

export const canonicalFor = (route) =>
  route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;

const NAV_LINKS = ROUTES.filter((route) => route.nav !== false).map((route) => ({
  id: route.view,
  label: route.label,
}));

const HERO_STATS = Object.freeze([
  { value: 120, suffix: '+', label: 'פרויקטים שהושקו' },
  { value: 98, suffix: '%', label: 'שביעות רצון לקוחות' },
  { value: 8, suffix: ' שנים', label: 'ניסיון בתעשייה' },
]);

const STATS = Object.freeze([
  { value: 120, suffix: '+', label: 'נכסים דיגיטליים שהושקו' },
  { value: 4.9, suffix: '★', label: 'דירוג ממוצע מלקוחות', decimals: 1 },
  { value: 1.3, suffix: 's', label: 'זמן טעינה ממוצע', decimals: 1 },
  { value: 24, suffix: '/7', label: 'ליווי ותמיכה שוטפת' },
]);

export const SERVICES = Object.freeze([
  {
    icon: Monitor,
    color: '#60a5fa',
    title: 'אתרי תדמית יוקרתיים',
    desc: 'עיצוב ופיתוח אתרים שמשדרים מעמד, בונים אמון תוך שניות ומספרים את סיפור המותג שלך בצורה שגורמת ללקוחות לרצות לעבוד דווקא איתך.',
    tags: ['UI/UX Design', 'אנימציות', 'Next.js'],
  },
  {
    icon: Rocket,
    color: '#c084fc',
    title: 'דפי נחיתה ממירים',
    desc: 'הנדסת המרות (CRO) טהורה — קופי חד, מהירות טעינה מטורפת ומבנה פסיכולוגי שהופך תקציב מדיה ללידים אמיתיים ולא לכסף שנשרף.',
    tags: ['A/B Testing', 'Speed', 'Lead Gen'],
  },
  {
    icon: Code2,
    color: '#818cf8',
    title: 'מערכות ואפליקציות Web',
    desc: 'פיתוח Custom מקצה לקצה — אפליקציות רשת, פלטפורמות SaaS ולוחות בקרה ארגוניים שבנויים לגדול איתך ולא להיתקע אחרי שנה.',
    tags: ['React.js', 'Node.js', 'Databases'],
  },
]);

const PROCESS = Object.freeze([
  {
    icon: Search,
    step: '01',
    title: 'אפיון אסטרטגי',
    desc: 'יורדים לעומק העסק, הקהל והמתחרים. מגדירים יחד יעדים מדידים עוד לפני שורת קוד אחת.',
  },
  {
    icon: PenTool,
    step: '02',
    title: 'עיצוב UX/UI',
    desc: 'מעצבים חוויה שמובילה את המבקר ליעד — כל מסך, צבע וכפתור משרת מטרה עסקית.',
  },
  {
    icon: Cpu,
    step: '03',
    title: 'פיתוח בקוד נקי',
    desc: 'בונים מהיר, מאובטח ונקי — עם ארכיטקטורת SEO מובנית ותשתית שמחזיקה לאורך זמן.',
  },
  {
    icon: TrendingUp,
    step: '04',
    title: 'השקה ואופטימיזציה',
    desc: 'עולים לאוויר, מודדים, משפרים. הליווי לא נגמר בהשקה — הוא רק מתחיל שם.',
  },
]);

const PROJECTS = Object.freeze([
  {
    title: 'Dashboard פיננסי',
    category: 'מערכת Web',
    filter: 'system',
    tech: 'React · Recharts · Node',
    result: 'שיפור של +38% במהירות התפעול היומית',
    visual: 'slate',
  },
  {
    title: 'משרד עורכי דין יוקרתי',
    category: 'אתר תדמית',
    filter: 'site',
    tech: 'Next.js · GSAP',
    result: 'פי 3 יותר פניות אורגניות מגוגל',
    visual: 'navy',
  },
  {
    title: 'חנות מותג תכשיטים',
    category: 'חנות אונליין',
    filter: 'store',
    tech: 'Shopify Plus · Theme מותאם',
    result: '+52% המרה בעמוד העגלה',
    visual: 'violet',
  },
  {
    title: 'קמפיין נדל״ן בינלאומי',
    category: 'דף נחיתה',
    filter: 'landing',
    tech: 'React · Framer Motion',
    result: 'ROAS 6.2 לאורך כל הקמפיין',
    visual: 'emerald',
  },
  {
    title: 'פלטפורמת קורסים דיגיטלית',
    category: 'מערכת Web',
    filter: 'system',
    tech: 'Next.js · Node · Postgres',
    result: 'מעל 12K משתמשים פעילים בחודש',
    visual: 'amber',
  },
  {
    title: 'מותג אופנה Headless',
    category: 'חנות אונליין',
    filter: 'store',
    tech: 'Headless Commerce · React',
    result: '+44% בהכנסה החודשית הממוצעת',
    visual: 'rose',
  },
]);

const PORTFOLIO_FILTERS = Object.freeze([
  { id: 'all', label: 'הכל' },
  { id: 'site', label: 'אתרי תדמית' },
  { id: 'store', label: 'חנויות אונליין' },
  { id: 'system', label: 'מערכות Web' },
  { id: 'landing', label: 'דפי נחיתה' },
]);

const TESTIMONIALS = Object.freeze([
  {
    quote:
      'תוך חודש מההשקה ראינו <b>פי 3 פניות</b> מהאתר הקודם. הם לא בנו לנו אתר — הם בנו לנו מכונת לידים.',
    name: 'דניאל אבני',
    role: 'מנכ״ל, אבני נדל״ן',
    initials: 'דא',
    grad: 'linear-gradient(135deg,#3b82f6,#6366f1)',
  },
  {
    quote:
      'העבודה הכי מקצועית שקיבלנו אי פעם. <b>כל פרט נחשב</b>, וזמני התגובה היו מטורפים. ממליצים בלי היסוס.',
    name: 'מאיה לוי',
    role: 'מייסדת, Studio M',
    initials: 'מל',
    grad: 'linear-gradient(135deg,#a855f7,#ec4899)',
  },
  {
    quote:
      'החנות החדשה טסה. <b>זמן טעינה של שנייה</b> ועלייה ברורה במכירות כבר בשבוע הראשון. שווה כל שקל.',
    name: 'יוסי כהן',
    role: 'בעלים, מותג אופנה',
    initials: 'יכ',
    grad: 'linear-gradient(135deg,#38bdf8,#22d3ee)',
  },
]);

export const FAQS = Object.freeze([
  {
    q: 'כמה זמן לוקח לבנות אתר?',
    a: 'דף נחיתה ממוקד יכול לעלות לאוויר תוך 7–10 ימי עבודה. אתר תדמית מלא נע בין 3 ל-5 שבועות, ומערכות Web מורכבות מתוכננות לפי אפיון. בכל מקרה — תקבלו לוח זמנים ברור ומחייב כבר בתחילת הדרך.',
  },
  {
    q: 'כמה זה עולה?',
    a: 'כל פרויקט מתומחר לפי היקף ומטרות, ואנחנו שקופים לגמרי. אחרי שיחת אפיון קצרה תקבלו הצעת מחיר מסודרת ומפורטת — בלי הפתעות ובלי עלויות נסתרות בהמשך.',
  },
  {
    q: 'האם האתר יהיה מותאם לגוגל ולמובייל?',
    a: 'בהחלט. כל אתר נבנה עם ארכיטקטורת SEO מובנית, מהירות טעינה גבוהה והתאמה מושלמת לכל מסך — מהדסקטופ ועד הטלפון. זה לא תוסף, זה חלק מהבנייה עצמה.',
  },
  {
    q: 'מה קורה אחרי שהאתר עולה לאוויר?',
    a: 'הליווי לא נגמר בהשקה. אנחנו זמינים לתמיכה שוטפת, עדכונים ושיפורים, ועוזרים לכם למדוד ביצועים ולשפר תוצאות לאורך זמן. אתם לא נשארים לבד.',
  },
  {
    q: 'אני כבר עם אתר קיים — אפשר רק לשדרג?',
    a: 'כן. הרבה לקוחות מגיעים אלינו עם אתר שכבר לא משרת אותם. נבחן יחד מה שווה לשמר ומה צריך להחליף, ונבנה תוכנית שדרוג שתשמור על מה שעובד ותתקן את מה שלא.',
  },
  {
    q: 'איך מתחילים?',
    a: 'פשוט מאוד — משאירים פרטים בטופס או שולחים הודעת וואטסאפ. נחזור אליכם לשיחת אפיון קצרה (ללא עלות וללא התחייבות), ומשם נדע בדיוק איך לקדם אתכם.',
  },
]);

/* ============================================================
   Helpers
   ============================================================ */
const createAbsoluteUrl = (path = '') => {
  try {
    return new URL(path, CONTACT_INFO.site).toString();
  } catch {
    return CONTACT_INFO.site;
  }
};

const setOrCreateMeta = (selectorName, content, attribute = 'name') => {
  if (typeof document === 'undefined') return;
  let meta = document.querySelector(`meta[${attribute}="${selectorName}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, selectorName);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
};

const setOrCreateLink = (rel, href) => {
  if (typeof document === 'undefined') return;
  let link = document.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
};

const setOrCreateJsonLd = (id, payload) => {
  if (typeof document === 'undefined') return;
  let script = document.querySelector(
    `script[type="application/ld+json"][data-nz-schema="${id}"]`
  );
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-nz-schema', id);
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(payload);
};

const buildWhatsAppUrl = ({ name, phone, message }) => {
  const text = [
    'היי NZ-web! הגעתי מהאתר ואשמח לדבר.',
    '',
    `*שם:* ${name}`,
    `*טלפון:* ${phone}`,
    '*מה אני צריך:*',
    message,
  ].join('\n');
  return `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
};

/* ============================================================
   Hooks
   ============================================================ */
/* Keeps the critical, per-route tags in sync during client-side navigation.
   The full static SEO payload (keywords, geo, OG image, JSON-LD, hreflang...)
   is pre-rendered into every HTML file at build time — see prerender.mjs. */
const useSEO = (currentView) => {
  useEffect(() => {
    const route = getRouteByView(currentView);
    const canonicalUrl = canonicalFor(route);

    document.documentElement.lang = 'he';
    document.documentElement.dir = 'rtl';
    document.title = route.title;

    setOrCreateLink('canonical', canonicalUrl);
    setOrCreateMeta('description', route.description);
    setOrCreateMeta('og:title', route.title, 'property');
    setOrCreateMeta('og:description', route.description, 'property');
    setOrCreateMeta('og:url', canonicalUrl, 'property');
    setOrCreateMeta('twitter:title', route.title);
    setOrCreateMeta('twitter:description', route.description);
  }, [currentView]);
};

const useReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }
    const node = ref.current;
    if (!node) {
      setIsVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

const Reveal = ({ children, delay = 0, className = '' }) => {
  const [ref, isVisible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const useCountUp = (target, isActive, { decimals = 0, duration = 1600 } = {}) => {
  const [value, setValue] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!isActive) return undefined;
    if (typeof window === 'undefined') {
      setValue(target);
      return undefined;
    }
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) {
      setValue(target);
      return undefined;
    }
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, isActive, duration]);

  return decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
};

const Counter = ({ value, suffix = '', decimals = 0, isActive }) => {
  const display = useCountUp(value, isActive, { decimals });
  return (
    <>
      {display}
      {suffix}
    </>
  );
};

/* Authentic WhatsApp glyph (speech bubble + handset).
   lucide-react ships no brand icons, so we render the official mark. */
const WhatsAppIcon = ({ size = 24, className = '' }) => (
  <svg
    className={`wa-glyph ${className}`}
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M16.003 0h-.006C7.17 0 .003 7.17.003 16c0 3.5 1.128 6.744 3.046 9.378L1.05 31.4l6.232-1.992A15.9 15.9 0 0 0 16.003 32C24.833 32 32 24.83 32 16S24.833 0 16.003 0Zm9.318 22.594c-.386 1.09-1.92 1.995-3.143 2.26-.836.178-1.928.32-5.604-1.204-4.7-1.948-7.726-6.724-7.962-7.034-.226-.31-1.9-2.53-1.9-4.826 0-2.296 1.166-3.424 1.636-3.904.386-.394.846-.574 1.328-.574.156 0 .296.008.424.014.382.016.574.038.826.64.314.756 1.078 2.652 1.17 2.844.094.192.188.452.06.762-.12.32-.226.46-.452.724-.226.264-.44.466-.666.75-.206.246-.44.51-.18.96.26.44 1.156 1.906 2.482 3.088 1.71 1.524 3.094 2.006 3.59 2.214.37.154.81.118 1.08-.17.342-.37.764-.984 1.194-1.59.306-.434.692-.488 1.098-.336.414.142 2.6 1.226 3.052 1.452.452.226.752.336.866.526.112.19.112 1.09-.274 2.18Z" />
  </svg>
);

/* ============================================================
   App
   ============================================================ */
export default function App({ initialPath }) {
  const startPath =
    initialPath ||
    (typeof window !== 'undefined' ? window.location.pathname : '/');

  const [currentView, setCurrentView] = useState(
    () => getRouteByPath(startPath).view
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useSEO(currentView);

  const navigateTo = useCallback((view) => {
    if (!Object.values(VIEWS).includes(view)) return;
    setCurrentView(view);
    if (typeof window !== 'undefined') {
      const route = getRouteByView(view);
      if (window.location.pathname !== route.path) {
        window.history.pushState({ view }, '', route.path);
      }
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getRouteByPath(window.location.pathname).view);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop || 0;
      const scrollHeight = Math.max(
        document.documentElement.scrollHeight -
          document.documentElement.clientHeight,
        0
      );
      setScrollProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0);
      setIsScrolled(scrollTop > 24);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const prevBodyOverflowX = document.body.style.overflowX;
    const prevHtmlOverflowX = document.documentElement.style.overflowX;
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflowX = prevBodyOverflowX;
      document.documentElement.style.overflowX = prevHtmlOverflowX;
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  }, [currentView]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <div className="app">
      <div className="bg-noise" aria-hidden="true" />
      <div className="ambient-glows" aria-hidden="true">
        <div className="glow-blob blue" />
        <div className="glow-blob violet" />
        <div className="glow-blob cyan" />
      </div>

      <div
        className="progress-bar"
        style={{
          width: `${Math.min(Math.max(scrollProgress * 100, 0), 100)}%`,
        }}
        aria-hidden="true"
      />

      <CustomCursor />

      <Header
        currentView={currentView}
        navigateTo={navigateTo}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isScrolled={isScrolled}
      />

      <main className="main" id="main-content">
        {currentView === VIEWS.HOME && <HomeView navigateTo={navigateTo} />}
        {currentView === VIEWS.PORTFOLIO && (
          <PortfolioView navigateTo={navigateTo} />
        )}
        {currentView === VIEWS.ABOUT && <AboutView navigateTo={navigateTo} />}
        {currentView === VIEWS.CONTACT && <ContactView />}
        {currentView === VIEWS.PRIVACY && <PrivacyPolicyView />}
        {currentView === VIEWS.ACCESSIBILITY && <AccessibilityView />}
      </main>

      <Footer navigateTo={navigateTo} />

      {!isMenuOpen && <FloatingActions />}
    </div>
  );
}

/* ============================================================
   Custom cursor
   ============================================================ */
function CustomCursor() {
  const dotRef = useRef(null);
  const [hot, setHot] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const node = dotRef.current;
    if (!node) return undefined;

    let raf = 0;
    const move = (event) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        node.style.left = `${event.clientX}px`;
        node.style.top = `${event.clientY}px`;
      });
      const target = event.target;
      const interactive =
        target.closest('a, button, input, textarea, [role="button"], .work-card');
      setHot(Boolean(interactive));
    };

    window.addEventListener('mousemove', move, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className={`custom-cursor ${hot ? 'hot' : ''}`}
      aria-hidden="true"
    >
      <div />
    </div>
  );
}

/* ============================================================
   Header
   ============================================================ */
function Header({ currentView, navigateTo, isMenuOpen, setIsMenuOpen, isScrolled }) {
  const handleNavigate = useCallback(
    (view) => {
      navigateTo(view);
      setIsMenuOpen(false);
    },
    [navigateTo, setIsMenuOpen]
  );

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-row">
          <button
            type="button"
            className="logo"
            onClick={() => handleNavigate(VIEWS.HOME)}
            aria-label="מעבר לדף הבית של NZ-web"
          >
            <span className="logo-mark font-en">NZ</span>
            <span className="logo-text font-en">
              NZ<b>-web</b>
            </span>
          </button>

          <nav className="desktop-nav" aria-label="ניווט ראשי">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavigate(link.id)}
                className={`nav-btn ${currentView === link.id ? 'active' : ''}`}
                aria-current={currentView === link.id ? 'page' : undefined}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="header-actions">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-md wa-header"
            >
              <WhatsAppIcon size={17} />
              <span>בואו נדבר</span>
            </a>
            <button
              type="button"
              className="menu-toggle"
              onClick={() => setIsMenuOpen((value) => !value)}
              aria-label={isMenuOpen ? 'סגירת תפריט' : 'פתיחת תפריט'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`mobile-menu ${isMenuOpen ? 'open' : 'closed'}`}
      >
        <span className="mobile-kicker">תפריט ניווט</span>
        <nav className="mobile-nav" aria-label="ניווט מובייל">
          {NAV_LINKS.map((link, index) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavigate(link.id)}
              className={currentView === link.id ? 'active' : ''}
              aria-current={currentView === link.id ? 'page' : undefined}
            >
              {link.label}
              <span className="num font-en">
                0{index + 1}
              </span>
            </button>
          ))}
        </nav>
        <div className="mobile-cta">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wa btn-lg"
          >
            <WhatsAppIcon size={20} /> שיחת וואטסאפ
          </a>
          <a href={`tel:${CONTACT_INFO.phone}`} className="btn btn-ghost btn-lg">
            <Phone size={20} /> חייגו עכשיו
          </a>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   Home view
   ============================================================ */
function HomeView({ navigateTo }) {
  return (
    <article>
      <Hero navigateTo={navigateTo} />
      <Marquee />
      <StatsBand />
      <ServicesSection navigateTo={navigateTo} />
      <ProcessSection />
      <WorkPreview navigateTo={navigateTo} />
      <TestimonialsSection />
      <FaqSection />
      <ConversionCTA />
    </article>
  );
}

function Hero({ navigateTo }) {
  return (
    <section className="hero">
      <div className="hero-bg-word font-en" aria-hidden="true">
        DIGITAL
      </div>
      <div className="container hero-inner">
        <Reveal delay={80}>
          <span className="badge">
            <span className="ping-dot" aria-hidden="true" />
            סוכנות הדיגיטל שמרימה עסקים לליגה הבאה
          </span>
        </Reveal>

        <Reveal delay={160}>
          <h1>
            לא בונים אתרים.
            <br />
            <span className="text-gradient">בונים יתרון תחרותי.</span>
          </h1>
        </Reveal>

        <Reveal delay={240}>
          <p className="sub">
            ב־<strong className="font-en">NZ-web</strong> אנחנו מפתחים נכסים
            דיגיטליים שעובדים בשבילך מסביב לשעון — אתרי תדמית, חנויות ומערכות Web
            שהופכים מבקרים ללקוחות משלמים.
          </p>
        </Reveal>

        <Reveal delay={320}>
          <div className="hero-actions">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              <WhatsAppIcon size={20} /> קבלו הצעת מחיר
            </a>
            <button
              type="button"
              onClick={() => navigateTo(VIEWS.PORTFOLIO)}
              className="btn btn-ghost btn-lg"
            >
              <Briefcase size={20} /> לתיק העבודות
            </button>
          </div>
        </Reveal>

        <Reveal delay={420}>
          <div className="hero-stats">
            {HERO_STATS.map((stat, index) => (
              <React.Fragment key={stat.label}>
                {index > 0 && (
                  <span className="hero-stat-divider" aria-hidden="true" />
                )}
                <div className="hero-stat">
                  <div className="v font-en">
                    <span>{stat.value}</span>
                    {stat.suffix}
                  </div>
                  <div className="l">{stat.label}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </Reveal>

        <Reveal delay={520}>
          <div className="scroll-cue" aria-hidden="true">
            <ChevronDown size={28} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    'REACT.JS',
    'NEXT.JS',
    'TAILWIND CSS',
    'NODE.JS',
    'TYPESCRIPT',
    'SHOPIFY',
  ];
  const loop = [...items, ...items];
  return (
    <Reveal>
      <div className="marquee-wrap">
        <div className="marquee font-en" aria-label="טכנולוגיות ושירותים">
          {loop.map((item, index) => (
            <React.Fragment key={`${item}-${index}`}>
              <span>{item}</span>
              <span className="dot" aria-hidden="true">
                •
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function StatsBand() {
  const [ref, isVisible] = useReveal();
  return (
    <section className="section tight">
      <div className="container">
        <div
          ref={ref}
          className={`reveal ${isVisible ? 'visible' : ''} stats-band`}
        >
          {STATS.map((stat) => (
            <div className="stat-cell" key={stat.label}>
              <div className="v font-en">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals || 0}
                  isActive={isVisible}
                />
              </div>
              <div className="l">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ navigateTo }) {
  return (
    <section className="section" id="services">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="head-text">
              <div className="kicker">
                <Layers size={15} /> תחומי ההתמחות שלנו
              </div>
              <h2>
                ארסנל פתרונות
                <br />
                שמקדם את העסק שלך
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigateTo(VIEWS.CONTACT)}
              className="btn btn-ghost btn-md"
            >
              לתיאום שיחת ייעוץ <ArrowLeft size={17} />
            </button>
          </div>
        </Reveal>

        <div className="cards-grid">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={index * 110}>
                <div className="service-card">
                  <span className="service-num font-en">
                    0{index + 1}
                  </span>
                  <div className="icon-box">
                    <Icon size={30} color={service.color} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <div className="tag-row">
                    {service.tags.map((tag) => (
                      <span key={tag} className="tag font-en">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="section tight" id="process">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="head-text">
              <div className="kicker">
                <Target size={15} /> איך אנחנו עובדים
              </div>
              <h2>תהליך מסודר, ללא הפתעות</h2>
            </div>
            <p className="lead">
              ארבעה שלבים ברורים מהרגע הראשון ועד ההשקה — אתם תמיד יודעים איפה
              הפרויקט עומד ומה השלב הבא.
            </p>
          </div>
        </Reveal>

        <div className="process-grid">
          {PROCESS.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <Reveal key={stage.step} delay={index * 100}>
                <div className="process-step">
                  <div className="icon-box" style={{ marginBottom: 18 }}>
                    <Icon size={26} color="#7dd3fc" />
                  </div>
                  <span className="step-num font-en">שלב {stage.step}</span>
                  <div className="step-bar" />
                  <h3>{stage.title}</h3>
                  <p>{stage.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WorkPreview({ navigateTo }) {
  const featured = PROJECTS.slice(0, 4);
  return (
    <section className="section" id="work">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="head-text">
              <div className="kicker">
                <Briefcase size={15} /> עבודות נבחרות
              </div>
              <h2>תוצאות, לא רק פיקסלים</h2>
            </div>
            <button
              type="button"
              onClick={() => navigateTo(VIEWS.PORTFOLIO)}
              className="btn btn-ghost btn-md"
            >
              לכל העבודות <ArrowLeft size={17} />
            </button>
          </div>
        </Reveal>

        <div className="work-grid">
          {featured.map((project, index) => (
            <Reveal key={project.title} delay={index * 90}>
              <WorkCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({ project }) {
  return (
    <div className="work-card" role="button" tabIndex={0}>
      <div className={`work-visual ${project.visual}`} aria-hidden="true">
        <div className="dots" />
        <div className="ring" />
        <div className="ring two" />
      </div>
      <div className="work-overlay" aria-hidden="true" />
      <div className="work-content">
        <div className="work-cat">
          <span className="d" /> {project.category}
        </div>
        <h3>{project.title}</h3>
        <div className="work-meta">
          <span className="work-pill font-en">
            <Code2 size={14} /> {project.tech}
          </span>
        </div>
        <div className="work-result">
          <TrendingUp
            size={14}
            style={{ display: 'inline', verticalAlign: '-2px', marginLeft: 6 }}
          />
          <b>{project.result}</b>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section className="section tight" id="testimonials">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="head-text">
              <div className="kicker">
                <Heart size={15} /> לקוחות מספרים
              </div>
              <h2>הם כבר עברו את הקפיצה</h2>
            </div>
            <p className="lead">
              לא מבטיחים — מראים. הנה מה שלקוחות אומרים אחרי שהאתר עלה לאוויר.
            </p>
          </div>
        </Reveal>

        <div className="tst-grid">
          {TESTIMONIALS.map((item, index) => (
            <Reveal key={item.name} delay={index * 110}>
              <div className="tst-card">
                <div className="tst-stars" aria-label="חמישה כוכבים">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} size={16} fill="currentColor" />
                  ))}
                </div>
                <p
                  className="tst-quote"
                  dangerouslySetInnerHTML={{ __html: item.quote }}
                />
                <div className="tst-author">
                  <span
                    className="tst-avatar"
                    style={{ background: item.grad }}
                    aria-hidden="true"
                  >
                    {item.initials}
                  </span>
                  <span>
                    <span className="tst-name">{item.name}</span>
                    <br />
                    <span className="tst-role">{item.role}</span>
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="section" id="faq">
      <div className="container" style={{ maxWidth: 880 }}>
        <Reveal>
          <div className="section-head" style={{ marginBottom: 44 }}>
            <div className="head-text">
              <div className="kicker">
                <MessageCircle size={15} /> שאלות נפוצות
              </div>
              <h2>כל מה שרציתם לדעת</h2>
            </div>
          </div>
        </Reveal>

        <div className="faq-list">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={item.q} delay={index * 60}>
                <div className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="faq-q"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    {item.q}
                    <span className="ic" aria-hidden="true">
                      <Plus size={17} />
                    </span>
                  </button>
                  <div
                    className="faq-a"
                    style={{ maxHeight: isOpen ? 240 : 0 }}
                  >
                    <div className="faq-a-inner">{item.a}</div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ConversionCTA() {
  return (
    <section className="section tight" id="cta">
      <div className="container">
        <Reveal>
          <div className="cta-shell">
            <div className="cta-glow" aria-hidden="true" />
            <div className="cta-box">
              <h2>הגיע הזמן להוביל את השוק.</h2>
              <p>
                המתחרים שלך כבר מקודמים בדיגיטל. בואו נבנה לך נכס שעוקף אותם
                בסיבוב — שיחת אפיון ראשונה ללא עלות וללא התחייבות.
              </p>
              <div className="cta-actions">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-wa btn-lg"
                >
                  <WhatsAppIcon size={20} /> דברו איתנו בוואטסאפ
                </a>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="btn btn-white btn-lg"
                >
                  <Phone size={19} /> חייגו עכשיו
                </a>
              </div>
              <div className="cta-trust">
                <span>
                  <Check size={15} /> תגובה תוך 24 שעות
                </span>
                <span>
                  <Check size={15} /> הצעת מחיר שקופה
                </span>
                <span>
                  <Check size={15} /> ללא התחייבות
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   Portfolio view
   ============================================================ */
function PortfolioView({ navigateTo }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const filtered = useMemo(
    () =>
      activeFilter === 'all'
        ? PROJECTS
        : PROJECTS.filter((project) => project.filter === activeFilter),
    [activeFilter]
  );

  return (
    <article className="page">
      <Reveal>
        <div className="page-head">
          <h1 className="page-title">
            תיק <span className="text-gradient">עבודות</span>
          </h1>
          <p className="page-sub">
            הצצה לחלק מהנכסים הדיגיטליים שבנינו — כל פרויקט כאן נמדד בתוצאות
            עסקיות, לא רק בעיצוב יפה.
          </p>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="filter-row" role="tablist" aria-label="סינון עבודות">
          {PORTFOLIO_FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter.id}
              className={`filter-chip ${
                activeFilter === filter.id ? 'active' : ''
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="work-grid">
        {filtered.map((project, index) => (
          <Reveal key={project.title} delay={index * 80}>
            <WorkCard project={project} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div style={{ marginTop: 72 }}>
          <ConversionCTA />
        </div>
      </Reveal>
    </article>
  );
}

/* ============================================================
   About view
   ============================================================ */
const VALUES = Object.freeze([
  {
    icon: ShieldCheck,
    title: 'SEO וסטנדרט בינלאומי',
    desc: 'כל אתר נבנה עם אופטימיזציה מלאה לגוגל ולמהירות — יתרון אמיתי על המתחרים.',
  },
  {
    icon: Zap,
    title: 'מהירות מטורפת',
    desc: 'קוד נקי וטעון לקראת ביצועים. אתר מהיר = יותר המרות ופחות נטישה.',
  },
  {
    icon: Users,
    title: 'שותפות אסטרטגית',
    desc: 'ליווי מלא משלב האפיון, דרך העיצוב והפיתוח ועד הרבה אחרי ההשקה.',
  },
]);

function AboutView({ navigateTo }) {
  return (
    <article className="page narrow">
      <Reveal>
        <div className="page-head">
          <h1 className="page-title">
            הסיפור של <span className="text-gradient font-en">NZ-web</span>
          </h1>
          <p className="page-sub">
            סוכנות פיתוח שמודדת את עצמה בשורת הרווח שלך — לא במספר הפרסים על הקיר.
          </p>
        </div>
      </Reveal>

      <div className="about-hero">
        <Reveal delay={120}>
          <div className="about-card">
            <h2>
              אתר אינטרנט הוא לא כרטיס ביקור.
              <br />
              הוא איש המכירות הכי חזק שלך.
            </h2>
            <p>
              <b>
                הכל התחיל מתשוקה בלתי מתפשרת לעיצוב, לקוד ולקידום עסקים.
              </b>{' '}
              אנחנו ב־NZ-web מאמינים שאתר טוב לא נמדד ב״כמה הוא יפה״, אלא בכמה
              לקוחות הוא מביא ובכמה כסף הוא מכניס.
            </p>
            <p>
              החזון שלנו הוא לקחת עסקים ולהטיס אותם קדימה בעזרת פתרונות דיגיטל —
              אתרים מהירים, מבוססי קוד נקי, עם ארכיטקטורת SEO שמאפשרת דירוג גבוה
              במנועי החיפוש ומביאה תנועה אורגנית איכותית.
            </p>
            <p>
              כל פרויקט מתחיל בהבנה עמוקה של העסק שלך, ממשיך בעיצוב חוויה שמובילה
              לפעולה, ונגמר בנכס דיגיטלי שאתה גאה לשלוח אליו לקוחות.
            </p>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <div className="about-side">
            <div className="about-mini">
              <div className="v font-en">120+</div>
              <div className="l">פרויקטים שהושקו בהצלחה</div>
            </div>
            <div className="about-mini">
              <div className="v font-en">8</div>
              <div className="l">שנות ניסיון בתעשייה</div>
            </div>
            <div className="about-mini">
              <div className="v font-en">4.9★</div>
              <div className="l">דירוג ממוצע מלקוחות</div>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={120}>
        <div className="kicker" style={{ marginTop: 64 }}>
          <Sparkles size={15} /> מה מנחה אותנו
        </div>
      </Reveal>

      <div className="values-grid">
        {VALUES.map((value, index) => {
          const Icon = value.icon;
          return (
            <Reveal key={value.title} delay={index * 100}>
              <div className="value-card">
                <div className="value-icon">
                  <Icon size={24} />
                </div>
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={140}>
        <div style={{ marginTop: 72 }}>
          <ConversionCTA />
        </div>
      </Reveal>
    </article>
  );
}

/* ============================================================
   Contact view
   ============================================================ */
function ContactView() {
  const formRef = useRef(null);

  const handleFormSubmit = useCallback((event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const message = String(formData.get('message') || '').trim();

    if (!name || !phone || !message) return;

    window.open(
      buildWhatsAppUrl({ name, phone, message }),
      '_blank',
      'noopener,noreferrer'
    );
    formRef.current?.reset();
  }, []);

  return (
    <article className="page">
      <Reveal>
        <div className="page-head">
          <h1 className="page-title">
            בואו <span className="text-gradient">נתחיל</span>
          </h1>
          <p className="page-sub">
            מוכנים לשדרג את הנוכחות הדיגיטלית שלכם? השאירו פרטים ונחזור אליכם
            לשיחת אפיון — ללא עלות וללא התחייבות.
          </p>
        </div>
      </Reveal>

      <div className="contact-grid">
        <div className="contact-cards">
          <Reveal delay={120}>
            <div className="contact-card">
              <div className="contact-icon">
                <Mail color="#60a5fa" size={26} />
              </div>
              <h3>אימייל ישיר</h3>
              <p>להצעות מחיר, אפיון פרויקטים ושיתופי פעולה.</p>
              <a href={`mailto:${CONTACT_INFO.email}`} className="font-en">
                {CONTACT_INFO.email}
              </a>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="contact-card">
              <div className="contact-icon">
                <Phone color="#4ade80" size={26} />
              </div>
              <h3>טלפון / וואטסאפ</h3>
              <p>זמינים בימים א׳–ה׳ למענה מהיר ואישי.</p>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="font-en"
                dir="ltr"
              >
                {CONTACT_INFO.phone}
              </a>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <div className="contact-hours">
              <Clock size={18} color="#7dd3fc" />
              <span>
                שעות פעילות: <b>ראשון–חמישי, 09:00–18:00</b>
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="form-card">
            <h3>השארת פרטים מהירה</h3>
            <p>
              מילוי הטופס פותח שיחת וואטסאפ אישית ישירות עם מפתח מהצוות — בלי
              מוקדים ובלי המתנה.
            </p>

            <form ref={formRef} className="form" onSubmit={handleFormSubmit}>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">שם מלא</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="ישראל ישראלי"
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="phone">טלפון נייד</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="050-0000000"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="message">במה נוכל לעזור?</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="אני מעוניין באתר תדמית / חנות אונליין / מערכת..."
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                <WhatsAppIcon size={22} /> שליחה בוואטסאפ
              </button>
              <p className="form-note">
                הפרטים שלך נשארים בינינו ומשמשים רק ליצירת קשר.
              </p>
            </form>
          </div>
        </Reveal>
      </div>
    </article>
  );
}

/* ============================================================
   Legal pages
   ============================================================ */
const LAST_LEGAL_UPDATE = '15 במאי 2026';

const PRIVACY_SECTIONS = Object.freeze([
  {
    title: 'כללי וזהות בעל האתר',
    body: [
      'מדיניות פרטיות זו נועדה להסביר כיצד NZ-web ("האתר", "אנחנו") אוספת, משתמשת, שומרת ומגנה על מידע אישי של מבקרים, מתעניינים ולקוחות הפונים דרך האתר.',
      `בעל השליטה במידע לצורך פניות המתקבלות באתר הוא NZ-web. ניתן ליצור קשר בנושא פרטיות בדוא"ל ${CONTACT_INFO.email} או בטלפון ${CONTACT_INFO.phone}.`,
      'השימוש באתר מהווה הסכמה למדיניות זו, בכפוף לכל דין. אם אינך מסכים למדיניות, אין למסור פרטים אישיים דרך האתר.',
    ],
  },
  {
    title: 'איזה מידע אנו אוספים',
    body: [
      'מידע שנמסר ביוזמתך: שם, מספר טלפון, כתובת דוא"ל, תוכן הודעה וכל פרט נוסף שתבחר למסור בטופס, בשיחת וואטסאפ, בדוא"ל או בטלפון.',
      'מידע טכני בסיסי: כתובת IP, סוג דפדפן, סוג מכשיר, מערכת הפעלה, דפים שנצפו, זמני ביקור ונתונים טכניים הנדרשים לאבטחה, תפעול תקין ושיפור האתר.',
      'מידע עסקי במסגרת התקשרות: צרכי הפרויקט, פרטי חברה או עסק, היסטוריית פניות, הצעות מחיר, חשבוניות, מסמכי אפיון והתכתבויות שירות.',
    ],
  },
  {
    title: 'מטרות השימוש במידע',
    body: [
      'מענה לפניות, תיאום שיחות אפיון, הכנת הצעות מחיר ומתן שירותי בניית אתרים, פיתוח, תחזוקה ושיווק דיגיטלי.',
      'ניהול קשרי לקוחות, תמיכה, תיעוד התקשרויות, עמידה בהתחייבויות חוזיות ושיפור איכות השירות.',
      'אבטחת האתר, מניעת שימוש לרעה, איתור תקלות, ניתוח שימושים כלליים ושיפור חוויית המשתמש.',
      'עמידה בדרישות הדין, לרבות דיני הגנת הפרטיות, דיני מס, הנהלת חשבונות, שמירת מסמכים וניהול הליכים במקרה הצורך.',
    ],
  },
  {
    title: 'הבסיס למסירת המידע',
    body: [
      'אינך חייב למסור מידע אישי לפי חוק, אולם ללא מסירת פרטים מסוימים ייתכן שלא נוכל לחזור אליך, לספק הצעת מחיר או לתת שירות.',
      'מסירת פרטים בטופס או בערוץ יצירת קשר נעשית מרצונך החופשי ולשם טיפול בפנייתך. שימושים נוספים, כגון דיוור שיווקי, ייעשו רק ככל שקיים בסיס חוקי מתאים או הסכמה כנדרש.',
    ],
  },
  {
    title: 'מסירת מידע לצדדים שלישיים',
    body: [
      'אנו לא מוכרים מידע אישי. מידע עשוי להימסר לספקי שירות הדרושים לתפעול האתר והשירות, כגון אחסון, אבטחה, דוא"ל, וואטסאפ, מערכות ניהול לקוחות, הנהלת חשבונות וספקים טכנולוגיים המסייעים לנו במתן השירות.',
      'מידע עשוי להימסר גם אם הדבר נדרש לפי דין, צו שיפוטי, דרישת רשות מוסמכת, הגנה על זכויותינו, גביית חוב, מניעת נזק או טיפול במחלוקת.',
      'כאשר הפנייה מתבצעת באמצעות WhatsApp, דוא"ל או שירות חיצוני אחר, יחולו בנוסף תנאי השימוש ומדיניות הפרטיות של אותו שירות.',
    ],
  },
  {
    title: 'עוגיות, מדידה ושירותים חיצוניים',
    body: [
      'האתר עשוי להשתמש בעוגיות או בטכנולוגיות דומות לצורך תפעול תקין, אבטחה, שמירת העדפות, מדידת ביצועים ושיפור חוויית השימוש.',
      'חלק מהמשאבים באתר עשויים להיטען מספקים חיצוניים, לרבות שירותי אחסון, פונטים, תשתיות תקשורת וכלי מדידה ככל שיוטמעו באתר.',
      'ניתן לחסום או למחוק עוגיות דרך הגדרות הדפדפן. חסימה מלאה עשויה לפגוע בחלק מהפונקציות באתר.',
    ],
  },
  {
    title: 'אבטחת מידע ושמירת מידע',
    body: [
      'אנו נוקטים אמצעי אבטחה סבירים ומקובלים כדי לצמצם סיכונים של גישה בלתי מורשית, שימוש לרעה, שינוי, אובדן או חשיפה של מידע אישי.',
      'מידע נשמר למשך הזמן הדרוש למטרות שלשמן נאסף, למתן שירות, לניהול קשרי לקוחות, לעמידה בדרישות דין, לצרכי הנהלת חשבונות, הגנה משפטית ותיעוד עסקי.',
      'אין אפשרות להבטיח אבטחה מוחלטת של מידע המועבר באינטרנט, ולכן מסירת מידע נעשית תוך הבנת הסיכונים הטכנולוגיים המקובלים.',
    ],
  },
  {
    title: 'זכויות עיון, תיקון ומחיקה',
    body: [
      'בהתאם לחוק הגנת הפרטיות, התשמ"א-1981, ולתיקון מס\' 13 לחוק, עומדות לך זכויות ביחס למידע אישי עליך, לרבות עיון במידע ותיקון מידע שאינו נכון, שלם, ברור או מעודכן.',
      'ניתן לפנות אלינו בבקשה לעיון, תיקון, מחיקה, הגבלת שימוש או בירור בנוגע למידע אישי. נבחן כל בקשה בהתאם לדין, לזהות הפונה, סוג המידע, מטרת השמירה וחובותינו החוקיות.',
      'בקשות בנושא פרטיות ניתן לשלוח אלינו בדוא"ל. ייתכן שנבקש פרטים נוספים לצורך אימות זהות וטיפול מדויק בבקשה.',
    ],
  },
  {
    title: 'העברת מידע מחוץ לישראל',
    body: [
      'חלק מספקי השירות הטכנולוגיים שבהם אנו משתמשים עשויים לשמור או לעבד מידע מחוץ לישראל. במקרה כזה נפעל לפי הוראות הדין החל ונשתמש בספקים המיישמים אמצעי אבטחה מקובלים.',
    ],
  },
  {
    title: 'דיוור שיווקי',
    body: [
      'ככל שנשלח עדכונים, הצעות או מסרים שיווקיים, הדבר ייעשה בהתאם לדין, לרבות חוק התקשורת (בזק ושידורים), התשמ"ב-1982, ובכפוף להסכמה כאשר היא נדרשת.',
      'ניתן לבקש הסרה מדיוור בכל עת באמצעות קישור הסרה, מענה להודעה או פנייה ישירה אלינו.',
    ],
  },
  {
    title: 'שינויים במדיניות',
    body: [
      'אנו רשאים לעדכן מדיניות זו מעת לעת עקב שינויים באתר, בשירותים, בטכנולוגיות או בדין. הגרסה המחייבת היא זו שמפורסמת באתר במועד השימוש.',
    ],
  },
]);

const ACCESSIBILITY_SECTIONS = Object.freeze([
  {
    title: 'מחויבות לנגישות',
    body: [
      'NZ-web רואה חשיבות רבה במתן שירות שוויוני, מכבד ונגיש לכלל המשתמשים, לרבות אנשים עם מוגבלות. אנו פועלים כדי שהאתר יהיה נוח, ברור וזמין ככל האפשר.',
      'האתר נבנה ומטופל בהתאם לעקרונות חוק שוויון זכויות לאנשים עם מוגבלות, התשנ"ח-1998, תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013, והתקן הישראלי ת"י 5568 המבוסס על הנחיות WCAG 2.0 ברמה AA, בכפוף להתאמות הנדרשות בדין הישראלי.',
    ],
  },
  {
    title: 'התאמות שבוצעו באתר',
    body: [
      'מבנה האתר כולל כותרות היררכיות, אזורי תוכן ברורים, ניווט עקבי, קישורים וכפתורים עם שמות נגישים, ותמיכה ב-RTL מלא בעברית.',
      'ניתן לנווט באתר באמצעות מקלדת, לרבות מעבר בין רכיבים באמצעות Tab ו-Shift+Tab והפעלת כפתורים וקישורים באמצעות Enter או Space כאשר הדבר נתמך.',
      'האתר כולל ניגודיות צבעים גבוהה, מצבי פוקוס ברורים, התאמה למסכים בגדלים שונים, טקסטים קריאים, תמיכה בהקטנת תנועה עבור משתמשים שבחרו בכך במערכת ההפעלה, וסימון סמנטי המיועד לסייע לקוראי מסך.',
      'טפסים באתר כוללים תוויות, שדות חובה ברורים ומבנה המאפשר שימוש נוח ככל האפשר באמצעי עזר.',
    ],
  },
  {
    title: 'תאימות לדפדפנים וטכנולוגיות מסייעות',
    body: [
      'האתר מיועד לפעול בדפדפנים מודרניים נפוצים, לרבות Chrome, Edge, Firefox ו-Safari, בגרסאות עדכניות.',
      'האתר נבדק לשימוש בסיסי עם מקלדת ולמבנה סמנטי המתאים לתוכנות קוראות מסך. ייתכנו הבדלים בין דפדפנים, מערכות הפעלה וטכנולוגיות מסייעות שונות.',
    ],
  },
  {
    title: 'תוכן שאינו בשליטתנו',
    body: [
      'ייתכן שבאתר קיימים קישורים לשירותים חיצוניים כגון WhatsApp, דוא"ל, אתרי צד שלישי או רכיבים המופעלים על ידי ספקים חיצוניים. רמת הנגישות של שירותים אלה נמצאת באחריות מפעיליהם.',
      'אם יועלו בעתיד מסמכים, סרטונים, הטמעות או קבצים חיצוניים, נעשה מאמץ להנגישם או לספק חלופה נגישה לפי הצורך והדין.',
    ],
  },
  {
    title: 'הסדרי נגישות לשירות',
    body: [
      'עיקר השירות ניתן מרחוק באמצעות אתר האינטרנט, טלפון, WhatsApp ודוא"ל. נכון למועד עדכון הצהרה זו אין קבלת קהל קבועה באתר פיזי הפתוח לציבור.',
      'ניתן לבקש התאמה פרטנית לקבלת שירות, כגון מענה כתוב במקום שיחה קולית, תיאום שיחה בשעה נוחה, שליחת מידע בפורמט חלופי או הסבר נוסף בשפה פשוטה.',
    ],
  },
  {
    title: 'פנייה בנושא נגישות',
    body: [
      `אם נתקלת בקושי נגישות באתר או בשירות, נשמח לקבל דיווח כדי שנוכל לבדוק ולטפל. ניתן לפנות אלינו בדוא"ל ${CONTACT_INFO.email}, בטלפון ${CONTACT_INFO.phone} או ב-WhatsApp למספר ${CONTACT_INFO.phone}.`,
      'בפנייה מומלץ לציין את כתובת העמוד, תיאור הבעיה, סוג המכשיר, הדפדפן, מערכת ההפעלה וטכנולוגיה מסייעת שבה נעשה שימוש, ככל שרלוונטי.',
      'אנו נעשה מאמץ להשיב לפניות נגישות בתוך זמן סביר ולטפל בליקויים שיימצאו בהתאם לאופי הפנייה והוראות הדין.',
    ],
  },
  {
    title: 'עדכון ההצהרה',
    body: [
      'הצהרת נגישות זו תעודכן מעת לעת בהתאם לשינויים באתר, בבדיקות נגישות, בפניות משתמשים ובהוראות הדין.',
    ],
  },
]);

function LegalNotice({ children }) {
  return (
    <div className="legal-notice">
      <ShieldCheck size={20} />
      <p>{children}</p>
    </div>
  );
}

function LegalSections({ sections }) {
  return (
    <div className="legal-sections">
      {sections.map((section, index) => (
        <Reveal key={section.title} delay={index * 45}>
          <section className="legal-section">
            <div className="legal-section-num font-en">
              {String(index + 1).padStart(2, '0')}
            </div>
            <div>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        </Reveal>
      ))}
    </div>
  );
}

function PrivacyPolicyView() {
  return (
    <article className="page legal-page" dir="rtl">
      <Reveal>
        <div className="page-head legal-head">
          <div className="kicker">
            <ShieldCheck size={15} /> שקיפות והגנת פרטיות
          </div>
          <h1 className="page-title">
            מדיניות <span className="text-gradient">פרטיות</span>
          </h1>
          <p className="page-sub">
            מסמך זה מרכז את עיקרי האיסוף, השימוש, השמירה וההגנה על מידע אישי
            באתר ובערוצי הפנייה של NZ-web, בהתאם לדין החל בישראל.
          </p>
          <span className="legal-updated">עודכן לאחרונה: {LAST_LEGAL_UPDATE}</span>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <LegalNotice>
          המדיניות מנוסחת לצורכי שקיפות מול משתמשי האתר. במקרה של סתירה בין
          האמור במדיניות לבין הוראות הדין, הוראות הדין יגברו.
        </LegalNotice>
      </Reveal>

      <LegalSections sections={PRIVACY_SECTIONS} />
    </article>
  );
}

function AccessibilityView() {
  return (
    <article className="page legal-page" dir="rtl">
      <Reveal>
        <div className="page-head legal-head">
          <div className="kicker">
            <ShieldCheck size={15} /> שירות נגיש ושוויוני
          </div>
          <h1 className="page-title">
            הצהרת <span className="text-gradient">נגישות</span>
          </h1>
          <p className="page-sub">
            אנו משקיעים מאמץ כדי לאפשר שימוש נוח באתר ובשירותי NZ-web לכלל
            המשתמשים, לרבות אנשים עם מוגבלות, בהתאם לדרישות הדין בישראל.
          </p>
          <span className="legal-updated">עודכן לאחרונה: {LAST_LEGAL_UPDATE}</span>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <LegalNotice>
          אם נתקלת בבעיית נגישות, פנייה אלינו עם תיאור מדויק של הבעיה תאפשר
          בדיקה וטיפול מהירים יותר.
        </LegalNotice>
      </Reveal>

      <LegalSections sections={ACCESSIBILITY_SECTIONS} />
    </article>
  );
}

/* ============================================================
   Footer
   ============================================================ */
function Footer({ navigateTo }) {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="footer">
      <div className="footer-bg font-en" aria-hidden="true">
        NZ-WEB
      </div>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <button
              type="button"
              className="footer-logo font-en"
              onClick={() => navigateTo(VIEWS.HOME)}
            >
              NZ<b>-web</b>
            </button>
            <p>
              סוכנות דיגיטל פרימיום לבניית אתרים ופיתוח Web. פתרונות טכנולוגיים
              ושיווקיים (SEO) לעסקים שרוצים לגדול — ולהוביל.
            </p>
            <div className="social-row">
              <a
                href={CONTACT_INFO.site}
                target="_blank"
                rel="noopener noreferrer"
                className="social"
                aria-label="האתר הרשמי"
              >
                <Globe size={19} />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="social"
                aria-label="וואטסאפ"
              >
                <WhatsAppIcon size={19} />
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="social"
                aria-label="אימייל"
              >
                <Mail size={19} />
              </a>
            </div>
          </div>

          <div>
            <h4>ניווט</h4>
            <ul>
              <li>
                <button type="button" onClick={() => navigateTo(VIEWS.HOME)}>
                  דף הבית
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo(VIEWS.PORTFOLIO)}
                >
                  תיק עבודות
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo(VIEWS.ABOUT)}>
                  הסיפור שלנו
                </button>
              </li>
              <li>
                <button type="button" onClick={() => navigateTo(VIEWS.CONTACT)}>
                  יצירת קשר
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4>שירותים</h4>
            <ul>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo(VIEWS.CONTACT)}
                >
                  אתרי תדמית
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo(VIEWS.CONTACT)}
                >
                  דפי נחיתה
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo(VIEWS.CONTACT)}
                >
                  חנויות אונליין
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo(VIEWS.CONTACT)}
                >
                  מערכות Web
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4>משפטי</h4>
            <ul>
              <li>
                <button type="button" onClick={() => navigateTo(VIEWS.PRIVACY)}>
                  מדיניות פרטיות
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo(VIEWS.ACCESSIBILITY)}
                >
                  הצהרת נגישות
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4>יצירת קשר</h4>
            <ul>
              <li>
                <a href={`mailto:${CONTACT_INFO.email}`} className="font-en">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="font-en"
                  dir="ltr"
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="footer-meta">
                <span className="lbl">זמינות בטלפון ובוואטסאפ:</span>
                <span className="val">ראשון–חמישי · 09:00–18:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {year}{' '}
            <span className="font-en" style={{ color: 'var(--ink-soft)' }}>
              NZ-web Web Development Studio
            </span>
            . כל הזכויות שמורות.
          </p>
          <p className="font-en">High-End Web Agency &amp; SEO</p>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   Floating actions
   ============================================================ */
function FloatingActions() {
  return (
    <div className="floating">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="float-btn float-wa"
        aria-label="שליחת הודעת וואטסאפ מוכנה"
      >
        <WhatsAppIcon size={32} />
      </a>
      <a
        href={`tel:${CONTACT_INFO.phone}`}
        className="float-btn float-call"
        aria-label="חיוג טלפוני"
      >
        <Phone size={22} />
      </a>
    </div>
  );
}
