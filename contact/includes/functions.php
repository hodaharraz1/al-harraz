<?php
/**
 * Al Harraz Contact — shared helper functions.
 * Included by index.php and vcard.php (after config.php).
 *
 * There is no admin panel — data.json is edited by hand (via the
 * hosting's File Manager or a fresh upload) rather than through a web
 * form, by design: the firm asked for the simplest possible setup, with
 * no login page at all.
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
 * Reads data.json with a shared (read) lock, in case it's ever mid-write
 * from a manual edit. Falls back to defaults if the file is missing or
 * unreadable, so the public page never fatals over a data problem.
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

/** Escapes a value for a vCard TEXT-type field (names, addresses, notes), per RFC 6350. */
function vcf_escape(string $value): string
{
    $value = str_replace('\\', '\\\\', $value);
    $value = str_replace(["\r\n", "\n", "\r"], '\\n', $value);
    $value = str_replace(',', '\\,', $value);
    $value = str_replace(';', '\\;', $value);
    return $value;
}

/**
 * Escapes a value for a vCard URI-type field (URL, item.URL). Unlike
 * vcf_escape(), commas and semicolons are valid, meaningful characters
 * inside a URL (query separators, etc.) and must NOT be backslash-escaped
 * there — a contact app reading URI values doesn't un-escape them, so
 * doing so would corrupt the link (e.g. break a Google Maps query URL
 * that contains a comma between latitude and longitude).
 */
function vcf_escape_uri(string $value): string
{
    return str_replace(["\r\n", "\n", "\r"], '', $value);
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
            $lines[] = $item . '.URL:' . vcf_escape_uri('https://wa.me/' . $waDigits);
            $lines[] = $item . '.X-ABLabel:WhatsApp';
        }
    }

    if ($data['email'] !== '' && valid_email($data['email'])) {
        $lines[] = 'EMAIL;TYPE=WORK:' . vcf_escape($data['email']);
    }

    if ($data['website'] !== '' && valid_url($data['website'])) {
        $lines[] = 'URL:' . vcf_escape_uri($data['website']);
    }

    $addressForCard = $nameAr !== '' ? $data['address_ar'] : $data['address_en'];
    if (trim((string) $addressForCard) !== '') {
        // ADR;TYPE=WORK:PO Box;Extended;Street;City;Region;PostalCode;Country
        // We only have one free-text address string, so it goes in the
        // "street" component — every reader still displays it correctly.
        $lines[] = 'ADR;TYPE=WORK:;;' . vcf_escape($addressForCard) . ';;;;';
    }

    $googleMaps = trim((string) ($data['google_maps'] ?? ''));
    if ($googleMaps !== '' && valid_url($googleMaps)) {
        // A second, separately-labeled link straight to the exact pin —
        // tapping the plain ADR address above only geocodes the free-text
        // string, which can miss the exact building. This is more precise.
        $item = 'item' . $itemIndex++;
        $lines[] = $item . '.URL:' . vcf_escape_uri($googleMaps);
        $lines[] = $item . '.X-ABLabel:الموقع على الخريطة';

        // If the link is our own plain coordinates-based Maps URL (the
        // common case before the firm's own Google Business Profile is
        // fully claimed — see LOCAL_SEO_PLAN.md on the main site), also
        // emit a GEO property so map apps that read it can pin the exact
        // spot directly, without geocoding anything.
        if (preg_match('/query=(-?\d+\.\d+),(-?\d+\.\d+)/', $googleMaps, $m)) {
            $lines[] = 'GEO:' . $m[1] . ';' . $m[2];
        }
    }

    $workingHours = trim((string) ($data['working_hours_ar'] ?? ''));
    if ($workingHours !== '') {
        $lines[] = 'NOTE:' . vcf_escape($workingHours);
    }

    $lines[] = 'END:VCARD';

    return implode("\r\n", $lines) . "\r\n";
}
