<?php
declare(strict_types=1);

http_response_code(404);
require __DIR__ . '/bootstrap.php';

$isHome = false;
$pageTitle = 'ไม่พบหน้า | เชียงใหม่พาไป';
$pageDescription = 'ไม่พบหน้าที่คุณต้องการบนเว็บไซต์เชียงใหม่พาไป';
$pageCanonical = $baseUrl . '/404';
$pageRobots = 'noindex,follow';
$bodyClass = '';

require __DIR__ . '/components/head.php';
require __DIR__ . '/components/header.php';
?>
<main id="main-content" class="section">
  <div class="container-page max-w-xl text-center">
    <p class="text-sm font-semibold text-gold">404</p>
    <h1 class="mt-2 text-3xl font-bold text-navy">ไม่พบหน้านี้</h1>
    <p class="mt-4 text-ink/70">หน้าที่คุณกำลังหาอาจยังไม่พร้อมใน Phase นี้ หรือย้ายไปแล้ว</p>
    <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
      <a href="/" class="btn-primary">กลับหน้าแรก</a>
      <a href="/#quick-quote" class="btn-secondary">เช็กคิวรถ</a>
      <a href="<?= e(tel_href($business)) ?>" class="btn-navy" data-analytics="click_phone" data-button-position="404">โทร <?= e($business['phone']) ?></a>
    </div>
  </div>
</main>
<?php require __DIR__ . '/components/footer.php'; ?>
