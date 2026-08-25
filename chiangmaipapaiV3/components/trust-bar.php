<?php
declare(strict_types=1);
?>
<section class="trust-bar" aria-label="จุดยืนของบริการ">
  <div class="container-page trust-grid">
    <?php foreach ($content['trust'] as $item): ?>
      <div class="trust-item">
        <p class="trust-label"><?= e($item['label']) ?></p>
        <p><?= e($item['text']) ?></p>
      </div>
    <?php endforeach; ?>
  </div>
</section>
