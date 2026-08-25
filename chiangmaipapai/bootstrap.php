<?php
declare(strict_types=1);

date_default_timezone_set('Asia/Bangkok');

$app = require __DIR__ . '/config/app.php';
$business = require __DIR__ . '/config/business.php';
$seo = require __DIR__ . '/config/seo.php';
$content = require __DIR__ . '/config/content.php';
$pricing = require __DIR__ . '/config/pricing.php';
$tripStops = require __DIR__ . '/config/trip-stops.php';

require_once __DIR__ . '/includes/helpers.php';

// Sync vehicle display labels from pricing config
foreach ($content['vehicles'] as &$vehicleRow) {
    $vehicleRow['price_label'] = price_label_for('vehicles', (string) $vehicleRow['id'], $pricing);
    $from = price_from('vehicles', (string) $vehicleRow['id'], $pricing);
    $vehicleRow['price'] = $from;
}
unset($vehicleRow);

$lineReady = is_line_ready($business);
$hasReviews = !empty($content['reviews']);
$pricingEnabled = pricing_enabled($pricing);
$assetVersion = (string) ($app['asset_version'] ?? '1');
$baseUrl = rtrim((string) $app['url'], '/');
