<?php
/**
 * Al Harraz Contact — QR code generator.
 *
 * Regenerates assets/qr/qr.png from CONTACT_PAGE_URL (config.php). This is
 * the ONLY thing that ever needs to change the QR image — everyday edits
 * to phone numbers, hours, etc. happen in data.json via admin.php and
 * never touch the QR at all, so a printed/laminated QR code keeps working
 * forever.
 *
 * Run this once after you set the real CONTACT_PAGE_URL in config.php
 * (from admin.php's "Regenerate QR" button, or from the command line:
 * `php generate-qr.php`).
 */

declare(strict_types=1);

require_once __DIR__ . '/config.php';
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

// Allow running directly from the command line: `php generate-qr.php`.
if (PHP_SAPI === 'cli' && realpath($_SERVER['SCRIPT_FILENAME'] ?? '') === __FILE__) {
    $result = regenerate_qr_code();
    echo ($result['ok'] ? "[OK] " : "[FAILED] ") . $result['message'] . PHP_EOL;
    exit($result['ok'] ? 0 : 1);
}
