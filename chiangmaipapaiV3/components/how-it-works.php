<?php
declare(strict_types=1);
?>
<section class="section section-alt" aria-labelledby="steps-heading">
  <div class="container-page">
    <div class="section-intro">
      <h2 id="steps-heading">ใช้บริการอย่างไร</h2>
      <p>คิวว่างหรือไม่ รู้ได้หลังคุยกับเจ้าหน้าที่ ไม่มีปุ่มจองเลยตอนยังไม่รู้รถว่าง</p>
    </div>
    <ol class="steps">
      <?php foreach ($content['steps'] as $step): ?>
        <li>
          <span class="step-n"><?= e($step['n']) ?></span>
          <div>
            <h3><?= e($step['title']) ?></h3>
            <p><?= e($step['text']) ?></p>
          </div>
        </li>
      <?php endforeach; ?>
    </ol>
  </div>
</section>
