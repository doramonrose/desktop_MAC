<?php
declare(strict_types=1);
/** @var array $relatedItems */
$resolved = [];
foreach ($relatedItems as $item) {
    $link = related_link($item, $routes, $vehicles);
    if ($link !== null) {
        $resolved[] = $link;
    }
}
if ($resolved === []) {
    return;
}
?>
<section class="section section-alt" aria-labelledby="related-heading">
  <div class="container-page">
    <div class="section-intro">
      <h2 id="related-heading">เส้นทางและหน้าที่เกี่ยวข้อง</h2>
      <p>ลิงก์เฉพาะที่ช่วยตัดสินใจต่อ ไม่ได้เชื่อมทุกหน้าเข้าด้วยกัน</p>
    </div>
    <ul class="related-list">
      <?php foreach ($resolved as $link): ?>
        <li>
          <a href="<?= e($link['url']) ?>" data-analytics="click_related_route"><?= e($link['label']) ?></a>
        </li>
      <?php endforeach; ?>
    </ul>
  </div>
</section>
