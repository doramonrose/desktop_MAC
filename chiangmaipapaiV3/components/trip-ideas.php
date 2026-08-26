<?php
declare(strict_types=1);
?>
<section class="section" aria-labelledby="ideas-heading">
  <div class="container-page">
    <div class="section-intro">
      <h2 id="ideas-heading">ไอเดียทริปจากจังหวะเดินทางจริง</h2>
      <p>เลือกตามเวลาที่มี ไม่ใช่ตามรายการท่องเที่ยวยาว</p>
    </div>
    <div class="link-grid">
      <?php foreach ($content['trip_ideas'] as $idea): ?>
        <article class="photo-card">
          <div class="card-media">
            <?= picture_tag($idea['image'], $idea['alt'], [
                'width' => '640',
                'height' => '400',
                'sizes' => '(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw',
            ]) ?>
          </div>
          <div class="photo-card-body">
            <h3><?= e($idea['title']) ?></h3>
            <p><?= e($idea['text']) ?></p>
            <a class="btn-navy card-cta" href="<?= e($idea['url']) ?>">รายละเอียด</a>
          </div>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>
