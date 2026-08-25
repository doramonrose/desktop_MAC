<?php
declare(strict_types=1);
/** @var array $business @var bool $lineReady */
?>
<nav class="mobile-bar md:hidden" aria-label="แถบติดต่อด่วนบนมือถือ">
  <div class="grid grid-cols-3 gap-1 px-2 py-2">
    <a href="<?= e(tel_href($business)) ?>" class="flex flex-col items-center justify-center rounded-xl px-2 py-2 text-xs font-semibold text-navy hover:bg-mist" data-analytics="click_phone" data-button-position="mobile_bar">
      <svg class="mb-1 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.25a2 2 0 0 1 2.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0 1 22 16.92z"/></svg>
      โทร
    </a>
    <a href="/#quick-quote" class="flex flex-col items-center justify-center rounded-xl bg-gold px-2 py-2 text-xs font-semibold text-navy" data-analytics="click_quote" data-button-position="mobile_bar">
      <svg class="mb-1 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
      เช็กคิว
    </a>
    <?php if ($lineReady): ?>
      <a href="<?= e($business['line_url']) ?>" class="flex flex-col items-center justify-center rounded-xl bg-line px-2 py-2 text-xs font-semibold text-white" target="_blank" rel="noopener noreferrer" data-analytics="click_line" data-button-position="mobile_bar">
        <svg class="mb-1 h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3C6.5 3 2 6.6 2 11c0 4 3.4 7.3 8 8.1V22l3.2-2.8c.3 0 .5.1.8.1 5.5 0 10-3.6 10-8s-4.5-8-10-8z"/></svg>
        LINE
      </a>
    <?php else: ?>
      <span class="flex flex-col items-center justify-center rounded-xl px-2 py-2 text-xs font-semibold text-line/70" aria-disabled="true" title="LINE OA เร็ว ๆ นี้">
        <svg class="mb-1 h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3C6.5 3 2 6.6 2 11c0 4 3.4 7.3 8 8.1V22l3.2-2.8c.3 0 .5.1.8.1 5.5 0 10-3.6 10-8s-4.5-8-10-8z"/></svg>
        เร็ว ๆ นี้
      </span>
    <?php endif; ?>
  </div>
</nav>
