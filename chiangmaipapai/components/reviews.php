<?php
declare(strict_types=1);
/** @var array $content @var bool $hasReviews */
if (!$hasReviews) {
    return;
}
?>
<section id="reviews" class="section bg-mist" aria-labelledby="reviews-heading">
  <div class="container-page">
    <h2 id="reviews-heading" class="section-title">เสียงจากลูกค้าที่เดินทางกับเรา</h2>
    <p class="section-lead">รีวิวจริงจากผู้ใช้บริการเท่านั้น</p>
    <div class="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <?php foreach ($content['reviews'] as $review): ?>
        <blockquote class="card border border-navy/5">
          <p class="text-sm leading-relaxed text-ink/80">“<?= e($review['text'] ?? '') ?>”</p>
          <footer class="mt-4 text-sm font-semibold text-navy"><?= e($review['author'] ?? '') ?></footer>
        </blockquote>
      <?php endforeach; ?>
    </div>
  </div>
</section>
