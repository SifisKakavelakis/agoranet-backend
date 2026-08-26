-- AgoraNet Database Schema
-- Run this script to create the database and tables

CREATE DATABASE IF NOT EXISTS agoranet
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE agoranet;

-- Roles
CREATE TABLE IF NOT EXISTS `roles` (
    `id`         tinyint unsigned NOT NULL AUTO_INCREMENT,
    `name`       enum('guest','buyer','seller','admin') COLLATE utf8mb4_unicode_ci NOT NULL,
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Users
CREATE TABLE IF NOT EXISTS `users` (
    `id`           int unsigned NOT NULL AUTO_INCREMENT,
    `username`     varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
    `password`     varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
    `email`        varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
    `first_name`   varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
    `last_name`    varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
    `phone_number` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `is_active`    tinyint(1) NOT NULL DEFAULT '1',
    `avatar_url`   varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `created_at`   datetime DEFAULT CURRENT_TIMESTAMP,
    `updated_at`   datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `username` (`username`),
    UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- User Roles
CREATE TABLE IF NOT EXISTS `user_roles` (
    `user_id`    int unsigned NOT NULL,
    `role_id`    tinyint unsigned NOT NULL,
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`user_id`, `role_id`),
    KEY `fk_ur_role` (`role_id`),
    CONSTRAINT `fk_ur_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_ur_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Categories
CREATE TABLE IF NOT EXISTS `categories` (
    `id`         int unsigned NOT NULL AUTO_INCREMENT,
    `name`       varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Products
CREATE TABLE IF NOT EXISTS `products` (
    `id`          int unsigned NOT NULL AUTO_INCREMENT,
    `seller_id`   int unsigned NOT NULL,
    `category_id` int unsigned NOT NULL,
    `title`       varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `description` text COLLATE utf8mb4_unicode_ci,
    `price`       decimal(10,2) NOT NULL,
    `is_active`   tinyint(1) NOT NULL DEFAULT '1',
    `created_at`  datetime DEFAULT CURRENT_TIMESTAMP,
    `updated_at`  datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `fk_product_seller` (`seller_id`),
    KEY `fk_product_category` (`category_id`),
    CONSTRAINT `fk_product_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
    CONSTRAINT `fk_product_seller` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Product Images
CREATE TABLE IF NOT EXISTS `product_images` (
    `id`         int unsigned NOT NULL AUTO_INCREMENT,
    `product_id` int unsigned NOT NULL,
    `url`        varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
    `is_primary` tinyint(1) NOT NULL DEFAULT '0',
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `fk_image_product` (`product_id`),
    CONSTRAINT `fk_image_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Orders
CREATE TABLE IF NOT EXISTS `orders` (
    `id`          int unsigned NOT NULL AUTO_INCREMENT,
    `buyer_id`    int unsigned NOT NULL,
    `product_id`  int unsigned NOT NULL,
    `total_price` decimal(10,2) NOT NULL,
    `status`      enum('pending','confirmed','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
    `created_at`  datetime DEFAULT CURRENT_TIMESTAMP,
    `updated_at`  datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `fk_order_buyer` (`buyer_id`),
    KEY `fk_order_product` (`product_id`),
    CONSTRAINT `fk_order_buyer` FOREIGN KEY (`buyer_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT,
    CONSTRAINT `fk_order_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Reviews
CREATE TABLE IF NOT EXISTS `reviews` (
    `id`          int unsigned NOT NULL AUTO_INCREMENT,
    `reviewer_id` int unsigned NOT NULL,
    `seller_id`   int unsigned NOT NULL,
    `order_id`    int unsigned NOT NULL,
    `rating`      tinyint unsigned NOT NULL,
    `comment`     text COLLATE utf8mb4_unicode_ci,
    `created_at`  datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_review_order` (`order_id`),
    KEY `fk_review_reviewer` (`reviewer_id`),
    KEY `fk_review_seller` (`seller_id`),
    CONSTRAINT `fk_review_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_review_reviewer` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_review_seller` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `reviews_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Wishlist Items
CREATE TABLE IF NOT EXISTS `wishlist_items` (
    `id`         int unsigned NOT NULL AUTO_INCREMENT,
    `user_id`    int unsigned NOT NULL,
    `product_id` int unsigned NOT NULL,
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_wish_user_product` (`user_id`, `product_id`),
    KEY `fk_wish_product` (`product_id`),
    CONSTRAINT `fk_wish_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_wish_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Blacklisted Tokens
CREATE TABLE IF NOT EXISTS `blacklisted_tokens` (
    `id`         int unsigned NOT NULL AUTO_INCREMENT,
    `token`      text COLLATE utf8mb4_unicode_ci NOT NULL,
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
    `expires_at` datetime DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed Data
INSERT INTO `roles` (`name`) VALUES
    ('guest'),
    ('buyer'),
    ('seller'),
    ('admin');

INSERT INTO `categories` (`name`) VALUES
    ('Electronics'),
    ('Clothing'),
    ('Home & Garden'),
    ('Sports'),
    ('Books'),
    ('Toys'),
    ('Beauty'),
    ('Automotive');