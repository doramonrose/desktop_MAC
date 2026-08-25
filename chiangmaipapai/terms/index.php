<?php
declare(strict_types=1);

require dirname(__DIR__) . '/bootstrap.php';

$isHome = false;
$pageTitle = 'ข้อกำหนดการใช้งาน | เชียงใหม่พาไป';
$pageDescription = 'ข้อกำหนดและเงื่อนไขการใช้งานเว็บไซต์เชียงใหม่พาไป';
$pageCanonical = $baseUrl . '/terms/';
$bodyClass = '';

require dirname(__DIR__) . '/components/head.php';
require dirname(__DIR__) . '/components/header.php';
?>
<main id="main-content" class="section">
  <article class="container-page max-w-3xl">
    <h1 class="text-3xl font-bold text-navy">ข้อกำหนดการใช้งาน</h1>
    <p class="mt-4 text-sm text-ink/60">อัปเดตล่าสุด: 25 สิงหาคม 2026</p>

    <div class="mt-8 space-y-6 text-sm leading-relaxed text-ink/80">
      <section>
        <h2 class="text-lg font-semibold text-navy">1. บริการบนเว็บไซต์</h2>
        <p>เว็บไซต์นี้ให้ข้อมูลเกี่ยวกับบริการรถพร้อมคนขับของ <?= e($business['name']) ?> และการเช็กคิวเบื้องต้น การเช็กคิวไม่ถือเป็นการยืนยันการจองจนกว่าจะได้รับการยืนยันจากเจ้าหน้าที่</p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-navy">2. ข้อมูลบนเว็บไซต์</h2>
        <p>เราพยายามให้ข้อมูลถูกต้อง แต่รายละเอียดรถ เส้นทาง และเงื่อนไขอาจเปลี่ยนแปลงได้ ราคาสุดท้ายขึ้นกับการยืนยันคิวแต่ละทริป</p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-navy">3. การชำระเงิน</h2>
        <p>กรุณาชำระเงินหลังจากได้รับการยืนยันคิวและยอดจากเจ้าหน้าที่แล้วเท่านั้น และตรวจสอบชื่อบัญชีให้ตรงทุกครั้งก่อนโอน</p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-navy">4. การใช้งานที่ยอมรับได้</h2>
        <p>ห้ามใช้เว็บไซต์ในทางที่ผิดกฎหมาย รบกวนระบบ หรือส่งข้อมูลที่เป็นเท็จเพื่อหลอกลวง</p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-navy">5. ทรัพย์สินทางปัญญา</h2>
        <p>โลโก้ ข้อความ และสื่อบนเว็บไซต์เป็นทรัพย์สินของ <?= e($business['name']) ?> เว้นแต่ระบุเป็นอย่างอื่น</p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-navy">6. การติดต่อ</h2>
        <p>สอบถามเพิ่มเติมได้ที่ <?= e($business['email']) ?> หรือ <?= e($business['phone']) ?></p>
      </section>
    </div>
  </article>
</main>
<?php require dirname(__DIR__) . '/components/footer.php'; ?>
