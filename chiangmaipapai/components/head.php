<?php
declare(strict_types=1);
/** @var array $app @var array $business @var array $seo @var array $content @var bool $lineReady @var bool $hasReviews @var string $assetVersion @var string $baseUrl */
$pageTitle = $pageTitle ?? $seo['title'];
$pageDescription = $pageDescription ?? $seo['description'];
$pageCanonical = $pageCanonical ?? $seo['canonical_url'];
$pageRobots = $pageRobots ?? $seo['robots'];
$ogImage = $ogImage ?? $seo['og_image'];
$bodyClass = $bodyClass ?? 'has-mobile-bar';
$extraSchemas = $extraSchemas ?? [];
?>
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title><?= e($pageTitle) ?></title>
  <meta name="description" content="<?= e($pageDescription) ?>">
  <meta name="robots" content="<?= e($pageRobots) ?>">
  <link rel="canonical" href="<?= e($pageCanonical) ?>">

  <meta property="og:type" content="<?= e($seo['og_type']) ?>">
  <meta property="og:locale" content="th_TH">
  <meta property="og:site_name" content="<?= e($business['name']) ?>">
  <meta property="og:title" content="<?= e($pageTitle) ?>">
  <meta property="og:description" content="<?= e($pageDescription) ?>">
  <meta property="og:url" content="<?= e($pageCanonical) ?>">
  <meta property="og:image" content="<?= e($ogImage) ?>">

  <meta name="twitter:card" content="<?= e($seo['twitter_card']) ?>">
  <meta name="twitter:title" content="<?= e($pageTitle) ?>">
  <meta name="twitter:description" content="<?= e($pageDescription) ?>">
  <meta name="twitter:image" content="<?= e($ogImage) ?>">

  <meta name="theme-color" content="<?= e($seo['theme_color']) ?>">
  <link rel="icon" href="/assets/images/favicon.png" type="image/png" sizes="64x64">
  <link rel="icon" href="/assets/images/logo.png" type="image/png">
  <link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png">
  <link rel="manifest" href="/manifest.webmanifest">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap"></noscript>

  <?php if (($isHome ?? false) === true): ?>
  <link rel="preload" as="image" href="/assets/images/chiangmai-car-with-driver-800.webp" imagesrcset="/assets/images/chiangmai-car-with-driver-800.webp 800w, /assets/images/chiangmai-car-with-driver-1200.webp 1200w, /assets/images/chiangmai-car-with-driver.webp 1400w" imagesizes="(max-width: 768px) 100vw, 50vw" type="image/webp">
  <?php endif; ?>

  <link rel="stylesheet" href="<?= e(asset_url('assets/css/main.css', $assetVersion)) ?>">

  <?php
  $gtm = trim((string) ($business['analytics']['gtm_id'] ?? ''));
  $ga4 = trim((string) ($business['analytics']['ga4_id'] ?? ''));
  $metaPixel = trim((string) ($business['analytics']['meta_pixel_id'] ?? ''));
  if ($gtm !== ''):
  ?>
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','<?= e($gtm) ?>');</script>
  <?php elseif ($ga4 !== ''): ?>
  <script async src="https://www.googletagmanager.com/gtag/js?id=<?= e($ga4) ?>"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','<?= e($ga4) ?>');</script>
  <?php endif; ?>

  <script type="application/ld+json"><?= json_ld($seo['schema_local_business']) ?></script>
  <?php foreach ($extraSchemas as $schema): ?>
  <script type="application/ld+json"><?= json_ld($schema) ?></script>
  <?php endforeach; ?>
</head>
<body class="<?= e($bodyClass) ?>">
<?php if ($gtm !== ''): ?>
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=<?= e($gtm) ?>" height="0" width="0" style="display:none;visibility:hidden" title="GTM"></iframe></noscript>
<?php endif; ?>
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:text-navy">ข้ามไปยังเนื้อหาหลัก</a>
