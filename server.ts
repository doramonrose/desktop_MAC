import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer, ViteDevServer } from 'vite';
import { QuoteRequest, SiteSettings, Vehicle, TourPackage, Review, FAQItem } from './src/types.js';
import { INITIAL_SETTINGS, INITIAL_VEHICLES, INITIAL_PACKAGES, INITIAL_REVIEWS, INITIAL_FAQS } from './src/data/initialData.js';
import { resolvePageSeo, injectSeoIntoHtml } from './src/seo/resolvePageSeo.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-Memory & File Persistence Store
const STORAGE_FILE = path.join(process.cwd(), 'storage', 'quotes_db.json');

// Ensure storage folder exists
if (!fs.existsSync(path.join(process.cwd(), 'storage'))) {
  fs.mkdirSync(path.join(process.cwd(), 'storage'), { recursive: true });
}

let quoteRequests: QuoteRequest[] = [];
let siteSettings: SiteSettings = { ...INITIAL_SETTINGS };
let vehiclesList: Vehicle[] = [...INITIAL_VEHICLES];
let packagesList: TourPackage[] = [...INITIAL_PACKAGES];
let reviewsList: Review[] = [...INITIAL_REVIEWS];
let faqsList: FAQItem[] = [...INITIAL_FAQS];

// Load from JSON file if present
if (fs.existsSync(STORAGE_FILE)) {
  try {
    const data = JSON.parse(fs.readFileSync(STORAGE_FILE, 'utf-8'));
    if (Array.isArray(data.quotes)) quoteRequests = data.quotes;
    if (data.settings) siteSettings = data.settings;
  } catch (err) {
    console.error('Error loading persistent storage:', err);
  }
}

function saveStorage() {
  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify({ quotes: quoteRequests, settings: siteSettings }, null, 2));
  } catch (err) {
    console.error('Error writing storage:', err);
  }
}

// Simple Rate Limiting Store
const ipLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 10;

  const timestamps = (ipLimitMap.get(ip) || []).filter(t => now - t < windowMs);
  if (timestamps.length >= maxRequests) {
    return false;
  }
  timestamps.push(now);
  ipLimitMap.set(ip, timestamps);
  return true;
}

// Generate unique Quote Code (MRC-YYYYMMDD-XXXX)
function generateQuoteCode(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `MRC-${dateStr}-${randomSuffix}`;
}

// API Routes
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// GET Site Data (Vehicles, Packages, FAQs, Settings, Reviews)
app.get('/api/site-data', (_req: Request, res: Response) => {
  res.json({
    settings: siteSettings,
    vehicles: vehiclesList,
    packages: packagesList,
    reviews: reviewsList,
    faqs: faqsList
  });
});

// POST Quote Request
app.post('/api/quote', (req: Request, res: Response) => {
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';

  // Honeypot anti-spam check
  if (req.body.website_hp) {
    // Silent ignore for bots
    return res.status(200).json({ success: true, message: 'Received' });
  }

  // Rate Limiter
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ success: false, error: 'ส่งข้อมูลถี่เกินไป กรุณาลองใหม่อีกครั้งในภายหลัง' });
  }

  const {
    travel_date,
    travel_time,
    pickup_location,
    destination,
    trip_type,
    passengers,
    luggage,
    vehicle_type,
    vehicle_id,
    package_id,
    customer_name,
    phone,
    line_id,
    email,
    note,
    language = 'th',
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term,
    landing_page,
    referrer
  } = req.body;

  // Server-side Validations
  if (!customer_name || !phone || !travel_date || !pickup_location || !destination) {
    return res.status(400).json({ success: false, error: 'กรุณากรอกข้อมูลสำคัญให้ครบถ้วน (ชื่อ, เบอร์โทร, วันเดินทาง, จุดรับ, จุดหมาย)' });
  }

  // Phone Validation
  const cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length < 9 || cleanPhone.length > 12) {
    return res.status(400).json({ success: false, error: 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง' });
  }

  // Travel Date Check (Not past)
  const selectedDate = new Date(travel_date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (selectedDate < today) {
    return res.status(400).json({ success: false, error: 'วันเดินทางต้องไม่เป็นวันที่ผ่านมาแล้ว' });
  }

  const quote_code = generateQuoteCode();
  const newQuote: QuoteRequest = {
    id: `q-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    quote_code,
    travel_date,
    travel_time: travel_time || '08:00',
    pickup_location,
    destination,
    trip_type: trip_type || 'day_trip_chiangmai',
    passengers: Number(passengers) || 1,
    luggage: Number(luggage) || 0,
    vehicle_type: vehicle_type || 'recommend',
    vehicle_id,
    package_id,
    customer_name,
    phone,
    line_id: line_id || '',
    email: email || '',
    note: note || '',
    language,
    status: 'new',
    source: 'website_form',
    utm_source: utm_source || '',
    utm_medium: utm_medium || '',
    utm_campaign: utm_campaign || '',
    utm_content: utm_content || '',
    utm_term: utm_term || '',
    landing_page: landing_page || '/',
    referrer: referrer || '',
    ip_hash: Buffer.from(ip).toString('base64').substring(0, 12),
    user_agent: req.headers['user-agent'] || '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  quoteRequests.unshift(newQuote);
  saveStorage();

  // Format LINE Summary Message
  const lineText = `สวัสดีครับ สนใจเช็กคิวรถและขอราคา

หมายเลขคำขอ: ${quote_code}
ชื่อผู้ติดต่อ: ${customer_name}
เบอร์โทร: ${phone}
${line_id ? `LINE ID: ${line_id}\n` : ''}วันที่เดินทาง: ${travel_date}
เวลา: ${travel_time || 'ไม่ระบุ'}
จุดรับ: ${pickup_location}
จุดหมาย: ${destination}
จำนวนผู้โดยสาร: ${passengers} ท่าน
จำนวนกระเป๋า: ${luggage} ใบ
ประเภทรถ: ${vehicle_type === 'sedan' ? 'รถเก๋ง' : vehicle_type === 'suv' ? 'SUV' : vehicle_type === 'van' ? 'รถตู้ VIP' : 'ให้แนะนำ'}
${note ? `หมายเหตุเพิ่มเติม: ${note}` : ''}`;

  const encodedLineText = encodeURIComponent(lineText);
  const lineDirectUrl = `https://line.me/R/msg/text/?${encodedLineText}`;

  return res.status(200).json({
    success: true,
    quote_code,
    quote: newQuote,
    line_summary_text: lineText,
    line_direct_url: lineDirectUrl
  });
});

// Admin API Routes
app.get('/api/admin/quotes', (req: Request, res: Response) => {
  const { search, status, vehicle_type } = req.query;
  let result = [...quoteRequests];

  if (search) {
    const q = (search as string).toLowerCase();
    result = result.filter(r =>
      r.customer_name.toLowerCase().includes(q) ||
      r.phone.includes(q) ||
      r.quote_code.toLowerCase().includes(q) ||
      r.pickup_location.toLowerCase().includes(q) ||
      r.destination.toLowerCase().includes(q)
    );
  }

  if (status && status !== 'all') {
    result = result.filter(r => r.status === status);
  }

  if (vehicle_type && vehicle_type !== 'all') {
    result = result.filter(r => r.vehicle_type === vehicle_type);
  }

  const stats = {
    total: quoteRequests.length,
    new: quoteRequests.filter(r => r.status === 'new').length,
    contacted: quoteRequests.filter(r => r.status === 'contacted').length,
    quoted: quoteRequests.filter(r => r.status === 'quoted').length,
    confirmed: quoteRequests.filter(r => r.status === 'confirmed').length,
    completed: quoteRequests.filter(r => r.status === 'completed').length,
    cancelled: quoteRequests.filter(r => r.status === 'cancelled').length,
  };

  res.json({ quotes: result, stats });
});

// Update Quote Status
app.patch('/api/admin/quotes/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, note } = req.body;

  const quote = quoteRequests.find(q => q.id === id);
  if (!quote) {
    return res.status(404).json({ success: false, error: 'Quote not found' });
  }

  if (status) quote.status = status;
  if (note !== undefined) quote.note = note;
  quote.updated_at = new Date().toISOString();

  saveStorage();
  res.json({ success: true, quote });
});

// Delete Quote
app.delete('/api/admin/quotes/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = quoteRequests.findIndex(q => q.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Quote not found' });
  }

  quoteRequests.splice(index, 1);
  saveStorage();
  res.json({ success: true });
});

// Export CSV of Quotes
app.get('/api/admin/export-csv', (_req: Request, res: Response) => {
  const headers = [
    'Quote Code', 'Date', 'Customer Name', 'Phone', 'LINE ID', 'Travel Date', 'Travel Time',
    'Pickup', 'Destination', 'Trip Type', 'Passengers', 'Luggage', 'Vehicle Type',
    'Status', 'UTM Source', 'UTM Medium', 'UTM Campaign', 'Landing Page'
  ];

  const rows = quoteRequests.map(q => [
    `"${q.quote_code}"`,
    `"${new Date(q.created_at).toLocaleString('th-TH')}"`,
    `"${q.customer_name.replace(/"/g, '""')}"`,
    `"${q.phone}"`,
    `"${(q.line_id || '').replace(/"/g, '""')}"`,
    `"${q.travel_date}"`,
    `"${q.travel_time}"`,
    `"${q.pickup_location.replace(/"/g, '""')}"`,
    `"${q.destination.replace(/"/g, '""')}"`,
    `"${q.trip_type}"`,
    q.passengers,
    q.luggage,
    `"${q.vehicle_type}"`,
    `"${q.status}"`,
    `"${q.utm_source || ''}"`,
    `"${q.utm_medium || ''}"`,
    `"${q.utm_campaign || ''}"`,
    `"${q.landing_page || ''}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename=quote_requests_${new Date().toISOString().slice(0, 10)}.csv`);
  res.send(csvContent);
});

// Update Settings
app.post('/api/admin/settings', (req: Request, res: Response) => {
  siteSettings = { ...siteSettings, ...req.body };
  saveStorage();
  res.json({ success: true, settings: siteSettings });
});

// Serve dynamic robots.txt
app.get('/robots.txt', (_req: Request, res: Response) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://mrcarrentcm.com/sitemap.xml`);
});

// Serve dynamic sitemap.xml
app.get('/sitemap.xml', (_req: Request, res: Response) => {
  const routes = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/en/', priority: '0.9', changefreq: 'daily' },
    { url: '/car-with-driver-chiang-mai/', priority: '0.9', changefreq: 'weekly' },
    { url: '/en/car-with-driver-chiang-mai/', priority: '0.8', changefreq: 'weekly' },
    { url: '/chiang-mai-van-rental/', priority: '0.9', changefreq: 'weekly' },
    { url: '/en/chiang-mai-van-with-driver/', priority: '0.8', changefreq: 'weekly' },
    { url: '/chiang-mai-airport-transfer/', priority: '0.9', changefreq: 'weekly' },
    { url: '/en/chiang-mai-airport-transfer/', priority: '0.8', changefreq: 'weekly' },
    { url: '/mae-kampong-car-rental/', priority: '0.8', changefreq: 'weekly' },
    { url: '/en/mae-kampong-car-rental/', priority: '0.7', changefreq: 'weekly' },
    { url: '/mon-jam-car-rental/', priority: '0.8', changefreq: 'weekly' },
    { url: '/doi-inthanon-car-rental/', priority: '0.8', changefreq: 'weekly' },
    { url: '/doi-suthep-car-rental/', priority: '0.8', changefreq: 'weekly' },
    { url: '/chiang-mai-to-chiang-rai/', priority: '0.8', changefreq: 'weekly' },
    { url: '/en/chiang-mai-to-chiang-rai/', priority: '0.7', changefreq: 'weekly' },
    { url: '/chiang-mai-to-pai/', priority: '0.8', changefreq: 'weekly' },
    { url: '/en/chiang-mai-to-pai/', priority: '0.7', changefreq: 'weekly' },
    { url: '/chiang-mai-day-trip/', priority: '0.8', changefreq: 'weekly' },
    { url: '/en/chiang-mai-day-trip/', priority: '0.7', changefreq: 'weekly' },
    { url: '/cars/', priority: '0.7', changefreq: 'weekly' },
    { url: '/tour-packages/', priority: '0.7', changefreq: 'weekly' },
    { url: '/reviews/', priority: '0.7', changefreq: 'weekly' },
    { url: '/about/', priority: '0.6', changefreq: 'monthly' },
    { url: '/contact/', priority: '0.7', changefreq: 'monthly' },
    { url: '/faq/', priority: '0.6', changefreq: 'monthly' },
  ];

  const today = new Date().toISOString().slice(0, 10);
  const xmlUrls = routes.map(r => `  <url>
    <loc>https://mrcarrentcm.com${r.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(sitemapXml);
});

// Serve static files from public folder (works in both dev & production)
app.use('/images', express.static(path.join(process.cwd(), 'public/images')));
app.use(express.static(path.join(process.cwd(), 'public')));

function shouldHandleAsHtml(req: Request): boolean {
  if (req.method !== 'GET' && req.method !== 'HEAD') return false;
  const accept = req.headers.accept || '';
  if (accept.includes('text/html')) return true;
  // Bots / curl without Accept still get SEO HTML for clean paths
  const p = req.path;
  return !p.includes('.') && !p.startsWith('/api/');
}

async function renderSeoHtml(urlPath: string, vite?: ViteDevServer): Promise<string> {
  const seo = resolvePageSeo(urlPath);
  const indexPath = path.join(process.cwd(), 'index.html');
  let html = fs.readFileSync(indexPath, 'utf-8');

  if (vite) {
    html = await vite.transformIndexHtml(urlPath, html);
  } else {
    // Production: use built index.html if present
    const distIndex = path.join(process.cwd(), 'dist', 'index.html');
    if (fs.existsSync(distIndex)) {
      html = fs.readFileSync(distIndex, 'utf-8');
    }
  }

  return injectSeoIntoHtml(html, seo);
}

// Vite Middleware Integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);

    app.use(async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!shouldHandleAsHtml(req)) return next();
        const html = await renderSeoHtml(req.originalUrl || req.url, vite);
        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(html);
      } catch (err) {
        vite.ssrFixStacktrace(err as Error);
        next(err);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { index: false }));
    app.get('*', async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!shouldHandleAsHtml(req)) return next();
        const html = await renderSeoHtml(req.originalUrl || req.url);
        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(html);
      } catch (err) {
        next(err);
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MR Car Rent Chiang Mai server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
