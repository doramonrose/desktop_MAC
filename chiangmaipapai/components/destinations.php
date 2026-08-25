<?php
declare(strict_types=1);
/** @var array $content */
?>
<section id="destinations" class="section bg-white/70" aria-labelledby="destinations-heading">
  <div class="container-page">
    <h2 id="destinations-heading" class="section-title">เส้นทางยอดนิยมจากเชียงใหม่</h2>
    <p class="section-lead">เลือกเส้นทางที่สนใจ แล้วขอราคาตามวันเดินทางของคุณ</p>

    <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <?php foreach ($content['destinations'] as $dest): ?>
        <article class="card-hover group overflow-hidden !p-0">
          <div class="relative aspect-[16/10] overflow-hidden">
            <?php if (!empty($dest['url'])): ?>
              <a href="<?= e($dest['url']) ?>" aria-label="<?= e($dest['name']) ?>">
                <?= picture_sources($dest['image'], $dest['alt'], [
                  'class' => 'h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]',
                  'width' => '1200',
                  'height' => '896',
                  'sizes' => '(max-width: 1024px) 100vw, 33vw',
                ]) ?>
              </a>
            <?php else: ?>
              <?= picture_sources($dest['image'], $dest['alt'], [
                'class' => 'h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]',
                'width' => '1200',
                'height' => '896',
                'sizes' => '(max-width: 1024px) 100vw, 33vw',
              ]) ?>
            <?php endif; ?>
            <div class="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/75 via-navy/25 to-transparent p-4 pt-12">
              <h3 class="text-lg font-semibold text-white"><?= e($dest['name']) ?></h3>
            </div>
          </div>
          <div class="p-5">
            <p class="text-xs font-semibold tracking-wide text-gold"><?= e($dest['keyword']) ?></p>
            <p class="mt-2 text-sm leading-relaxed text-ink/65"><?= e($dest['description']) ?></p>
            <ul class="mt-3 space-y-1.5 text-sm text-navy/80">
              <li>เวลาโดยประมาณ: <?= e($dest['duration']) ?></li>
              <li>รถที่แนะนำ: <?= e($dest['recommended_vehicle']) ?></li>
            </ul>
            <div class="mt-4 flex flex-wrap gap-2">
              <a
                href="/#quick-quote"
                class="btn-navy !py-2.5 text-sm"
                data-analytics="select_destination"
                data-destination="<?= e($dest['id']) ?>"
                data-button-position="destinations"
                data-prefill-destination="<?= e($dest['name']) ?>"
              >ขอราคาเส้นทางนี้</a>
              <?php if (!empty($dest['url'])): ?>
                <a href="<?= e($dest['url']) ?>" class="btn-secondary !py-2.5 text-sm">รายละเอียด</a>
              <?php endif; ?>
            </div>
          </div>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>
