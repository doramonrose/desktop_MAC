<?php
declare(strict_types=1);
require dirname(__DIR__) . '/bootstrap.php';

$meta = page_seo($seo, '/price/');
$pageTitle = $meta['title'];
$pageDescription = $meta['description'];
$pageH1 = $meta['h1'];
$pageCanonical = $baseUrl . '/price/';
$pageRobots = $meta['robots'];
$crumbs = breadcrumbs_for('/price/', $routes, $vehicles);

$cards = [];
foreach ($prices['vehicles'] as $id => $row) {
    $cards[] = [
        'id' => $id,
        'title' => $vehicles[$id]['name'] ?? $id,
        'group' => 'vehicles',
        'filters' => array_merge(['all', $id], $row['filters'] ?? []),
        'url' => $vehicles[$id]['url'] ?? '/price/',
        'row' => $row,
    ];
}
foreach ($prices['trips'] as $id => $row) {
    $titleMap = ['airport' => 'รับส่งสนามบิน', 'half_day' => 'ทริปครึ่งวัน', 'full_day' => 'ทริปเต็มวัน'];
    $cards[] = [
        'id' => $id,
        'title' => $titleMap[$id] ?? $id,
        'group' => 'trips',
        'filters' => array_merge(['all'], $row['filters'] ?? []),
        'url' => $id === 'airport' ? '/airport-transfer/' : '/car-with-driver/',
        'row' => $row,
    ];
}
foreach ($prices['destinations'] as $id => $row) {
    $cards[] = [
        'id' => $id,
        'title' => 'รถไป' . ($routes[$id]['name'] ?? $id),
        'group' => 'destinations',
        'filters' => array_merge(['all'], $row['filters'] ?? []),
        'url' => $routes[$id]['url'] ?? '/price/',
        'row' => $row,
    ];
}

$faqItems = [
    [
        'q' => 'ทำไมราคาเป็น “เริ่มต้น”?',
        'a' => 'เพราะจุดรับ จุดแวะ และชั่วโมงรถทำให้ยอดต่างกัน ตัวเลขในหน้านี้คือราคาเริ่มต้นที่ยืนยันแล้ว ไม่ใช่ยอดสุดท้ายอัตโนมัติ',
    ],
    [
        'q' => 'ถ้าราคาไม่ตรงกับทริปที่อยากไป?',
        'a' => 'ใช้ข้อความสอบถามรายละเอียด แล้วเช็กคิว ไม่มีการแต่งราคาบนหน้าเว็บ',
    ],
];

$extraSchemas = array_filter([
    schema_organization($business, $app),
    schema_local_business($business, $app),
    schema_website($business, $app),
    schema_webpage($pageTitle, $pageDescription, $pageCanonical),
    schema_service($pageH1, $pageDescription, $pageCanonical, $business),
    schema_faq($faqItems),
    schema_breadcrumb($crumbs, $app),
]);

require dirname(__DIR__) . '/components/head.php';
require dirname(__DIR__) . '/components/header.php';
?>
<main id="main-content">
  <header class="page-hero">
    <div class="container-page">
      <?php require dirname(__DIR__) . '/components/breadcrumb.php'; ?>
      <h1><?= e($pageH1) ?></h1>
      <p class="hero-lead"><?= e($prices['disclaimer']) ?></p>
    </div>
  </header>

  <section class="section">
    <div class="container-page">
      <div class="filter-bar" data-price-filters>
        <p class="filter-label">กรองตาม</p>
        <div class="chip-row">
          <button type="button" class="chip is-active" data-filter="all">ทั้งหมด</button>
          <button type="button" class="chip" data-filter="sedan">รถเก๋ง</button>
          <button type="button" class="chip" data-filter="suv">SUV</button>
          <button type="button" class="chip" data-filter="van">รถตู้</button>
          <button type="button" class="chip" data-filter="airport">สนามบิน</button>
          <button type="button" class="chip" data-filter="half">ครึ่งวัน</button>
          <button type="button" class="chip" data-filter="full">เต็มวัน</button>
          <button type="button" class="chip" data-filter="mae-kampong">แม่กำปอง</button>
          <button type="button" class="chip" data-filter="doi-inthanon">ดอยอินทนนท์</button>
          <button type="button" class="chip" data-filter="pai">ปาย</button>
          <button type="button" class="chip" data-filter="chiang-rai">เชียงราย</button>
        </div>
      </div>

      <div class="price-card-grid">
        <?php foreach ($cards as $card): ?>
          <article class="price-card" data-filters="<?= e(implode(' ', $card['filters'])) ?>">
            <h2><?= e($card['title']) ?></h2>
            <?= render_price($card['group'], $card['id'], $prices) ?>
            <ul class="plain-ul">
              <li>จำนวนคน: <?= e((string) ($card['row']['people'] ?? 'ตามประเภทรถ')) ?></li>
              <li>เวลา: <?= e((string) ($card['row']['time'] ?? 'ตามโปรแกรม')) ?></li>
              <li>รวม: <?= e(implode(', ', $prices['includes'])) ?></li>
              <li>ไม่รวม: <?= e(implode(', ', $prices['excludes'])) ?></li>
              <li>OT: <?= e($prices['ot_note']) ?></li>
            </ul>
            <p class="muted"><?= e((string) ($card['row']['note'] ?? '')) ?></p>
            <a class="btn-primary" href="<?= e($card['url']) ?>#quick-quote" data-analytics="view_price" data-price-item="<?= e($card['id']) ?>">เช็กคิวราคานี้</a>
          </article>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <?php
    $faqHeading = 'ก่อนดูราคา';
    require dirname(__DIR__) . '/components/faq.php';
    require dirname(__DIR__) . '/components/quote.php';
    require dirname(__DIR__) . '/components/final-cta.php';
  ?>
</main>
<?php
require dirname(__DIR__) . '/components/mobile-bar.php';
require dirname(__DIR__) . '/components/footer.php';
