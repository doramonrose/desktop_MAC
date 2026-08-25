<?php
declare(strict_types=1);

function e(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function is_line_ready(array $business): bool
{
    return trim((string) ($business['line_url'] ?? '')) !== '';
}

function asset_url(string $path, string $version = ''): string
{
    $path = '/' . ltrim($path, '/');
    if ($version !== '') {
        return $path . '?v=' . rawurlencode($version);
    }
    return $path;
}

function picture_sources(string $basePath, string $alt, array $attrs = []): string
{
    $classes = e($attrs['class'] ?? 'w-full h-full object-cover');
    $loading = e($attrs['loading'] ?? 'lazy');
    $fetchpriority = isset($attrs['fetchpriority']) ? ' fetchpriority="' . e($attrs['fetchpriority']) . '"' : '';
    $width = isset($attrs['width']) ? ' width="' . e((string) $attrs['width']) . '"' : '';
    $height = isset($attrs['height']) ? ' height="' . e((string) $attrs['height']) . '"' : '';
    $sizes = e($attrs['sizes'] ?? '100vw');
    $decoding = e($attrs['decoding'] ?? 'async');
    $safeAlt = e($alt);

    $avif = '/assets/images/' . ltrim($basePath, '/') . '.avif';
    $webp = '/assets/images/' . ltrim($basePath, '/') . '.webp';
    $jpg = '/assets/images/' . ltrim($basePath, '/') . '.jpg';

    return <<<HTML
<picture>
  <source type="image/avif" srcset="{$avif}">
  <source type="image/webp" srcset="{$webp}">
  <img src="{$jpg}" alt="{$safeAlt}" class="{$classes}" loading="{$loading}" decoding="{$decoding}" sizes="{$sizes}"{$width}{$height}{$fetchpriority}>
</picture>
HTML;
}

function tel_href(array $business): string
{
    return 'tel:' . preg_replace('/\D+/', '', (string) $business['phone_raw']);
}

function json_ld(array $data): string
{
    return json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS);
}

function pricing_enabled(array $pricing): bool
{
    return !empty($pricing['enabled']);
}

function price_from(string $group, string $id, array $pricing): ?int
{
    if (!pricing_enabled($pricing)) {
        return null;
    }
    $value = $pricing[$group][$id]['from'] ?? null;
    if ($value === null || $value === '' || !is_numeric($value)) {
        return null;
    }
    return (int) $value;
}

function format_baht(int $amount): string
{
    return number_format($amount) . ' บาท';
}

function price_label_for(string $group, string $id, array $pricing, string $fallback = 'สอบถามราคา'): string
{
    $from = price_from($group, $id, $pricing);
    if ($from === null) {
        return $fallback;
    }
    $unit = (string) ($pricing[$group][$id]['unit'] ?? 'เริ่มต้น');
    return $unit . ' ' . format_baht($from);
}

function price_note_for(string $group, string $id, array $pricing): string
{
    return (string) ($pricing[$group][$id]['note'] ?? '');
}
