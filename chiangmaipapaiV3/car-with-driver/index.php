<?php
declare(strict_types=1);
require dirname(__DIR__) . '/bootstrap.php';

$meta = page_seo($seo, '/car-with-driver/');
$pageTitle = $meta['title'];
$pageDescription = $meta['description'];
$pageH1 = $meta['h1'];
$pageCanonical = $baseUrl . '/car-with-driver/';
$pageRobots = $meta['robots'];
$crumbs = breadcrumbs_for('/car-with-driver/', $routes, $vehicles);
$data = $content['car_with_driver'];
$faqItems = $data['faq'];
$relatedItems = [
    ['type' => 'page', 'id' => 'airport'],
    ['type' => 'page', 'id' => 'price'],
    ['type' => 'vehicle', 'id' => 'suv'],
    ['type' => 'route', 'id' => 'mae-kampong'],
];

$extraSchemas = array_filter([
    schema_organization($business, $app),
    schema_local_business($business, $app),
    schema_website($business, $app),
    schema_webpage($pageTitle, $pageDescription, $pageCanonical),
    schema_service($pageH1, $pageDescription, $pageCanonical, $business),
    schema_faq($faqItems),
    schema_breadcrumb($crumbs, $app),
]);

require dirname(__DIR__) . '/components/head.php';
require dirname(__DIR__) . '/components/header.php';
?>
<main id="main-content">
  <header class="page-hero">
    <div class="container-page">
      <?php require dirname(__DIR__) . '/components/breadcrumb.php'; ?>
      <h1><?= e($pageH1) ?></h1>
      <p class="hero-lead"><?= e($data['lead']) ?></p>
      <div class="hero-cta">
        <a class="btn-primary" href="#quick-quote" data-analytics="open_quote" data-button-position="service_hero">เช็กคิวและขอราคา</a>
        <a class="btn-navy" href="<?= e(tel_href($business)) ?>" data-analytics="click_phone" data-button-position="service_hero">โทรสอบถาม</a>
      </div>
    </div>
  </header>

  <section class="section">
    <div class="container-page two-col">
      <div>
        <h2>ใครใช้บริการนี้</h2>
        <ul class="plain-ul">
          <?php foreach ($data['who'] as $who): ?>
            <li><?= e($who) ?></li>
          <?php endforeach; ?>
        </ul>
        <p><?= e($data['includes_intro']) ?></p>
      </div>
      <aside class="fact-card">
        <p><strong>ครึ่งวัน</strong><br><?= e(price_label('trips', 'half_day', $prices)) ?></p>
        <p><strong>เต็มวัน</strong><br><?= e(price_label('trips', 'full_day', $prices)) ?></p>
        <p>ยอดจริงขึ้นกับจุดรับ จุดแวะ และชั่วโมงรถ</p>
      </aside>
    </div>
  </section>

  <?php require dirname(__DIR__) . '/components/vehicle-selector.php'; ?>
  <?php require dirname(__DIR__) . '/components/popular-routes.php'; ?>
  <?php
    $faqHeading = 'คำถามเรื่องรถพร้อมคนขับ';
    require dirname(__DIR__) . '/components/faq.php';
    require dirname(__DIR__) . '/components/quote.php';
    require dirname(__DIR__) . '/components/related.php';
    require dirname(__DIR__) . '/components/final-cta.php';
  ?>
</main>
<?php
require dirname(__DIR__) . '/components/mobile-bar.php';
require dirname(__DIR__) . '/components/footer.php';
