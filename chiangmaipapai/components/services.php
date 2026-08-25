<?php
declare(strict_types=1);
/** @var array $content */
$serviceIcons = [
  'airport' => '<path d="M2 12h20"/><path d="M12 2l3 8h7l-5.5 4 2 8L12 17l-6.5 5 2-8L2 10h7z"/>',
  'city-tour' => '<path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  'sedan' => '<path d="M5 17h14M7 17V9l2-3h6l2 3v8"/><circle cx="8.5" cy="17" r="1.5"/><circle cx="15.5" cy="17" r="1.5"/>',
  'suv' => '<path d="M4 17h16M6 17V10h12v7M8 10V8h8v2"/><circle cx="8" cy="17" r="1.5"/><circle cx="16" cy="17" r="1.5"/>',
  'van' => '<path d="M3 17h18M5 17V9h10l4 4v4"/><circle cx="8" cy="17" r="1.5"/><circle cx="16" cy="17" r="1.5"/>',
  'interprovincial' => '<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/>',
];
?>
<section id="services" class="section bg-white/70" aria-labelledby="services-heading">
  <div class="container-page">
    <h2 id="services-heading" class="section-title">บริการรถพร้อมคนขับในเชียงใหม่</h2>
    <p class="section-lead">เลือกรูปแบบที่ตรงกับทริปของคุณ แล้วเช็กคิวเพื่อขอราคา</p>

    <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <?php foreach ($content['services'] as $service): ?>
        <article class="card-hover group flex flex-col">
          <span class="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-navy/5 text-navy transition group-hover:bg-gold/15 group-hover:text-navy" aria-hidden="true">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><?= $serviceIcons[$service['id']] ?? $serviceIcons['city-tour'] ?></svg>
          </span>
          <h3 class="text-lg font-semibold text-navy">
            <?php if (!empty($service['url'])): ?>
              <a href="<?= e($service['url']) ?>" class="hover:text-navy-deep"><?= e($service['title']) ?></a>
            <?php else: ?>
              <?= e($service['title']) ?>
            <?php endif; ?>
          </h3>
          <p class="mt-2 flex-1 text-sm leading-relaxed text-ink/65"><?= e($service['description']) ?></p>
          <div class="mt-5 flex flex-wrap items-center gap-2">
            <a href="/#quick-quote" class="btn-primary !py-2.5 text-sm" data-analytics="click_quote" data-button-position="services" data-service-type="<?= e($service['id']) ?>">เช็กคิวบริการนี้</a>
            <?php if (!empty($service['url'])): ?>
              <a href="<?= e($service['url']) ?>" class="btn-secondary !py-2.5 text-sm">รายละเอียด</a>
            <?php endif; ?>
          </div>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>
