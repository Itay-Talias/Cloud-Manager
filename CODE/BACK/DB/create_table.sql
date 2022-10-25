CREATE DATABASE IF NOT EXISTS sql_users_cloud_manager;

USE sql_users_cloud_manager;

-- -----------------------------------------------------
-- Table `sql_users_cloud_manager`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS Users_info(
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    company VARCHAR(50) NOT NULL,
    primery_key(username,password,company)
);
