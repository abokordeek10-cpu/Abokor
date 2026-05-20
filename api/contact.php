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
$email     = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$phone     = sanitize($data['phone'] ?? '');
$subject   = sanitize($data['subject'] ?? '');
$message   = sanitize($data['message'] ?? '');
$privacy   = !empty($data['privacy']);

if (!$firstName || !$lastName || !$email || !$subject || !$message || !$privacy) {
    json_response(['error' => 'Pflichtfelder fehlen'], 422);
}
if (strlen($message) < 10) {
    json_response(['error' => 'Nachricht zu kurz'], 422);
}

try {
    $pdo = get_db();
    $stmt = $pdo->prepare(
        'INSERT INTO contact_requests (first_name, last_name, email, phone, subject, message, created_at)
         VALUES (?, ?, ?, ?, ?, ?, NOW())'
    );
    $stmt->execute([$firstName, $lastName, $email, $phone, $subject, $message]);

    $mailBody = "Neue Kontaktanfrage von der Website\n\n"
        . "Name: $firstName $lastName\n"
        . "E-Mail: $email\n"
        . ($phone ? "Telefon: $phone\n" : '')
        . "Betreff: $subject\n\n"
        . "Nachricht:\n$message\n\n"
        . "---\nGesendet am: " . date('d.m.Y H:i') . " Uhr";

    $headers  = "From: " . MAIL_FROM_NAME . " <" . MAIL_FROM . ">\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    mail(MAIL_TO, "Kontaktanfrage: $subject", $mailBody, $headers);

    json_response(['success' => true]);
} catch (PDOException $e) {
    error_log('Contact form DB error: ' . $e->getMessage());
    json_response(['error' => 'Datenbankfehler'], 500);
}
