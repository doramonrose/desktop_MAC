<?php
declare(strict_types=1);
$prefillDestination = $quoteDestination ?? '';
$prefillTrip = $quoteTrip ?? '';
$prefillVehicle = $quoteVehicle ?? '';
$quoteTitle = $content['how_quote']['title'];
$quoteLead = $content['how_quote']['lead'];
?>
<section id="quick-quote" class="section quote-section" aria-labelledby="quote-heading">
  <div class="container-page">
    <div class="section-intro">
      <h2 id="quote-heading"><?= e($quoteTitle) ?></h2>
      <p><?= e($quoteLead) ?></p>
    </div>

    <form id="quote-form" class="quote-form" novalidate data-line-id="<?= e((string) ($business['line_id'] ?? '')) ?>" data-line-url="<?= e((string) ($business['line_url'] ?? '')) ?>">
      <div class="quote-grid">
        <div>
          <label class="label" for="travel_date">วันที่เดินทาง</label>
          <input class="input" type="date" id="travel_date" name="travel_date" required>
        </div>
        <div>
          <label class="label" for="pickup">จุดรับ</label>
          <input class="input" type="text" id="pickup" name="pickup" placeholder="เช่น สนามบินเชียงใหม่ / โรงแรม" required autocomplete="street-address">
        </div>
        <div>
          <label class="label" for="destination">ปลายทาง</label>
          <input class="input" type="text" id="destination" name="destination" placeholder="เช่น แม่กำปอง" value="<?= e($prefillDestination) ?>" required>
        </div>
        <div>
          <label class="label" for="passengers">จำนวนผู้โดยสาร</label>
          <input class="input" type="number" id="passengers" name="passengers" min="1" max="20" placeholder="เช่น 4" required>
        </div>
        <div>
          <label class="label" for="luggage">จำนวนกระเป๋า</label>
          <input class="input" type="number" id="luggage" name="luggage" min="0" max="30" placeholder="เช่น 2">
        </div>
        <div>
          <label class="label" for="vehicle_type">ประเภทรถ</label>
          <select class="input" id="vehicle_type" name="vehicle_type" required>
            <option value="">เลือกประเภทรถ</option>
            <option value="รถเก๋ง"<?= $prefillVehicle === 'sedan' ? ' selected' : '' ?>>รถเก๋ง</option>
            <option value="SUV"<?= $prefillVehicle === 'suv' ? ' selected' : '' ?>>SUV</option>
            <option value="รถตู้"<?= $prefillVehicle === 'van' ? ' selected' : '' ?>>รถตู้</option>
            <option value="ให้เราแนะนำ"<?= $prefillVehicle === 'recommend' ? ' selected' : '' ?>>ให้เราแนะนำ</option>
          </select>
        </div>
        <div class="quote-span">
          <label class="label" for="trip_type">รูปแบบทริป</label>
          <select class="input" id="trip_type" name="trip_type" required>
            <option value="">เลือกรูปแบบ</option>
            <?php
            $tripOptions = ['สนามบิน', 'ครึ่งวัน', 'เต็มวัน', 'ไปกลับ', 'ต่างจังหวัด', 'หลายวัน', 'Custom'];
            foreach ($tripOptions as $option):
            ?>
              <option value="<?= e($option) ?>"<?= $prefillTrip === $option ? ' selected' : '' ?>><?= e($option) ?></option>
            <?php endforeach; ?>
          </select>
        </div>
      </div>

      <div class="quote-actions">
        <button type="submit" class="btn-primary" data-analytics="submit_quote"><?= e($content['how_quote']['button']) ?></button>
        <?php if ($lineReady): ?>
          <a id="quote-line-btn" class="btn-line" href="<?= e($business['line_url']) ?>" target="_blank" rel="noopener noreferrer" data-analytics="click_line" data-button-position="quick_quote">คุยผ่าน LINE @papai</a>
        <?php endif; ?>
      </div>
      <p id="quote-status" class="quote-status hidden" role="status" aria-live="polite"></p>
      <p class="fine-print">ยังไม่ใช่การจอง ข้อความจะเปิดในแชท LINE @papai ให้กดส่ง จากนั้นเจ้าหน้าที่จะยืนยันคิวและยอด</p>
    </form>
  </div>
</section>
