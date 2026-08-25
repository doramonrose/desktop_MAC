<?php
declare(strict_types=1);

require dirname(__DIR__) . '/bootstrap.php';

$isHome = false;
$pageTitle = 'นโยบายความเป็นส่วนตัว | เชียงใหม่พาไป';
$pageDescription = 'นโยบายความเป็นส่วนตัวและการคุ้มครองข้อมูลส่วนบุคคล (PDPA) ของเชียงใหม่พาไป';
$pageCanonical = $baseUrl . '/privacy/';
$bodyClass = '';

require dirname(__DIR__) . '/components/head.php';
require dirname(__DIR__) . '/components/header.php';
?>
<main id="main-content" class="section">
  <article class="container-page max-w-3xl prose-like">
    <h1 class="text-3xl font-bold text-navy">นโยบายความเป็นส่วนตัว</h1>
    <p class="mt-4 text-sm text-ink/60">อัปเดตล่าสุด: 25 สิงหาคม 2026</p>

    <div class="mt-8 space-y-6 text-sm leading-relaxed text-ink/80">
      <section>
        <h2 class="text-lg font-semibold text-navy">1. ผู้ควบคุมข้อมูล</h2>
        <p><?= e($business['name']) ?> (“เรา”) ติดต่อได้ที่อีเมล <?= e($business['email']) ?> หรือโทร <?= e($business['phone']) ?> ที่อยู่ <?= e($business['address']) ?></p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-navy">2. วัตถุประสงค์ในการเก็บรวบรวมข้อมูล</h2>
        <ul class="list-disc space-y-1 pl-5">
          <li>ตอบกลับการสอบถามและเช็กคิวยานพาหนะ</li>
          <li>ประสานงานการจองและการเดินทาง</li>
          <li>ปรับปรุงเว็บไซต์และวัดผลการตลาด (Analytics)</li>
          <li>ปฏิบัติตามกฎหมายที่เกี่ยวข้อง</li>
        </ul>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-navy">3. ช่องทางติดต่อและการรับข้อมูล</h2>
        <p>คุณอาจติดต่อเราผ่านโทรศัพท์ อีเมล หรือ LINE OA (เมื่อเปิดใช้งาน) โดยข้อมูลที่คุณส่งมาจะใช้เพื่อตอบกลับและให้บริการเท่านั้น</p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-navy">4. Cookies และ Analytics</h2>
        <p>เว็บไซต์อาจใช้คุกกี้และเครื่องมือวัดผล เช่น Google Analytics 4, Google Tag Manager, Google Ads Conversion และ Meta Pixel เพื่อทำความเข้าใจการใช้งานเว็บไซต์และปรับปรุงประสบการณ์ โดยเราไม่ส่งชื่อ เบอร์โทร อีเมล หรือ LINE ID เข้า Analytics</p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-navy">5. LINE</h2>
        <p>เมื่อ LINE OA พร้อมใช้งาน การสนทนาบน LINE จะอยู่ภายใต้นโยบายของ LINE และจะใช้เพื่อการติดต่อธุรกิจเท่านั้น</p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-navy">6. ระยะเวลาจัดเก็บ</h2>
        <p>เราเก็บข้อมูลเท่าที่จำเป็นต่อการให้บริการ ตอบคำถาม และปฏิบัติตามกฎหมาย แล้วลบหรือทำให้ไม่ระบุตัวตนเมื่อหมดความจำเป็น</p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-navy">7. สิทธิ์ของเจ้าของข้อมูล</h2>
        <p>คุณมีสิทธิขอเข้าถึง แก้ไข ลบ หรือคัดค้านการประมวลผลข้อมูลส่วนบุคคล ตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล โดยติดต่อผ่านช่องทางด้านบน</p>
      </section>

      <section>
        <h2 class="text-lg font-semibold text-navy">8. การเปลี่ยนแปลงนโยบาย</h2>
        <p>เราอาจปรับปรุงนโยบายนี้เป็นครั้งคราว และจะระบุวันที่อัปเดตไว้บนหน้านี้</p>
      </section>
    </div>
  </article>
</main>
<?php require dirname(__DIR__) . '/components/footer.php'; ?>
