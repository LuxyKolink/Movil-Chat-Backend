CREATE TABLE users {
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    img VARCHAR(255)
    firstName VARCHAR(20),
    lastName VARCHAR(20),
    roles_user INT DEFAULT 2001,
    roles_editor INT,
    roles_admin INT,
    password VARCHAR(20) NOT NULL,
    jobTitle VARCHAR(50),
    refreshToken VARCHAR(50),
    fcmToken VARCHAR(50)
}

