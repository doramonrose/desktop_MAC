<?php
declare(strict_types=1);
/** @var array $pricing @var array $content @var bool $pricingEnabled */

$vehicleLabels = [
    'sedan' => 'รถเก๋ง',
    'suv' => 'SUV',
    'van' => 'รถตู้',
];
$serviceLabels = [
    'airport' => 'รับส่งสนามบิน',
    'half_day' => 'ทริปครึ่งวัน',
    'full_day' => 'ทริปเต็มวัน',
];
$destinationLabels = [];
foreach ($content['destinations'] as $dest) {
    $destinationLabels[$dest['id']] = $dest['name'];
}
?>
<section class="section bg-white/80" aria-labelledby="pricing-table-heading">
  <div class="container-page">
    <h2 id="pricing-table-heading" class="section-title">ตารางราคาเริ่มต้น</h2>
    <?php if (!$pricingEnabled): ?>
      <p class="section-lead">ยังไม่เผยแพร่ราคาตายตัวบนเว็บ เมื่อมีราคาจริงพร้อมแล้ว จะแสดงที่นี่ทันที</p>
      <div class="card mt-8 border-gold/20">
        <p class="text-sm text-ink/75">ตอนนี้สามารถเช็กคิวเพื่อรับราคาสรุปตามแผนเดินทางของคุณได้เลย</p>
        <a href="/#quick-quote" class="btn-primary mt-4" data-analytics="click_quote" data-button-position="price_placeholder">เช็กคิวและขอราคา</a>
      </div>
    <?php else: ?>
      <p class="section-lead"><?= e($pricing['disclaimer'] ?? '') ?></p>

      <div class="mt-10 grid gap-6 lg:grid-cols-3">
        <article class="card">
          <h3 class="text-lg font-semibold text-navy">ตามประเภทรถ</h3>
          <ul class="mt-4 space-y-3">
            <?php foreach ($pricing['vehicles'] as $id => $row): ?>
              <li class="rounded-xl bg-mist/80 px-3 py-3">
                <div class="flex items-baseline justify-between gap-3">
                  <span class="text-sm font-semibold text-navy"><?= e($vehicleLabels[$id] ?? $id) ?></span>
                  <span class="text-sm font-bold text-gold"><?= e(price_label_for('vehicles', $id, $pricing)) ?></span>
                </div>
                <?php if (!empty($row['note'])): ?>
                  <p class="mt-1 text-xs text-ink/55"><?= e((string) $row['note']) ?></p>
                <?php endif; ?>
              </li>
            <?php endforeach; ?>
          </ul>
        </article>

        <article class="card">
          <h3 class="text-lg font-semibold text-navy">ตามบริการ</h3>
          <ul class="mt-4 space-y-3">
            <?php foreach ($pricing['services'] as $id => $row): ?>
              <li class="rounded-xl bg-mist/80 px-3 py-3">
                <div class="flex items-baseline justify-between gap-3">
                  <span class="text-sm font-semibold text-navy"><?= e($serviceLabels[$id] ?? $id) ?></span>
                  <span class="text-sm font-bold text-gold"><?= e(price_label_for('services', $id, $pricing)) ?></span>
                </div>
                <?php if (!empty($row['note'])): ?>
                  <p class="mt-1 text-xs text-ink/55"><?= e((string) $row['note']) ?></p>
                <?php endif; ?>
              </li>
            <?php endforeach; ?>
          </ul>
        </article>

        <article class="card">
          <h3 class="text-lg font-semibold text-navy">ตามเส้นทางยอดนิยม</h3>
          <ul class="mt-4 space-y-3">
            <?php foreach ($pricing['destinations'] as $id => $row): ?>
              <li class="rounded-xl bg-mist/80 px-3 py-3">
                <div class="flex items-baseline justify-between gap-3">
                  <span class="text-sm font-semibold text-navy"><?= e($destinationLabels[$id] ?? $id) ?></span>
                  <span class="text-sm font-bold text-gold"><?= e(price_label_for('destinations', $id, $pricing)) ?></span>
                </div>
                <?php if (!empty($row['note'])): ?>
                  <p class="mt-1 text-xs text-ink/55"><?= e((string) $row['note']) ?></p>
                <?php endif; ?>
              </li>
            <?php endforeach; ?>
          </ul>
        </article>
      </div>

      <div class="mt-8 grid gap-4 md:grid-cols-2">
        <div class="rounded-2xl border border-navy/5 bg-mist/70 p-4 text-sm text-ink/70">
          <p class="font-semibold text-navy">สิ่งที่มักรวมในราคา</p>
          <p class="mt-2"><?= e($pricing['includes_note'] ?? '') ?></p>
        </div>
        <div class="rounded-2xl border border-navy/5 bg-mist/70 p-4 text-sm text-ink/70">
          <p class="font-semibold text-navy">อาจมีค่าใช้จ่ายเพิ่ม</p>
          <p class="mt-2"><?= e($pricing['excludes_note'] ?? '') ?></p>
        </div>
      </div>
    <?php endif; ?>
  </div>
</section>
