<?php
declare(strict_types=1);
/** @var array $app @var array $business @var array $seo @var string $pageTitle @var string $pageDescription @var string $pageCanonical @var string $pageRobots @var array $extraSchemas @var string $assetVersion @var string $baseUrl */

$ogImage = $seo['og_image'];
$themeColor = $seo['theme_color'];
$gtmId = trim((string) ($business['analytics']['gtm_id'] ?? ''));
$ga4Id = trim((string) ($business['analytics']['ga4_id'] ?? ''));
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
  <link rel="alternate" hreflang="th" href="<?= e($pageCanonical) ?>">
  <link rel="alternate" hreflang="x-default" href="<?= e($pageCanonical) ?>">

  <meta property="og:type" content="<?= e($seo['og_type']) ?>">
  <meta property="og:locale" content="<?= e($seo['locale']) ?>">
  <meta property="og:site_name" content="<?= e($business['name']) ?>">
  <meta property="og:title" content="<?= e($pageTitle) ?>">
  <meta property="og:description" content="<?= e($pageDescription) ?>">
  <meta property="og:url" content="<?= e($pageCanonical) ?>">
  <meta property="og:image" content="<?= e($ogImage) ?>">

  <meta name="twitter:card" content="<?= e($seo['twitter_card']) ?>">
  <meta name="twitter:title" content="<?= e($pageTitle) ?>">
  <meta name="twitter:description" content="<?= e($pageDescription) ?>">
  <meta name="twitter:image" content="<?= e($ogImage) ?>">

  <meta name="theme-color" content="<?= e($themeColor) ?>">
  <link rel="icon" type="image/png" href="<?= e(asset_url('assets/images/favicon.png', $assetVersion)) ?>">
  <link rel="apple-touch-icon" href="<?= e(asset_url('assets/images/apple-touch-icon.png', $assetVersion)) ?>">
  <link rel="manifest" href="/manifest.webmanifest">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;500;600;700&display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;500;600;700&display=swap">
  <link rel="stylesheet" href="<?= e(asset_url('assets/css/main.css', $assetVersion)) ?>">

  <?php if ($gtmId !== ''): ?>
  <script>window.dataLayer=window.dataLayer||[];</script>
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','<?= e($gtmId) ?>');</script>
  <?php elseif ($ga4Id !== ''): ?>
  <script async src="https://www.googletagmanager.com/gtag/js?id=<?= e($ga4Id) ?>"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','<?= e($ga4Id) ?>',{anonymize_ip:true});</script>
  <?php endif; ?>

  <?php foreach ($extraSchemas as $schema): ?>
    <?php if (is_array($schema)): ?>
  <script type="application/ld+json"><?= json_ld($schema) ?></script>
    <?php endif; ?>
  <?php endforeach; ?>
</head>
<body class="has-mobile-bar">
<?php if ($gtmId !== ''): ?>
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=<?= e($gtmId) ?>" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<?php endif; ?>
<a class="skip-link" href="#main-content">ข้ามไปเนื้อหา</a>
