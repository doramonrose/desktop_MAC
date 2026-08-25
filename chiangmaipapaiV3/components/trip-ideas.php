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
        <a class="plain-card" href="<?= e($idea['url']) ?>">
          <h3><?= e($idea['title']) ?></h3>
          <p><?= e($idea['text']) ?></p>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>
