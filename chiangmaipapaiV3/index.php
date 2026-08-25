<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$meta = page_seo($seo, '/');
$pageTitle = $meta['title'];
$pageDescription = $meta['description'];
$pageH1 = $meta['h1'];
$pageCanonical = $baseUrl . '/';
$pageRobots = $meta['robots'];
$faqItems = $content['home_faq'];

$extraSchemas = array_filter([
    schema_organization($business, $app),
    schema_local_business($business, $app),
    schema_website($business, $app),
    schema_webpage($pageTitle, $pageDescription, $pageCanonical),
    schema_service('รถพร้อมคนขับเชียงใหม่', $pageDescription, $pageCanonical, $business),
    schema_faq($faqItems),
]);

require __DIR__ . '/components/head.php';
require __DIR__ . '/components/header.php';
?>
<main id="main-content">
  <?php require __DIR__ . '/components/hero.php'; ?>
  <?php require __DIR__ . '/components/trust-bar.php'; ?>
  <?php require __DIR__ . '/components/quote.php'; ?>
  <?php require __DIR__ . '/components/popular-services.php'; ?>
  <?php require __DIR__ . '/components/vehicle-selector.php'; ?>
  <?php require __DIR__ . '/components/popular-routes.php'; ?>
  <?php require __DIR__ . '/components/price-preview.php'; ?>
  <?php require __DIR__ . '/components/why.php'; ?>
  <?php require __DIR__ . '/components/how-it-works.php'; ?>
  <?php require __DIR__ . '/components/trip-ideas.php'; ?>
  <?php require __DIR__ . '/components/photos.php'; ?>
  <?php require __DIR__ . '/components/reviews.php'; ?>
  <?php
    $faqHeading = 'คำถามที่มักถูกถามก่อนเช็กคิว';
    require __DIR__ . '/components/faq.php';
  ?>
  <?php require __DIR__ . '/components/final-cta.php'; ?>
</main>
<?php
require __DIR__ . '/components/mobile-bar.php';
require __DIR__ . '/components/footer.php';
