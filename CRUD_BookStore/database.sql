

CREATE DATABASE book_store
    DEFAULT CHARACTER SET = 'utf8mb4';
USE book_store;

CREATE TABLE IF NOT EXISTS books(
    id INT PRIMARY KEY NOT NULL,
    title VARCHAR(255),
    descr VARCHAR(2048),
    cover VARCHAR(2048)
);