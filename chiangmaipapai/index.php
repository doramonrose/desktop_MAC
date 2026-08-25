<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$isHome = true;
$pageTitle = $seo['title'];
$pageDescription = $seo['description'];
$pageCanonical = $seo['canonical_url'];

$faqSchema = [
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
    }, $content['faq']),
];

$extraSchemas = [$faqSchema];

require __DIR__ . '/components/head.php';
require __DIR__ . '/components/header.php';
?>
<main id="main-content">
  <?php require __DIR__ . '/components/hero.php'; ?>
  <?php require __DIR__ . '/components/trust-bar.php'; ?>
  <?php require __DIR__ . '/components/quick-quote.php'; ?>
  <?php require __DIR__ . '/components/services.php'; ?>
  <?php require __DIR__ . '/components/vehicles.php'; ?>
  <?php require __DIR__ . '/components/destinations.php'; ?>
  <?php require __DIR__ . '/components/why-us.php'; ?>
  <?php require __DIR__ . '/components/booking-steps.php'; ?>
  <?php require __DIR__ . '/components/reviews.php'; ?>
  <?php require __DIR__ . '/components/faq.php'; ?>
  <?php require __DIR__ . '/components/payment.php'; ?>
  <?php require __DIR__ . '/components/final-cta.php'; ?>
</main>
<?php
require __DIR__ . '/components/mobile-bar.php';
require __DIR__ . '/components/footer.php';
