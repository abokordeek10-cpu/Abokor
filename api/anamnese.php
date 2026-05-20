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

$firstName       = sanitize($data['firstName'] ?? '');
$lastName        = sanitize($data['lastName'] ?? '');
$dob             = sanitize($data['dob'] ?? '');
$phone           = sanitize($data['phone'] ?? '');
$insurance       = sanitize($data['insurance'] ?? '');
$currentComplaints = sanitize($data['currentComplaints'] ?? '');
$privacy         = !empty($data['privacy']);

if (!$firstName || !$lastName || !$dob || !$phone || !$insurance || !$currentComplaints || !$privacy) {
    json_response(['error' => 'Pflichtfelder fehlen'], 422);
}

$conditions    = implode(', ', array_map('sanitize', (array)($data['conditions'] ?? [])));
$allergies     = implode(', ', array_map('sanitize', (array)($data['allergies'] ?? [])));
$medications   = sanitize($data['medications'] ?? '');
$surgeries     = sanitize($data['surgeries'] ?? '');
$familyHistory = sanitize($data['familyHistory'] ?? '');
$smoking       = sanitize($data['smoking'] ?? '');
$alcohol       = sanitize($data['alcohol'] ?? '');
$gender        = sanitize($data['gender'] ?? '');
$address       = sanitize($data['address'] ?? '');
$email         = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL) ?: '';
$emergencyContact = sanitize($data['emergencyContact'] ?? '');

try {
    $pdo = get_db();
    $stmt = $pdo->prepare(
        'INSERT INTO anamnesis (first_name, last_name, date_of_birth, gender, address, phone, email,
         insurance, emergency_contact, conditions, allergies, medications, surgeries, family_history,
         current_complaints, smoking, alcohol, created_at)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW())'
    );
    $stmt->execute([
        $firstName, $lastName, $dob, $gender, $address, $phone, $email,
        $insurance, $emergencyContact, $conditions, $allergies, $medications,
        $surgeries, $familyHistory, $currentComplaints, $smoking, $alcohol
    ]);

    $praxisBody = "Neuer Anamnesebogen eingegangen\n\n"
        . "Patient: $firstName $lastName (geb. $dob)\n"
        . "Telefon: $phone | E-Mail: $email\n"
        . "Versicherung: $insurance\n"
        . "Aktuelles Anliegen: $currentComplaints\n\n"
        . ($conditions ? "Vorerkrankungen: $conditions\n" : '')
        . ($allergies ? "Allergien: $allergies\n" : '')
        . ($medications ? "Medikamente: $medications\n" : '')
        . "\nGesendet am: " . date('d.m.Y H:i') . " Uhr";

    $headers = "From: " . MAIL_FROM_NAME . " <" . MAIL_FROM . ">\r\nContent-Type: text/plain; charset=UTF-8\r\n";
    mail(MAIL_TO, "Anamnesebogen: $firstName $lastName", $praxisBody, $headers);

    json_response(['success' => true]);
} catch (PDOException $e) {
    error_log('Anamnese DB error: ' . $e->getMessage());
    json_response(['error' => 'Datenbankfehler'], 500);
}
