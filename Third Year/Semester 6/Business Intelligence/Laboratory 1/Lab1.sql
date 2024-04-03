-- Creating the Organizations table
CREATE TABLE Organizations (
    id INT PRIMARY KEY IDENTITY,
    organization_code VARCHAR(10) NOT NULL,
    organization_name VARCHAR(255) NOT NULL,
    headquarter_city VARCHAR(255),
    founded_date DATE
);

-- Creating the Countries table
CREATE TABLE Countries (
    id INT PRIMARY KEY IDENTITY,
    country_name VARCHAR(255) NOT NULL,
    country_code CHAR(3) NOT NULL,
    capital VARCHAR(255),
    area FLOAT,
    population BIGINT,
    continent VARCHAR(255)
);

-- Creating the CountryOrganization table to link countries and organizations
CREATE TABLE CountryOrganization (
    id INT PRIMARY KEY IDENTITY,
    country_id INT,
    organization_id INT,
    FOREIGN KEY (country_id) REFERENCES Countries(id),
    FOREIGN KEY (organization_id) REFERENCES Organizations(id)
);

-- Inserting some sample data into the Organizations table
INSERT INTO Organizations (organization_code, organization_name, headquarter_city, founded_date)
VALUES 
('NATO', 'North Atlantic Treaty Organization', 'Brussels', '1949-04-04'),
('UN', 'United Nations', 'New York', '1945-10-24');

-- Inserting some sample data into the Countries table
INSERT INTO Countries (country_name, country_code, capital, area, population, continent)
VALUES 
('United States', 'USA', 'Washington D.C.', 9833517, 331002651, 'North America'),
('Belgium', 'BEL', 'Brussels', 30528, 11589623, 'Europe'),
('Canada', 'CAN', 'Ottawa', 9984670, 37742154, 'North America');

-- Inserting data into the CountryOrganization table
INSERT INTO CountryOrganization (country_id, organization_id)
VALUES 
(1, 1), -- USA is a member of NATO
(1, 2), -- USA is a member of the UN
(2, 1), -- Belgium is a member of NATO
(3, 1); -- Canada is a member of NATO

-- List all the countries which are members of NATO.
SELECT c.country_name
FROM Countries c
JOIN CountryOrganization co ON c.id = co.country_id
JOIN Organizations o ON co.organization_id = o.id
WHERE o.organization_code = 'NATO';

-- List all the countries which are members of organizations founded before 1980.
SELECT DISTINCT c.country_name
FROM Countries c
JOIN CountryOrganization co ON c.id = co.country_id
JOIN Organizations o ON co.organization_id = o.id
WHERE o.founded_date < '1980-01-01';

-- List all the countries which are members of only one organization.
SELECT c.country_name
FROM Countries c
JOIN CountryOrganization co ON c.id = co.country_id
GROUP BY c.country_name
HAVING COUNT(co.organization_id) = 1;

-- List all the capitals which are the headquarters of no organization.
SELECT c.capital
FROM Countries c
WHERE c.capital NOT IN (SELECT o.headquarter_city FROM Organizations o);

-- List the population of each continent.
SELECT continent, SUM(population) AS population
FROM Countries
GROUP BY continent;

-- Count the countries of each continent.
SELECT continent, COUNT(*) AS country_count
FROM Countries
GROUP BY continent;
These SQL commands and queries should help you set up the database and extract the required information.