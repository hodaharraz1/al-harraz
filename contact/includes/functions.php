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
    // Keep only non-empty, string phone entries.
    $data['phones'] = array_values(array_filter(
        array_map(static fn ($p) => is_string($p) ? trim($p) : '', $data['phones']),
        static fn (string $p) => $p !== ''
    ));

    return $data;
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
