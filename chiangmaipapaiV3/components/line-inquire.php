<?php
declare(strict_types=1);
/** @var bool $lineReady @var array $business @var string $linePosition */
if (empty($lineReady)) {
    return;
}
$linePosition = $linePosition ?? 'detail';
?>
<a class="btn-line" href="<?= e($business['line_url']) ?>" data-analytics="click_line" data-button-position="<?= e($linePosition) ?>" target="_blank" rel="noopener noreferrer">สอบถามผ่าน LINE</a>
