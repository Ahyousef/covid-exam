DROP TABLE IF EXISTS countries;

CREATE TABLE IF NOT EXISTS countries(
    id SERIAL,
    countryname VARCHAR(255),
    cases INT,
    deaths INT,
    recovered INT,
    date DATE
);