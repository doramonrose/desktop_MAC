<?php
declare(strict_types=1);
?>
<section class="section section-alt" aria-labelledby="price-preview-heading">
  <div class="container-page">
    <div class="section-intro">
      <h2 id="price-preview-heading">ราคาเริ่มต้นที่ตรวจสอบได้</h2>
      <p><?= e($prices['disclaimer']) ?></p>
    </div>
    <div class="price-preview-grid">
      <?php foreach ($vehicles as $vehicle): ?>
        <article class="plain-card">
          <h3><?= e($vehicle['name']) ?></h3>
          <p class="price-strong"><?= e(price_label('vehicles', $vehicle['id'], $prices)) ?></p>
          <p><?= e($vehicle['passengers']) ?></p>
          <a class="text-link" href="/price/" data-analytics="view_price" data-price-item="<?= e($vehicle['id']) ?>">เช็กคิวราคานี้</a>
        </article>
      <?php endforeach; ?>
      <article class="plain-card">
        <h3>รับส่งสนามบิน</h3>
        <p class="price-strong"><?= e(price_label('trips', 'airport', $prices)) ?></p>
        <p>ขึ้นกับจุดส่งและประเภทรถ</p>
        <a class="text-link" href="/airport-transfer/" data-analytics="view_price" data-price-item="airport">เช็กคิวรถสนามบิน</a>
      </article>
    </div>
    <p class="center-link"><a class="btn-navy" href="/price/">ดูราคาตามเส้นทาง</a></p>
  </div>
</section>
