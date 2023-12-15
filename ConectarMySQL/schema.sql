CREATE DATABASE sitemysql;
USE sitemysql;

CREATE TABLE notes (
    id integer PRIMARY KEY  AUTO_INCREMENT,
    title VARCHAR(250) NOT NULL,
    contents TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO notes (title, content) 
VALUES
('My First Note', 'A note about something'),
('Second note', 'A note about Oasis');