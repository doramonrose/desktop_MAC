<?php
declare(strict_types=1);
/** @var array $content */
?>
<section id="faq" class="section bg-white" aria-labelledby="faq-heading">
  <div class="container-page max-w-3xl">
    <h2 id="faq-heading" class="section-title">คำถามที่พบบ่อยเกี่ยวกับรถพร้อมคนขับเชียงใหม่</h2>
    <p class="section-lead">คำตอบจากข้อมูลบริการจริง หากรายละเอียดเฉพาะทริป แนะนำให้เช็กคิวโดยตรง</p>

    <div class="mt-8 space-y-3">
      <?php foreach ($content['faq'] as $i => $item): ?>
        <details class="faq-item card border border-navy/5 !p-0" <?= $i === 0 ? 'open' : '' ?>>
          <summary class="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-left text-sm font-semibold text-navy sm:text-base">
            <span><?= e($item['q']) ?></span>
            <svg class="faq-chevron h-5 w-5 shrink-0 text-navy/50 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
          </summary>
          <div class="border-t border-navy/5 px-5 py-4 text-sm leading-relaxed text-ink/75">
            <?= e($item['a']) ?>
          </div>
        </details>
      <?php endforeach; ?>
    </div>
  </div>
</section>
