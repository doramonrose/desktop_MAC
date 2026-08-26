<?php
declare(strict_types=1);
require_once __DIR__ . '/icons.php';
?>
<section class="section" aria-labelledby="why-heading">
  <div class="container-page">
    <div class="section-intro">
      <h2 id="why-heading">ทำไมเป็นเชียงใหม่พาไป</h2>
      <p>เราตั้งตัวเป็นเพื่อนร่วมทางท้องถิ่น ไม่ใช่รถถูกที่สุด และไม่ใช่โชเฟอร์หรู</p>
    </div>
    <div class="why-grid">
      <?php foreach ($content['why'] as $index => $item): ?>
        <article class="why-card<?= $index === 0 ? ' is-featured' : '' ?>">
          <div class="why-icon" aria-hidden="true"><?= brand_icon((string) $item['icon']) ?></div>
          <h3><?= e($item['title']) ?></h3>
          <p><?= e($item['text']) ?></p>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>
