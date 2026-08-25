<?php
declare(strict_types=1);
$bank = $business['bank'];
?>
<section id="payment" class="section payment-section">
  <div class="container-page">
    <details class="payment-box">
      <summary>ข้อมูลการชำระเงิน</summary>
      <div class="payment-body">
        <p class="payment-warn"><?= e($prices['confirm_note']) ?></p>
        <dl class="payment-dl">
          <div><dt>ธนาคาร</dt><dd><?= e($bank['name']) ?> (<?= e($bank['short_name']) ?>)</dd></div>
          <div><dt>ชื่อบัญชี</dt><dd><?= e($bank['account_name']) ?></dd></div>
          <div><dt>เลขที่บัญชี</dt><dd><span id="bank-account-display"><?= e($bank['account_number']) ?></span></dd></div>
        </dl>
        <button type="button" class="btn-navy" id="copy-bank" data-account="<?= e($bank['account_number_raw']) ?>" data-analytics="copy_bank">คัดลอกเลขบัญชี</button>
        <p id="copy-bank-status" class="quote-status hidden" role="status"></p>
        <p class="fine-print">กรุณาตรวจสอบชื่อบัญชี “<?= e($bank['account_name']) ?>” ก่อนโอนเงินทุกครั้ง</p>
      </div>
    </details>
  </div>
</section>
