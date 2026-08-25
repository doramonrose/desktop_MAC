<?php
declare(strict_types=1);
/** @var array $route */

$pageTitle = $route['title'];
$pageDescription = $route['description'];
$pageH1 = $route['h1'];
$pageCanonical = $baseUrl . $route['url'];
$pageRobots = 'index,follow';
$crumbs = breadcrumbs_for($route['url'], $routes, $vehicles);
$faqItems = $route['faq'];
$quoteDestination = $route['quote_destination'];
$quoteTrip = $route['quote_trip'];
$relatedItems = $route['related'];
$priceLabel = price_label('destinations', $route['price_id'], $prices);

$extraSchemas = array_filter([
    schema_organization($business, $app),
    schema_local_business($business, $app),
    schema_website($business, $app),
    schema_webpage($pageTitle, $pageDescription, $pageCanonical),
    schema_service($pageH1, $pageDescription, $pageCanonical, $business),
    schema_faq($faqItems),
    schema_breadcrumb($crumbs, $app),
]);

require __DIR__ . '/../components/head.php';
require __DIR__ . '/../components/header.php';
?>
<main id="main-content">
  <header class="page-hero">
    <div class="container-page page-hero-grid">
      <div>
        <?php require __DIR__ . '/../components/breadcrumb.php'; ?>
        <h1><?= e($pageH1) ?></h1>
        <p class="hero-lead"><?= e($route['lead']) ?></p>
        <div class="hero-cta">
          <a class="btn-primary" href="#quick-quote" data-analytics="open_quote" data-button-position="route_hero">เช็กคิวและขอราคา</a>
          <a class="btn-navy" href="<?= e(tel_href($business)) ?>" data-analytics="click_phone" data-button-position="route_hero">โทรสอบถาม</a>
        </div>
      </div>
      <div class="page-hero-media">
        <?= picture_tag($route['image'], $route['alt'], [
            'loading' => 'eager',
            'fetchpriority' => 'high',
            'width' => '900',
            'height' => '600',
            'sizes' => '(min-width: 1024px) 42vw, 100vw',
        ]) ?>
      </div>
    </div>
  </header>

  <section class="section">
    <div class="container-page prose-grid">
      <article>
        <h2>สรุปเส้นทาง</h2>
        <p><?= e($route['summary']) ?></p>
        <h2>ราคาเริ่มต้น</h2>
        <p class="price-strong"><?= e($priceLabel) ?></p>
        <p><?= e($prices['destinations'][$route['price_id']]['note'] ?? $prices['disclaimer']) ?></p>
        <ul class="include-list">
          <li><strong>รวม</strong> <?= e(implode(' · ', $prices['includes'])) ?></li>
          <li><strong>ไม่รวม</strong> <?= e(implode(' · ', $prices['excludes'])) ?></li>
          <li><strong>OT</strong> <?= e($prices['ot_note']) ?></li>
        </ul>
        <a class="btn-primary" href="#quick-quote" data-analytics="view_price" data-price-item="<?= e($route['id']) ?>">เช็กคิวราคานี้</a>
      </article>
      <aside class="fact-card">
        <p><strong>เวลาเดินทาง</strong><br><?= e($route['journey_time']) ?></p>
        <p><strong>เวลาออกที่แนะนำ</strong><br><?= e($route['suggested_departure']) ?></p>
        <p><strong>รูปแบบทริป</strong><br><?= e($route['duration']) ?></p>
      </aside>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container-page">
      <h2>รถที่เหมาะกับทริปนี้</h2>
      <p><?= e($route['vehicle_note']) ?></p>
      <div class="chip-row chip-static">
        <?php foreach ($route['recommended_vehicles'] as $vid): ?>
          <?php if (isset($vehicles[$vid])): ?>
            <a class="chip" href="<?= e($vehicles[$vid]['url']) ?>" data-analytics="select_vehicle" data-vehicle="<?= e($vid) ?>"><?= e($vehicles[$vid]['name']) ?></a>
          <?php endif; ?>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container-page two-col">
      <div>
        <h2>ตัวอย่างลำดับวัน</h2>
        <ol class="plain-ol">
          <?php foreach ($route['itinerary'] as $step): ?>
            <li><?= e($step) ?></li>
          <?php endforeach; ?>
        </ol>
      </div>
      <div>
        <h2>จุดแวะ</h2>
        <ul class="plain-ul">
          <?php foreach ($route['stops'] as $stop): ?>
            <li><?= e($stop) ?></li>
          <?php endforeach; ?>
        </ul>
      </div>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container-page two-col">
      <div>
        <h2>ทริปนี้เหมาะกับใคร</h2>
        <ul class="plain-ul">
          <?php foreach ($route['who'] as $who): ?>
            <li><?= e($who) ?></li>
          <?php endforeach; ?>
        </ul>
      </div>
      <div>
        <h2>เคล็ดลับการเดินทาง</h2>
        <ul class="plain-ul">
          <?php foreach ($route['tips'] as $tip): ?>
            <li><?= e($tip) ?></li>
          <?php endforeach; ?>
        </ul>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container-page">
      <h2>ภาพเส้นทาง</h2>
      <figure class="photo-frame photo-wide">
        <?= picture_tag($route['image'], $route['alt'], ['width' => '1200', 'height' => '720', 'sizes' => '100vw']) ?>
      </figure>
    </div>
  </section>

  <?php
  $faqHeading = 'คำถามเรื่องรถไป' . $route['name'];
  require __DIR__ . '/../components/faq.php';
  require __DIR__ . '/../components/quote.php';
  require __DIR__ . '/../components/related.php';
  require __DIR__ . '/../components/final-cta.php';
  ?>
</main>
<?php
require __DIR__ . '/../components/mobile-bar.php';
require __DIR__ . '/../components/footer.php';
