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
        <article class="photo-card">
          <div class="card-media">
            <?= picture_tag($vehicle['image'], $vehicle['alt'], [
                'width' => '640',
                'height' => '400',
                'sizes' => '(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw',
            ]) ?>
          </div>
          <div class="photo-card-body">
            <h3><?= e($vehicle['name']) ?></h3>
            <?= render_price('vehicles', $vehicle['id'], $prices) ?>
            <p><?= e($vehicle['passengers']) ?></p>
            <a class="btn-navy card-cta" href="<?= e($vehicle['url']) ?>" data-analytics="view_price" data-price-item="<?= e($vehicle['id']) ?>">รายละเอียด</a>
          </div>
        </article>
      <?php endforeach; ?>
      <article class="photo-card">
        <div class="card-media">
          <?= picture_tag('vehicles/chiangmai-private-driver-sedan', 'รถเก๋งพร้อมคนขับสำหรับรับส่งสนามบินเชียงใหม่', [
              'width' => '640',
              'height' => '400',
              'sizes' => '(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw',
          ]) ?>
        </div>
        <div class="photo-card-body">
          <h3>รับส่งสนามบิน</h3>
          <?= render_price('trips', 'airport', $prices) ?>
          <p>ขึ้นกับจุดส่งและประเภทรถ</p>
          <a class="btn-navy card-cta" href="/airport-transfer/" data-analytics="view_price" data-price-item="airport">รายละเอียด</a>
        </div>
      </article>
    </div>
    <p class="center-link"><a class="btn-navy" href="/price/">ดูราคาตามเส้นทาง</a></p>
  </div>
</section>
