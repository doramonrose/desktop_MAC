<?php
declare(strict_types=1);
/** @var array $content */
$icons = [
  '<path d="M5 17h14M7 17V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v10"/><circle cx="8.5" cy="17" r="1.5"/><circle cx="15.5" cy="17" r="1.5"/>',
  '<path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  '<path d="M3 12h18"/><path d="M12 3v4"/><path d="M7 7h10l2 5H5l2-5z"/><path d="M5 12v5h14v-5"/>',
  '<path d="M8 2v4M16 2v4M3 10h18"/><rect x="3" y="6" width="18" height="15" rx="2"/>',
  '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
];
?>
<section class="relative z-10 -mt-6 mb-2" aria-label="จุดเด่นบริการ">
  <div class="container-page">
    <div class="grid grid-cols-2 gap-3 rounded-brand-lg border border-navy/5 bg-white/95 p-4 shadow-soft backdrop-blur sm:grid-cols-3 sm:gap-4 sm:p-5 lg:grid-cols-5">
      <?php foreach ($content['trust_items'] as $i => $item): ?>
        <div class="trust-pill !border-0 !bg-mist/70 !p-3 !shadow-none">
          <span class="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-navy-deep text-gold shadow-sm" aria-hidden="true">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><?= $icons[$i] ?? $icons[0] ?></svg>
          </span>
          <p class="text-sm font-medium leading-snug text-navy"><?= e($item) ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
