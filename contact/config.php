<?php
/**
 * Al Harraz Contact — configuration
 *
 * This is the ONE file you edit directly on the server for settings that
 * are not part of the office's public contact data (that data lives in
 * data.json and is edited from admin.php instead).
 */

declare(strict_types=1);

// Never show raw PHP errors/warnings to visitors — a stray notice printed
// before binary output would corrupt the vCard/QR downloads, and stack
// traces can leak server file paths. Real errors still go to the server's
// own PHP error log (a normal hosting-panel setting), just not to the page.
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');

// ---------------------------------------------------------------------
// 1) ADMIN PASSWORD
// ---------------------------------------------------------------------
// Change this to your own password hash before going live — see the
// "توليد كلمة مرور جديدة" instructions in README.md. This is a bcrypt
// hash (via PHP's own password_hash()), never the plain password itself,
// so nothing sensitive is exposed even if this file is ever misread.
//
// The placeholder below hashes the password: ChangeMe123!
// DO NOT deploy with the placeholder — generate your own (README.md
// explains the one-line command).
const ADMIN_PASSWORD_HASH = '$2y$12$jIRfn9hJbiDb9WLM4FTLkOKYuNJWsDMlcv5hUR8MtANF8YDsDlsDS';

// ---------------------------------------------------------------------
// 2) THE LIVE CONTACT PAGE URL — this is what the QR code encodes
// ---------------------------------------------------------------------
// Set this to the REAL, FINAL address of this /contact/ folder once it's
// uploaded to its permanent home, then regenerate the QR from admin.php.
// Until then it stays a placeholder and the QR (if generated) will point
// nowhere real yet.
const CONTACT_PAGE_URL = 'https://yourdomain.com/contact/';

// ---------------------------------------------------------------------
// Internal paths — no need to change these
// ---------------------------------------------------------------------
const DATA_FILE = __DIR__ . '/data.json';
const QR_LIB_DIR = __DIR__ . '/assets/lib/phpqrcode/';
const QR_OUTPUT_PATH = __DIR__ . '/assets/qr/qr.png';
const QR_OUTPUT_URL = 'assets/qr/qr.png';
// A second QR that embeds the office's vCard data directly — scans and
// offers "Add Contact" with no hosting/domain/internet connection needed
// at all, unlike QR_OUTPUT_PATH above which only works once this project
// is actually deployed somewhere.
const QR_VCARD_OUTPUT_PATH = __DIR__ . '/assets/qr/qr-vcard.png';
const QR_VCARD_OUTPUT_URL = 'assets/qr/qr-vcard.png';

// Idle session timeout for the admin panel (seconds). 30 minutes.
const ADMIN_SESSION_IDLE_TIMEOUT = 1800;

// ---------------------------------------------------------------------
// Session setup — shared by admin.php. Safe no-ops on index.php/vcard.php
// since they never call session_start().
// ---------------------------------------------------------------------
if (PHP_SESSION_NONE === session_status()) {
    ini_set('session.cookie_httponly', '1');
    ini_set('session.cookie_samesite', 'Lax');
    ini_set('session.use_strict_mode', '1');
    if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
        ini_set('session.cookie_secure', '1');
    }
}

// Basic hardening headers for every request through this project.
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: strict-origin-when-cross-origin');
