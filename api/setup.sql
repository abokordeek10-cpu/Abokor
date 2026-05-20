-- Hausarztpraxis Dr. Brandelik – Datenbankschema
-- Ausführen in Hostinger MySQL (phpMyAdmin oder SSH)

CREATE DATABASE IF NOT EXISTS praxis_brandelik
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE praxis_brandelik;

CREATE TABLE IF NOT EXISTS contact_requests (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    first_name   VARCHAR(100) NOT NULL,
    last_name    VARCHAR(100) NOT NULL,
    email        VARCHAR(255) NOT NULL,
    phone        VARCHAR(50),
    subject      VARCHAR(200) NOT NULL,
    message      TEXT NOT NULL,
    status       ENUM('new','read','done') DEFAULT 'new',
    created_at   DATETIME NOT NULL,
    updated_at   DATETIME ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS appointments (
    id                INT AUTO_INCREMENT PRIMARY KEY,
    first_name        VARCHAR(100) NOT NULL,
    last_name         VARCHAR(100) NOT NULL,
    date_of_birth     DATE,
    phone             VARCHAR(50) NOT NULL,
    email             VARCHAR(255) NOT NULL,
    insurance         VARCHAR(200) NOT NULL,
    appointment_date  VARCHAR(20) NOT NULL,
    appointment_time  VARCHAR(10) NOT NULL,
    reason            VARCHAR(300) NOT NULL,
    notes             TEXT,
    status            ENUM('pending','confirmed','cancelled') DEFAULT 'pending',
    created_at        DATETIME NOT NULL,
    updated_at        DATETIME ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_date (appointment_date, appointment_time),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS anamnesis (
    id                 INT AUTO_INCREMENT PRIMARY KEY,
    first_name         VARCHAR(100) NOT NULL,
    last_name          VARCHAR(100) NOT NULL,
    date_of_birth      DATE NOT NULL,
    gender             VARCHAR(20),
    address            VARCHAR(300),
    phone              VARCHAR(50) NOT NULL,
    email              VARCHAR(255),
    insurance          VARCHAR(200) NOT NULL,
    emergency_contact  VARCHAR(200),
    conditions         TEXT,
    allergies          TEXT,
    medications        TEXT,
    surgeries          TEXT,
    family_history     TEXT,
    current_complaints TEXT NOT NULL,
    smoking            VARCHAR(50),
    alcohol            VARCHAR(50),
    created_at         DATETIME NOT NULL,
    INDEX idx_name (last_name, first_name),
    INDEX idx_dob (date_of_birth)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
