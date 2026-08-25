<?php
declare(strict_types=1);
?>
<section class="section section-alt" aria-labelledby="selector-heading">
  <div class="container-page">
    <div class="section-intro">
      <h2 id="selector-heading">ไปกันกี่คน?</h2>
      <p>เลือกจำนวนคร่าว ๆ ระบบจะแนะนำประเภทรถเบื้องต้น</p>
    </div>
    <div class="selector" data-vehicle-selector>
      <div class="chip-row" role="group" aria-label="จำนวนผู้โดยสาร">
        <button type="button" class="chip" data-group="1-3">1–3 คน</button>
        <button type="button" class="chip" data-group="4-5">4–5 คน</button>
        <button type="button" class="chip" data-group="6-10">6–10 คน</button>
      </div>
      <p class="selector-note" data-selector-note><?= e($vehiclesConfig['selector_disclaimer']) ?></p>
      <div class="vehicle-result-grid">
        <?php foreach ($vehicles as $vehicle): ?>
          <article class="vehicle-result" data-groups="<?= e(implode(' ', $vehicle['selector_groups'])) ?>" hidden>
            <div class="vehicle-result-media">
              <?= picture_tag($vehicle['image'], $vehicle['alt'], ['width' => '640', 'height' => '420', 'sizes' => '(min-width: 768px) 30vw, 100vw']) ?>
            </div>
            <div>
              <h3><?= e($vehicle['name']) ?></h3>
              <p><?= e($vehicle['best_for']) ?></p>
              <p class="muted"><?= e($vehicle['passengers']) ?> · <?= e($vehicle['luggage']) ?></p>
              <p class="price-inline"><?= e(price_label('vehicles', $vehicle['id'], $prices)) ?></p>
              <a class="text-link" href="<?= e($vehicle['url']) ?>" data-analytics="select_vehicle" data-vehicle="<?= e($vehicle['id']) ?>">ดูรายละเอียด <?= e($vehicle['name']) ?></a>
            </div>
          </article>
        <?php endforeach; ?>
      </div>
      <a class="btn-navy" href="#quick-quote" data-analytics="open_quote" data-button-position="vehicle_selector">ให้เราแนะนำรถ</a>
    </div>
  </div>
</section>
