DROP TABLE IF EXISTS countries;

CREATE TABLE IF NOT EXISTS countries(
    id INT PRIMARY KEY NOT NULL SERIAL,
    countryname VARCHAR(255),
    cases INT,
    deaths INT,
    recovered INT,
    date DATE
);