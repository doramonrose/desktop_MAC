<?php
declare(strict_types=1);
?>
<section class="final-cta" aria-labelledby="final-cta-heading">
  <div class="container-page final-cta-inner">
    <h2 id="final-cta-heading">อยากไปไหน บอกมา แล้วให้เราพาไป</h2>
    <p>เลือกวัน จำนวนคน และเส้นทาง แล้วเช็กคิวกับเชียงใหม่พาไป</p>
    <div class="hero-cta">
      <a class="btn-primary" href="<?= e($quoteHref) ?>" data-analytics="open_quote" data-button-position="final_cta">เช็กคิวและขอราคา</a>
      <a class="btn-secondary" href="<?= e(tel_href($business)) ?>" data-analytics="click_phone" data-button-position="final_cta">โทรสอบถาม</a>
    </div>
  </div>
</section>
