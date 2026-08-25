<?php
declare(strict_types=1);
require dirname(__DIR__) . '/bootstrap.php';

$meta = page_seo($seo, '/faq/');
$pageTitle = $meta['title'];
$pageDescription = $meta['description'];
$pageH1 = $meta['h1'];
$pageCanonical = $baseUrl . '/faq/';
$pageRobots = $meta['robots'];
$crumbs = breadcrumbs_for('/faq/', $routes, $vehicles);
$faqItems = array_merge($content['home_faq'], $content['faq_page']);

$extraSchemas = array_filter([
    schema_organization($business, $app),
    schema_local_business($business, $app),
    schema_website($business, $app),
    schema_webpage($pageTitle, $pageDescription, $pageCanonical),
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
    </div>
  </header>
  <?php
    $faqHeading = 'คำตอบที่ใช้ตัดสินใจก่อนเช็กคิว';
    require dirname(__DIR__) . '/components/faq.php';
    require dirname(__DIR__) . '/components/quote.php';
    require dirname(__DIR__) . '/components/final-cta.php';
  ?>
</main>
<?php
require dirname(__DIR__) . '/components/mobile-bar.php';
require dirname(__DIR__) . '/components/footer.php';
