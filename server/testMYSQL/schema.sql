CREATE TABLE user (
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      isActivated BOOLEAN DEFAULT FALSE,
      activationLink VARCHAR(255),
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE tokens (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    refreshToken VARCHAR(255) NOT NULL,
    userId INT NOT NULL UNIQUE
);


INSERT INTO user (email, password) VALUES ('dimcheify@mail.ru', 'qwerty');