<?php
declare(strict_types=1);
$photos = [
    ['src' => 'vehicles/chiangmai-private-driver-suv', 'alt' => 'SUV พร้อมคนขับของเชียงใหม่พาไป'],
    ['src' => 'routes/mae-kampong-private-car', 'alt' => 'ถนนในหมู่บ้านแม่กำปอง อำเภอแม่ออน จังหวัดเชียงใหม่'],
    ['src' => 'routes/doi-inthanon-driver-chiangmai', 'alt' => 'การเดินทางไปดอยอินทนนท์ด้วยคนขับท้องถิ่น'],
    ['src' => 'vehicles/chiangmai-private-driver-van', 'alt' => 'รถตู้พร้อมคนขับสำหรับกลุ่มเที่ยวเชียงใหม่'],
];
?>
<section class="section section-alt" aria-labelledby="photos-heading">
  <div class="container-page">
    <div class="section-intro">
      <h2 id="photos-heading">ภาพการเดินทางจริง</h2>
      <p>ใช้รูปจากรถและเส้นทางที่ให้บริการ ไม่ใช่ภาพสต็อกที่สร้างขึ้น</p>
    </div>
    <div class="photo-grid">
      <?php foreach ($photos as $photo): ?>
        <figure class="photo-frame">
          <?= picture_tag($photo['src'], $photo['alt'], ['width' => '800', 'height' => '520', 'sizes' => '(min-width: 768px) 25vw, 50vw']) ?>
        </figure>
      <?php endforeach; ?>
    </div>
  </div>
</section>
