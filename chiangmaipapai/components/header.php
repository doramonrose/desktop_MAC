<?php
declare(strict_types=1);
/** @var array $business @var array $content @var bool $hasReviews @var bool $lineReady */
?>
<header class="site-header" id="site-header" data-sticky-header>
  <div class="container-page header-inner flex items-center justify-between gap-4 py-3 md:py-4">
    <a href="/" class="flex items-center gap-2 shrink-0" aria-label="<?= e($business['name']) ?> หน้าแรก">
      <img src="/assets/images/logo.png" alt="<?= e($business['name']) ?>" width="200" height="133" class="h-11 w-auto md:h-12" decoding="async">
    </a>

    <nav class="hidden lg:flex items-center gap-1" aria-label="เมนูหลัก">
      <?php foreach ($content['nav'] as $item): ?>
        <?php if (!empty($item['hide_if_empty_reviews']) && !$hasReviews) continue; ?>
        <a href="<?= e($item['href']) ?>" class="rounded-xl px-3 py-2 text-sm font-medium text-navy/80 hover:bg-mist hover:text-navy"><?= e($item['label']) ?></a>
      <?php endforeach; ?>
    </nav>

    <div class="flex items-center gap-2">
      <a href="<?= e(tel_href($business)) ?>" class="btn-secondary !px-3 !py-2.5 lg:hidden" data-analytics="click_phone" data-button-position="header_mobile" aria-label="โทร <?= e($business['phone']) ?>">
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.25a2 2 0 0 1 2.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0 1 22 16.92z"/></svg>
        <span class="sr-only sm:not-sr-only sm:inline">โทร</span>
      </a>
      <a href="/#quick-quote" class="btn-primary hidden sm:inline-flex" data-analytics="click_quote" data-button-position="header">เช็กคิว</a>
      <button type="button" class="btn-secondary !px-3 !py-2.5 lg:hidden" id="menu-open" aria-controls="mobile-drawer" aria-expanded="false" aria-label="เปิดเมนู">
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </div>
  </div>
</header>

<div class="drawer-backdrop" id="drawer-backdrop" hidden></div>
<aside class="drawer" id="mobile-drawer" role="dialog" aria-modal="true" aria-label="เมนูมือถือ" hidden>
  <div class="flex items-center justify-between border-b border-navy/5 px-4 py-4">
    <span class="font-semibold text-navy"><?= e($business['name']) ?></span>
    <button type="button" class="btn-secondary !px-3 !py-2" id="menu-close" aria-label="ปิดเมนู">
      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
  </div>
  <nav class="flex flex-col gap-1 p-4" aria-label="เมนูมือถือ">
    <?php foreach ($content['nav'] as $item): ?>
      <?php if (!empty($item['hide_if_empty_reviews']) && !$hasReviews) continue; ?>
      <a href="<?= e($item['href']) ?>" class="drawer-link rounded-xl px-3 py-3 text-base font-medium text-navy hover:bg-mist"><?= e($item['label']) ?></a>
    <?php endforeach; ?>
    <a href="/#quick-quote" class="btn-primary mt-3 drawer-link" data-analytics="click_quote" data-button-position="mobile_menu">เช็กคิว</a>
    <a href="<?= e(tel_href($business)) ?>" class="btn-secondary drawer-link" data-analytics="click_phone" data-button-position="mobile_menu">โทร <?= e($business['phone']) ?></a>
  </nav>
</aside>
