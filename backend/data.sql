CREATE DATABASE notetakingmeasuringapp;

CREATE TABLE sequences (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255),
  measured VARCHAR(300),
  last_updated VARCHAR(300)
);

CREATE TABLE users (
  user_login VARCHAR(255) PRIMARY KEY,
  hashed_password VARCHAR(255)
);

INSERT INTO sequences (id, title, measured, last_updated) VALUES('42', 'SpinEchoFieldMap-AP', '2023-02-19 19:24:07.621583+01', '2023-02-19 20:25:15.583809+01');