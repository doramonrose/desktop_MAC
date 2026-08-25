<?php
declare(strict_types=1);
/** @var array $business @var array $seo @var bool $lineReady */
?>
<section class="relative overflow-hidden bg-gradient-to-br from-navy via-navy-deep to-[#08325c] text-white" aria-labelledby="hero-heading">
  <div class="pointer-events-none absolute inset-0 bg-hero-mesh" aria-hidden="true"></div>
  <div class="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-mist/20 to-transparent" aria-hidden="true"></div>

  <div class="container-page relative grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-14 lg:py-20">
    <div class="animate-fade-up">
      <p class="eyebrow !border-gold/40 !bg-gold/15 !text-gold-soft">
        <span class="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true"></span>
        บริการรถพร้อมคนขับในเชียงใหม่และภาคเหนือ
      </p>
      <h1 id="hero-heading" class="mt-5 text-[1.85rem] font-bold leading-[1.25] text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.2]">
        รถเช่าพร้อมคนขับเชียงใหม่
        <span class="mt-1 block font-semibold text-gold-soft">เที่ยวสบาย มีคนขับดูแลตลอดทาง</span>
      </h1>
      <p class="mt-5 max-w-xl text-[0.98rem] font-light leading-relaxed text-white/85 sm:text-base">
        เชียงใหม่พาไป ให้บริการรถเก๋ง SUV และรถตู้พร้อมคนขับ สำหรับรับส่งสนามบิน เหมาท่องเที่ยวเชียงใหม่ และเดินทางไปยังสถานที่ยอดนิยมทั่วภาคเหนือ
      </p>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a href="#quick-quote" class="btn-primary" data-analytics="click_quote" data-button-position="hero">เช็กคิวและขอราคา</a>
        <a href="<?= e(tel_href($business)) ?>" class="btn-secondary !border-white/25 !bg-white/10 !text-white hover:!bg-white/20" data-analytics="click_phone" data-button-position="hero">โทร <?= e($business['phone']) ?></a>
        <?php if ($lineReady): ?>
          <a href="<?= e($business['line_url']) ?>" class="btn-line" target="_blank" rel="noopener noreferrer" data-analytics="click_line" data-button-position="hero">สอบถามผ่าน LINE</a>
        <?php else: ?>
          <span class="btn-line-soon !border-line/40 !bg-white/5 !text-line/90" aria-disabled="true" title="LINE OA กำลังเตรียมเปิดใช้งาน">LINE OA เร็ว ๆ นี้</span>
        <?php endif; ?>
      </div>
      <p class="mt-5 text-sm text-white/65">เช็กคิวฟรี • ยังไม่ถือเป็นการยืนยันการจอง</p>
    </div>

    <div class="relative animate-fade-up" style="animation-delay: 120ms">
      <div class="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-gold/30 via-transparent to-white/10 blur-xl" aria-hidden="true"></div>
      <div class="media-frame relative">
        <picture>
          <source type="image/avif" srcset="/assets/images/chiangmai-car-with-driver.avif">
          <source type="image/webp" srcset="/assets/images/chiangmai-car-with-driver-800.webp 800w, /assets/images/chiangmai-car-with-driver-1200.webp 1200w, /assets/images/chiangmai-car-with-driver.webp 1400w" sizes="(max-width: 768px) 100vw, 50vw">
          <img
            src="/assets/images/chiangmai-car-with-driver.jpg"
            alt="รถพร้อมคนขับเชียงใหม่ วิวภูเขาและธรรมชาติภาคเหนือ"
            width="1408"
            height="768"
            class="aspect-[16/10] w-full object-cover"
            fetchpriority="high"
            decoding="async"
          >
        </picture>
        <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/70 to-transparent px-5 py-4">
          <p class="text-sm font-medium text-white">อยากไปไหน เราพาไป</p>
        </div>
      </div>
    </div>
  </div>
</section>
