<?php
declare(strict_types=1);

function brand_icon(string $name): string
{
    $icons = [
        'people' => '<path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M16 10a2.5 2.5 0 1 0 0-5"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M16 15a5 5 0 0 1 4.5 4"/>',
        'trip' => '<path d="M4 18h16"/><path d="M6 18V8l5 3 5-4v11"/>',
        'mountain' => '<path d="M3 19h18L14 6l-3 5-2-2-6 10Z"/><path d="M12 11.5 16 19"/>',
        'phone' => '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 17h2"/>',
    ];
    $paths = $icons[$name] ?? $icons['trip'];
    return '<svg class="why-icon-svg" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' . $paths . '</svg>';
}
