-- =========================================================
-- Cinephilic Movie Ticketing System - MySQL Database Schema
-- Database Name: cinephilic_db
-- =========================================================

CREATE DATABASE IF NOT EXISTS `cinephilic_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `cinephilic_db`;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(20) DEFAULT 'user',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Movies Table (Catalog Storage)
CREATE TABLE IF NOT EXISTS `movies` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `tagline` VARCHAR(255),
  `genres` VARCHAR(200),
  `language` VARCHAR(50) DEFAULT 'English',
  `rating` DECIMAL(3,1) DEFAULT 8.0,
  `runtime` VARCHAR(50),
  `release_year` INT,
  `price` DECIMAL(8,2) DEFAULT 220.00,
  `status` ENUM('now_showing', 'coming_soon') DEFAULT 'now_showing',
  `overview` TEXT,
  `poster_url` VARCHAR(500),
  `backdrop_url` VARCHAR(500),
  `director` VARCHAR(100),
  `trailer_key` VARCHAR(100),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Bookings Table
CREATE TABLE IF NOT EXISTS `bookings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `booking_ref` VARCHAR(50) NOT NULL UNIQUE,
  `user_id` INT NULL,
  `user_email` VARCHAR(150),
  `movie_id` INT NULL,
  `movie_title` VARCHAR(200) NOT NULL,
  `theatre_name` VARCHAR(150) NOT NULL,
  `show_time` VARCHAR(50) NOT NULL,
  `show_date` VARCHAR(50) NOT NULL,
  `seats` VARCHAR(255) NOT NULL,
  `ticket_count` INT DEFAULT 1,
  `total_amount` DECIMAL(8,2) NOT NULL,
  `payment_method` VARCHAR(50) DEFAULT 'Card',
  `status` VARCHAR(50) DEFAULT 'Confirmed',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Initial Sample Users
-- Note: Default plain password for demo is 'password123'
INSERT INTO `users` (`name`, `email`, `password`, `role`) VALUES
('Akshat Sharma', 'akshat@example.com', '$2a$10$wN1F3gG/7R5RkYQd4T0x9.x15Ww420g3sPjH6U51zQpS8EwY2Oq12', 'user'),
('Admin User', 'admin@cinephilic.com', '$2a$10$wN1F3gG/7R5RkYQd4T0x9.x15Ww420g3sPjH6U51zQpS8EwY2Oq12', 'admin')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);
