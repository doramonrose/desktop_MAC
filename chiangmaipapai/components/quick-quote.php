<?php
declare(strict_types=1);
/** @var array $business @var array $content @var bool $lineReady */
?>
<section id="quick-quote" class="section" aria-labelledby="quote-heading">
  <div class="container-page">
    <div class="mx-auto max-w-3xl text-center">
      <h2 id="quote-heading" class="section-title section-title-center mx-auto">เช็กคิวรถและประเมินราคา</h2>
      <p class="section-lead mx-auto">กรอกข้อมูลเบื้องต้น แล้วคัดลอกข้อความไปสอบถามผ่านโทรศัพท์<?= $lineReady ? ' หรือ LINE' : '' ?></p>
    </div>

    <form id="quote-form" class="card mx-auto mt-10 max-w-4xl border-gold/15 shadow-soft ring-1 ring-gold/10" novalidate>
      <div class="mb-5 rounded-xl bg-gradient-to-r from-navy to-navy-deep px-4 py-3 text-sm text-white/90">
        บอกวันเดินทาง จุดหมาย และจำนวนคน — เราช่วยเช็กคิวให้
      </div>
      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label class="label" for="travel_date">วันที่เดินทาง</label>
          <input class="input" type="date" id="travel_date" name="travel_date" required>
        </div>
        <div>
          <label class="label" for="passengers">จำนวนผู้โดยสาร</label>
          <input class="input" type="number" id="passengers" name="passengers" min="1" max="20" placeholder="เช่น 4" required>
        </div>
        <div>
          <label class="label" for="pickup">จุดรับ</label>
          <input class="input" type="text" id="pickup" name="pickup" placeholder="เช่น สนามบินเชียงใหม่ / โรงแรม" required autocomplete="street-address">
        </div>
        <div>
          <label class="label" for="destination">จุดหมาย</label>
          <input class="input" type="text" id="destination" name="destination" placeholder="เช่น แม่กำปอง / ดอยอินทนนท์" required>
        </div>
        <div>
          <label class="label" for="luggage">จำนวนกระเป๋า</label>
          <input class="input" type="number" id="luggage" name="luggage" min="0" max="30" placeholder="เช่น 2">
        </div>
        <div>
          <label class="label" for="vehicle_type">ประเภทรถ</label>
          <select class="input" id="vehicle_type" name="vehicle_type" required>
            <option value="">เลือกประเภทรถ</option>
            <option value="รถเก๋ง">รถเก๋ง</option>
            <option value="SUV">SUV</option>
            <option value="รถตู้">รถตู้</option>
            <option value="ให้เราแนะนำ">ให้เราแนะนำ</option>
          </select>
        </div>
        <div class="sm:col-span-2">
          <label class="label" for="trip_type">รูปแบบการเดินทาง</label>
          <select class="input" id="trip_type" name="trip_type" required>
            <option value="">เลือกรูปแบบ</option>
            <option value="รับส่งสนามบิน">รับส่งสนามบิน</option>
            <option value="เที่ยวเชียงใหม่">เที่ยวเชียงใหม่</option>
            <option value="ต่างจังหวัด">ต่างจังหวัด</option>
            <option value="เที่ยวเดียว">เที่ยวเดียว</option>
            <option value="ไปกลับ">ไปกลับ</option>
            <option value="หลายวัน">หลายวัน</option>
          </select>
        </div>
      </div>

      <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" class="btn-primary" data-analytics="click_quote" data-button-position="quick_quote">
          เตรียมข้อความขอราคา
        </button>
        <?php if ($lineReady): ?>
          <a id="quote-line-btn" href="<?= e($business['line_url']) ?>" class="btn-line hidden" target="_blank" rel="noopener noreferrer" data-analytics="click_line" data-button-position="quick_quote">เปิด LINE OA</a>
        <?php endif; ?>
      </div>
      <p id="quote-status" class="mt-4 hidden rounded-xl bg-gold/10 px-4 py-3 text-sm text-navy" role="status" aria-live="polite"></p>
      <p class="mt-3 text-xs text-ink/55">การเช็กคิวไม่มีค่าใช้จ่าย และยังไม่ถือเป็นการยืนยันการจอง</p>
    </form>
  </div>
</section>
