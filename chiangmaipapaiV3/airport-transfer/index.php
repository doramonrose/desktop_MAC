<?php
declare(strict_types=1);
require dirname(__DIR__) . '/bootstrap.php';

$meta = page_seo($seo, '/airport-transfer/');
$pageTitle = $meta['title'];
$pageDescription = $meta['description'];
$pageH1 = $meta['h1'];
$pageCanonical = $baseUrl . '/airport-transfer/';
$pageRobots = $meta['robots'];
$crumbs = breadcrumbs_for('/airport-transfer/', $routes, $vehicles);
$data = $content['airport'];
$faqItems = $data['faq'];
$quoteDestination = 'สนามบินเชียงใหม่';
$quoteTrip = 'สนามบิน';
$relatedItems = [
    ['type' => 'page', 'id' => 'car'],
    ['type' => 'vehicle', 'id' => 'sedan'],
    ['type' => 'vehicle', 'id' => 'suv'],
    ['type' => 'page', 'id' => 'price'],
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
      <?= render_price('trips', 'airport', $prices) ?>
      <div class="hero-cta">
        <a class="btn-primary" href="#quick-quote" data-analytics="open_quote" data-button-position="airport_hero">เช็กคิวรถสนามบิน</a>
        <?php $linePosition = 'airport_hero'; require dirname(__DIR__) . '/components/line-inquire.php'; ?>
        <a class="btn-navy" href="<?= e(tel_href($business)) ?>" data-analytics="click_phone" data-button-position="airport_hero">โทรสอบถาม <?= e($business['phone']) ?></a>
      </div>
    </div>
  </header>

  <section class="section">
    <div class="container-page two-col">
      <div>
        <h2>รับตรงไหน</h2>
        <ul class="plain-ul">
          <?php foreach ($data['pickup'] as $row): ?>
            <li><?= e($row) ?></li>
          <?php endforeach; ?>
        </ul>
        <h2>ไปที่ไหนได้บ้าง</h2>
        <ul class="plain-ul">
          <?php foreach ($data['dropoffs'] as $row): ?>
            <li><?= e($row) ?></li>
          <?php endforeach; ?>
        </ul>
      </div>
      <aside class="fact-card">
        <p><strong>จุดนัดพบ</strong><br><?= e($data['meeting']) ?></p>
        <p><strong>เที่ยวบินดีเลย์</strong><br><?= e($data['delay']) ?></p>
      </aside>
    </div>
  </section>

  <section class="section section-alt">
    <div class="container-page">
      <h2>รถที่เหมาะกับสนามบิน</h2>
      <p>ดูจากจำนวนคนและกระเป๋าเป็นหลัก ไม่ใช่จากระยะทางอย่างเดียว</p>
      <div class="link-grid">
        <?php foreach ($vehicles as $vehicle): ?>
          <a class="plain-card" href="<?= e($vehicle['url']) ?>" data-analytics="select_vehicle" data-vehicle="<?= e($vehicle['id']) ?>">
            <h3><?= e($vehicle['name']) ?></h3>
            <p><?= e($vehicle['passengers']) ?> · <?= e($vehicle['luggage']) ?></p>
          </a>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <?php
    $tripContext = 'airport';
    $tripFeaturedId = 'city-half';
    $tripIntro = 'ถ้าเวลาเที่ยวบินทัน สามารถต่อทริปสั้นหลังรับสนามบินได้ จุดและชั่วโมงต้องคุยตอนเช็กคิว ไม่ใช่ราคาสนามบินอย่างเดียว';
    require dirname(__DIR__) . '/components/recommended-trips.php';
  ?>

  <?php
    $faqHeading = 'คำถามรถรับส่งสนามบินเชียงใหม่';
    require dirname(__DIR__) . '/components/faq.php';
    require dirname(__DIR__) . '/components/quote.php';
    require dirname(__DIR__) . '/components/related.php';
    require dirname(__DIR__) . '/components/final-cta.php';
  ?>
</main>
<?php
require dirname(__DIR__) . '/components/mobile-bar.php';
require dirname(__DIR__) . '/components/footer.php';
