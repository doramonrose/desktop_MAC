<?php
declare(strict_types=1);
?>
<nav class="mobile-bar" aria-label="ทางลัดมือถือ">
  <a href="<?= e(tel_href($business)) ?>" data-analytics="click_phone" data-button-position="mobile_bar">
    <span>โทร</span>
    <small><?= e($business['phone']) ?></small>
  </a>
  <a<?= $lineReady ? '' : ' class="is-primary"' ?> href="<?= e($quoteHref) ?>" data-analytics="open_quote" data-button-position="mobile_bar">
    <span>เช็กคิว</span>
    <small>ขอราคา</small>
  </a>
  <?php if ($lineReady): ?>
    <a class="is-primary" href="<?= e($business['line_url']) ?>" data-analytics="click_line" data-button-position="mobile_bar" target="_blank" rel="noopener noreferrer">
      <span>LINE</span>
      <small><?= e($business['line_id']) ?></small>
    </a>
  <?php else: ?>
    <span class="is-soon">
      <span>LINE</span>
      <small>เร็ว ๆ นี้</small>
    </span>
  <?php endif; ?>
</nav>
