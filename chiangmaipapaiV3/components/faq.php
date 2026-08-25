<?php
declare(strict_types=1);
/** @var array $faqItems @var string $faqHeading */
$faqItems = $faqItems ?? $content['home_faq'];
$faqHeading = $faqHeading ?? 'คำถามที่มักถูกถามก่อนเช็กคิว';
if ($faqItems === []) {
    return;
}
?>
<section class="section" aria-labelledby="faq-heading">
  <div class="container-page faq-wrap">
    <div class="section-intro">
      <h2 id="faq-heading"><?= e($faqHeading) ?></h2>
    </div>
    <div class="faq-list">
      <?php foreach ($faqItems as $item): ?>
        <details class="faq-item">
          <summary><?= e($item['q']) ?></summary>
          <p><?= e($item['a']) ?></p>
        </details>
      <?php endforeach; ?>
    </div>
  </div>
</section>
