<?php
declare(strict_types=1);
/** @var array $business @var bool $lineReady @var string $path */
$items = nav_items();
?>
<header class="site-header">
  <div class="container-page header-inner">
    <a class="brand" href="/" aria-label="<?= e($business['name']) ?> หน้าแรก">
      <img src="<?= e(asset_url('assets/images/logo.webp', $assetVersion)) ?>" width="48" height="48" alt="<?= e($business['name']) ?>" class="brand-mark">
      <span class="brand-copy">
        <span class="brand-name"><?= e($business['name']) ?></span>
        <span class="brand-slogan"><?= e($business['slogan']) ?></span>
      </span>
    </a>

    <nav class="desktop-nav" aria-label="เมนูหลัก">
      <?php foreach ($items as $item): ?>
        <?php
          $isActive = $path === $item['url']
            || ($item['url'] === '/routes/mae-kampong/' && str_starts_with($path, '/routes/'));
        ?>
        <a href="<?= e($item['url']) ?>"<?= $isActive ? ' aria-current="page"' : '' ?> class="<?= $isActive ? 'is-active' : '' ?>"><?= e($item['label']) ?></a>
      <?php endforeach; ?>
    </nav>

    <div class="header-actions">
      <a class="btn-navy header-phone" href="<?= e(tel_href($business)) ?>" data-analytics="click_phone" data-button-position="header">โทร <?= e($business['phone']) ?></a>
      <?php if ($lineReady): ?>
        <a class="btn-line header-line" href="<?= e($business['line_url']) ?>" data-analytics="click_line" data-button-position="header" target="_blank" rel="noopener noreferrer">LINE @papai</a>
      <?php endif; ?>
      <a class="btn-primary header-quote" href="<?= e($quoteHref) ?>" data-analytics="open_quote" data-button-position="header">เช็กคิวและขอราคา</a>
      <button type="button" class="menu-toggle" id="menu-toggle" aria-expanded="false" aria-controls="mobile-drawer" aria-label="เปิดเมนู">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>

<div class="drawer-backdrop" id="drawer-backdrop" hidden></div>
<aside class="drawer" id="mobile-drawer" aria-hidden="true" aria-label="เมนูมือถือ">
  <p class="drawer-kicker"><?= e($business['tagline']) ?></p>
  <nav class="drawer-nav">
    <?php foreach ($items as $item): ?>
      <a href="<?= e($item['url']) ?>"><?= e($item['label']) ?></a>
    <?php endforeach; ?>
    <a href="/vehicles/sedan/">รถเก๋ง</a>
    <a href="/vehicles/suv/">SUV</a>
    <a href="/vehicles/van/">รถตู้</a>
    <a href="/about/">เกี่ยวกับเรา</a>
    <a href="/faq/">คำถามที่พบบ่อย</a>
  </nav>
  <a class="btn-primary w-full" href="<?= e($quoteHref) ?>" data-analytics="open_quote" data-button-position="drawer">เช็กคิวและขอราคา</a>
  <?php if ($lineReady): ?>
    <a class="btn-line w-full" href="<?= e($business['line_url']) ?>" data-analytics="click_line" data-button-position="drawer" target="_blank" rel="noopener noreferrer">คุยผ่าน LINE @papai</a>
  <?php endif; ?>
</aside>
