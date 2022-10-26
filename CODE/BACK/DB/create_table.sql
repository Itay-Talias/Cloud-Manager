CREATE DATABASE IF NOT EXISTS sql_users_cloud_manager;

USE sql_users_cloud_manager;

-- -----------------------------------------------------
-- Table `sql_users_cloud_manager`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS Users_info(
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    company VARCHAR(50) NOT NULL,
    PRIMARY KEY(username,password,company)
);

INSERT INTO Users_info
VALUES ("itayt", "$2b$12$ZCSmVqB4a20fhg9.DTJ45Om6.RRDXZbly3t90vCWCSyuFmzOOeDS.", "cyberark");
INSERT INTO Users_info
VALUES ("yagelp", "$2b$12$ZCSmVqB4a20fhg9.DTJ45Om6.RRDXZbly3t90vCWCSyuFmzOOeDS.", "cyberark");
INSERT INTO Users_info
VALUES ("dekell", "$2b$12$ZCSmVqB4a20fhg9.DTJ45Om6.RRDXZbly3t90vCWCSyuFmzOOeDS.", "cyberark");
