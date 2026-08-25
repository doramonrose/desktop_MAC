<?php
declare(strict_types=1);
?>
<footer class="site-footer">
  <div class="container-page footer-grid">
    <div>
      <p class="footer-brand"><?= e($business['name']) ?></p>
      <p class="footer-en"><?= e($business['name_en']) ?></p>
      <p class="footer-tag"><?= e($business['slogan']) ?></p>
      <p class="footer-tagline"><?= e($business['tagline']) ?></p>
    </div>
    <div>
      <p class="footer-heading">บริการ</p>
      <ul class="footer-list">
        <li><a href="/car-with-driver/">รถพร้อมคนขับ</a></li>
        <li><a href="/airport-transfer/">รับส่งสนามบิน</a></li>
        <li><a href="/price/">ราคา</a></li>
        <li><a href="/trip-planner/">จัดทริป</a></li>
        <li><a href="/vehicles/van/">รถตู้พร้อมคนขับ</a></li>
      </ul>
    </div>
    <div>
      <p class="footer-heading">เส้นทาง</p>
      <ul class="footer-list">
        <?php foreach ($routes as $route): ?>
          <li><a href="<?= e($route['url']) ?>" data-analytics="click_related_route" data-route="<?= e($route['id']) ?>"><?= e($route['name']) ?></a></li>
        <?php endforeach; ?>
      </ul>
    </div>
    <div>
      <p class="footer-heading">ติดต่อ</p>
      <ul class="footer-list">
        <li><a href="<?= e(tel_href($business)) ?>" data-analytics="click_phone" data-button-position="footer"><?= e($business['phone']) ?></a></li>
        <li><a href="mailto:<?= e($business['email']) ?>"><?= e($business['email']) ?></a></li>
        <li><?= e($business['address']) ?></li>
        <li>
          <?php if ($lineReady): ?>
            <a href="<?= e($business['line_url']) ?>" data-analytics="click_line" data-button-position="footer" rel="noopener noreferrer">LINE OA</a>
          <?php else: ?>
            LINE OA เร็ว ๆ นี้
          <?php endif; ?>
        </li>
      </ul>
    </div>
  </div>
  <div class="container-page footer-bottom">
    <p>© <?= date('Y') ?> <?= e($business['name']) ?> · <?= e($business['name_en']) ?></p>
    <p>
      <a href="/privacy/">ความเป็นส่วนตัว</a>
      ·
      <a href="/terms/">ข้อกำหนด</a>
      ·
      <a href="/contact/#payment">ข้อมูลการชำระเงิน</a>
    </p>
  </div>
</footer>
<script src="<?= e(asset_url('assets/js/app.js', $assetVersion)) ?>" defer></script>
</body>
</html>
