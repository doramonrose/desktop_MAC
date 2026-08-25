<?php
declare(strict_types=1);
/** @var array $crumbs */
if (count($crumbs) < 2) {
    return;
}
?>
<nav class="breadcrumb" aria-label="เส้นทางหน้า">
  <ol>
    <?php foreach ($crumbs as $i => $crumb): ?>
      <li>
        <?php if ($i < count($crumbs) - 1): ?>
          <a href="<?= e($crumb['url']) ?>"><?= e($crumb['name']) ?></a>
        <?php else: ?>
          <span aria-current="page"><?= e($crumb['name']) ?></span>
        <?php endif; ?>
      </li>
    <?php endforeach; ?>
  </ol>
</nav>
