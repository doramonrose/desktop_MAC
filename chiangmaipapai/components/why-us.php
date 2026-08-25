<?php
declare(strict_types=1);
/** @var array $content */
?>
<section id="why-us" class="section" aria-labelledby="why-heading">
  <div class="container-page">
    <h2 id="why-heading" class="section-title">ทำไมต้องเลือกเชียงใหม่พาไป</h2>
    <p class="section-lead">เราสื่อสารเฉพาะสิ่งที่ทำได้จริง เพื่อให้คุณวางแผนทริปได้มั่นใจ</p>
    <ul class="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <?php foreach ($content['why_us'] as $item): ?>
        <li class="card-hover flex items-start gap-3">
          <span class="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-soft text-navy shadow-sm" aria-hidden="true">
            <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
          </span>
          <span class="text-sm font-medium leading-snug text-navy"><?= e($item) ?></span>
        </li>
      <?php endforeach; ?>
    </ul>
  </div>
</section>
