<?php
declare(strict_types=1);

function render_seo_page(string $slug): void
{
    require dirname(__DIR__) . '/bootstrap.php';

    $pages = require dirname(__DIR__) . '/config/pages.php';
    if (!isset($pages[$slug])) {
        http_response_code(404);
        require dirname(__DIR__) . '/404.php';
        exit;
    }

    $page = $pages[$slug];
    require dirname(__DIR__) . '/templates/seo-page.php';
}
