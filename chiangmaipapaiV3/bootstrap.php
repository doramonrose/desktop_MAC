<?php
declare(strict_types=1);

date_default_timezone_set('Asia/Bangkok');

$app = require __DIR__ . '/config/app.php';
$business = require __DIR__ . '/config/business.php';
$seo = require __DIR__ . '/config/seo.php';
$routes = require __DIR__ . '/config/routes.php';
$vehiclesConfig = require __DIR__ . '/config/vehicles.php';
$prices = require __DIR__ . '/config/prices.php';
$trips = require __DIR__ . '/config/trips.php';
$social = require __DIR__ . '/config/social.php';
$content = require __DIR__ . '/config/content.php';

require_once __DIR__ . '/includes/helpers.php';
require_once __DIR__ . '/includes/schema.php';

$vehicles = $vehiclesConfig['items'];
$lineReady = is_line_ready($business);
$hasReviews = !empty($content['reviews']);
$pricingEnabled = pricing_enabled($prices);
$assetVersion = (string) ($app['asset_version'] ?? '1');
$baseUrl = rtrim((string) $app['url'], '/');
$path = current_path();
$quoteHref = '#quick-quote';
