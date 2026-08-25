<?php
declare(strict_types=1);

$business = require __DIR__ . '/business.php';
$app = require __DIR__ . '/app.php';

return [
    'title' => 'รถเช่าพร้อมคนขับเชียงใหม่ | เชียงใหม่พาไป',
    'description' => 'บริการรถเช่าพร้อมคนขับเชียงใหม่ รถเก๋ง SUV และรถตู้ รับส่งสนามบิน เหมาท่องเที่ยวเชียงใหม่และภาคเหนือ เช็กคิวและขอราคาได้ง่าย',
    'canonical_url' => rtrim($app['url'], '/') . '/',
    'og_image' => rtrim($app['url'], '/') . '/assets/images/chiangmai-car-with-driver.webp',
    'og_type' => 'website',
    'twitter_card' => 'summary_large_image',
    'h1' => 'รถเช่าพร้อมคนขับเชียงใหม่ เที่ยวสบาย มีคนขับดูแลตลอดทาง',
    'robots' => 'index,follow',
    'theme_color' => '#062B4F',
    'schema_local_business' => [
        '@context' => 'https://schema.org',
        '@type' => 'LocalBusiness',
        'name' => $business['name'],
        'alternateName' => $business['name_en'],
        'description' => $business['tagline'],
        'url' => rtrim($app['url'], '/') . '/',
        'telephone' => $business['phone_intl'],
        'email' => $business['email'],
        'image' => rtrim($app['url'], '/') . '/assets/images/logo.png',
        'address' => [
            '@type' => 'PostalAddress',
            'streetAddress' => $business['address_schema']['streetAddress'],
            'addressLocality' => $business['address_schema']['addressLocality'],
            'addressRegion' => $business['address_schema']['addressRegion'],
            'postalCode' => $business['address_schema']['postalCode'],
            'addressCountry' => $business['address_schema']['addressCountry'],
        ],
        'areaServed' => [
            ['@type' => 'AdministrativeArea', 'name' => 'Chiang Mai'],
            ['@type' => 'AdministrativeArea', 'name' => 'Mae Rim'],
            ['@type' => 'AdministrativeArea', 'name' => 'Northern Thailand'],
        ],
        // ไม่ใส่ rating / review / geo / openingHours / priceRange จนกว่าจะมีข้อมูลจริง
    ],
    // Phase 2 SEO titles (architecture ready)
    'phase2_titles' => [
        'mae-kampong' => 'รถไปแม่กำปองจากเชียงใหม่ พร้อมคนขับ | เชียงใหม่พาไป',
        'doi-inthanon' => 'รถไปดอยอินทนนท์พร้อมคนขับ | เชียงใหม่พาไป',
        'mon-jam' => 'รถไปม่อนแจ่มจากเชียงใหม่ | เชียงใหม่พาไป',
        'chiang-rai' => 'รถเชียงใหม่ไปเชียงราย พร้อมคนขับ | เชียงใหม่พาไป',
        'pai' => 'รถเชียงใหม่ไปปาย พร้อมคนขับ | เชียงใหม่พาไป',
        'nine-temples' => 'ทริปไหว้พระ 9 วัด เชียงใหม่ พร้อมคนขับ | เชียงใหม่พาไป',
        'doi-suthep-mon-jam' => 'รถเที่ยวดอยสุเทพ–ม่อนแจ่ม พร้อมคนขับ | เชียงใหม่พาไป',
        'pang-hai' => 'รถไปปางไฮ เทพเสด็จ พร้อมคนขับ | เชียงใหม่พาไป',
        'chiang-rai-long' => 'ทริปเชียงรายยาว พร้อมคนขับ | เชียงใหม่พาไป',
        'hinoki-land' => 'รถไปฮิโนกิแลนด์ พร้อมคนขับ | เชียงใหม่พาไป',
        'pai-pang-ung' => 'ทริปปาย–ปางอุ๋ง–รักไทย พร้อมคนขับ | เชียงใหม่พาไป',
    ],
];
