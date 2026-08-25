<?php
declare(strict_types=1);
/** @var array $vehicle */

$pageTitle = $vehicle['title'];
$pageDescription = $vehicle['description'];
$pageH1 = $vehicle['h1'];
$pageCanonical = $baseUrl . $vehicle['url'];
$pageRobots = 'index,follow';
$crumbs = breadcrumbs_for($vehicle['url'], $routes, $vehicles);
$extra = $content['vehicle_pages'][$vehicle['id']];
$faqItems = $extra['faq'];
$quoteVehicle = $vehicle['id'];
$relatedItems = [
    ['type' => 'page', 'id' => 'price'],
    ['type' => 'page', 'id' => 'airport'],
    ['type' => 'page', 'id' => 'car'],
];
if ($vehicle['id'] === 'suv') {
    $relatedItems[] = ['type' => 'route', 'id' => 'mae-kampong'];
    $relatedItems[] = ['type' => 'route', 'id' => 'pai'];
} elseif ($vehicle['id'] === 'van') {
    $relatedItems[] = ['type' => 'route', 'id' => 'doi-inthanon'];
    $relatedItems[] = ['type' => 'route', 'id' => 'chiang-rai'];
} else {
    $relatedItems[] = ['type' => 'route', 'id' => 'doi-suthep'];
    $relatedItems[] = ['type' => 'route', 'id' => 'mon-jam'];
}

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
        <p class="hero-lead"><?= e($vehicle['lead']) ?></p>
        <p class="price-strong"><?= e(price_label('vehicles', $vehicle['id'], $prices)) ?></p>
        <div class="hero-cta">
          <a class="btn-primary" href="#quick-quote" data-analytics="open_quote" data-button-position="vehicle_hero">เช็กคิวและขอราคา</a>
          <a class="btn-navy" href="/price/" data-analytics="view_price" data-price-item="<?= e($vehicle['id']) ?>">ดูราคา</a>
        </div>
      </div>
      <div class="page-hero-media">
        <?= picture_tag($vehicle['image'], $vehicle['alt'], [
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
        <?php foreach ($extra['body'] as $para): ?>
          <p><?= e($para) ?></p>
        <?php endforeach; ?>
        <p><strong>เหมาะกับ:</strong> <?= e($vehicle['best_for']) ?></p>
        <p><strong>อาจไม่เหมาะเมื่อ:</strong> <?= e($vehicle['not_ideal']) ?></p>
      </article>
      <aside class="fact-card">
        <p><strong>ผู้โดยสาร</strong><br><?= e($vehicle['passengers']) ?></p>
        <p><strong>สัมภาระ</strong><br><?= e($vehicle['luggage']) ?></p>
        <p><?= e($vehiclesConfig['selector_disclaimer']) ?></p>
      </aside>
    </div>
  </section>

  <?php
  $faqHeading = 'คำถามเรื่อง' . $vehicle['name'] . 'พร้อมคนขับ';
  require __DIR__ . '/../components/faq.php';
  require __DIR__ . '/../components/quote.php';
  require __DIR__ . '/../components/related.php';
  require __DIR__ . '/../components/final-cta.php';
  ?>
</main>
<?php
require __DIR__ . '/../components/mobile-bar.php';
require __DIR__ . '/../components/footer.php';
