<?php
declare(strict_types=1);

header('Content-Type: application/xml; charset=UTF-8');

require __DIR__ . '/bootstrap.php';

$urls = sitemap_urls($app, $routes, $vehicles);
$today = date('Y-m-d');

echo '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . PHP_EOL;
foreach ($urls as $url) {
    echo '  <url>' . PHP_EOL;
    echo '    <loc>' . e($url) . '</loc>' . PHP_EOL;
    echo '    <lastmod>' . e($today) . '</lastmod>' . PHP_EOL;
    echo '  </url>' . PHP_EOL;
}
echo '</urlset>' . PHP_EOL;
