<?php
declare(strict_types=1);

http_response_code(404);
require __DIR__ . '/bootstrap.php';

$meta = $content['not_found'];
$pageTitle = $meta['title'] . ' | ' . $business['name'];
$pageDescription = $meta['description'];
$pageH1 = $meta['h1'];
$pageCanonical = $baseUrl . '/404';
$pageRobots = $meta['robots'];
$quoteHref = '/#quick-quote';

$extraSchemas = array_filter([
    schema_organization($business, $app),
    schema_website($business, $app),
    schema_webpage($pageTitle, $pageDescription, $pageCanonical),
]);

require __DIR__ . '/components/head.php';
require __DIR__ . '/components/header.php';
?>
<main id="main-content">
  <header class="page-hero">
    <div class="container-page">
      <h1><?= e($pageH1) ?></h1>
      <p class="hero-lead"><?= e($pageDescription) ?></p>
      <div class="hero-cta">
        <a class="btn-primary" href="/">กลับหน้าแรก</a>
        <a class="btn-navy" href="/contact/">ติดต่อเรา</a>
      </div>
    </div>
  </header>
</main>
<?php
require __DIR__ . '/components/mobile-bar.php';
require __DIR__ . '/components/footer.php';
