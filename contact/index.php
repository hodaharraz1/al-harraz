<?php

declare(strict_types=1);

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/includes/functions.php';

$data = load_data();

$lang = (isset($_GET['lang']) && $_GET['lang'] === 'en') ? 'en' : 'ar';
$isAr = $lang === 'ar';
$dir = $isAr ? 'rtl' : 'ltr';

$labels = [
    'ar' => [
        'save_contact' => 'حفظ جهة الاتصال',
        'call' => 'اتصال',
        'whatsapp' => 'واتساب',
        'open_location' => 'فتح الموقع على الخريطة',
        'website' => 'زيارة الموقع الإلكتروني',
        'email' => 'إرسال بريد إلكتروني',
        'address' => 'العنوان',
        'working_hours' => 'مواعيد العمل',
        'lang_toggle' => 'English',
        'lang_toggle_href' => '?lang=en',
    ],
    'en' => [
        'save_contact' => 'Save Contact',
        'call' => 'Call',
        'whatsapp' => 'WhatsApp',
        'open_location' => 'Open Location',
        'website' => 'Visit Website',
        'email' => 'Send Email',
        'address' => 'Address',
        'working_hours' => 'Working Hours',
        'lang_toggle' => 'العربية',
        'lang_toggle_href' => '?lang=ar',
    ],
][$lang];

$primaryName = $isAr ? $data['office_name_ar'] : $data['office_name_en'];
$secondaryName = $isAr ? $data['office_name_en'] : $data['office_name_ar'];
$address = $isAr ? $data['address_ar'] : $data['address_en'];
$workingHours = $isAr ? $data['working_hours_ar'] : $data['working_hours_en'];

$hasLogo = is_file(__DIR__ . '/assets/logo/logo.png');
?>
<!DOCTYPE html>
<html lang="<?= $lang ?>" dir="<?= $dir ?>">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title><?= e($primaryName) ?></title>
<meta name="description" content="<?= e($primaryName) ?> — <?= $isAr ? 'بيانات التواصل' : 'Contact information' ?>">
<meta name="robots" content="noindex, nofollow">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<main class="card">
    <a class="lang-toggle" href="<?= e($labels['lang_toggle_href']) ?>"><?= e($labels['lang_toggle']) ?></a>

    <?php if ($hasLogo): ?>
        <img class="logo" src="assets/logo/logo.png" alt="<?= e($primaryName) ?>" width="88" height="88">
    <?php endif; ?>

    <h1 class="office-name"><?= e($primaryName) ?></h1>
    <?php if ($secondaryName !== ''): ?>
        <p class="office-name-secondary"><?= e($secondaryName) ?></p>
    <?php endif; ?>

    <div class="actions">
        <a class="btn btn-primary" href="vcard.php">
            <?= e($labels['save_contact']) ?>
        </a>

        <?php foreach ($data['phones'] as $index => $phone): ?>
            <a class="btn btn-outline" href="tel:<?= e(phone_for_tel($phone)) ?>">
                <?= e($labels['call']) ?><?= count($data['phones']) > 1 ? ' (' . e($phone) . ')' : '' ?>
            </a>
        <?php endforeach; ?>

        <?php if ($data['whatsapp'] !== ''): ?>
            <a class="btn btn-outline" href="https://wa.me/<?= e(phone_for_whatsapp($data['whatsapp'])) ?>" target="_blank" rel="noopener noreferrer">
                <?= e($labels['whatsapp']) ?>
            </a>
        <?php endif; ?>

        <?php if ($data['google_maps'] !== '' && valid_url($data['google_maps'])): ?>
            <a class="btn btn-outline" href="<?= e($data['google_maps']) ?>" target="_blank" rel="noopener noreferrer">
                <?= e($labels['open_location']) ?>
            </a>
        <?php endif; ?>

        <?php if ($data['website'] !== '' && valid_url($data['website'])): ?>
            <a class="btn btn-outline" href="<?= e($data['website']) ?>" target="_blank" rel="noopener noreferrer">
                <?= e($labels['website']) ?>
            </a>
        <?php endif; ?>

        <?php if ($data['email'] !== '' && valid_email($data['email'])): ?>
            <a class="btn btn-outline" href="mailto:<?= e($data['email']) ?>">
                <?= e($labels['email']) ?>
            </a>
        <?php endif; ?>
    </div>

    <?php if ($address !== '' || $workingHours !== ''): ?>
        <div class="info">
            <?php if ($address !== ''): ?>
                <div class="info-row">
                    <span class="info-label"><?= e($labels['address']) ?></span>
                    <span class="info-value"><?= nl2br(e($address)) ?></span>
                </div>
            <?php endif; ?>
            <?php if ($workingHours !== ''): ?>
                <div class="info-row">
                    <span class="info-label"><?= e($labels['working_hours']) ?></span>
                    <span class="info-value"><?= nl2br(e($workingHours)) ?></span>
                </div>
            <?php endif; ?>
        </div>
    <?php endif; ?>
</main>
</body>
</html>
