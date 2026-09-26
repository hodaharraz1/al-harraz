<?php
/**
 * Al Harraz Contact — configuration
 *
 * There is no admin panel and no password anywhere in this project, by
 * design: the office asked for the simplest possible setup — just a
 * public page with the office's contact data. To change that data
 * (phones, hours, address, etc.), edit data.json directly, either by
 * hand through the hosting's File Manager or by uploading a fresh copy.
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
// THE LIVE CONTACT PAGE URL — this is what the link-based QR code encodes
// ---------------------------------------------------------------------
// Set this to the REAL, FINAL address of this project once it's uploaded
// to its permanent home, then regenerate assets/qr/qr.png (see
// generate-qr.php). Until then it stays a placeholder.
const CONTACT_PAGE_URL = 'https://alharraz.infinityfreeapp.com/';

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

// Basic hardening headers for every request through this project.
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: strict-origin-when-cross-origin');
