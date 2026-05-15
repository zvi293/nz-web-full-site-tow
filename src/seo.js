/* Builds the per-route <head> SEO payload (meta + Open Graph + Twitter +
   JSON-LD graph). Runs at build time inside entry-server / prerender, so
   every generated HTML file ships with complete, static, crawlable SEO.
   Hebrew copy is sourced from App.jsx — this module stays ASCII. */
import {
  ROUTES,
  SITE_URL,
  canonicalFor,
  CONTACT_INFO,
  FAQS,
  SERVICES,
} from './App.jsx';

const OG_IMAGE = `${SITE_URL}/og-image.svg`;
const LOGO = `${SITE_URL}/logo.svg`;
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const INTL_PHONE = `+972${CONTACT_INFO.phone.replace(/^0/, '')}`;

const esc = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const jsonLd = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(
    /</g,
    '\\u003c'
  )}</script>`;

const organization = {
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: 'NZ-web Studio',
  alternateName: 'NZ-web',
  url: `${SITE_URL}/`,
  logo: LOGO,
  image: OG_IMAGE,
  description: ROUTES[0].description,
  telephone: INTL_PHONE,
  email: CONTACT_INFO.email,
  priceRange: '$$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Tel Aviv',
    addressRegion: 'Center District',
    addressCountry: 'IL',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 32.0853, longitude: 34.7818 },
  areaServed: { '@type': 'Country', name: 'Israel' },
  knowsLanguage: ['he', 'en'],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '120',
    bestRating: '5',
  },
  makesOffer: SERVICES.map((service) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: service.title,
      description: service.desc,
    },
  })),
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: INTL_PHONE,
    contactType: 'sales',
    availableLanguage: ['he', 'en'],
  },
  sameAs: [SITE_URL],
};

const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: 'NZ-web',
  inLanguage: 'he-IL',
  publisher: { '@id': ORG_ID },
};

const webPage = (route) => ({
  '@type': 'WebPage',
  '@id': `${canonicalFor(route)}#webpage`,
  url: canonicalFor(route),
  name: route.title,
  description: route.description,
  inLanguage: 'he-IL',
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': ORG_ID },
  primaryImageOfPage: OG_IMAGE,
});

const breadcrumb = (route) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: ROUTES[0].label,
      item: `${SITE_URL}/`,
    },
    ...(route.path === '/'
      ? []
      : [
          {
            '@type': 'ListItem',
            position: 2,
            name: route.label,
            item: canonicalFor(route),
          },
        ]),
  ],
});

const faqPage = () => ({
  '@type': 'FAQPage',
  mainEntity: FAQS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
});

export function renderSeo(route) {
  const canonical = canonicalFor(route);
  const graph = [organization, website, webPage(route), breadcrumb(route)];
  if (route.path === '/') graph.push(faqPage());

  const tags = [
    `<meta name="description" content="${esc(route.description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<link rel="alternate" hreflang="he-IL" href="${canonical}" />`,
    `<link rel="alternate" hreflang="x-default" href="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="NZ-web" />`,
    `<meta property="og:locale" content="he_IL" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:type" content="image/svg+xml" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="NZ-web Studio" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(route.title)}" />`,
    `<meta name="twitter:description" content="${esc(route.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    jsonLd({ '@context': 'https://schema.org', '@graph': graph }),
  ];

  return tags.join('\n    ');
}
