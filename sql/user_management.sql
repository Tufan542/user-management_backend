CREATE TABLE Users (
  id uuid DEFAULT uuid_generate_v4(),
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  isBlocked BOOLEAN DEFAULT FALSE,
  isDeleted BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP NOT NULL DEFAULT now()
);


INSERT INTO users (username, email, password) VALUES('Sagar Bera','sagar@gmail.com','sag123');
INSERT INTO users (username, email, password) VALUES('Abhinandan Maity','abhi@gmail.com','abhi123');