<?php

declare(strict_types=1);

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/includes/functions.php';

$vcard = build_vcard(load_data());

header('Content-Type: text/vcard; charset=utf-8');
header('Content-Disposition: attachment; filename="al-harraz-law-firm.vcf"');
header('Content-Length: ' . strlen($vcard));
header('Cache-Control: no-store');

echo $vcard;
