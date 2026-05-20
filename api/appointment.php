<?php
require_once __DIR__ . '/config.php';
set_cors_headers();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['error' => 'Method not allowed'], 405);
}

$data = get_json_input();

$firstName = sanitize($data['firstName'] ?? '');
$lastName  = sanitize($data['lastName'] ?? '');
$dob       = sanitize($data['dob'] ?? '');
$phone     = sanitize($data['phone'] ?? '');
$email     = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$insurance = sanitize($data['insurance'] ?? '');
$date      = sanitize($data['date'] ?? '');
$time      = sanitize($data['time'] ?? '');
$reason    = sanitize($data['reason'] ?? '');
$notes     = sanitize($data['notes'] ?? '');
$privacy   = !empty($data['privacy']);

if (!$firstName || !$lastName || !$phone || !$email || !$date || !$time || !$reason || !$insurance || !$privacy) {
    json_response(['error' => 'Pflichtfelder fehlen'], 422);
}

// Validate time slot
$validTimes = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','15:00','15:30','16:00','16:30','17:00','17:30'];
if (!in_array($time, $validTimes, true)) {
    json_response(['error' => 'Ungültige Uhrzeit'], 422);
}

try {
    $pdo = get_db();
    $stmt = $pdo->prepare(
        'INSERT INTO appointments (first_name, last_name, date_of_birth, phone, email, insurance, appointment_date, appointment_time, reason, notes, status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "pending", NOW())'
    );
    $stmt->execute([$firstName, $lastName, $dob, $phone, $email, $insurance, $date, $time, $reason, $notes]);

    $confirmBody = "Sehr geehrte/r $firstName $lastName,\n\n"
        . "Ihre Terminanfrage ist eingegangen. Wir bestätigen Ihren Termin innerhalb eines Werktages.\n\n"
        . "Ihr Wunschtermin: $date um $time Uhr\n"
        . "Anliegen: $reason\n\n"
        . "Bitte bringen Sie Ihre Krankenversicherungskarte mit.\n\n"
        . "Mit freundlichen Grüßen\nHausarztpraxis Dr. Brandelik\n"
        . "Tel: 01234 / 56789";

    $headers  = "From: " . MAIL_FROM_NAME . " <" . MAIL_FROM . ">\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    mail($email, 'Terminanfrage eingegangen – Hausarztpraxis Dr. Brandelik', $confirmBody, $headers);

    $praxisBody = "Neue Terminanfrage\n\n"
        . "Patient: $firstName $lastName\n"
        . "Geburtsdatum: $dob\n"
        . "Telefon: $phone\n"
        . "E-Mail: $email\n"
        . "Versicherung: $insurance\n"
        . "Wunschtermin: $date um $time Uhr\n"
        . "Anliegen: $reason\n"
        . ($notes ? "Hinweise: $notes\n" : '')
        . "\nGesendet am: " . date('d.m.Y H:i') . " Uhr";

    mail(MAIL_TO, "Neue Terminanfrage: $firstName $lastName", $praxisBody, $headers);

    json_response(['success' => true]);
} catch (PDOException $e) {
    error_log('Appointment DB error: ' . $e->getMessage());
    json_response(['error' => 'Datenbankfehler'], 500);
}
