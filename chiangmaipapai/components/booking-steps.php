<?php
declare(strict_types=1);
/** @var array $content */
?>
<section id="booking-steps" class="section bg-white/70" aria-labelledby="steps-heading">
  <div class="container-page">
    <h2 id="steps-heading" class="section-title">จองรถง่าย ๆ ใน 4 ขั้นตอน</h2>
    <p class="section-lead">การเช็กคิวไม่มีค่าใช้จ่าย และยังไม่ถือเป็นการยืนยันการจอง</p>
    <ol class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <?php foreach ($content['booking_steps'] as $step): ?>
        <li class="card-hover relative">
          <span class="step-badge"><?= e($step['step']) ?></span>
          <h3 class="mt-4 text-base font-semibold text-navy"><?= e($step['title']) ?></h3>
          <p class="mt-2 text-sm leading-relaxed text-ink/65"><?= e($step['desc']) ?></p>
        </li>
      <?php endforeach; ?>
    </ol>
  </div>
</section>
