<?php
declare(strict_types=1);
require dirname(__DIR__) . '/bootstrap.php';

$meta = page_seo($seo, '/privacy/');
$pageTitle = $meta['title'];
$pageDescription = $meta['description'];
$pageH1 = $meta['h1'];
$pageCanonical = $baseUrl . '/privacy/';
$pageRobots = $meta['robots'];
$crumbs = breadcrumbs_for('/privacy/', $routes, $vehicles);
$quoteHref = '/#quick-quote';

$extraSchemas = array_filter([
    schema_organization($business, $app),
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
    </div>
  </header>
  <section class="section">
    <div class="container-page reading">
      <?php foreach ($content['privacy'] as $para): ?>
        <p><?= e($para) ?></p>
      <?php endforeach; ?>
    </div>
  </section>
</main>
<?php
require dirname(__DIR__) . '/components/mobile-bar.php';
require dirname(__DIR__) . '/components/footer.php';
