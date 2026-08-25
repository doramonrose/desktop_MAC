<?php
declare(strict_types=1);

function e(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function is_line_ready(array $business): bool
{
    return trim((string) ($business['line_url'] ?? '')) !== ''
        && trim((string) ($business['line_id'] ?? '')) !== '';
}

function asset_url(string $path, string $version = ''): string
{
    $path = '/' . ltrim($path, '/');
    if ($version !== '') {
        return $path . '?v=' . rawurlencode($version);
    }
    return $path;
}

function picture_tag(string $basePath, string $alt, array $attrs = []): string
{
    $classes = e($attrs['class'] ?? 'h-full w-full object-cover');
    $loading = e($attrs['loading'] ?? 'lazy');
    $decoding = e($attrs['decoding'] ?? 'async');
    $sizes = e($attrs['sizes'] ?? '100vw');
    $width = isset($attrs['width']) ? ' width="' . e((string) $attrs['width']) . '"' : '';
    $height = isset($attrs['height']) ? ' height="' . e((string) $attrs['height']) . '"' : '';
    $fetchpriority = isset($attrs['fetchpriority']) ? ' fetchpriority="' . e((string) $attrs['fetchpriority']) . '"' : '';
    $safeAlt = e($alt);
    $prefix = '/assets/images/' . ltrim($basePath, '/');

    return <<<HTML
<picture>
  <source type="image/avif" srcset="{$prefix}.avif">
  <source type="image/webp" srcset="{$prefix}.webp">
  <img src="{$prefix}.jpg" alt="{$safeAlt}" class="{$classes}" loading="{$loading}" decoding="{$decoding}" sizes="{$sizes}"{$width}{$height}{$fetchpriority}>
</picture>
HTML;
}

function tel_href(array $business): string
{
    return 'tel:+66' . ltrim(preg_replace('/\D+/', '', (string) $business['phone_raw']) ?? '', '0');
}

function json_ld(array $data): string
{
    $flags = JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT;
    return (string) json_encode($data, $flags);
}

function pricing_enabled(array $prices): bool
{
    return !empty($prices['enabled']);
}

function price_from(string $group, string $id, array $prices): ?int
{
    if (!pricing_enabled($prices)) {
        return null;
    }
    $value = $prices[$group][$id]['from'] ?? null;
    if ($value === null || $value === '' || !is_numeric($value)) {
        return null;
    }
    return (int) $value;
}

function format_baht(int $amount): string
{
    return number_format($amount) . ' บาท';
}

function price_label(string $group, string $id, array $prices, string $fallback = 'สอบถามรายละเอียด'): string
{
    $from = price_from($group, $id, $prices);
    if ($from === null) {
        return $fallback;
    }
    $unit = (string) ($prices[$group][$id]['unit'] ?? 'เริ่มต้น');
    return $unit . ' ' . format_baht($from);
}

function current_path(): string
{
    $uri = (string) ($_SERVER['REQUEST_URI'] ?? '/');
    $path = parse_url($uri, PHP_URL_PATH);
    $path = is_string($path) ? $path : '/';
    if ($path !== '/' && str_ends_with($path, '/index.php')) {
        $path = substr($path, 0, -9);
    }
    if ($path !== '/' && !str_ends_with($path, '/')) {
        $path .= '/';
    }
    return $path === '' ? '/' : $path;
}

function page_seo(array $seo, string $path): array
{
    $pages = $seo['pages'] ?? [];
    $row = $pages[$path] ?? $pages['/'] ?? [];
    return [
        'title' => (string) ($row['title'] ?? ''),
        'description' => (string) ($row['description'] ?? ''),
        'h1' => (string) ($row['h1'] ?? ''),
        'robots' => (string) ($row['robots'] ?? $seo['robots'] ?? 'index,follow'),
    ];
}

function nav_items(): array
{
    return [
        ['label' => 'รถพร้อมคนขับ', 'url' => '/car-with-driver/'],
        ['label' => 'ราคา', 'url' => '/price/'],
        ['label' => 'สนามบิน', 'url' => '/airport-transfer/'],
        ['label' => 'เส้นทาง', 'url' => '/routes/mae-kampong/'],
        ['label' => 'จัดทริป', 'url' => '/trip-planner/'],
        ['label' => 'ติดต่อ', 'url' => '/contact/'],
    ];
}

function static_pages(): array
{
    return [
        'airport' => ['label' => 'รถรับส่งสนามบิน', 'url' => '/airport-transfer/'],
        'price' => ['label' => 'ราคา', 'url' => '/price/'],
        'car' => ['label' => 'รถพร้อมคนขับ', 'url' => '/car-with-driver/'],
        'planner' => ['label' => 'จัดทริป', 'url' => '/trip-planner/'],
        'about' => ['label' => 'เกี่ยวกับเรา', 'url' => '/about/'],
        'contact' => ['label' => 'ติดต่อ', 'url' => '/contact/'],
        'faq' => ['label' => 'คำถามที่พบบ่อย', 'url' => '/faq/'],
    ];
}

function related_link(array $item, array $routes, array $vehicles): ?array
{
    $type = $item['type'] ?? '';
    $id = (string) ($item['id'] ?? '');
    if ($type === 'route' && isset($routes[$id])) {
        return ['label' => 'รถไป' . $routes[$id]['name'], 'url' => $routes[$id]['url']];
    }
    if ($type === 'vehicle' && isset($vehicles[$id])) {
        return ['label' => $vehicles[$id]['name'] . ' พร้อมคนขับ', 'url' => $vehicles[$id]['url']];
    }
    if ($type === 'page') {
        $map = static_pages();
        if (isset($map[$id])) {
            return $map[$id];
        }
    }
    return null;
}

function breadcrumbs_for(string $path, array $routes, array $vehicles): array
{
    $crumbs = [['name' => 'หน้าแรก', 'url' => '/']];
    $map = [
        '/car-with-driver/' => 'รถพร้อมคนขับ',
        '/price/' => 'ราคา',
        '/airport-transfer/' => 'รถรับส่งสนามบิน',
        '/trip-planner/' => 'จัดทริป',
        '/about/' => 'เกี่ยวกับเรา',
        '/contact/' => 'ติดต่อ',
        '/faq/' => 'คำถามที่พบบ่อย',
        '/privacy/' => 'ความเป็นส่วนตัว',
        '/terms/' => 'ข้อกำหนด',
    ];
    if (isset($map[$path])) {
        $crumbs[] = ['name' => $map[$path], 'url' => $path];
        return $crumbs;
    }
    foreach ($vehicles as $vehicle) {
        if ($vehicle['url'] === $path) {
            $crumbs[] = ['name' => 'รถพร้อมคนขับ', 'url' => '/car-with-driver/'];
            $crumbs[] = ['name' => $vehicle['name'], 'url' => $path];
            return $crumbs;
        }
    }
    foreach ($routes as $route) {
        if ($route['url'] === $path) {
            $crumbs[] = ['name' => 'เส้นทาง', 'url' => '/car-with-driver/'];
            $crumbs[] = ['name' => $route['name'], 'url' => $path];
            return $crumbs;
        }
    }
    return $crumbs;
}

function analytics_enabled(array $business): bool
{
    $gtm = trim((string) ($business['analytics']['gtm_id'] ?? ''));
    $ga4 = trim((string) ($business['analytics']['ga4_id'] ?? ''));
    return $gtm !== '' || $ga4 !== '';
}

function sitemap_urls(array $app, array $routes, array $vehicles): array
{
    $base = rtrim((string) $app['url'], '/');
    $paths = [
        '/',
        '/car-with-driver/',
        '/price/',
        '/airport-transfer/',
        '/trip-planner/',
        '/about/',
        '/contact/',
        '/faq/',
        '/privacy/',
        '/terms/',
    ];
    foreach ($vehicles as $vehicle) {
        $paths[] = $vehicle['url'];
    }
    foreach ($routes as $route) {
        $paths[] = $route['url'];
    }
    $urls = [];
    foreach ($paths as $path) {
        $urls[] = $base . $path;
    }
    return $urls;
}
