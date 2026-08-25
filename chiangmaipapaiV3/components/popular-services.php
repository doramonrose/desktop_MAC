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
        <a class="plain-card" href="<?= e($service['url']) ?>" data-analytics="select_route" data-route="<?= e($service['id']) ?>">
          <h3><?= e($service['title']) ?></h3>
          <p><?= e($service['text']) ?></p>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>
