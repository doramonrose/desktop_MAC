<?php
declare(strict_types=1);
/** @var array $trips @var array $routes @var array $prices @var array $vehicles */

$tripContext = $tripContext ?? '';
$tripFeaturedId = $tripFeaturedId ?? null;
$recommendedTrips = trips_for_context($trips, $tripContext, $tripFeaturedId);
$currentPath = current_path();

if ($recommendedTrips === []) {
    return;
}

$tripIntro = $tripIntro ?? 'จุดด้านล่างเป็นตัวอย่างลำดับวัน ไม่ใช่แพ็กเกจล็อก ปรับตามกลุ่มได้ตอนเช็กคิว ราคารวมคนขับและน้ำมันตามโปรแกรมที่ตกลง ไม่รวมค่าเข้าสถานที่';
?>
<section class="section" aria-labelledby="trips-heading">
  <div class="container-page">
    <div class="section-intro">
      <h2 id="trips-heading">ทริปแนะนำ</h2>
      <p><?= e($tripIntro) ?></p>
    </div>
    <div class="trip-grid">
      <?php foreach ($recommendedTrips as $index => $trip): ?>
        <?php
        $isFeatured = $index === 0 && $tripFeaturedId !== null && (
            ($trip['id'] ?? '') === $tripFeaturedId || ($trip['route_id'] ?? '') === $tripFeaturedId
        );
        $tripUrl = trip_detail_url($trip, $routes);
        $showDetail = $tripUrl !== $currentPath;
        $priceGroup = $trip['price_group'] ?? null;
        $priceId = $trip['price_id'] ?? null;
        ?>
        <article class="trip-card<?= $isFeatured ? ' is-featured' : '' ?>">
          <div class="trip-card-head">
            <p class="trip-kicker"><?= e((string) $trip['kicker']) ?></p>
            <h3><?= e((string) $trip['title']) ?></h3>
            <p><?= e((string) $trip['lead']) ?></p>
          </div>
          <?php
          $places = $trip['places'] ?? [];
          $optionalPlaces = $trip['optional_places'] ?? [];
          require __DIR__ . '/place-checklist.php';
          ?>
          <?php if (!empty($trip['stops'])): ?>
            <p class="trip-stops-label">ลำดับวันคร่าว ๆ</p>
            <ol class="trip-stops">
              <?php foreach ($trip['stops'] as $stop): ?>
                <li><?= e((string) $stop) ?></li>
              <?php endforeach; ?>
            </ol>
          <?php endif; ?>
          <div class="trip-card-meta">
            <?php if (is_string($priceGroup) && is_string($priceId) && $priceGroup !== '' && $priceId !== ''): ?>
              <?= render_price($priceGroup, $priceId, $prices) ?>
            <?php else: ?>
              <p class="price-display is-ask"><span class="price-amount">สอบถามรายละเอียด</span></p>
            <?php endif; ?>
            <p class="trip-hours"><?= e((string) ($trip['hours_note'] ?? '')) ?></p>
          </div>
          <div class="trip-card-cta">
            <a class="btn-primary" href="#quick-quote" data-analytics="open_quote" data-button-position="recommended_trip" data-route="<?= e((string) $trip['id']) ?>" data-quote-destination="<?= e((string) ($trip['quote_destination'] ?? '')) ?>" data-quote-trip="<?= e((string) ($trip['quote_trip'] ?? '')) ?>">เช็กคิวทริปนี้</a>
            <?php $linePosition = 'recommended_trip'; require __DIR__ . '/line-inquire.php'; ?>
            <?php if ($showDetail): ?>
              <a class="btn-secondary" href="<?= e($tripUrl) ?>">รายละเอียด</a>
            <?php endif; ?>
          </div>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>
