<?php
declare(strict_types=1);
require dirname(__DIR__) . '/bootstrap.php';

$meta = page_seo($seo, '/contact/');
$pageTitle = $meta['title'];
$pageDescription = $meta['description'];
$pageH1 = $meta['h1'];
$pageCanonical = $baseUrl . '/contact/';
$pageRobots = $meta['robots'];
$crumbs = breadcrumbs_for('/contact/', $routes, $vehicles);

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
      <p class="hero-lead"><?= e($content['contact']['lead']) ?></p>
    </div>
  </header>
  <section class="section">
    <div class="container-page contact-grid">
      <article class="plain-card">
        <h2>ช่องทางติดต่อ</h2>
        <p><a href="<?= e(tel_href($business)) ?>" data-analytics="click_phone" data-button-position="contact"><?= e($business['phone']) ?></a></p>
        <p><a href="mailto:<?= e($business['email']) ?>"><?= e($business['email']) ?></a></p>
        <p><?= e($business['address']) ?></p>
        <p>
          <?php if ($lineReady): ?>
            <a class="btn-line" href="<?= e($business['line_url']) ?>" data-analytics="click_line" data-button-position="contact" rel="noopener noreferrer">คุยผ่าน LINE</a>
          <?php else: ?>
            <span class="line-soon">LINE OA เร็ว ๆ นี้</span>
          <?php endif; ?>
        </p>
      </article>
    </div>
  </section>
  <?php
    require dirname(__DIR__) . '/components/quote.php';
    require dirname(__DIR__) . '/components/payment.php';
    require dirname(__DIR__) . '/components/final-cta.php';
  ?>
</main>
<?php
require dirname(__DIR__) . '/components/mobile-bar.php';
require dirname(__DIR__) . '/components/footer.php';
