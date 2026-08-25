<?php
declare(strict_types=1);
if (empty($content['reviews'])) {
    return;
}
?>
<section class="section" aria-labelledby="reviews-heading">
  <div class="container-page">
    <div class="section-intro">
      <h2 id="reviews-heading">รีวิวจาก Google</h2>
      <p>แสดงเฉพาะรีวิวจริงที่ได้รับอนุญาตให้เผยแพร่</p>
    </div>
    <div class="review-grid">
      <?php foreach ($content['reviews'] as $review): ?>
        <article class="plain-card">
          <p class="review-meta"><?= e($review['name']) ?> · <?= e($review['date']) ?> · <?= e($review['route'] ?? '') ?></p>
          <p><?= e($review['text']) ?></p>
          <p class="muted">ที่มา: <?= e($review['source'] ?? 'Google') ?></p>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>
