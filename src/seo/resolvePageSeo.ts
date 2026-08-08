import { ROUTE_SEO_DATABASE, RouteSEOData } from '../data/seoRouteData';
import { INITIAL_SETTINGS } from '../data/initialData';

export interface PageSeo {
  lang: 'th' | 'en';
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  hreflangTh: string;
  hreflangEn: string;
  ogImage: string;
  h1: string;
  intro: string;
  jsonLd: unknown[];
  crawlContentHtml: string;
}

const SITE = 'https://mrcarrentcm.com';
const DEFAULT_OG = `${SITE}/images/vip_van_2026.jpg`;

function normalizePath(pathname: string): string {
  let path = pathname.split('?')[0].split('#')[0] || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (!path.endsWith('/') && !path.includes('.')) path += '/';
  return path;
}

function findRouteByPath(path: string): { route: RouteSEOData; lang: 'th' | 'en' } | null {
  if (ROUTE_SEO_DATABASE[path]) {
    return { route: ROUTE_SEO_DATABASE[path], lang: 'th' };
  }

  for (const route of Object.values(ROUTE_SEO_DATABASE)) {
    if (route.enPath === path) {
      return { route, lang: 'en' };
    }
  }

  return null;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CarRental',
    '@id': `${SITE}/#organization`,
    name: 'MR Car Rent Chiang Mai - รถเช่าพร้อมคนขับเชียงใหม่',
    alternateName: 'เอ็มอาร์ คาร์เร้นท์ เชียงใหม่',
    url: `${SITE}/`,
    logo: `${SITE}/images/logo.jpg`,
    image: `${SITE}/images/logo.jpg`,
    telephone: '+66656455104',
    email: INITIAL_SETTINGS.email,
    priceRange: '฿1,200 - ฿2,500',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '208/36 ดอนแก้ววิลเลจ 7 ต.ดอนแก้ว',
      addressLocality: 'แม่ริม',
      addressRegion: 'เชียงใหม่',
      postalCode: '50180',
      addressCountry: 'TH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 18.914,
      longitude: 98.965,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '06:00',
        closes: '22:00',
      },
    ],
    sameAs: [
      INITIAL_SETTINGS.facebook_url,
      INITIAL_SETTINGS.line_url,
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '184',
      bestRating: '5',
      worstRating: '1',
    },
  };
}

const DIRECTORY_SEO: Record<string, Omit<PageSeo, 'jsonLd' | 'crawlContentHtml' | 'ogImage'> & { ogImage?: string }> = {
  '/cars/': {
    lang: 'th',
    title: 'รถเช่าพร้อมคนขับเชียงใหม่ ดูรถและราคา | MR Car Rent',
    description: 'รวมรถเก๋ง SUV และรถตู้ VIP พร้อมคนขับเชียงใหม่ ราคาเริ่มต้นชัดเจน จองง่ายผ่าน LINE',
    keywords: 'รถเช่าพร้อมคนขับเชียงใหม่, รถตู้เชียงใหม่, รถเก๋งพร้อมคนขับ',
    canonicalUrl: `${SITE}/cars/`,
    hreflangTh: `${SITE}/cars/`,
    hreflangEn: `${SITE}/cars/`,
    h1: 'รถและราคาบริการรถเช่าพร้อมคนขับเชียงใหม่',
    intro: 'เลือกประเภทรถที่เหมาะกับจำนวนผู้โดยสารและเส้นทางท่องเที่ยวในเชียงใหม่',
  },
  '/tour-packages/': {
    lang: 'th',
    title: 'แพ็กเกจท่องเที่ยวเชียงใหม่ พร้อมคนขับ | MR Car Rent',
    description: 'รวมเส้นทางท่องเที่ยวยอดนิยมแม่กำปอง ม่อนแจ่ม ดอยอินทนนท์ เชียงราย ปาย พร้อมคนขับชำนาญทาง',
    keywords: 'เหมารถเที่ยวเชียงใหม่, แพ็กเกจท่องเที่ยวเชียงใหม่, แม่กำปอง, ม่อนแจ่ม',
    canonicalUrl: `${SITE}/tour-packages/`,
    hreflangTh: `${SITE}/tour-packages/`,
    hreflangEn: `${SITE}/tour-packages/`,
    h1: 'แพ็กเกจท่องเที่ยวเชียงใหม่พร้อมคนขับ',
    intro: 'เลือกเส้นทางท่องเที่ยวเชียงใหม่และภาคเหนือ พร้อมคนขับมืออาชีพ',
  },
  '/reviews/': {
    lang: 'th',
    title: 'รีวิวลูกค้า รถเช่าพร้อมคนขับเชียงใหม่ | MR Car Rent',
    description: 'รีวิวจากลูกค้าจริงที่ใช้บริการรถเช่าพร้อมคนขับเชียงใหม่ รับส่งสนามบิน และเหมารถเที่ยว',
    keywords: 'รีวิวรถเช่าพร้อมคนขับเชียงใหม่, รีวิวเหมารถเชียงใหม่',
    canonicalUrl: `${SITE}/reviews/`,
    hreflangTh: `${SITE}/reviews/`,
    hreflangEn: `${SITE}/reviews/`,
    h1: 'รีวิวลูกค้า MR Car Rent Chiang Mai',
    intro: 'รวมความคิดเห็นจากลูกค้าที่เดินทางกับเราในเชียงใหม่และภาคเหนือ',
  },
  '/about/': {
    lang: 'th',
    title: 'เกี่ยวกับเรา MR Car Rent Chiang Mai',
    description: 'ทำความรู้จัก MR Car Rent บริการรถเช่าพร้อมคนขับเชียงใหม่ รถสะอาด คนขับสุภาพ ราคาโปร่งใส',
    keywords: 'เกี่ยวกับ MR Car Rent, รถเช่าพร้อมคนขับเชียงใหม่',
    canonicalUrl: `${SITE}/about/`,
    hreflangTh: `${SITE}/about/`,
    hreflangEn: `${SITE}/about/`,
    h1: 'เกี่ยวกับ MR Car Rent Chiang Mai',
    intro: 'เราให้บริการรถเช่าพร้อมคนขับในเชียงใหม่และภาคเหนือ ด้วยมาตรฐานความปลอดภัยและบริการที่เป็นกันเอง',
  },
  '/contact/': {
    lang: 'th',
    title: 'ติดต่อเรา MR Car Rent Chiang Mai เบอร์โทร LINE',
    description: `ติดต่อ MR Car Rent โทร ${INITIAL_SETTINGS.phone} LINE ${INITIAL_SETTINGS.line_id} ที่อยู่ ${INITIAL_SETTINGS.address_th}`,
    keywords: 'ติดต่อรถเช่าพร้อมคนขับเชียงใหม่, LINE มรคาร์เร้นท์',
    canonicalUrl: `${SITE}/contact/`,
    hreflangTh: `${SITE}/contact/`,
    hreflangEn: `${SITE}/contact/`,
    h1: 'ติดต่อ MR Car Rent Chiang Mai',
    intro: `โทร ${INITIAL_SETTINGS.phone} หรือแอด LINE ${INITIAL_SETTINGS.line_id} ได้ตลอดวัน`,
  },
  '/faq/': {
    lang: 'th',
    title: 'คำถามที่พบบ่อย รถเช่าพร้อมคนขับเชียงใหม่ | MR Car Rent',
    description: 'คำตอบเรื่องราคา การจอง มัดจำ และการใช้บริการรถเช่าพร้อมคนขับเชียงใหม่',
    keywords: 'FAQ รถเช่าพร้อมคนขับเชียงใหม่, คำถามที่พบบ่อยเหมารถ',
    canonicalUrl: `${SITE}/faq/`,
    hreflangTh: `${SITE}/faq/`,
    hreflangEn: `${SITE}/faq/`,
    h1: 'คำถามที่พบบ่อย (FAQ)',
    intro: 'รวมคำตอบสำหรับคำถามยอดนิยมเกี่ยวกับบริการรถเช่าพร้อมคนขับเชียงใหม่',
  },
};

function homepageSeo(lang: 'th' | 'en'): PageSeo {
  const isTh = lang === 'th';
  const title = isTh
    ? 'รถเช่าพร้อมคนขับเชียงใหม่ | รถเก๋ง SUV รถตู้ เริ่ม 1,200 บาท'
    : 'Chiang Mai Private Driver Service | Sedan, SUV, VIP Van | MR Car Rent';
  const description = isTh
    ? 'รถเช่าพร้อมคนขับเชียงใหม่ รถเก๋ง SUV และรถตู้ รับส่งสนามบิน เหมารถเที่ยวเชียงใหม่และต่างจังหวัด เช็กคิวและขอราคาผ่าน LINE ได้ทันที'
    : 'Private car rental with driver in Chiang Mai, airport transfers, day tours to Mae Kampong, Mon Jam & Pai.';
  const h1 = isTh
    ? 'รถเช่าพร้อมคนขับเชียงใหม่ เที่ยวสบาย ปลอดภัย ราคาชัดเจน'
    : 'Private Car Rental with Driver in Chiang Mai';
  const intro = isTh
    ? 'บริการรถเก๋ง SUV และรถตู้ VIP พร้อมพนักงานขับรถมืออาชีพ รับส่งสนามบินเชียงใหม่ เหมารถเที่ยวแม่กำปอง ม่อนแจ่ม อินทนนท์ เชียงราย ปาย'
    : 'Professional private drivers for airport transfers and day trips across Chiang Mai and Northern Thailand.';
  const canonicalUrl = isTh ? `${SITE}/` : `${SITE}/en/`;

  return {
    lang,
    title,
    description,
    keywords: isTh
      ? 'รถเช่าพร้อมคนขับเชียงใหม่, รถพร้อมคนขับเชียงใหม่, เหมารถเชียงใหม่, รถรับส่งสนามบินเชียงใหม่'
      : 'Chiang Mai private driver, Chiang Mai car with driver, Chiang Mai airport transfer',
    canonicalUrl,
    hreflangTh: `${SITE}/`,
    hreflangEn: `${SITE}/en/`,
    ogImage: DEFAULT_OG,
    h1,
    intro,
    jsonLd: [organizationSchema()],
    crawlContentHtml: buildCrawlHtml({
      h1,
      intro,
      bullets: [
        isTh ? 'รับส่งสนามบินเชียงใหม่ (CNX)' : 'Chiang Mai Airport (CNX) transfer',
        isTh ? 'เหมารถเที่ยวแม่กำปอง ม่อนแจ่ม ดอยอินทนนท์' : 'Day trips to Mae Kampong, Mon Jam, Doi Inthanon',
        isTh ? `ติดต่อ LINE ${INITIAL_SETTINGS.line_id}` : `Contact LINE ${INITIAL_SETTINGS.line_id}`,
        isTh ? `โทร ${INITIAL_SETTINGS.phone}` : `Call ${INITIAL_SETTINGS.phone}`,
      ],
      links: Object.values(ROUTE_SEO_DATABASE).slice(0, 8).map((r) => ({
        href: isTh ? r.path : r.enPath,
        label: isTh ? r.h1_th : r.h1_en,
      })),
    }),
  };
}

function buildCrawlHtml(input: {
  h1: string;
  intro: string;
  bullets?: string[];
  faqs?: { q: string; a: string }[];
  links?: { href: string; label: string }[];
}): string {
  const bullets = (input.bullets || [])
    .map((b) => `<li>${escapeHtml(b)}</li>`)
    .join('');
  const faqs = (input.faqs || [])
    .map(
      (f) =>
        `<div><h3>${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p></div>`
    )
    .join('');
  const links = (input.links || [])
    .map((l) => `<li><a href="${escapeHtml(l.href)}">${escapeHtml(l.label)}</a></li>`)
    .join('');

  return `
<section id="seo-prerender" style="max-width:960px;margin:0 auto;padding:24px;font-family:Prompt,sans-serif;color:#0f172a">
  <h1>${escapeHtml(input.h1)}</h1>
  <p>${escapeHtml(input.intro)}</p>
  ${bullets ? `<ul>${bullets}</ul>` : ''}
  ${faqs ? `<section><h2>FAQ</h2>${faqs}</section>` : ''}
  ${links ? `<nav aria-label="Popular routes"><h2>Popular Routes</h2><ul>${links}</ul></nav>` : ''}
  <p><a href="${escapeHtml(INITIAL_SETTINGS.line_url)}">LINE ${escapeHtml(INITIAL_SETTINGS.line_id)}</a> | <a href="tel:${escapeHtml(INITIAL_SETTINGS.phone.replace(/-/g, ''))}">${escapeHtml(INITIAL_SETTINGS.phone)}</a></p>
</section>`.trim();
}

export function resolvePageSeo(pathname: string): PageSeo {
  const path = normalizePath(pathname);

  if (path === '/' || path === '/en/') {
    return homepageSeo(path.startsWith('/en') ? 'en' : 'th');
  }

  const matched = findRouteByPath(path);
  if (matched) {
    const { route, lang } = matched;
    const isTh = lang === 'th';
    const title = isTh ? route.title_th : route.title_en;
    const description = isTh ? route.description_th : route.description_en;
    const h1 = isTh ? route.h1_th : route.h1_en;
    const intro = isTh ? route.intro_th : route.intro_en;
    const details = isTh ? route.details_th : route.details_en;
    const canonicalUrl = `${SITE}${isTh ? route.path : route.enPath}`;
    const ogImage = route.hero_image.startsWith('http')
      ? route.hero_image
      : `${SITE}${route.hero_image.replace(/\?.*$/, '')}`;

    const jsonLd = [
      organizationSchema(),
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: isTh ? 'หน้าแรก' : 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: h1, item: canonicalUrl },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: h1,
        description,
        image: ogImage,
        brand: { '@type': 'Brand', name: 'MR Car Rent Chiang Mai' },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'THB',
          price: String(route.price_start),
          availability: 'https://schema.org/InStock',
          url: canonicalUrl,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: route.faqs.map((f) => ({
          '@type': 'Question',
          name: isTh ? f.q_th : f.q_en,
          acceptedAnswer: {
            '@type': 'Answer',
            text: isTh ? f.a_th : f.a_en,
          },
        })),
      },
    ];

    return {
      lang,
      title,
      description,
      keywords: isTh ? route.keywords_th : route.keywords_en,
      canonicalUrl,
      hreflangTh: `${SITE}${route.path}`,
      hreflangEn: `${SITE}${route.enPath}`,
      ogImage,
      h1,
      intro,
      jsonLd,
      crawlContentHtml: buildCrawlHtml({
        h1,
        intro,
        bullets: [
          ...(details.includes || []).slice(0, 6),
          isTh
            ? `ราคาเริ่มต้น ${route.price_start.toLocaleString('th-TH')} บาท`
            : `From ${route.price_start.toLocaleString('en-US')} THB`,
          isTh ? `ระยะเวลา: ${route.duration_th}` : `Duration: ${route.duration_en}`,
        ],
        faqs: route.faqs.slice(0, 5).map((f) => ({
          q: isTh ? f.q_th : f.q_en,
          a: isTh ? f.a_th : f.a_en,
        })),
        links: route.related_routes.map((r) => ({
          href: r.path,
          label: isTh ? r.name_th : r.name_en,
        })),
      }),
    };
  }

  const directory = DIRECTORY_SEO[path];
  if (directory) {
    return {
      ...directory,
      ogImage: directory.ogImage || DEFAULT_OG,
      jsonLd: [organizationSchema()],
      crawlContentHtml: buildCrawlHtml({
        h1: directory.h1,
        intro: directory.intro,
      }),
    };
  }

  return homepageSeo(path.startsWith('/en') ? 'en' : 'th');
}

export function injectSeoIntoHtml(html: string, seo: PageSeo): string {
  let output = html;

  output = output.replace(/<html\s+lang="[^"]*"/i, `<html lang="${seo.lang}"`);
  output = output.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`);

  const replaceMetaByName = (name: string, content: string) => {
    const re = new RegExp(`<meta\\s+name="${name}"\\s+content="[^"]*"\\s*\\/?>`, 'i');
    const tag = `<meta name="${name}" content="${escapeHtml(content)}" />`;
    if (re.test(output)) output = output.replace(re, tag);
    else output = output.replace('</head>', `  ${tag}\n  </head>`);
  };

  const replaceMetaByProperty = (property: string, content: string) => {
    const re = new RegExp(`<meta\\s+property="${property}"\\s+content="[^"]*"\\s*\\/?>`, 'i');
    const tag = `<meta property="${property}" content="${escapeHtml(content)}" />`;
    if (re.test(output)) output = output.replace(re, tag);
    else output = output.replace('</head>', `  ${tag}\n  </head>`);
  };

  replaceMetaByName('description', seo.description);
  replaceMetaByName('keywords', seo.keywords);
  replaceMetaByProperty('og:title', seo.title);
  replaceMetaByProperty('og:description', seo.description);
  replaceMetaByProperty('og:url', seo.canonicalUrl);
  replaceMetaByProperty('og:image', seo.ogImage);
  replaceMetaByProperty('og:locale', seo.lang === 'en' ? 'en_US' : 'th_TH');
  replaceMetaByName('twitter:title', seo.title);
  replaceMetaByName('twitter:description', seo.description);
  replaceMetaByName('twitter:image', seo.ogImage);

  const replaceLink = (rel: string, href: string, hreflang?: string) => {
    const hreflangAttr = hreflang ? ` hreflang="${hreflang}"` : '';
    const re = hreflang
      ? new RegExp(`<link\\s+rel="${rel}"\\s+hreflang="${hreflang}"\\s+href="[^"]*"\\s*\\/?>`, 'i')
      : new RegExp(`<link\\s+rel="${rel}"\\s+href="[^"]*"\\s*\\/?>`, 'i');
    const tag = `<link rel="${rel}"${hreflangAttr} href="${escapeHtml(href)}" />`;
    if (re.test(output)) output = output.replace(re, tag);
    else output = output.replace('</head>', `  ${tag}\n  </head>`);
  };

  replaceLink('canonical', seo.canonicalUrl);
  replaceLink('alternate', seo.hreflangTh, 'th');
  replaceLink('alternate', seo.hreflangEn, 'en');
  replaceLink('alternate', seo.hreflangTh, 'x-default');

  const jsonLdTag = `<script type="application/ld+json" id="seo-jsonld-script">${JSON.stringify(seo.jsonLd)}</script>`;
  if (/id="seo-jsonld-script"/i.test(output)) {
    output = output.replace(/<script[^>]*id="seo-jsonld-script"[^>]*>[\s\S]*?<\/script>/i, jsonLdTag);
  } else {
    output = output.replace('</head>', `  ${jsonLdTag}\n  </head>`);
  }

  // Crawlable content for bots before React mounts
  if (/id="seo-prerender"/i.test(output)) {
    output = output.replace(/<section id="seo-prerender"[\s\S]*?<\/section>/i, seo.crawlContentHtml);
  } else {
    output = output.replace(
      /<div id="root"><\/div>/i,
      `<div id="root">${seo.crawlContentHtml}</div>`
    );
  }

  return output;
}
