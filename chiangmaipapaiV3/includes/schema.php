<?php
declare(strict_types=1);

function schema_organization(array $business, array $app): array
{
    $base = rtrim((string) $app['url'], '/');
    $org = [
        '@context' => 'https://schema.org',
        '@type' => 'Organization',
        'name' => $business['name'],
        'alternateName' => $business['name_en'],
        'url' => $base . '/',
        'logo' => $base . '/assets/images/logo.png',
        'email' => $business['email'],
        'telephone' => $business['phone_intl'],
        'address' => [
            '@type' => 'PostalAddress',
            'streetAddress' => $business['address_schema']['streetAddress'],
            'addressLocality' => $business['address_schema']['addressLocality'],
            'addressRegion' => $business['address_schema']['addressRegion'],
            'postalCode' => $business['address_schema']['postalCode'],
            'addressCountry' => $business['address_schema']['addressCountry'],
        ],
    ];
    $line = trim((string) ($business['line_url'] ?? ''));
    if ($line !== '') {
        $org['sameAs'] = [$line];
    }
    return $org;
}

function schema_local_business(array $business, array $app): array
{
    $org = schema_organization($business, $app);
    $org['@type'] = 'LocalBusiness';
    $org['description'] = $business['tagline'];
    $org['areaServed'] = [
        ['@type' => 'AdministrativeArea', 'name' => 'Chiang Mai'],
        ['@type' => 'AdministrativeArea', 'name' => 'Northern Thailand'],
    ];
    if (empty($org['sameAs'])) {
        unset($org['sameAs']);
    }
    return $org;
}

function schema_website(array $business, array $app): array
{
    $base = rtrim((string) $app['url'], '/');
    return [
        '@context' => 'https://schema.org',
        '@type' => 'WebSite',
        'name' => $business['name'],
        'alternateName' => $business['name_en'],
        'url' => $base . '/',
        'inLanguage' => 'th-TH',
    ];
}

function schema_webpage(string $title, string $description, string $canonical): array
{
    return [
        '@context' => 'https://schema.org',
        '@type' => 'WebPage',
        'name' => $title,
        'description' => $description,
        'url' => $canonical,
        'inLanguage' => 'th-TH',
    ];
}

function schema_service(string $name, string $description, string $url, array $business): array
{
    return [
        '@context' => 'https://schema.org',
        '@type' => 'Service',
        'name' => $name,
        'description' => $description,
        'url' => $url,
        'provider' => [
            '@type' => 'LocalBusiness',
            'name' => $business['name'],
            'telephone' => $business['phone_intl'],
        ],
        'areaServed' => [
            ['@type' => 'AdministrativeArea', 'name' => 'Chiang Mai'],
        ],
    ];
}

function schema_faq(array $items): ?array
{
    if ($items === []) {
        return null;
    }
    return [
        '@context' => 'https://schema.org',
        '@type' => 'FAQPage',
        'mainEntity' => array_map(static function (array $item): array {
            return [
                '@type' => 'Question',
                'name' => $item['q'],
                'acceptedAnswer' => [
                    '@type' => 'Answer',
                    'text' => $item['a'],
                ],
            ];
        }, $items),
    ];
}

function schema_breadcrumb(array $crumbs, array $app): ?array
{
    if (count($crumbs) < 2) {
        return null;
    }
    $base = rtrim((string) $app['url'], '/');
    $elements = [];
    foreach ($crumbs as $i => $crumb) {
        $elements[] = [
            '@type' => 'ListItem',
            'position' => $i + 1,
            'name' => $crumb['name'],
            'item' => $base . $crumb['url'],
        ];
    }
    return [
        '@context' => 'https://schema.org',
        '@type' => 'BreadcrumbList',
        'itemListElement' => $elements,
    ];
}
