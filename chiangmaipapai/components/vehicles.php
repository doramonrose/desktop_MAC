<?php
declare(strict_types=1);
/** @var array $content */
?>
<section id="vehicles" class="section" aria-labelledby="vehicles-heading">
  <div class="container-page">
    <h2 id="vehicles-heading" class="section-title">เลือกรถให้เหมาะกับทริปของคุณ</h2>
    <p class="section-lead">จำนวนผู้โดยสารและกระเป๋าสามารถอัปเดตได้ตามรถจริงในระบบ</p>

    <div class="mt-10 grid gap-6 lg:grid-cols-3">
      <?php foreach ($content['vehicles'] as $vehicle): ?>
        <article class="card-hover group overflow-hidden !p-0">
          <div class="aspect-[16/10] overflow-hidden bg-gradient-to-br from-navy to-navy-deep">
            <?= picture_sources($vehicle['image'], $vehicle['alt'], [
              'class' => 'h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]',
              'width' => '1200',
              'height' => '750',
              'sizes' => '(max-width: 1024px) 100vw, 33vw',
            ]) ?>
          </div>
          <div class="p-5 sm:p-6">
            <div class="flex items-end justify-between gap-3">
              <h3 class="text-xl font-semibold text-navy"><?= e($vehicle['name']) ?></h3>
              <span class="rounded-full bg-gold/15 px-2.5 py-1 text-xs font-semibold text-navy"><?= e($vehicle['passengers']) ?></span>
            </div>
            <p class="mt-2 text-sm leading-relaxed text-ink/65"><?= e($vehicle['description']) ?></p>
            <ul class="mt-4 space-y-2 text-sm text-navy/80">
              <li class="flex gap-2"><span class="text-gold">•</span><span><span class="font-medium">กระเป๋า:</span> <?= e($vehicle['luggage']) ?></span></li>
              <li class="flex gap-2"><span class="text-gold">•</span><span><span class="font-medium">เหมาะกับ:</span> <?= e($vehicle['suitable']) ?></span></li>
              <li class="flex gap-2"><span class="text-gold">•</span><span><span class="font-medium">ราคาเริ่มต้น:</span> <?= e($vehicle['price_label']) ?></span></li>
            </ul>
            <div class="mt-5 flex flex-wrap gap-2">
              <a href="/#quick-quote" class="btn-primary !py-2.5 text-sm" data-analytics="select_vehicle" data-vehicle-type="<?= e($vehicle['id']) ?>" data-button-position="vehicles">เช็กคิวรถคันนี้</a>
              <?php if (!empty($vehicle['url'])): ?>
                <a href="<?= e($vehicle['url']) ?>" class="btn-secondary !py-2.5 text-sm">รายละเอียด</a>
              <?php endif; ?>
            </div>
          </div>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>
