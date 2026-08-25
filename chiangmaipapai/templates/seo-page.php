<?php
declare(strict_types=1);
/**
 * Shared SEO landing page template
 * Expects: $page (array), plus bootstrap globals
 */
$isHome = false;
$pageTitle = $page['title'];
$pageDescription = $page['description'];
$pageCanonical = $baseUrl . $page['path'];
$bodyClass = 'has-mobile-bar';
$ogImage = $baseUrl . '/assets/images/' . ltrim((string) $page['image'], '/') . '.webp';

$extraSchemas = [];
$pageFaq = $page['faq'] ?? [];
if (($page['type'] ?? '') === 'faq-hub' && empty($pageFaq)) {
    $pageFaq = $content['faq'] ?? [];
}
if (!empty($pageFaq)) {
    $extraSchemas[] = [
        '@context' => 'https://schema.org',
        '@type' => 'FAQPage',
        'mainEntity' => array_map(static function (array $item): array {
            return [
                '@type' => 'Question',
                'name' => $item['q'],
                'acceptedAnswer' => [
                    '@type' => 'Answer',
                    'text' => $item['a'],
                ],
            ];
        }, $pageFaq),
    ];
}

require dirname(__DIR__) . '/components/head.php';
require dirname(__DIR__) . '/components/header.php';
?>
<main id="main-content">
  <section class="relative overflow-hidden bg-gradient-to-br from-navy via-navy-deep to-[#08325c] text-white">
    <div class="pointer-events-none absolute inset-0 bg-hero-mesh opacity-70" aria-hidden="true"></div>
    <div class="container-page relative grid items-center gap-8 py-12 lg:grid-cols-2 lg:py-16">
      <div>
        <nav class="mb-4 text-xs text-white/60" aria-label="breadcrumb">
          <a class="hover:text-gold" href="/">หน้าแรก</a>
          <span class="mx-2" aria-hidden="true">/</span>
          <span class="text-white/85"><?= e($page['h1']) ?></span>
        </nav>
        <p class="eyebrow !border-gold/40 !bg-gold/15 !text-gold-soft"><?= e($page['eyebrow']) ?></p>
        <h1 class="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-[2.35rem]"><?= e($page['h1']) ?></h1>
        <p class="mt-4 max-w-xl text-base font-light leading-relaxed text-white/85"><?= e($page['lead']) ?></p>
        <div class="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href="/#quick-quote" class="btn-primary" data-analytics="click_quote" data-button-position="page_hero" data-destination="<?= e($page['slug']) ?>">เช็กคิวและขอราคา</a>
          <a href="<?= e(tel_href($business)) ?>" class="btn-secondary !border-white/25 !bg-white/10 !text-white hover:!bg-white/20" data-analytics="click_phone" data-button-position="page_hero">โทร <?= e($business['phone']) ?></a>
          <?php if ($lineReady): ?>
            <a href="<?= e($business['line_url']) ?>" class="btn-line" target="_blank" rel="noopener noreferrer" data-analytics="click_line" data-button-position="page_hero">สอบถามผ่าน LINE</a>
          <?php endif; ?>
        </div>
      </div>
      <div class="media-frame">
        <?= picture_sources($page['image'], $page['image_alt'], [
            'class' => 'aspect-[16/10] w-full object-cover',
            'width' => '1400',
            'height' => '875',
            'sizes' => '(max-width: 1024px) 100vw, 50vw',
            'fetchpriority' => 'high',
            'loading' => 'eager',
        ]) ?>
      </div>
    </div>
  </section>

  <?php if (!empty($page['facts'])): ?>
  <section class="border-b border-navy/5 bg-white" aria-label="สรุปข้อมูล">
    <div class="container-page grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
      <?php foreach ($page['facts'] as $fact): ?>
        <div class="rounded-2xl bg-mist/80 px-4 py-3">
          <p class="text-xs font-semibold uppercase tracking-wide text-gold"><?= e($fact['label']) ?></p>
          <p class="mt-1 text-sm font-semibold text-navy"><?= e($fact['value']) ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </section>
  <?php endif; ?>

  <?php if (($page['slug'] ?? '') === 'price'): ?>
    <?php require dirname(__DIR__) . '/components/pricing-table.php'; ?>
  <?php endif; ?>

  <?php
    // Inject live starting price into facts/lead context for vehicle & destination pages
    $livePriceLabel = null;
    if (($page['type'] ?? '') === 'vehicle') {
        $livePriceLabel = price_label_for('vehicles', (string) $page['slug'], $pricing);
    } elseif (($page['type'] ?? '') === 'destination') {
        $livePriceLabel = price_label_for('destinations', (string) $page['slug'], $pricing);
    }
  ?>

  <section class="section">
    <div class="container-page max-w-3xl space-y-10">
      <?php if ($livePriceLabel !== null && $pricingEnabled): ?>
        <article class="card border-gold/20">
          <p class="text-xs font-semibold uppercase tracking-wide text-gold">ราคาเริ่มต้น</p>
          <p class="mt-2 text-2xl font-bold text-navy"><?= e($livePriceLabel) ?></p>
          <p class="mt-2 text-sm text-ink/65"><?= e($pricing['disclaimer'] ?? '') ?></p>
          <a href="/#quick-quote" class="btn-primary mt-4" data-analytics="click_quote" data-button-position="page_price">เช็กคิวเพื่อยืนยันราคา</a>
        </article>
      <?php endif; ?>

      <?php
        $stops = [];
        if (($page['type'] ?? '') === 'destination') {
            $stops = $page['recommended_stops'] ?? ($tripStops[$page['slug']] ?? []);
        }
      ?>
      <?php if (!empty($stops)): ?>
        <article class="card border-navy/5">
          <h2 class="text-xl font-semibold text-navy sm:text-2xl">ทริปแนะนำ</h2>
          <p class="mt-2 text-sm font-medium text-gold"><?= e($tripStops['note'] ?? 'ทริปแนะนำ สามารถปรับเปลี่ยนได้ตามเส้นทาง') ?></p>
          <ul class="mt-5 space-y-2.5">
            <?php foreach ($stops as $stop): ?>
              <li class="flex items-start gap-3 text-sm leading-relaxed text-ink/80">
                <span class="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-gold" aria-hidden="true"></span>
                <span><?= e((string) $stop) ?></span>
              </li>
            <?php endforeach; ?>
          </ul>
          <p class="mt-5 text-xs text-ink/55">สามารถเลือกบางจุดหรือปรับลำดับได้ตามเวลาและความสนใจ แจ้งตอนเช็กคิวได้เลย</p>
        </article>
      <?php endif; ?>

      <?php foreach ($page['sections'] as $section): ?>
        <article>
          <h2 class="section-title text-[1.4rem] sm:text-2xl"><?= e($section['h2']) ?></h2>
          <?php if (!empty($section['body'])): ?>
            <p class="mt-4 text-base leading-relaxed text-ink/75"><?= e($section['body']) ?></p>
          <?php endif; ?>
          <?php if (!empty($section['links'])): ?>
            <ul class="mt-4 grid gap-2 sm:grid-cols-2">
              <?php foreach ($section['links'] as $link): ?>
                <li>
                  <a class="card-hover flex items-center justify-between gap-3 !py-3 text-sm font-semibold text-navy" href="<?= e($link['href']) ?>">
                    <span><?= e($link['label']) ?></span>
                    <span aria-hidden="true">→</span>
                  </a>
                </li>
              <?php endforeach; ?>
            </ul>
          <?php endif; ?>
        </article>
      <?php endforeach; ?>

      <?php if (($page['type'] ?? '') === 'contact'): ?>
        <article class="card border-gold/20">
          <h2 class="text-lg font-semibold text-navy">ข้อมูลติดต่อ</h2>
          <ul class="mt-4 space-y-3 text-sm text-ink/80">
            <li>โทร: <a class="font-semibold text-navy hover:underline" href="<?= e(tel_href($business)) ?>" data-analytics="click_phone" data-button-position="contact_page"><?= e($business['phone']) ?></a></li>
            <li>LINE: <?php if ($lineReady): ?><a class="font-semibold text-line hover:underline" href="<?= e($business['line_url']) ?>" target="_blank" rel="noopener noreferrer" data-analytics="click_line" data-button-position="contact_page"><?= e($business['line_id']) ?></a><?php else: ?><span class="font-semibold text-navy"><?= e($business['line_id'] ?: 'เร็ว ๆ นี้') ?></span><?php endif; ?></li>
            <li>อีเมล: <a class="font-semibold text-navy hover:underline" href="mailto:<?= e($business['email']) ?>"><?= e($business['email']) ?></a></li>
            <li>ที่อยู่: <?= e($business['address']) ?></li>
          </ul>
          <div class="mt-5 flex flex-wrap gap-3">
            <a href="/#quick-quote" class="btn-primary" data-analytics="click_quote" data-button-position="contact_page">เช็กคิวและขอราคา</a>
            <?php if ($lineReady): ?>
              <a href="<?= e($business['line_url']) ?>" class="btn-line" target="_blank" rel="noopener noreferrer" data-analytics="click_line" data-button-position="contact_page">สอบถามผ่าน LINE</a>
            <?php endif; ?>
          </div>
        </article>
      <?php endif; ?>

      <?php if (($page['type'] ?? '') === 'reviews'): ?>
        <?php
          $gbp = trim((string) ($business['google_business_url'] ?? ''));
          $greview = trim((string) ($business['google_review_url'] ?? ''));
        ?>
        <article class="card border-gold/20">
          <h2 class="text-lg font-semibold text-navy">สถานะรีวิว</h2>
          <?php if ($greview !== '' || $gbp !== ''): ?>
            <p class="mt-2 text-sm text-ink/70">เปิดดูรีวิวจริงได้จากลิงก์ด้านล่าง</p>
            <div class="mt-4 flex flex-wrap gap-3">
              <?php if ($greview !== ''): ?>
                <a class="btn-primary" href="<?= e($greview) ?>" target="_blank" rel="noopener noreferrer">เขียน/ดูรีวิว Google</a>
              <?php endif; ?>
              <?php if ($gbp !== ''): ?>
                <a class="btn-secondary" href="<?= e($gbp) ?>" target="_blank" rel="noopener noreferrer">Google Business Profile</a>
              <?php endif; ?>
            </div>
          <?php else: ?>
            <p class="mt-2 text-sm text-ink/70">ยังไม่เชื่อมลิงก์ Google Business / Google Reviews ในระบบ เมื่อได้ลิงก์แล้วใส่ใน <code class="text-navy">config/business.php</code> ได้เลย</p>
          <?php endif; ?>
        </article>
      <?php endif; ?>
    </div>
  </section>

  <?php if (!empty($pageFaq)): ?>
  <section class="section bg-white/70" aria-labelledby="page-faq-heading">
    <div class="container-page max-w-3xl">
      <h2 id="page-faq-heading" class="section-title">คำถามที่พบบ่อย</h2>
      <div class="mt-8 space-y-3">
        <?php foreach ($pageFaq as $i => $item): ?>
          <details class="faq-item card !p-0" <?= $i === 0 ? 'open' : '' ?>>
            <summary class="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-left text-sm font-semibold text-navy sm:text-base">
              <span><?= e($item['q']) ?></span>
              <svg class="faq-chevron h-5 w-5 shrink-0 text-navy/50 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
            </summary>
            <div class="border-t border-navy/5 px-5 py-4 text-sm leading-relaxed text-ink/75"><?= e($item['a']) ?></div>
          </details>
        <?php endforeach; ?>
      </div>
    </div>
  </section>
  <?php endif; ?>

  <?php require dirname(__DIR__) . '/components/final-cta.php'; ?>
</main>
<?php
require dirname(__DIR__) . '/components/mobile-bar.php';
require dirname(__DIR__) . '/components/footer.php';
