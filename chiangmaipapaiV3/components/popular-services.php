<?php
declare(strict_types=1);
?>
<section class="section" aria-labelledby="services-heading">
  <div class="container-page">
    <div class="section-intro">
      <h2 id="services-heading">บริการที่ใช้บ่อย</h2>
      <p>เริ่มจากสิ่งที่คนมักค้นหาเมื่อต้องการรถพร้อมคนขับในเชียงใหม่</p>
    </div>
    <div class="link-grid">
      <?php foreach ($content['services'] as $service): ?>
        <article class="photo-card">
          <div class="card-media">
            <?= picture_tag($service['image'], $service['alt'], [
                'width' => '640',
                'height' => '400',
                'sizes' => '(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw',
            ]) ?>
          </div>
          <div class="photo-card-body">
            <h3><?= e($service['title']) ?></h3>
            <p><?= e($service['text']) ?></p>
            <a class="btn-navy card-cta" href="<?= e($service['url']) ?>" data-analytics="select_route" data-route="<?= e($service['id']) ?>">รายละเอียด</a>
          </div>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>
