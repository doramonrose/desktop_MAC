<?php
declare(strict_types=1);
?>
<section class="section" aria-labelledby="routes-heading">
  <div class="container-page">
    <div class="section-intro">
      <h2 id="routes-heading">เส้นทางที่คนใช้บริการบ่อย</h2>
      <p>แต่ละหน้าตอบเรื่องเวลา รถ ราคาเริ่มต้น และใครเหมาะกับทริปนั้น</p>
    </div>
    <div class="route-grid">
      <?php foreach ($routes as $route): ?>
        <article class="route-card">
          <div class="route-card-media">
            <?= picture_tag($route['image'], $route['alt'], ['width' => '640', 'height' => '400', 'sizes' => '(min-width: 768px) 30vw, 100vw']) ?>
          </div>
          <div class="route-card-body">
            <h3><?= e($route['name']) ?></h3>
            <p><?= e($route['drive_label']) ?> · <?= e($route['duration']) ?></p>
            <?= render_price('destinations', $route['price_id'], $prices) ?>
            <a class="btn-navy card-cta" href="<?= e($route['url']) ?>" data-analytics="select_route" data-route="<?= e($route['id']) ?>">รายละเอียด</a>
          </div>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>
