<?php

declare(strict_types=1);

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/includes/functions.php';

$data = load_data();

$nameAr = trim($data['office_name_ar']);
$nameEn = trim($data['office_name_en']);
$orgName = $nameAr !== '' ? $nameAr : ($nameEn !== '' ? $nameEn : 'Al Harraz Law Firm');

$lines = [];
$lines[] = 'BEGIN:VCARD';
$lines[] = 'VERSION:3.0';
// Organization-only card (not a person): empty N, FN/ORG carry the office
// name, and X-ABSHOWAS:COMPANY tells Apple's Contacts app to render it as
// a company rather than as "Al Harraz" first name / blank last name.
$lines[] = 'N:;;;;';
$lines[] = 'FN:' . vcf_escape($orgName);
$lines[] = 'ORG:' . vcf_escape($orgName);
$lines[] = 'X-ABSHOWAS:COMPANY';

foreach ($data['phones'] as $phone) {
    $lines[] = 'TEL;TYPE=WORK,VOICE:' . vcf_escape($phone);
}

if ($data['whatsapp'] !== '') {
    $lines[] = 'TEL;TYPE=CELL:' . vcf_escape($data['whatsapp']);
    $waDigits = phone_for_whatsapp($data['whatsapp']);
    if ($waDigits !== '') {
        $lines[] = 'item1.URL:' . vcf_escape('https://wa.me/' . $waDigits);
        $lines[] = 'item1.X-ABLabel:WhatsApp';
    }
}

if ($data['email'] !== '' && valid_email($data['email'])) {
    $lines[] = 'EMAIL;TYPE=WORK:' . vcf_escape($data['email']);
}

if ($data['website'] !== '' && valid_url($data['website'])) {
    $lines[] = 'URL:' . vcf_escape($data['website']);
}

$addressForCard = $nameAr !== '' ? $data['address_ar'] : $data['address_en'];
if (trim((string) $addressForCard) !== '') {
    // ADR;TYPE=WORK:PO Box;Extended;Street;City;Region;PostalCode;Country
    // We only have one free-text address string, so it goes in the
    // "street" component — every reader still displays it correctly.
    $lines[] = 'ADR;TYPE=WORK:;;' . vcf_escape($addressForCard) . ';;;;';
}

$lines[] = 'END:VCARD';

$vcard = implode("\r\n", $lines) . "\r\n";

$filenameSafe = 'al-harraz-law-firm';

header('Content-Type: text/vcard; charset=utf-8');
header('Content-Disposition: attachment; filename="' . $filenameSafe . '.vcf"');
header('Content-Length: ' . strlen($vcard));
header('Cache-Control: no-store');

echo $vcard;
