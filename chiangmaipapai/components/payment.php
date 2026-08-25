<?php
declare(strict_types=1);
/** @var array $business */
$bank = $business['bank'];
?>
<section id="payment" class="section bg-mist" aria-labelledby="payment-heading">
  <div class="container-page max-w-3xl">
    <h2 id="payment-heading" class="section-title">ข้อมูลการชำระเงิน</h2>
    <p class="section-lead">แสดงเฉพาะหลังจากวางแผนทริปแล้ว เพื่อความปลอดภัยในการโอน</p>

    <details class="card mt-8 border border-navy/5" id="payment-details" data-analytics-view="view_payment">
      <summary class="cursor-pointer list-none font-semibold text-navy">
        ดูข้อมูลบัญชีสำหรับชำระเงิน
      </summary>
      <div class="mt-4 space-y-4 border-t border-navy/5 pt-4">
        <p class="rounded-xl bg-gold/10 px-4 py-3 text-sm text-navy">
          กรุณาชำระเงินหลังจากได้รับการยืนยันคิวและยอดจากเจ้าหน้าที่แล้วเท่านั้น
        </p>
        <dl class="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt class="text-ink/55">ธนาคาร</dt>
            <dd class="mt-1 font-semibold text-navy"><?= e($bank['short_name']) ?> · <?= e($bank['name']) ?></dd>
          </div>
          <div>
            <dt class="text-ink/55">เลขบัญชี</dt>
            <dd class="mt-1 font-semibold text-navy tracking-wide"><?= e($bank['account_number']) ?></dd>
          </div>
          <div class="sm:col-span-2">
            <dt class="text-ink/55">ชื่อบัญชี</dt>
            <dd class="mt-1 font-semibold text-navy"><?= e($bank['account_name']) ?></dd>
          </div>
        </dl>
        <button
          type="button"
          class="btn-navy"
          id="copy-bank-btn"
          data-copy="<?= e($bank['account_number_raw']) ?>"
          data-analytics="copy_bank_account"
          data-button-position="payment"
        >คัดลอกเลขบัญชี</button>
        <p class="text-sm text-ink/70">
          กรุณาตรวจสอบชื่อบัญชี “<?= e($bank['account_name']) ?>” ก่อนโอนเงินทุกครั้ง
        </p>
        <p id="copy-bank-status" class="hidden text-sm font-medium text-navy" role="status" aria-live="polite"></p>
      </div>
    </details>
  </div>
</section>
