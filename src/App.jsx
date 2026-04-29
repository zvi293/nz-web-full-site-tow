import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Phone,
  MessageCircle,
  Globe,
  Rocket,
  Code,
  ArrowLeft,
  Monitor,
  Mail,
  Menu,
  X,
  ExternalLink,
  Briefcase,
  Users,
  ChevronDown,
  Check,
} from 'lucide-react';

const CONTACT_INFO = Object.freeze({
  phone: '0587292029',
  whatsapp: '972587292029',
  email: 'nzweb295@gmail.com',
  site: 'https://nz-web.com/',
});

const VIEWS = Object.freeze({
  HOME: 'home',
  PORTFOLIO: 'portfolio',
  ABOUT: 'about',
  CONTACT: 'contact',
});

const VIEW_TITLES = Object.freeze({
  [VIEWS.HOME]: 'NZ-web | סוכנות פרימיום לבניית אתרים ופיתוח אפליקציות Web',
  [VIEWS.PORTFOLIO]: 'עבודות נבחרות | NZ-web',
  [VIEWS.ABOUT]: 'אודות | NZ-web',
  [VIEWS.CONTACT]: 'יצירת קשר | NZ-web',
});

const NAV_LINKS = Object.freeze([
  { id: VIEWS.HOME, label: 'דף הבית' },
  { id: VIEWS.PORTFOLIO, label: 'עבודות נבחרות' },
  { id: VIEWS.ABOUT, label: 'קצת עלינו' },
  { id: VIEWS.CONTACT, label: 'יצירת קשר' },
]);

const PROJECTS = Object.freeze([
  { title: 'Dashboard פיננסי', category: 'Web Application', tech: 'React, Tailwind, Recharts', img: 'project-card slate' },
  { title: 'משרד עורכי דין יוקרתי', category: 'Corporate Website', tech: 'Next.js, GSAP', img: 'project-card navy' },
  { title: 'E-Commerce למותג תכשיטים', category: 'Online Store', tech: 'Shopify, Custom Theme', img: 'project-card purple' },
  { title: 'קמפיין נדל״ן בינלאומי', category: 'Landing Page', tech: 'React, Framer Motion', img: 'project-card green' },
]);

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
  let script = document.querySelector(`script[type="application/ld+json"][data-nz-schema="${id}"]`);
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
    'היי NZ-web! הגעתי מהאתר.',
    '',
    `*שם:* ${name}`,
    `*טלפון:* ${phone}`,
    '*איך אפשר לעזור?*',
    message,
  ].join('\n');

  return `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
};

const useSEO = (currentView) => {
  useEffect(() => {
    const canonicalUrl = CONTACT_INFO.site;
    const title = VIEW_TITLES[currentView] || VIEW_TITLES[VIEWS.HOME];

    document.documentElement.lang = 'he';
    document.documentElement.dir = 'rtl';
    document.title = title;

    setOrCreateLink('canonical', canonicalUrl);
    setOrCreateMeta('description', 'סוכנות דיגיטל NZ-web מתמחה בבניית אתרי תדמית יוקרתיים, דפי נחיתה ממוקדי המרות ופיתוח מערכות Web מתקדמות. מרימים עסקים לליגה של הגדולים.');
    setOrCreateMeta('keywords', 'בניית אתרים, פיתוח מערכות web, סוכנות דיגיטל, אתרי תדמית, דפי נחיתה, בניית חנות אינטרנטית, קידום אתרים, עיצוב אתרים, פיתוח אפליקציות רשת, UI/UX, React, Next.js');
    setOrCreateMeta('author', 'NZ-web Studio');
    setOrCreateMeta('robots', 'index, follow');
    setOrCreateMeta('theme-color', '#030305');

    setOrCreateMeta('geo.region', 'IL-TA');
    setOrCreateMeta('geo.placename', 'Tel Aviv-Yafo');
    setOrCreateMeta('geo.position', '32.0853;34.7818');
    setOrCreateMeta('ICBM', '32.0853, 34.7818');

    setOrCreateMeta('og:title', title, 'property');
    setOrCreateMeta('og:description', 'אנחנו בונים נכסים דיגיטליים שמשאירים את המתחרים מאחור. קוד נקי, עיצוב מרהיב, וטעינה מהירה במיוחד.', 'property');
    setOrCreateMeta('og:url', canonicalUrl, 'property');
    setOrCreateMeta('og:type', 'website', 'property');
    setOrCreateMeta('og:locale', 'he_IL', 'property');
    setOrCreateMeta('og:site_name', 'NZ-web', 'property');
    setOrCreateMeta('og:image', createAbsoluteUrl('og-image.png'), 'property');
    setOrCreateMeta('og:image:width', '1200', 'property');
    setOrCreateMeta('og:image:height', '630', 'property');

    setOrCreateMeta('twitter:card', 'summary_large_image');
    setOrCreateMeta('twitter:title', title);
    setOrCreateMeta('twitter:description', 'בניית אתרים ופיתוח פתרונות אינטרנט מתקדמים לעסקים.');
    setOrCreateMeta('twitter:image', createAbsoluteUrl('og-image.png'));

    setOrCreateJsonLd('professional-service', {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'NZ-web Studio',
      url: CONTACT_INFO.site,
      logo: createAbsoluteUrl('logo.png'),
      image: createAbsoluteUrl('cover.jpg'),
      description: 'סוכנות דיגיטל לפיתוח ועיצוב אתרי אינטרנט, חנויות וירטואליות ומערכות רשת מתקדמות.',
      telephone: CONTACT_INFO.phone,
      email: CONTACT_INFO.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Tel Aviv',
        addressRegion: 'Center District',
        addressCountry: 'IL',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 32.0853,
        longitude: 34.7818,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      priceRange: '$$$',
      sameAs: [CONTACT_INFO.site],
    });
  }, [currentView]);
};

const Reveal = ({ children, delay = 0, className = '' }) => {
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

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

export default function App() {
  const [currentView, setCurrentView] = useState(VIEWS.HOME);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useSEO(currentView);

  const navigateTo = useCallback((view) => {
    if (!Object.values(VIEWS).includes(view)) return;
    setCurrentView(view);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const scrollHeight = Math.max(document.documentElement.scrollHeight - document.documentElement.clientHeight, 0);
      setScrollProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const previousBodyOverflowX = document.body.style.overflowX;
    const previousHtmlOverflowX = document.documentElement.style.overflowX;

    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    handleScroll();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflowX = previousBodyOverflowX;
      document.documentElement.style.overflowX = previousHtmlOverflowX;
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
      <InlineStyles />

      <div className="bg-noise" />
      <div className="progress-bar" style={{ width: `${Math.min(Math.max(scrollProgress * 100, 0), 100)}%` }} aria-hidden="true" />

      <div
        className="custom-cursor"
        style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
        aria-hidden="true"
      >
        <div />
      </div>

      <div className="ambient-glows" aria-hidden="true">
        <div className="glow-blob blue" />
        <div className="glow-blob purple" />
      </div>

      <Header currentView={currentView} navigateTo={navigateTo} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main className="main" id="main-content">
        {currentView === VIEWS.HOME && <HomeView navigateTo={navigateTo} />}
        {currentView === VIEWS.PORTFOLIO && <PortfolioView />}
        {currentView === VIEWS.ABOUT && <AboutView />}
        {currentView === VIEWS.CONTACT && <ContactView />}
      </main>

      <Footer navigateTo={navigateTo} />

      {!isMenuOpen && <FloatingActions />}
    </div>
  );
}

function InlineStyles() {
  return (
    <style>{`
      .main { position: relative; z-index: 10; padding-top: 112px; min-height: 100vh; width: 100%; max-width: 100vw; overflow-x: hidden; }
      .progress-bar { position: fixed; top: 0; left: 0; height: 4px; background: linear-gradient(90deg,#3b82f6,#a855f7,#6366f1); z-index: 9999; transition: width .15s ease-out; }
      .custom-cursor { display: none; position: fixed; width: 40px; height: 40px; border: 1px solid rgba(59,130,246,.5); border-radius: 999px; pointer-events: none; z-index: 10000; transform: translate(-50%,-50%); align-items: center; justify-content: center; mix-blend-mode: screen; transition: transform .075s ease-out; }
      .custom-cursor div { width: 6px; height: 6px; border-radius: 999px; background: #c084fc; }
      .bg-noise { position: fixed; inset: 0; pointer-events: none; z-index: 9999; opacity: .04; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); }
      .ambient-glows { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
      .glow-blob { position: absolute; border-radius: 999px; filter: blur(140px); z-index: 0; opacity: .4; pointer-events: none; }
      .glow-blob.blue { background: #2563eb; width: 600px; height: 600px; top: -10%; right: -10%; animation: pulse 4s ease-in-out infinite; }
      .glow-blob.purple { background: #9333ea; width: 500px; height: 500px; bottom: 20%; left: -10%; }
      .text-stroke { color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,.05); font-family: 'Outfit', sans-serif; }
      .btn-primary { background: linear-gradient(135deg,#2563eb,#4f46e5); position: relative; z-index: 1; overflow: hidden; }
      .btn-primary::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg,#3b82f6,#6366f1); z-index: -1; opacity: 0; transition: opacity .3s ease; }
      .btn-primary:hover::before { opacity: 1; }
      .reveal { opacity: 0; transform: translateY(48px); transition: opacity 1s ease, transform 1s ease; }
      .reveal.visible { opacity: 1; transform: translateY(0); }
      .header { position: fixed; top: 0; width: 100%; z-index: 40; padding: 16px 0; background: rgba(3,3,5,.8); border-bottom: 1px solid rgba(255,255,255,.05); }
      .container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
      .header-row { display: flex; align-items: center; justify-content: space-between; }
      .logo { display: flex; align-items: center; gap: 12px; position: relative; z-index: 50; cursor: pointer; text-align: right; }
      .logo-mark { width: 48px; height: 48px; border-radius: 14px; background: linear-gradient(135deg,#2563eb,#4338ca); display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: 24px; box-shadow: 0 10px 25px rgba(37,99,235,.25); border: 1px solid rgba(255,255,255,.1); transition: transform .3s ease; }
      .logo:hover .logo-mark { transform: rotate(6deg); }
      .logo-text { color: white; font-size: 26px; font-weight: 800; letter-spacing: -.03em; }
      .desktop-nav { display: none; align-items: center; gap: 40px; font-size: 14px; font-weight: 600; }
      .nav-btn { color: #94a3b8; transition: color .2s; position: relative; padding: 8px 0; cursor: pointer; }
      .nav-btn:hover, .nav-btn.active { color: white; }
      .nav-dot { position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 4px; height: 4px; background: #3b82f6; border-radius: 999px; }
      .header-actions { display: flex; align-items: center; gap: 16px; position: relative; z-index: 50; }
      .official-link { display: none; align-items: center; gap: 8px; color: #94a3b8; font-size: 14px; font-weight: 600; padding-right: 16px; margin-right: 16px; border-right: 1px solid rgba(255,255,255,.1); }
      .wa-header { display: none; align-items: center; gap: 8px; color: white; padding: 10px 24px; border-radius: 999px; font-weight: 800; font-size: 14px; box-shadow: 0 10px 25px rgba(37,99,235,.25); transition: transform .25s; }
      .wa-header:hover { transform: scale(1.05); }
      .menu-toggle { display: block; color: white; padding: 8px; border-radius: 10px; position: relative; z-index: 60; cursor: pointer; }
      .menu-toggle:hover { background: rgba(255,255,255,.1); }
      .mobile-menu { position: fixed; inset: 0; background: #030305; z-index: 55; display: flex; align-items: center; justify-content: center; flex-direction: column; transition: opacity .5s, visibility .5s; }
      .mobile-menu.closed { opacity: 0; visibility: hidden; pointer-events: none; }
      .mobile-menu.open { opacity: 1; visibility: visible; }
      .mobile-nav { display: flex; flex-direction: column; gap: 32px; text-align: center; width: 100%; padding: 0 24px; position: relative; z-index: 10; }
      .mobile-kicker { color: #3b82f6; text-transform: uppercase; letter-spacing: .18em; font-size: 14px; font-weight: 900; margin-bottom: 16px; }
      .mobile-nav button { font-size: 40px; font-weight: 900; color: #cbd5e1; cursor: pointer; transition: .3s; }
      .mobile-nav button.active { color: #60a5fa; transform: scale(1.08); }
      .mobile-call { margin-top: 16px; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: 24px; padding: 16px; display: flex; align-items: center; justify-content: center; gap: 12px; color: white; font-size: 22px; font-weight: 800; }
      .hero { position: relative; padding: 64px 24px 80px; min-height: 85vh; display: flex; align-items: center; justify-content: center; text-align: center; }
      .hero-bg-text { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 100%; font-size: 12vw; font-weight: 900; opacity: .5; user-select: none; pointer-events: none; letter-spacing: -.04em; }
      .hero-content { width: 100%; max-width: 1024px; position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; }
      .badge { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: 999px; color: #cbd5e1; font-size: 16px; font-weight: 600; margin-bottom: 32px; border: 1px solid rgba(255,255,255,.1); }
      .ping-dot { position: relative; width: 12px; height: 12px; border-radius: 999px; background: #3b82f6; }
      .ping-dot::before { content:''; position:absolute; inset:0; border-radius:999px; background:#60a5fa; animation: ping 1.5s infinite; }
      .hero h1 { color: white; font-size: clamp(48px, 8vw, 88px); line-height: 1.1; margin: 0 0 32px; font-weight: 900; letter-spacing: -.04em; }
      .hero p { color: #94a3b8; max-width: 720px; font-size: clamp(19px, 3vw, 24px); line-height: 1.7; margin: 0 0 48px; font-weight: 300; }
      .hero-actions { display: flex; flex-direction: column; gap: 20px; width: 100%; }
      .big-btn { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 18px 40px; border-radius: 22px; color: white; font-weight: 900; font-size: 20px; transition: transform .25s; border: 1px solid rgba(255,255,255,.1); cursor: pointer; }
      .big-btn:hover { transform: scale(1.05); }
      .scroll-cue { margin-top: 80px; color: #64748b; animation: bounce 1.4s infinite; }
      .marquee-wrap {
        width: min(100% - 28px, 1180px);
        overflow: hidden;
        margin: -18px auto 96px;
        padding: 16px 0;
        position: relative;
        border-radius: 28px;
        background:
          linear-gradient(180deg, rgba(15, 23, 42, .92), rgba(3, 7, 18, .96)) padding-box,
          linear-gradient(90deg, rgba(59, 130, 246, .90), rgba(124, 58, 237, .88), rgba(236, 72, 153, .70)) border-box;
        border: 1px solid transparent;
        box-shadow:
          0 0 0 1px rgba(255,255,255,.055) inset,
          0 16px 60px rgba(37, 99, 235, .18),
          0 0 34px rgba(124, 58, 237, .16);
        isolation: isolate;
      }
      .marquee-wrap::before,
      .marquee-wrap::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 120px;
        z-index: 2;
        pointer-events: none;
      }
      .marquee-wrap::before {
        right: 0;
        background: linear-gradient(90deg, transparent, rgba(3, 7, 18, .96));
      }
      .marquee-wrap::after {
        left: 0;
        background: linear-gradient(270deg, transparent, rgba(3, 7, 18, .96));
      }
      .marquee {
        white-space: nowrap;
        display: inline-flex;
        gap: 34px;
        align-items: center;
        width: max-content;
        font-size: clamp(24px, 4.7vw, 46px);
        line-height: 1;
        font-weight: 900;
        opacity: 1;
        color: #dbeafe;
        text-shadow:
          0 0 18px rgba(59, 130, 246, .35),
          0 0 34px rgba(124, 58, 237, .20);
        animation: marquee-left 24s linear infinite;
        will-change: transform;
      }
      .marquee span {
        display: inline-flex;
        align-items: center;
      }
      .marquee span:nth-child(4n + 1) {
        color: #60a5fa;
      }
      .marquee span:nth-child(4n + 3) {
        color: #c084fc;
      }
      .marquee-wrap:hover .marquee {
        animation-play-state: paused;
      }
      .section { padding: 64px 24px; }
      .section-head { display: flex; flex-direction: column; justify-content: space-between; gap: 24px; margin-bottom: 64px; }
      .kicker { color: #3b82f6; text-transform: uppercase; letter-spacing: .16em; font-size: 14px; font-weight: 900; display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
      .section h3 { color: white; font-size: clamp(38px, 7vw, 64px); line-height: 1.1; margin: 0; font-weight: 900; letter-spacing: -.04em; }
      .soft-btn { color: white; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); padding: 16px 32px; border-radius: 999px; font-weight: 700; display: inline-flex; align-items: center; gap: 12px; cursor: pointer; width: fit-content; }
      .cards-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
      .service-card { padding: 32px; border-radius: 40px; transition: .5s; height: 100%; display: flex; flex-direction: column; }
      .service-card:hover { border-color: rgba(255,255,255,.2); background: rgba(255,255,255,.03); }
      .icon-box { width: 64px; height: 64px; border-radius: 20px; background: rgba(255,255,255,.05); display:flex; align-items:center; justify-content:center; margin-bottom: 32px; transition: transform .5s; }
      .service-card:hover .icon-box { transform: scale(1.1); }
      .service-card h4 { font-size: 26px; color: white; margin: 0 0 16px; }
      .service-card p { color: #94a3b8; line-height: 1.7; font-weight: 300; flex: 1; margin: 0 0 32px; }
      .tag-row { display: flex; flex-wrap: wrap; gap: 8px; }
      .tag { color: #cbd5e1; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.05); padding: 6px 12px; border-radius: 10px; font-size: 12px; font-weight: 700; }
      .cta-section { padding: 128px 24px; }
      .cta-shell { max-width: 1024px; margin: 0 auto; position: relative; }
      .cta-glow { position: absolute; inset: -2px; background: linear-gradient(90deg,#2563eb,#6366f1,#9333ea); border-radius: 42px; opacity: .5; filter: blur(12px); transition: opacity 1s; }
      .cta-shell:hover .cta-glow { opacity: 1; }
      .cta-box { position: relative; border-radius: 42px; padding: 48px 32px; text-align: center; background: #050508; overflow: hidden; }
      .cta-box h2 { color: white; font-size: clamp(40px, 7vw, 64px); margin: 0 0 24px; font-weight: 900; }
      .cta-box p { color: #94a3b8; font-size: clamp(20px, 3vw, 26px); line-height: 1.6; margin: 0 auto 48px; max-width: 720px; font-weight: 300; }
      .cta-actions { display: flex; flex-direction: column; justify-content: center; gap: 24px; position: relative; z-index: 2; }
      .white-btn, .green-btn { padding: 18px 40px; border-radius: 22px; font-size: 19px; font-weight: 900; display: flex; align-items: center; justify-content: center; gap: 12px; transition: transform .25s; }
      .white-btn { background: white; color: black; }
      .green-btn { background: #25D366; color: white; }
      .white-btn:hover, .green-btn:hover { transform: scale(1.05); }
      .page { width: 100%; max-width: 1280px; min-height: 100vh; margin: 0 auto; padding: 64px 24px; }
      .page.narrow { max-width: 1024px; }
      .page-title { color: white; font-size: clamp(48px, 8vw, 78px); font-weight: 900; letter-spacing: -.04em; margin: 0 0 24px; }
      .page-subtitle { color: #94a3b8; font-size: clamp(20px, 3vw, 26px); max-width: 720px; font-weight: 300; margin: 0; }
      .portfolio-grid { display: grid; grid-template-columns: 1fr; gap: 32px; margin-top: 80px; }
      .project { position: relative; border-radius: 32px; overflow: hidden; aspect-ratio: 4/3; display: flex; flex-direction: column; justify-content: end; cursor: pointer; border: 1px solid rgba(255,255,255,.1); }
      .project-card { position: absolute; inset: 0; transition: transform 1s; }
      .project:hover .project-card { transform: scale(1.05); }
      .project-card.slate { background: linear-gradient(135deg,#1e293b,#020617); }
      .project-card.navy { background: linear-gradient(135deg,#0f172a,#020617); }
      .project-card.purple { background: linear-gradient(135deg,#1e1b4b,#020617); }
      .project-card.green { background: linear-gradient(135deg,#064e3b,#020617); }
      .dots { position: absolute; inset:0; opacity:.5; background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4="); }
      .project-overlay { position:absolute; inset:0; background: linear-gradient(0deg,#030305,rgba(3,3,5,.4),transparent); opacity:.9; transition:opacity .5s; }
      .project:hover .project-overlay { opacity:.7; }
      .project-content { position:relative; z-index:2; padding:32px; transform:translateY(16px); transition:transform .5s; }
      .project:hover .project-content { transform:translateY(0); }
      .project-category { display:flex; align-items:center; gap:12px; margin-bottom:16px; color:#93c5fd; font-size:14px; font-weight:900; letter-spacing:.08em; text-transform:uppercase; }
      .project h3 { color:white; font-size:clamp(30px,4vw,42px); margin:0 0 16px; }
      .tech-pill { display:flex; align-items:center; gap:8px; width:fit-content; color:#cbd5e1; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1); padding:8px 16px; border-radius:14px; backdrop-filter:blur(10px); font-size:14px; }
      .about-card { padding: 32px; border-radius: 48px; margin-top: 48px; position: relative; overflow: hidden; background: rgba(255,255,255,.01); box-shadow: 0 25px 80px rgba(0,0,0,.3); }
      .about-card h2 { color: white; font-size: clamp(30px,4vw,42px); margin:0 0 32px; }
      .about-card p { color:#cbd5e1; font-size: clamp(18px,2.5vw,21px); line-height:1.8; font-weight:300; }
      .feature-grid { display:grid; grid-template-columns:1fr; gap:24px; margin-top:32px; padding-top:48px; border-top:1px solid rgba(255,255,255,.1); }
      .feature { display:flex; gap:16px; }
      .feature-icon { width:48px; height:48px; border-radius:999px; background:rgba(59,130,246,.1); display:flex; align-items:center; justify-content:center; flex-shrink:0; color:#60a5fa; }
      .feature h3 { color:white; font-size:22px; margin:0 0 8px; }
      .feature p { color:#94a3b8; font-size:16px; margin:0; }
      .contact-grid { display:grid; grid-template-columns:1fr; gap:48px; margin-top:64px; }
      .contact-cards { display:grid; gap:24px; }
      .contact-card { padding:32px; border-radius:28px; transition:.25s; }
      .contact-card:hover { border-color:rgba(255,255,255,.2); }
      .contact-icon { width:64px; height:64px; border-radius:20px; background:rgba(255,255,255,.05); display:flex; align-items:center; justify-content:center; margin-bottom:24px; }
      .contact-card h3 { color:white; font-size:26px; margin:0 0 8px; }
      .contact-card p { color:#94a3b8; font-weight:300; font-size:14px; margin:0 0 16px; }
      .contact-card a { color:white; font-size:20px; transition:color .2s; }
      .contact-form-card { padding:32px; border-radius:32px; position:relative; overflow:hidden; height:100%; }
      .form-line { position:absolute; top:0; left:0; right:0; height:4px; background:linear-gradient(90deg,transparent,#25D366,transparent); opacity:.5; }
      .contact-form-card h3 { color:white; font-size:32px; margin:0 0 12px; }
      .contact-form-card > p { color:#94a3b8; margin:0 0 32px; font-weight:300; }
      .form { display:grid; gap:24px; position:relative; z-index:1; }
      .form-row { display:grid; grid-template-columns:1fr; gap:24px; }
      label { display:block; color:#94a3b8; font-size:14px; font-weight:600; margin-bottom:8px; }
      input, textarea { width:100%; background:rgba(3,3,5,.5); border:1px solid rgba(255,255,255,.1); border-radius:14px; padding:16px 20px; color:white; outline:none; transition:.25s; font-weight:300; }
      input:focus, textarea:focus { border-color:#25D366; background:rgba(255,255,255,.05); }
      textarea { resize:none; min-height:120px; }
      .submit-btn { width:100%; background:white; color:black; padding:18px; border-radius:14px; font-size:19px; font-weight:900; display:flex; align-items:center; justify-content:center; gap:12px; cursor:pointer; transition:.25s; }
      .submit-btn:hover { background:#25D366; color:white; }
      .footer { border-top:1px solid rgba(255,255,255,.05); background:#030305; position:relative; z-index:10; padding:80px 24px 32px; overflow:hidden; }
      .footer-bg { position:absolute; bottom:0; left:50%; transform:translateX(-50%); font-size:15vw; font-weight:900; opacity:.02; white-space:nowrap; pointer-events:none; user-select:none; }
      .footer-grid { display:grid; grid-template-columns:1fr; gap:48px; margin-bottom:64px; position:relative; z-index:1; }
      .footer p { color:#94a3b8; line-height:1.7; font-weight:300; max-width:380px; }
      .footer-logo { color:white; font-size:34px; font-weight:900; margin-bottom:24px; cursor:pointer; }
      .social-row { display:flex; gap:16px; }
      .social { width:48px; height:48px; border-radius:18px; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1); display:flex; align-items:center; justify-content:center; color:white; transition:.25s; }
      .social:hover { background:rgba(255,255,255,.1); }
      .footer h4 { color:white; font-size:19px; margin:0 0 24px; }
      .footer ul { list-style:none; padding:0; margin:0; display:grid; gap:16px; color:#94a3b8; font-weight:300; }
      .footer li button, .footer li a { color:#94a3b8; cursor:pointer; transition:color .2s; }
      .footer li button:hover, .footer li a:hover { color:white; }
      .footer-bottom { border-top:1px solid rgba(255,255,255,.1); padding-top:32px; color:#64748b; font-size:14px; text-align:center; position:relative; z-index:1; display:flex; flex-direction:column; gap:8px; }
      .floating { position:fixed; left:24px; bottom:24px; z-index:40; display:flex; flex-direction:column; gap:16px; }
      .float-btn { width:56px; height:56px; border-radius:999px; display:flex; align-items:center; justify-content:center; color:white; box-shadow:0 10px 40px rgba(0,0,0,.35); transition:.25s; }
      .float-btn:hover { transform:scale(1.1); }
      .float-call { background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.2); backdrop-filter:blur(10px); }
      .float-call:hover { background:#2563eb; }
      .float-wa { background:#25D366; box-shadow:0 4px 20px rgba(37,211,102,.4); }
      @keyframes pulse { 50% { opacity:.25; } }
      @keyframes ping { 75%,100% { transform: scale(2); opacity:0; } }
      @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      @keyframes marquee-left { 0% { transform: translateX(0); } 100% { transform: translateX(50%); } }

      @media (max-width: 767px) {
        .marquee-wrap {
          width: calc(100vw - 24px);
          margin: -8px auto 72px;
          padding: 14px 0;
          border-radius: 22px;
          box-shadow:
            0 0 0 1px rgba(255,255,255,.06) inset,
            0 12px 44px rgba(37,99,235,.20),
            0 0 28px rgba(124,58,237,.14);
        }
        .marquee-wrap::before,
        .marquee-wrap::after {
          width: 54px;
        }
        .marquee {
          gap: 22px;
          font-size: clamp(22px, 8vw, 34px);
          animation-duration: 18s;
        }
      }

      @media (min-width:640px) { .wa-header { display:flex; } .hero-actions,.cta-actions { flex-direction:row; width:auto; } }
      @media (min-width:768px) { .desktop-nav { display:flex; } .menu-toggle,.mobile-menu { display:none; } .custom-cursor { display:flex; } a,button,[role=button],input,textarea{cursor:none;} .section-head{flex-direction:row;align-items:end;} .cards-grid{grid-template-columns:repeat(3,1fr);} .portfolio-grid{grid-template-columns:repeat(2,1fr); gap:48px;} .about-card{padding:64px;} .feature-grid{grid-template-columns:repeat(2,1fr);} .form-row{grid-template-columns:repeat(2,1fr);} .footer-grid{grid-template-columns:5fr 3fr 3fr;} .footer-bottom{flex-direction:row; justify-content:space-between; text-align:start;} }
      @media (min-width:1024px) { .official-link{display:flex;} .contact-grid{grid-template-columns:2fr 3fr; gap:32px;} .cta-box{padding:80px;} .hero{padding-top:128px;padding-bottom:128px;} }
      @media (prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition-duration:.01ms!important;}}
    `}</style>
  );
}

function Header({ currentView, navigateTo, isMenuOpen, setIsMenuOpen }) {
  const handleNavigate = useCallback((view) => {
    navigateTo(view);
    setIsMenuOpen(false);
  }, [navigateTo, setIsMenuOpen]);

  return (
    <>
      <header className="header glass-panel">
        <div className="container header-row">
          <button type="button" className="logo" onClick={() => handleNavigate(VIEWS.HOME)} aria-label="מעבר לדף הבית של NZ-web">
            <div className="logo-mark"><span className="font-en">NZ</span></div>
            <div className="logo-text font-en">NZ-web</div>
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
                {currentView === link.id && <span className="nav-dot" />}
              </button>
            ))}
          </nav>

          <div className="header-actions">
            <a href={CONTACT_INFO.site} target="_blank" rel="noopener noreferrer" className="official-link">
              האתר הרשמי <ExternalLink size={14} />
            </a>
            <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="wa-header btn-primary">
              <MessageCircle size={18} />
              <span>בואו נדבר</span>
            </a>
            <button
              type="button"
              className="menu-toggle"
              onClick={() => setIsMenuOpen((value) => !value)}
              aria-label={isMenuOpen ? 'סגור תפריט' : 'פתח תפריט'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className={`mobile-menu ${isMenuOpen ? 'open' : 'closed'}`}>
        <nav className="mobile-nav" aria-label="ניווט מובייל">
          <span className="mobile-kicker">תפריט ניווט</span>
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavigate(link.id)}
              className={currentView === link.id ? 'active' : ''}
              aria-current={currentView === link.id ? 'page' : undefined}
            >
              {link.label}
            </button>
          ))}
          <a href={`tel:${CONTACT_INFO.phone}`} className="mobile-call">
            <Phone color="#60a5fa" /> חייגו עכשיו
          </a>
        </nav>
      </div>
    </>
  );
}

function HomeView({ navigateTo }) {
  return (
    <article>
      <section className="hero">
        <div className="hero-bg-text text-stroke font-en" aria-hidden="true">DIGITAL AGENCY</div>
        <div className="hero-content">
          <Reveal delay={100}>
            <div className="badge glass-panel">
              <span className="ping-dot" aria-hidden="true" />
              <span>סוכנות בניית האתרים המובילה</span>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <h1>
              לא סתם אתרים. <br />
              <span className="text-gradient">חוויות דיגיטליות.</span>
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p>
              אנחנו ב-<strong style={{ color: 'white' }} className="font-en">NZ-web</strong> מפתחים נכסים דיגיטליים שעובדים בשבילך. פיתוח אתרי תדמית, חנויות ומערכות Web שממירות מבקרים ללקוחות משלמים.
            </p>
          </Reveal>

          <Reveal delay={400}>
            <div className="hero-actions">
              <button type="button" onClick={() => navigateTo(VIEWS.PORTFOLIO)} className="big-btn btn-primary">
                <Briefcase size={24} /> צפו בעבודות שלנו
              </button>
              <a href={`tel:${CONTACT_INFO.phone}`} className="big-btn glass-panel">
                <Phone size={24} color="#60a5fa" /> שיחת ייעוץ אישית
              </a>
            </div>
          </Reveal>

          <Reveal delay={600}>
            <div className="scroll-cue"><ChevronDown size={32} /></div>
          </Reveal>
        </div>
      </section>

      <Reveal>
        <div className="marquee-wrap">
          <div className="marquee font-en" aria-label="טכנולוגיות ושירותים">
            <span>REACT.JS</span><span>•</span><span>NEXT.JS</span><span>•</span><span>TAILWIND CSS</span><span>•</span><span>NODE.JS</span><span>•</span><span>TYPESCRIPT</span><span>•</span><span>SHOPIFY</span><span>•</span>
            <span>REACT.JS</span><span>•</span><span>NEXT.JS</span><span>•</span><span>TAILWIND CSS</span><span>•</span><span>NODE.JS</span><span>•</span><span>TYPESCRIPT</span><span>•</span><span>SHOPIFY</span><span>•</span>
          </div>
        </div>
      </Reveal>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div>
                <div className="kicker"><Monitor size={16} /> תחומי ההתמחות שלנו</div>
                <h3>ארסנל פתרונות <br /> לקידום העסק שלך</h3>
              </div>
              <button type="button" onClick={() => navigateTo(VIEWS.CONTACT)} className="soft-btn">
                לתיאום פגישה <ArrowLeft size={18} />
              </button>
            </div>
          </Reveal>

          <div className="cards-grid">
            <Reveal delay={100}>
              <ServiceCard
                icon={<Monitor size={36} color="#60a5fa" />}
                title="בניית אתרי תדמית"
                desc="עיצוב ופיתוח אתרים מרשימים שמשדרים יוקרה, בונים אמון ומספרים את הסיפור של המותג שלך בצורה מושלמת. מבוססי טכנולוגיות חדישות ואנימציות."
                tags={['UI/UX Design', 'Framer Motion', 'Next.js']}
              />
            </Reveal>
            <Reveal delay={200}>
              <ServiceCard
                icon={<Rocket size={36} color="#c084fc" />}
                title="עיצוב דפי נחיתה"
                desc="הנדסת המרות (CRO) טהורה. קופירייטינג מדויק, מהירות טעינה פסיכית לשיפור ה-SEO, והנעה חכמה לפעולה להשגת מקסימום לידים מקמפיינים."
                tags={['A/B Testing', 'Speed Optimization', 'Lead Gen']}
              />
            </Reveal>
            <Reveal delay={300}>
              <ServiceCard
                icon={<Code size={36} color="#818cf8" />}
                title="פיתוח מערכות Web"
                desc="פיתוח Custom מלא בקוד. מאפליקציות רשת, פלטפורמות SaaS ועד ללוחות בקרה (Dashboards) ארגוניים המותאמים בדיוק לצרכי העסק שלך."
                tags={['React.js', 'Node.js', 'Databases']}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <Reveal>
          <div className="cta-shell">
            <div className="cta-glow" />
            <div className="cta-box glass-panel">
              <h2>הגיע הזמן להוביל את השוק.</h2>
              <p>המתחרים שלך כבר מקודמים בדיגיטל. בוא נבנה לך נכס שעוקף אותם בסיבוב ומביא לקוחות אמיתיים.</p>
              <div className="cta-actions">
                <a href={`tel:${CONTACT_INFO.phone}`} className="white-btn">
                  <Phone size={20} color="#2563eb" /> חייגו עכשיו
                </a>
                <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="green-btn">
                  <MessageCircle size={20} /> הודעת וואטסאפ
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </article>
  );
}

function PortfolioView() {
  return (
    <article className="page">
      <Reveal>
        <div>
          <h1 className="page-title">עבודות <span style={{ color: '#64748b' }}>נבחרות</span></h1>
          <h2 className="page-subtitle">הצצה קטנה לחלק מהפרויקטים ופיתוח האתרים האחרונים שהוצאנו לפועל.</h2>
        </div>
      </Reveal>

      <div className="portfolio-grid">
        {PROJECTS.map((item, idx) => (
          <Reveal key={item.title} delay={idx * 100}>
            <div className="project">
              <div className={item.img}><div className="dots" /></div>
              <div className="project-overlay" />
              <div className="project-content">
                <div className="project-category"><span style={{ width: 8, height: 8, borderRadius: 999, background: '#3b82f6' }} /> {item.category}</div>
                <h3>{item.title}</h3>
                <div className="tech-pill"><Code size={16} /> {item.tech}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </article>
  );
}

function AboutView() {
  return (
    <article className="page narrow">
      <Reveal>
        <h1 className="page-title" style={{ textAlign: 'center' }}>הסיפור של <span className="text-gradient font-en">NZ-web</span></h1>
      </Reveal>

      <Reveal delay={200}>
        <div className="about-card glass-panel">
          <h2>סוכנות פיתוח האתרים שדואגת לשורת הרווח שלך.</h2>
          <p>
            <strong style={{ color: 'white', fontWeight: 600 }}>הכל התחיל מתשוקה בלתי מתפשרת לעיצוב, קוד וקידום עסקים.</strong><br />
            אנחנו ב-NZ-web מאמינים שאתר אינטרנט הוא הרבה יותר מסתם כרטיס ביקור. הוא סוכן המכירות והשיווק הכי חזק של העסק שלך בקידום אורגני בגוגל.
          </p>
          <p>
            החזון שלנו הוא לקחת עסקים ולהטיס אותם קדימה בעזרת פתרונות דיגיטל. אנחנו מפתחים אתרי אינטרנט מהירים המבוססים על קוד נקי, בעלי ארכיטקטורת SEO המאפשרת דירוג גבוה במנועי החיפוש.
          </p>

          <div className="feature-grid">
            <div className="feature">
              <div className="feature-icon"><Check size={24} /></div>
              <div>
                <h3>SEO וסטנדרט בינלאומי</h3>
                <p>האתרים שלנו נבנים עם אופטימיזציה מלאה לגוגל ולמהירות טעינה, מה שמבטיח יתרון על המתחרים.</p>
              </div>
            </div>
            <div className="feature">
              <div className="feature-icon" style={{ background: 'rgba(168,85,247,.1)', color: '#c084fc' }}><Users size={24} /></div>
              <div>
                <h3>שותפות אסטרטגית</h3>
                <p>ליווי מלא משלב האפיון, דרך עיצוב הממשק ועד לפיתוח והעלאה לאוויר.</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </article>
  );
}

function ContactView() {
  const formRef = useRef(null);

  const handleFormSubmit = useCallback((event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const message = String(formData.get('message') || '').trim();

    if (!name || !phone || !message) return;

    window.open(buildWhatsAppUrl({ name, phone, message }), '_blank', 'noopener,noreferrer');
    formRef.current?.reset();
  }, []);

  return (
    <article className="page">
      <Reveal>
        <div>
          <h1 className="page-title">יצירת <span style={{ color: '#3b82f6' }}>קשר.</span></h1>
          <h2 className="page-subtitle">מוכנים להתחיל בפיתוח האתר החדש שלכם? השאירו פרטים ונחזור אליכם לשיחת אפיון.</h2>
        </div>
      </Reveal>

      <div className="contact-grid">
        <div className="contact-cards">
          <Reveal delay={100}>
            <div className="contact-card glass-panel">
              <div className="contact-icon"><Mail color="#60a5fa" size={32} /></div>
              <h3>אימייל ישיר</h3>
              <p>לפניות בנושא הצעות מחיר ופיתוח תוכנה.</p>
              <a href={`mailto:${CONTACT_INFO.email}`} className="font-en">{CONTACT_INFO.email}</a>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="contact-card glass-panel">
              <div className="contact-icon"><Phone color="#4ade80" size={32} /></div>
              <h3>שיחה / וואטסאפ</h3>
              <p>זמינים בימים א'-ה' למענה טלפוני.</p>
              <a href={`tel:${CONTACT_INFO.phone}`} className="font-en" dir="ltr">{CONTACT_INFO.phone}</a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300}>
          <div className="contact-form-card glass-panel">
            <div className="form-line" />
            <h3>השארת פרטים מהירה</h3>
            <p>מילוי הטופס פותח שיחת וואטסאפ אישית עם מפתח מטעמנו.</p>

            <form ref={formRef} className="form" onSubmit={handleFormSubmit}>
              <div className="form-row">
                <div>
                  <label htmlFor="name">שם מלא</label>
                  <input id="name" name="name" type="text" autoComplete="name" placeholder="ישראל ישראלי" required />
                </div>
                <div>
                  <label htmlFor="phone">טלפון נייד</label>
                  <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="050-0000000" required />
                </div>
              </div>
              <div>
                <label htmlFor="message">במה נוכל לעזור?</label>
                <textarea id="message" name="message" rows="4" placeholder="אני מעוניין בבניית אתר חנות / תדמית..." required />
              </div>
              <button type="submit" className="submit-btn">
                <MessageCircle size={24} /> שלח הודעה בוואטסאפ
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </article>
  );
}

function ServiceCard({ icon, title, desc, tags }) {
  return (
    <div className="service-card glass-panel">
      <div className="icon-box">{icon}</div>
      <h4>{title}</h4>
      <p>{desc}</p>
      <div className="tag-row">
        {tags.map((tag) => <span key={tag} className="tag font-en">{tag}</span>)}
      </div>
    </div>
  );
}

function Footer({ navigateTo }) {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="footer">
      <div className="footer-bg text-stroke font-en" aria-hidden="true">NZ-WEB</div>
      <div className="container footer-grid">
        <div>
          <button type="button" className="footer-logo font-en" onClick={() => navigateTo(VIEWS.HOME)}>NZ-web.</button>
          <p>סוכנות בניית אתרים ופיתוח דיגיטלי. אנו מספקים פתרונות טכנולוגיים ושיווקיים (SEO) לעסקים שרוצים לגדול.</p>
          <div className="social-row">
            <a href={CONTACT_INFO.site} target="_blank" rel="noopener noreferrer" className="social" aria-label="Visit our official website"><Globe size={20} /></a>
            <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="social" aria-label="Contact us on WhatsApp"><MessageCircle size={20} /></a>
          </div>
        </div>

        <div>
          <h4>ניווט מהיר</h4>
          <ul>
            <li><button type="button" onClick={() => navigateTo(VIEWS.HOME)}>בניית אתרים (ראשי)</button></li>
            <li><button type="button" onClick={() => navigateTo(VIEWS.PORTFOLIO)}>תיק עבודות - פיתוח Web</button></li>
            <li><button type="button" onClick={() => navigateTo(VIEWS.ABOUT)}>אודות סוכנות NZ-web</button></li>
            <li><button type="button" onClick={() => navigateTo(VIEWS.CONTACT)}>צור קשר לייעוץ</button></li>
          </ul>
        </div>

        <div>
          <h4>יצירת קשר</h4>
          <ul>
            <li><a href={`mailto:${CONTACT_INFO.email}`} className="font-en">{CONTACT_INFO.email}</a></li>
            <li><a href={`tel:${CONTACT_INFO.phone}`} className="font-en" dir="ltr">{CONTACT_INFO.phone}</a></li>
            <li>
              <span style={{ display: 'block', color: '#64748b', fontSize: 14 }}>זמינות בטלפון ובוואטסאפ:</span>
              <span style={{ display: 'block', color: 'white' }}>ראשון - חמישי | 09:00 - 18:00</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {year} <span className="font-en" style={{ color: '#cbd5e1' }}>NZ-web Web Development Studio</span>. כל הזכויות שמורות.</p>
        <p>High-End Web Agency & SEO</p>
      </div>
    </footer>
  );
}

function FloatingActions() {
  return (
    <div className="floating">
      <a href={`tel:${CONTACT_INFO.phone}`} className="float-btn float-call" aria-label="Call Us"><Phone size={24} /></a>
      <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="float-btn float-wa" aria-label="WhatsApp Us"><MessageCircle size={24} /></a>
    </div>
  );
}
