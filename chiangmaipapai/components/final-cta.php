<?php
declare(strict_types=1);
/** @var array $business @var bool $lineReady */
?>
<section id="contact" class="section relative overflow-hidden bg-gradient-to-br from-navy via-navy-deep to-[#08325c] text-white" aria-labelledby="final-cta-heading">
  <div class="pointer-events-none absolute inset-0 bg-hero-mesh opacity-80" aria-hidden="true"></div>
  <div class="container-page relative text-center">
    <p class="eyebrow mx-auto !border-gold/40 !bg-gold/15 !text-gold-soft">พร้อมช่วยวางแผนทริปของคุณ</p>
    <h2 id="final-cta-heading" class="mt-5 text-2xl font-bold text-white sm:text-3xl lg:text-[2.2rem]">มีแผนเที่ยวเชียงใหม่แล้วหรือยัง?</h2>
    <p class="mx-auto mt-4 max-w-2xl text-base font-light leading-relaxed text-white/80">
      บอกวันเดินทาง จำนวนคน และสถานที่ที่อยากไป เราช่วยแนะนำรถและรูปแบบการเดินทางที่เหมาะกับทริปของคุณ
    </p>
    <div class="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
      <a href="#quick-quote" class="btn-primary" data-analytics="click_quote" data-button-position="final_cta">เช็กคิวและขอราคา</a>
      <a href="<?= e(tel_href($business)) ?>" class="btn-secondary !border-white/25 !bg-white/10 !text-white hover:!bg-white/20" data-analytics="click_phone" data-button-position="final_cta">โทร <?= e($business['phone']) ?></a>
      <?php if ($lineReady): ?>
        <a href="<?= e($business['line_url']) ?>" class="btn-line" target="_blank" rel="noopener noreferrer" data-analytics="click_line" data-button-position="final_cta">สอบถามผ่าน LINE</a>
      <?php else: ?>
        <span class="btn-line-soon !border-line/40 !bg-white/5 !text-line/90" aria-disabled="true">LINE OA เร็ว ๆ นี้</span>
      <?php endif; ?>
    </div>
  </div>
</section>
