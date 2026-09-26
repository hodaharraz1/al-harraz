<?php
/**
 * Al Harraz Contact — shared helper functions.
 * Included by index.php, admin.php and vcard.php (after config.php).
 */

declare(strict_types=1);

/** htmlspecialchars() shorthand for every place we print user-editable text. */
function e(?string $value): string
{
    return htmlspecialchars($value ?? '', ENT_QUOTES, 'UTF-8');
}

/**
 * The shape a fresh install (or a corrupted/missing data.json) falls back
 * to. Every field is an explicit empty placeholder — never invented data.
 */
function default_data(): array
{
    return [
        'office_name_ar' => 'مكتب آل حراز للمحاماة والاستشارات القانونية',
        'office_name_en' => 'Al Harraz Law Firm & Legal Consultancy',
        'phones' => [],
        'whatsapp' => '',
        'email' => '',
        'website' => '',
        'address_ar' => '',
        'address_en' => '',
        'google_maps' => '',
        'working_hours_ar' => '',
        'working_hours_en' => '',
    ];
}

/**
 * Reads data.json with a shared (read) lock so a concurrent admin save
 * can't be read mid-write. Falls back to defaults if the file is missing
 * or unreadable, so the public page never fatals over a data problem.
 */
function load_data(): array
{
    $defaults = default_data();

    if (!is_file(DATA_FILE)) {
        return $defaults;
    }

    $handle = fopen(DATA_FILE, 'rb');
    if ($handle === false) {
        return $defaults;
    }

    $raw = '';
    if (flock($handle, LOCK_SH)) {
        $raw = stream_get_contents($handle) ?: '';
        flock($handle, LOCK_UN);
    }
    fclose($handle);

    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        return $defaults;
    }

    // Merge over defaults so a partially-edited/older data.json never
    // causes an "undefined array key" — missing fields just stay empty.
    $data = array_merge($defaults, $decoded);
    if (!is_array($data['phones'] ?? null)) {
        $data['phones'] = [];
    }
    $data['phones'] = normalize_phones($data['phones']);

    return $data;
}

/**
 * Each phone is {label, number} — label is who answers that line (e.g.
 * "الأستاذ محمد"), shown next to the number on the public page and in the
 * vCard. Also accepts the older plain-string format (a phone with no
 * label) so a data.json saved before labels existed keeps working.
 */
function normalize_phones(array $phones): array
{
    $clean = [];
    foreach ($phones as $entry) {
        if (is_string($entry)) {
            $entry = ['label' => '', 'number' => $entry];
        }
        if (!is_array($entry)) {
            continue;
        }
        $number = trim((string) ($entry['number'] ?? ''));
        if ($number === '') {
            continue;
        }
        $label = trim((string) ($entry['label'] ?? ''));
        $clean[] = ['label' => $label, 'number' => $number];
    }
    return $clean;
}

/**
 * Writes data.json atomically: write to a temp file in the same directory,
 * then rename() over the real file. rename() is atomic on the same
 * filesystem, so readers never see a half-written file. An exclusive lock
 * on the real file additionally serializes concurrent admin saves.
 */
function save_data(array $data): bool
{
    $lockHandle = fopen(DATA_FILE, 'c+');
    if ($lockHandle === false) {
        return false;
    }

    if (!flock($lockHandle, LOCK_EX)) {
        fclose($lockHandle);
        return false;
    }

    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($json === false) {
        flock($lockHandle, LOCK_UN);
        fclose($lockHandle);
        return false;
    }

    $tmpPath = DATA_FILE . '.tmp-' . bin2hex(random_bytes(4));
    $written = file_put_contents($tmpPath, $json, LOCK_EX);
    if ($written === false) {
        flock($lockHandle, LOCK_UN);
        fclose($lockHandle);
        return false;
    }

    $ok = rename($tmpPath, DATA_FILE);

    flock($lockHandle, LOCK_UN);
    fclose($lockHandle);

    return $ok;
}

/** CSRF token bound to the current session, created once per session. */
function csrf_token(): string
{
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function csrf_field(): string
{
    return '<input type="hidden" name="csrf_token" value="' . e(csrf_token()) . '">';
}

/** Timing-safe comparison against the session's CSRF token. */
function csrf_valid(?string $submitted): bool
{
    if (!is_string($submitted) || empty($_SESSION['csrf_token'])) {
        return false;
    }
    return hash_equals($_SESSION['csrf_token'], $submitted);
}

function valid_url(string $url): bool
{
    if ($url === '') {
        return true; // empty is allowed — the field is simply omitted
    }
    if (filter_var($url, FILTER_VALIDATE_URL) === false) {
        return false;
    }
    $scheme = parse_url($url, PHP_URL_SCHEME);
    return in_array($scheme, ['http', 'https'], true);
}

function valid_email(string $email): bool
{
    if ($email === '') {
        return true;
    }
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/** Accepts digits, spaces, +, -, (, ) — rejects anything else (letters, tags, etc). */
function valid_phone(string $phone): bool
{
    if ($phone === '') {
        return false;
    }
    return (bool) preg_match('/^[+0-9\s\-()]{5,25}$/', $phone);
}

/** Digits only, with a leading + kept if present — for tel: links. */
function phone_for_tel(string $phone): string
{
    $stripped = preg_replace('/[^0-9+]/', '', $phone) ?? '';
    return $stripped;
}

/** Digits only, no +, no spaces — the format wa.me expects. */
function phone_for_whatsapp(string $phone): string
{
    return preg_replace('/[^0-9]/', '', $phone) ?? '';
}

/** Escapes a value for use inside a vCard (VCF) field, per RFC 6350. */
function vcf_escape(string $value): string
{
    $value = str_replace('\\', '\\\\', $value);
    $value = str_replace(["\r\n", "\n", "\r"], '\\n', $value);
    $value = str_replace(',', '\\,', $value);
    $value = str_replace(';', '\\;', $value);
    return $value;
}

/**
 * Builds a vCard 3.0 string from the office data — shared by vcard.php
 * (the "Save Contact" download) and the data-embedded QR code (which
 * encodes this same text directly, so it needs no hosting at all).
 * Only non-empty fields are included, matching data.json's contents.
 */
function build_vcard(array $data): string
{
    $nameAr = trim((string) $data['office_name_ar']);
    $nameEn = trim((string) $data['office_name_en']);
    $orgName = $nameAr !== '' ? $nameAr : ($nameEn !== '' ? $nameEn : 'Al Harraz Law Firm');

    $lines = [];
    $lines[] = 'BEGIN:VCARD';
    $lines[] = 'VERSION:3.0';
    // Organization-only card (not a person): empty N, FN/ORG carry the
    // office name, and X-ABSHOWAS:COMPANY tells Apple's Contacts app to
    // render it as a company rather than as a person named "Al Harraz".
    $lines[] = 'N:;;;;';
    $lines[] = 'FN:' . vcf_escape($orgName);
    $lines[] = 'ORG:' . vcf_escape($orgName);
    $lines[] = 'X-ABSHOWAS:COMPANY';

    // "itemN.X-ABLabel" is an Apple Contacts extension for attaching a
    // free-text label (a person's name here) to one TEL/URL line — readers
    // that don't understand it just show the plain TEL, so nothing is lost
    // on other apps. Each itemN index must be unique within the vCard.
    $itemIndex = 1;
    foreach ($data['phones'] as $phone) {
        $number = $phone['number'] ?? '';
        $label = trim((string) ($phone['label'] ?? ''));
        if ($label !== '') {
            $item = 'item' . $itemIndex++;
            $lines[] = $item . '.TEL;TYPE=WORK,VOICE:' . vcf_escape($number);
            $lines[] = $item . '.X-ABLabel:' . vcf_escape($label);
        } else {
            $lines[] = 'TEL;TYPE=WORK,VOICE:' . vcf_escape($number);
        }
    }

    if ($data['whatsapp'] !== '') {
        $lines[] = 'TEL;TYPE=CELL:' . vcf_escape($data['whatsapp']);
        $waDigits = phone_for_whatsapp($data['whatsapp']);
        if ($waDigits !== '') {
            $item = 'item' . $itemIndex++;
            $lines[] = $item . '.URL:' . vcf_escape('https://wa.me/' . $waDigits);
            $lines[] = $item . '.X-ABLabel:WhatsApp';
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

    $workingHours = trim((string) ($data['working_hours_ar'] ?? ''));
    if ($workingHours !== '') {
        $lines[] = 'NOTE:' . vcf_escape($workingHours);
    }

    $lines[] = 'END:VCARD';

    return implode("\r\n", $lines) . "\r\n";
}
