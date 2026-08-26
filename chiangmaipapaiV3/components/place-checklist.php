<?php
declare(strict_types=1);
/** @var list<string> $places */
/** @var list<string> $optionalPlaces */

$places = $places ?? [];
$optionalPlaces = $optionalPlaces ?? [];
$placeCheckTitle = $placeCheckTitle ?? 'ทริปแนะนำ สามารถปรับเปลี่ยนได้ตามเส้นทาง';

$items = [];
foreach ($places as $place) {
    $items[] = (string) $place;
}
foreach ($optionalPlaces as $place) {
    $place = (string) $place;
    if (!str_contains($place, 'สามารถแวะได้')) {
        $place .= ' สามารถแวะได้';
    }
    $items[] = $place;
}

if ($items === []) {
    return;
}
?>
<div class="place-check-wrap">
  <p class="place-check-title"><?= e($placeCheckTitle) ?></p>
  <ul class="place-check">
    <?php foreach ($items as $item): ?>
      <li><?= e($item) ?></li>
    <?php endforeach; ?>
  </ul>
</div>
