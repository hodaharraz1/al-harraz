<?php

declare(strict_types=1);

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/generate-qr.php';

session_start();

const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_LOCKOUT_SECONDS = 300; // 5 minutes

function is_logged_in(): bool
{
    if (empty($_SESSION['admin_logged_in'])) {
        return false;
    }
    $lastActivity = $_SESSION['last_activity'] ?? 0;
    if (time() - $lastActivity > ADMIN_SESSION_IDLE_TIMEOUT) {
        session_unset();
        session_destroy();
        return false;
    }
    $_SESSION['last_activity'] = time();
    return true;
}

function is_locked_out(): bool
{
    $until = $_SESSION['login_locked_until'] ?? 0;
    return time() < $until;
}

function register_failed_login(): void
{
    $_SESSION['login_attempts'] = ($_SESSION['login_attempts'] ?? 0) + 1;
    if ($_SESSION['login_attempts'] >= MAX_LOGIN_ATTEMPTS) {
        $_SESSION['login_locked_until'] = time() + LOGIN_LOCKOUT_SECONDS;
        $_SESSION['login_attempts'] = 0;
    }
}

function reset_login_attempts(): void
{
    unset($_SESSION['login_attempts'], $_SESSION['login_locked_until']);
}

/** @return array{errors: array<string,string>, data: array} */
function validate_submission(array $post): array
{
    $errors = [];
    $data = default_data();

    $data['office_name_ar'] = trim(strip_tags((string) ($post['office_name_ar'] ?? '')));
    $data['office_name_en'] = trim(strip_tags((string) ($post['office_name_en'] ?? '')));
    $data['whatsapp'] = trim(strip_tags((string) ($post['whatsapp'] ?? '')));
    $data['email'] = trim(strip_tags((string) ($post['email'] ?? '')));
    $data['website'] = trim(strip_tags((string) ($post['website'] ?? '')));
    $data['address_ar'] = trim(strip_tags((string) ($post['address_ar'] ?? '')));
    $data['address_en'] = trim(strip_tags((string) ($post['address_en'] ?? '')));
    $data['google_maps'] = trim(strip_tags((string) ($post['google_maps'] ?? '')));
    $data['working_hours_ar'] = trim(strip_tags((string) ($post['working_hours_ar'] ?? '')));
    $data['working_hours_en'] = trim(strip_tags((string) ($post['working_hours_en'] ?? '')));

    if ($data['office_name_ar'] === '' && $data['office_name_en'] === '') {
        $errors['office_name'] = 'لازم اسم المكتب بالعربي أو بالإنجليزي على الأقل.';
    }

    $rawPhones = $post['phones'] ?? [];
    if (!is_array($rawPhones)) {
        $rawPhones = [];
    }
    $cleanPhones = [];
    foreach ($rawPhones as $rawPhone) {
        $phone = trim(strip_tags((string) $rawPhone));
        if ($phone === '') {
            continue;
        }
        if (!valid_phone($phone)) {
            $errors['phones'] = 'في رقم تليفون بصيغة غير صحيحة — استخدم أرقام ومسافات و+ فقط.';
            continue;
        }
        $cleanPhones[] = $phone;
    }
    $data['phones'] = $cleanPhones;

    if ($data['whatsapp'] !== '' && !valid_phone($data['whatsapp'])) {
        $errors['whatsapp'] = 'رقم الواتساب غير صحيح.';
    }

    if ($data['email'] !== '' && !valid_email($data['email'])) {
        $errors['email'] = 'البريد الإلكتروني غير صحيح.';
    }

    if ($data['website'] !== '' && !valid_url($data['website'])) {
        $errors['website'] = 'رابط الموقع الإلكتروني غير صحيح — لازم يبدأ بـ http:// أو https://';
    }

    if ($data['google_maps'] !== '' && !valid_url($data['google_maps'])) {
        $errors['google_maps'] = 'رابط Google Maps غير صحيح — لازم يبدأ بـ http:// أو https://';
    }

    return ['errors' => $errors, 'data' => $data];
}

$flash = null;
$formErrors = [];
$formData = null;

// -------------------------------------------------------------------
// POST actions
// -------------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    if ($action === 'login') {
        if (is_locked_out()) {
            $flash = ['type' => 'error', 'text' => 'محاولات كتير غلط — استنى كام دقيقة وجرب تاني.'];
        } elseif (!csrf_valid($_POST['csrf_token'] ?? null)) {
            $flash = ['type' => 'error', 'text' => 'الجلسة انتهت، حدّث الصفحة وجرب تاني.'];
        } else {
            $password = (string) ($_POST['password'] ?? '');
            if (password_verify($password, ADMIN_PASSWORD_HASH)) {
                session_regenerate_id(true);
                reset_login_attempts();
                $_SESSION['admin_logged_in'] = true;
                $_SESSION['last_activity'] = time();
                header('Location: admin.php');
                exit;
            }
            register_failed_login();
            $flash = ['type' => 'error', 'text' => 'كلمة المرور غلط.'];
        }
    } elseif ($action === 'logout') {
        session_unset();
        session_destroy();
        header('Location: admin.php');
        exit;
    } elseif ($action === 'save' && is_logged_in()) {
        if (!csrf_valid($_POST['csrf_token'] ?? null)) {
            $flash = ['type' => 'error', 'text' => 'الجلسة انتهت، حدّث الصفحة وجرب تاني.'];
        } else {
            $result = validate_submission($_POST);
            if (empty($result['errors'])) {
                if (save_data($result['data'])) {
                    $_SESSION['flash'] = ['type' => 'success', 'text' => 'تم حفظ البيانات بنجاح.'];
                    header('Location: admin.php');
                    exit;
                }
                $flash = ['type' => 'error', 'text' => 'فشل حفظ البيانات — تأكد إن ملف data.json قابل للكتابة على السيرفر.'];
                $formErrors = $result['errors'];
                $formData = $result['data'];
            } else {
                $flash = ['type' => 'error', 'text' => 'فيه أخطاء في البيانات، راجع الحقول تحت.'];
                $formErrors = $result['errors'];
                $formData = $result['data'];
            }
        }
    } elseif ($action === 'regenerate_qr' && is_logged_in()) {
        if (!csrf_valid($_POST['csrf_token'] ?? null)) {
            $flash = ['type' => 'error', 'text' => 'الجلسة انتهت، حدّث الصفحة وجرب تاني.'];
        } else {
            $result = regenerate_qr_code();
            $_SESSION['flash'] = ['type' => $result['ok'] ? 'success' : 'error', 'text' => $result['message']];
            header('Location: admin.php');
            exit;
        }
    }
}

if ($flash === null && !empty($_SESSION['flash'])) {
    $flash = $_SESSION['flash'];
    unset($_SESSION['flash']);
}

$loggedIn = is_logged_in();
$data = $formData ?? load_data();
$qrExists = is_file(QR_OUTPUT_PATH);
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>لوحة إدارة بيانات التواصل — آل حراز</title>
<meta name="robots" content="noindex, nofollow">
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<div class="admin-wrap">

    <?php if ($flash): ?>
        <div class="flash flash-<?= e($flash['type']) ?>"><?= e($flash['text']) ?></div>
    <?php endif; ?>

    <?php if (!$loggedIn): ?>

        <div class="admin-card">
            <h1 class="admin-title">تسجيل الدخول — لوحة إدارة آل حراز</h1>
            <form method="post" novalidate>
                <input type="hidden" name="action" value="login">
                <?= csrf_field() ?>
                <div class="field">
                    <label for="password">كلمة المرور</label>
                    <input type="password" id="password" name="password" required autofocus>
                </div>
                <button type="submit" class="admin-submit">دخول</button>
            </form>
        </div>

    <?php else: ?>

        <div class="logout-bar">
            <form method="post">
                <input type="hidden" name="action" value="logout">
                <button type="submit" class="logout-link" style="background:none;cursor:pointer;">تسجيل الخروج</button>
            </form>
        </div>

        <div class="admin-card">
            <h1 class="admin-title">بيانات المكتب</h1>
            <form method="post" novalidate>
                <input type="hidden" name="action" value="save">
                <?= csrf_field() ?>

                <div class="field">
                    <label for="office_name_ar">اسم المكتب بالعربي</label>
                    <input type="text" id="office_name_ar" name="office_name_ar" value="<?= e($data['office_name_ar']) ?>">
                    <?php if (!empty($formErrors['office_name'])): ?><div class="field-error"><?= e($formErrors['office_name']) ?></div><?php endif; ?>
                </div>

                <div class="field">
                    <label for="office_name_en">اسم المكتب بالإنجليزي</label>
                    <input type="text" id="office_name_en" name="office_name_en" value="<?= e($data['office_name_en']) ?>">
                </div>

                <div class="field">
                    <label>أرقام الهاتف</label>
                    <div id="phone-list">
                        <?php foreach ($data['phones'] as $phone): ?>
                            <div class="phone-row">
                                <input type="text" name="phones[]" value="<?= e($phone) ?>" maxlength="25">
                                <button type="button" class="phone-remove" aria-label="حذف الرقم" onclick="this.parentElement.remove()">&#10005;</button>
                            </div>
                        <?php endforeach; ?>
                    </div>
                    <button type="button" id="phone-add-btn" class="phone-add">+ إضافة رقم تليفون</button>
                    <?php if (!empty($formErrors['phones'])): ?><div class="field-error"><?= e($formErrors['phones']) ?></div><?php endif; ?>
                </div>

                <div class="field">
                    <label for="whatsapp">رقم الواتساب</label>
                    <input type="text" id="whatsapp" name="whatsapp" value="<?= e($data['whatsapp']) ?>" placeholder="+201xxxxxxxxx">
                    <?php if (!empty($formErrors['whatsapp'])): ?><div class="field-error"><?= e($formErrors['whatsapp']) ?></div><?php endif; ?>
                </div>

                <div class="field">
                    <label for="email">البريد الإلكتروني</label>
                    <input type="email" id="email" name="email" value="<?= e($data['email']) ?>">
                    <?php if (!empty($formErrors['email'])): ?><div class="field-error"><?= e($formErrors['email']) ?></div><?php endif; ?>
                </div>

                <div class="field">
                    <label for="website">الموقع الإلكتروني</label>
                    <input type="url" id="website" name="website" value="<?= e($data['website']) ?>" placeholder="https://...">
                    <?php if (!empty($formErrors['website'])): ?><div class="field-error"><?= e($formErrors['website']) ?></div><?php endif; ?>
                </div>

                <div class="field">
                    <label for="address_ar">العنوان بالعربي</label>
                    <textarea id="address_ar" name="address_ar"><?= e($data['address_ar']) ?></textarea>
                </div>

                <div class="field">
                    <label for="address_en">العنوان بالإنجليزي</label>
                    <textarea id="address_en" name="address_en"><?= e($data['address_en']) ?></textarea>
                </div>

                <div class="field">
                    <label for="google_maps">رابط Google Maps</label>
                    <input type="url" id="google_maps" name="google_maps" value="<?= e($data['google_maps']) ?>" placeholder="https://maps.google.com/...">
                    <?php if (!empty($formErrors['google_maps'])): ?><div class="field-error"><?= e($formErrors['google_maps']) ?></div><?php endif; ?>
                </div>

                <div class="field">
                    <label for="working_hours_ar">مواعيد العمل بالعربي</label>
                    <textarea id="working_hours_ar" name="working_hours_ar"><?= e($data['working_hours_ar']) ?></textarea>
                </div>

                <div class="field">
                    <label for="working_hours_en">مواعيد العمل بالإنجليزي</label>
                    <textarea id="working_hours_en" name="working_hours_en"><?= e($data['working_hours_en']) ?></textarea>
                </div>

                <button type="submit" class="admin-submit">حفظ التعديلات</button>
            </form>
        </div>

        <div class="admin-card qr-preview">
            <h1 class="admin-title">QR Code</h1>
            <?php if ($qrExists): ?>
                <img src="<?= e(QR_OUTPUT_URL) ?>?v=<?= filemtime(QR_OUTPUT_PATH) ?>" alt="QR Code" width="160" height="160">
            <?php else: ?>
                <p>لسه مفيش QR متولد.</p>
            <?php endif; ?>
            <p class="qr-url">الرابط المُشفّر داخل الـQR:<br><bdi dir="ltr"><?= e(CONTACT_PAGE_URL) ?></bdi></p>
            <form method="post">
                <input type="hidden" name="action" value="regenerate_qr">
                <?= csrf_field() ?>
                <button type="submit" class="qr-regen-btn">إعادة توليد QR</button>
            </form>
        </div>

    <?php endif; ?>

</div>
<script>
window.ADMIN_I18N = { phonePlaceholder: 'رقم التليفون', removePhone: 'حذف الرقم' };
</script>
<script src="assets/js/admin.js"></script>
</body>
</html>
