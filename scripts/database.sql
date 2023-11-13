CREATE DATABASE firstapi;

\c Chat;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    img VARCHAR(255),
    firstName VARCHAR(20),
    lastName VARCHAR(20),
    roles_user INT DEFAULT 2001,
    roles_editor INT,
    roles_admin INT,
    password VARCHAR(20) NOT NULL,
    jobTitle VARCHAR(50),
    refreshToken VARCHAR(50),
    fcmToken VARCHAR(50)
);


INSERT INTO users (
    email, 
    img, 
    firstName, 
    lastName, 
    roles_user, 
    roles_editor, 
    roles_admin, 
    password, 
    jobTitle, 
    refreshToken, 
    fcmToken
) VALUES 
('joe@ibm.com', NULL, 'Joe', NULL, 2001, NULL, NULL, 'hashed_password', 'Developer', 'refresh_token_1', 'fcm_token_1'),
('ryan@faztweb.com', NULL, 'Ryan', NULL, 2001, NULL, NULL, 'hashed_password', 'Web Developer', 'refresh_token_2', 'fcm_token_2');

SELECT * FROM users;


