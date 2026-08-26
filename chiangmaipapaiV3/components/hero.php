<?php
declare(strict_types=1);
$hero = $content['hero'];
?>
<section class="hero" aria-labelledby="page-h1">
  <div class="container-page hero-grid">
    <div class="hero-copy">
      <p class="eyebrow"><?= e($hero['eyebrow']) ?></p>
      <h1 id="page-h1"><?= e($pageH1) ?></h1>
      <p class="hero-lead"><?= e($hero['description']) ?></p>
      <div class="hero-cta">
        <a class="btn-primary" href="#quick-quote" data-analytics="open_quote" data-button-position="hero"><?= e($hero['cta']) ?></a>
        <?php if ($lineReady): ?>
          <a class="btn-line" href="<?= e($business['line_url']) ?>" data-analytics="click_line" data-button-position="hero" target="_blank" rel="noopener noreferrer">คุยผ่าน LINE @papai</a>
        <?php endif; ?>
        <a class="btn-navy" href="<?= e(tel_href($business)) ?>" data-analytics="click_phone" data-button-position="hero"><?= e($hero['cta_secondary']) ?></a>
      </div>
      <ul class="hero-trust">
        <li>รถส่วนตัว ไม่แชร์ที่นั่ง</li>
        <li>เช็กคิวก่อนยืนยัน</li>
        <li>ขึ้นดอยและรับสนามบิน</li>
      </ul>
    </div>
    <div class="hero-media">
      <?= picture_tag($hero['image'], $hero['image_alt'], [
          'class' => 'h-full w-full object-cover',
          'loading' => 'eager',
          'fetchpriority' => 'high',
          'width' => '960',
          'height' => '720',
          'sizes' => '(min-width: 1024px) 45vw, 100vw',
      ]) ?>
    </div>
  </div>
</section>
