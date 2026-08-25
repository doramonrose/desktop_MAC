<?php
declare(strict_types=1);
require dirname(__DIR__) . '/bootstrap.php';

$meta = page_seo($seo, '/about/');
$pageTitle = $meta['title'];
$pageDescription = $meta['description'];
$pageH1 = $meta['h1'];
$pageCanonical = $baseUrl . '/about/';
$pageRobots = $meta['robots'];
$crumbs = breadcrumbs_for('/about/', $routes, $vehicles);
$quoteHref = '/#quick-quote';
$data = $content['about'];

$extraSchemas = array_filter([
    schema_organization($business, $app),
    schema_local_business($business, $app),
    schema_website($business, $app),
    schema_webpage($pageTitle, $pageDescription, $pageCanonical),
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
    </div>
  </header>
  <section class="section">
    <div class="container-page reading">
      <h2>ทำไมสร้างบริการนี้</h2>
      <p><?= e($data['why']) ?></p>
      <h2>พื้นที่ที่รู้จัก</h2>
      <p><?= e($data['area']) ?></p>
      <h2>แนวทางดูแลลูกค้า</h2>
      <p><?= e($data['care']) ?></p>
      <h2>รถ</h2>
      <p><?= e($data['cars']) ?></p>
      <h2>คนขับ</h2>
      <p><?= e($data['drivers']) ?></p>
      <h2>การเดินทาง</h2>
      <p><?= e($data['honest']) ?></p>
    </div>
  </section>
  <?php require dirname(__DIR__) . '/components/final-cta.php'; ?>
</main>
<?php
require dirname(__DIR__) . '/components/mobile-bar.php';
require dirname(__DIR__) . '/components/footer.php';
