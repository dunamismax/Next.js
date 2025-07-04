-- This schema is for the test database.
-- It's identical to the main schema, but for a separate database.

CREATE DATABASE IF NOT EXISTS dunamismax_test;

USE dunamismax_test;

-- Users table for admin authentication
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Posts table with status, slug, and Markdown content support
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content MEDIUMTEXT NOT NULL,
  status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FULLTEXT(title, content)
);

-- Projects table with status, slug, and Markdown description support
CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description MEDIUMTEXT NOT NULL,
  image_url VARCHAR(255),
  project_url VARCHAR(255),
  status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FULLTEXT(title, description)
);

-- Garden Notes table with slug for linking
CREATE TABLE garden_notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FULLTEXT(title, content)
);

-- Table to store the relationships for bi-directional linking
CREATE TABLE content_links (
  id INT AUTO_INCREMENT PRIMARY KEY,
  source_id INT NOT NULL,
  source_type ENUM('post', 'project', 'garden_note') NOT NULL,
  target_slug VARCHAR(255) NOT NULL,
  INDEX (source_id, source_type),
  INDEX (target_slug)
);

-- Comments table for blog posts
CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  parent_id INT,
  author_name VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
);
