<?php
declare(strict_types=1);
require dirname(__DIR__) . '/bootstrap.php';

$meta = page_seo($seo, '/trip-planner/');
$pageTitle = $meta['title'];
$pageDescription = $meta['description'];
$pageH1 = $meta['h1'];
$pageCanonical = $baseUrl . '/trip-planner/';
$pageRobots = $meta['robots'];
$crumbs = breadcrumbs_for('/trip-planner/', $routes, $vehicles);
$data = $content['trip_planner'];
$quoteTrip = 'Custom';
$quoteVehicle = 'recommend';

$extraSchemas = array_filter([
    schema_organization($business, $app),
    schema_local_business($business, $app),
    schema_website($business, $app),
    schema_webpage($pageTitle, $pageDescription, $pageCanonical),
    schema_service($pageH1, $pageDescription, $pageCanonical, $business),
    schema_breadcrumb($crumbs, $app),
]);

require dirname(__DIR__) . '/components/head.php';
require dirname(__DIR__) . '/components/header.php';
?>
<main id="main-content">
  <header class="page-hero">
    <div class="container-page">
      <?php require dirname(__DIR__) . '/components/breadcrumb.php'; ?>
      <h1><?= e($pageH1) ?></h1>
      <p class="hero-lead"><?= e($data['lead']) ?></p>
    </div>
  </header>

  <section class="section">
    <div class="container-page planner">
      <form id="planner-form" class="quote-form" novalidate>
        <div class="quote-grid">
          <div>
            <label class="label" for="plan_days">มีกี่วัน</label>
            <select class="input" id="plan_days" name="plan_days" required>
              <option value="1">1 วัน</option>
              <option value="2">2–3 วัน</option>
              <option value="4">4 วันขึ้นไป</option>
            </select>
          </div>
          <div>
            <label class="label" for="plan_people">มากี่คน</label>
            <input class="input" type="number" id="plan_people" name="plan_people" min="1" max="20" required>
          </div>
          <div>
            <label class="label" for="plan_children">มีเด็กหรือไม่</label>
            <select class="input" id="plan_children" name="plan_children">
              <option value="no">ไม่มี</option>
              <option value="yes">มี</option>
            </select>
          </div>
          <div>
            <label class="label" for="plan_senior">มีผู้สูงอายุหรือไม่</label>
            <select class="input" id="plan_senior" name="plan_senior">
              <option value="no">ไม่มี</option>
              <option value="yes">มี</option>
            </select>
          </div>
          <div class="quote-span">
            <label class="label" for="plan_stay">พักที่ไหน</label>
            <input class="input" type="text" id="plan_stay" name="plan_stay" placeholder="เช่น นิมมาน / เวียงเก่า / ยังไม่จอง">
          </div>
        </div>
        <fieldset class="style-fieldset">
          <legend>อยากเที่ยวแบบไหน</legend>
          <div class="chip-row">
            <?php foreach ($data['styles'] as $id => $label): ?>
              <label class="chip chip-check">
                <input type="checkbox" name="plan_style" value="<?= e($id) ?>">
                <?= e($label) ?>
              </label>
            <?php endforeach; ?>
          </div>
        </fieldset>
        <button type="submit" class="btn-navy">ดูเส้นทางที่แนะนำ</button>
      </form>

      <div id="planner-result" class="planner-result hidden" aria-live="polite"></div>
      <a class="btn-primary" href="#quick-quote" data-analytics="open_quote" data-button-position="trip_planner"><?= e($data['cta']) ?></a>
    </div>
  </section>

  <?php
    require dirname(__DIR__) . '/components/quote.php';
    require dirname(__DIR__) . '/components/final-cta.php';
  ?>
</main>
<?php
require dirname(__DIR__) . '/components/mobile-bar.php';
require dirname(__DIR__) . '/components/footer.php';
