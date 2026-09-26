<?php
/**
 * Al Harraz Contact — QR code generator.
 *
 * Regenerates assets/qr/qr.png from CONTACT_PAGE_URL (config.php). This is
 * the ONLY thing that ever needs to change that QR image — everyday edits
 * to phone numbers, hours, etc. happen directly in data.json and never
 * touch it at all, so a printed/laminated QR code keeps working forever.
 *
 * There's no admin panel, so this only runs from the command line:
 * `php generate-qr.php` (regenerates both QR images, matching the current
 * data.json and CONTACT_PAGE_URL). Run it locally and re-upload the
 * resulting assets/qr/*.png files whenever CONTACT_PAGE_URL changes, or
 * whenever data.json changes and the vCard QR should reflect it.
 */

declare(strict_types=1);

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/includes/functions.php';
require_once QR_LIB_DIR . 'qrlib.php';

/** @return array{ok: bool, message: string} */
function regenerate_qr_code(): array
{
    $targetDir = dirname(QR_OUTPUT_PATH);
    if (!is_dir($targetDir) && !mkdir($targetDir, 0755, true) && !is_dir($targetDir)) {
        return ['ok' => false, 'message' => 'تعذر إنشاء مجلد assets/qr — تأكد من صلاحيات الكتابة.'];
    }

    if (!is_writable($targetDir)) {
        return ['ok' => false, 'message' => 'مجلد assets/qr غير قابل للكتابة — راجع صلاحيات المجلد على الاستضافة.'];
    }

    if (CONTACT_PAGE_URL === 'https://yourdomain.com/contact/') {
        return [
            'ok' => false,
            'message' => 'لسه ماحددتش الدومين الحقيقي في config.php (CONTACT_PAGE_URL) — عدّله الأول قبل توليد الـQR.',
        ];
    }

    try {
        // Error-correction level M (15% recoverable) and a modest scale/
        // margin: printable at business-card size, still fully scannable.
        QRcode::png(CONTACT_PAGE_URL, QR_OUTPUT_PATH, QR_ECLEVEL_M, 8, 2);
    } catch (Throwable $e) {
        return ['ok' => false, 'message' => 'فشل توليد الـQR: ' . $e->getMessage()];
    }

    if (!is_file(QR_OUTPUT_PATH) || filesize(QR_OUTPUT_PATH) === 0) {
        return ['ok' => false, 'message' => 'فشل توليد ملف الـQR لسبب غير معروف.'];
    }

    return ['ok' => true, 'message' => 'تم توليد الـQR بنجاح لهذا الرابط: ' . CONTACT_PAGE_URL];
}

/**
 * Regenerates the second QR — the one with the office's vCard data
 * embedded directly (no hosting needed at all). Run this again any time
 * data.json changes and you want a fresh printed QR to match, though the
 * old one keeps working fine for whatever data it was made with.
 *
 * @return array{ok: bool, message: string}
 */
function regenerate_vcard_qr_code(): array
{
    $targetDir = dirname(QR_VCARD_OUTPUT_PATH);
    if (!is_dir($targetDir) && !mkdir($targetDir, 0755, true) && !is_dir($targetDir)) {
        return ['ok' => false, 'message' => 'تعذر إنشاء مجلد assets/qr — تأكد من صلاحيات الكتابة.'];
    }

    if (!is_writable($targetDir)) {
        return ['ok' => false, 'message' => 'مجلد assets/qr غير قابل للكتابة — راجع صلاحيات المجلد على الاستضافة.'];
    }

    $data = load_data();
    if (trim($data['office_name_ar']) === '' && trim($data['office_name_en']) === '') {
        return ['ok' => false, 'message' => 'محتاج اسم المكتب على الأقل قبل توليد الـQR — عدّله من فوق واحفظ الأول.'];
    }

    $vcard = build_vcard($data);

    try {
        QRcode::png($vcard, QR_VCARD_OUTPUT_PATH, QR_ECLEVEL_M, 6, 2);
    } catch (Throwable $e) {
        return ['ok' => false, 'message' => 'فشل توليد الـQR: ' . $e->getMessage()];
    }

    if (!is_file(QR_VCARD_OUTPUT_PATH) || filesize(QR_VCARD_OUTPUT_PATH) === 0) {
        return ['ok' => false, 'message' => 'فشل توليد ملف الـQR لسبب غير معروف.'];
    }

    return ['ok' => true, 'message' => 'تم توليد QR البيانات المباشرة بنجاح.'];
}

// Allow running directly from the command line: `php generate-qr.php`.
if (PHP_SAPI === 'cli' && realpath($_SERVER['SCRIPT_FILENAME'] ?? '') === __FILE__) {
    $linkResult = regenerate_qr_code();
    echo ($linkResult['ok'] ? "[OK] " : "[SKIPPED] ") . $linkResult['message'] . PHP_EOL;

    $vcardResult = regenerate_vcard_qr_code();
    echo ($vcardResult['ok'] ? "[OK] " : "[FAILED] ") . $vcardResult['message'] . PHP_EOL;

    exit($vcardResult['ok'] ? 0 : 1);
}
