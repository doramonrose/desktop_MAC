<?php
declare(strict_types=1);
/** @var array $business @var array $content */
?>
<footer class="border-t border-navy/5 bg-white pb-8 pt-12" id="site-footer">
  <div class="container-page grid gap-10 md:grid-cols-2 lg:grid-cols-3">
    <div>
      <p class="text-xl font-bold text-navy"><?= e($business['name']) ?></p>
      <p class="mt-1 text-xs font-semibold tracking-wider text-navy-deep"><?= e($business['name_en_display']) ?></p>
      <p class="mt-3 text-sm text-ink/70"><?= e($business['tagline']) ?></p>
      <p class="mt-2 text-sm font-medium text-gold"><?= e($business['slogan']) ?></p>
    </div>
    <div>
      <h2 class="text-sm font-semibold text-navy">ติดต่อ</h2>
      <ul class="mt-3 space-y-2 text-sm text-ink/75">
        <li>โทร: <a class="font-medium text-navy hover:underline" href="<?= e(tel_href($business)) ?>" data-analytics="click_phone" data-button-position="footer"><?= e($business['phone']) ?></a></li>
        <li>Email: <a class="font-medium text-navy hover:underline" href="mailto:<?= e($business['email']) ?>"><?= e($business['email']) ?></a></li>
        <li>ที่อยู่: <?= e($business['address']) ?></li>
      </ul>
    </div>
    <div>
      <h2 class="text-sm font-semibold text-navy">เมนู</h2>
      <ul class="mt-3 grid grid-cols-2 gap-2 text-sm text-ink/75">
        <li><a class="hover:text-navy" href="/">หน้าแรก</a></li>
        <li><a class="hover:text-navy" href="/car-with-driver-chiangmai/">รถพร้อมคนขับ</a></li>
        <li><a class="hover:text-navy" href="/price/">รถและราคา</a></li>
        <li><a class="hover:text-navy" href="/airport-transfer-chiangmai/">สนามบิน</a></li>
        <li><a class="hover:text-navy" href="/#destinations">เส้นทาง</a></li>
        <li><a class="hover:text-navy" href="/reviews/">รีวิว</a></li>
        <li><a class="hover:text-navy" href="/faq/">FAQ</a></li>
        <li><a class="hover:text-navy" href="/contact/">ติดต่อ</a></li>
        <li><a class="hover:text-navy" href="/about/">เกี่ยวกับเรา</a></li>
        <li><a class="hover:text-navy" href="/privacy/">Privacy</a></li>
        <li><a class="hover:text-navy" href="/terms/">Terms</a></li>
      </ul>
    </div>
  </div>
  <div class="container-page mt-10 border-t border-navy/5 pt-6 text-xs text-ink/50">
    <p>© <?= date('Y') ?> <?= e($business['name']) ?>. All rights reserved.</p>
  </div>
</footer>

<script>
  window.CMPP_CONFIG = {
    phoneDisplay: <?= json_encode($business['phone'], JSON_UNESCAPED_UNICODE) ?>,
    lineReady: <?= $lineReady ? 'true' : 'false' ?>,
    lineUrl: <?= json_encode($business['line_url'] ?? '', JSON_UNESCAPED_UNICODE) ?>
  };
</script>
<script src="<?= e(asset_url('assets/js/main.js', $assetVersion)) ?>" defer></script>
</body>
</html>
