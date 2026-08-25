<?php
declare(strict_types=1);
// Router for PHP built-in server only.
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/');
if ($uri === '/sitemap.xml') {
    require __DIR__ . '/sitemap.php';
    return true;
}
$file = __DIR__ . $uri;
if ($uri !== '/' && is_file($file)) {
    return false;
}
if (is_dir($file) && is_file($file . '/index.php')) {
    require $file . '/index.php';
    return true;
}
if ($uri !== '/' && !str_ends_with($uri, '/') && is_dir(__DIR__ . $uri) && is_file(__DIR__ . $uri . '/index.php')) {
    require __DIR__ . $uri . '/index.php';
    return true;
}
http_response_code(404);
require __DIR__ . '/404.php';
return true;
