TRUNCATE TABLE owners;
TRUNCATE TABLE cats;
TRUNCATE TABLE foods;
TRUNCATE TABLE foods_for_cats;

LOAD DATA INFILE 'D:/Fukulta/Collage/Courses/Second Year/Semester 4/Systems for Design and Implementation/Laboratories/Laboratory 5/records/owners_data.csv'
INTO TABLE owners
FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\r\n' IGNORE 1 ROWS;

LOAD DATA INFILE 'D:/Fukulta/Collage/Courses/Second Year/Semester 4/Systems for Design and Implementation/Laboratories/Laboratory 5/records/cats_data.csv'
INTO TABLE cats
FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\r\n' IGNORE 1 ROWS;

LOAD DATA INFILE 'D:/Fukulta/Collage/Courses/Second Year/Semester 4/Systems for Design and Implementation/Laboratories/Laboratory 5/records/foods_data.csv'
INTO TABLE foods
FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\r\n' IGNORE 1 ROWS;

LOAD DATA INFILE 'D:/Fukulta/Collage/Courses/Second Year/Semester 4/Systems for Design and Implementation/Laboratories/Laboratory 5/records/foods_for_cats_data.csv'
INTO TABLE foods_for_cats
FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\r\n' IGNORE 1 ROWS;


SELECT COUNT(*) AS 'Owners' FROM owners;
SELECT COUNT(*) AS 'Cats' FROM cats;
SELECT COUNT(*) AS 'Foods' FROM foods;
SELECT COUNT(*) AS 'Foods for Cats' FROM foods_for_cats;
