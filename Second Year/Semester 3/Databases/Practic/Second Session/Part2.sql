USE master 
GO
ALTER DATABASE PracticPart2
SET single_user WITH ROLLBACK IMMEDIATE
DROP DATABASE PracticPart2

CREATE DATABASE PracticPart2

GO
USE PracticPart2
GO

-- SUBJECT II
-- Exercise 1
CREATE TABLE RideCategories (
	idcat INT PRIMARY KEY IDENTITY,
	namecat VARCHAR(100),
	descr VARCHAR(100)
);

CREATE TABLE Rides (
	idride INT PRIMARY KEY IDENTITY,
	nameride VARCHAR(100),
	price VARCHAR(100),
	idcat INT FOREIGN KEY REFERENCES RideCategories(idcat)
);
CREATE TABLE Guests (
	idguest INT PRIMARY KEY IDENTITY,
	nameguest VARCHAR(100),
	satislevel VARCHAR(100)
);

CREATE TABLE RideGuests (
	idride INT FOREIGN KEY REFERENCES Rides(idride),
	idguest INT FOREIGN KEY REFERENCES Guests(idguest),
	dateride DATETIME,
	rating INT
);

CREATE TABLE Mechanics (
	idmec INT PRIMARY KEY IDENTITY,
	namemec VARCHAR(100),
	salary INT,
	dob DATETIME
);

CREATE TABLE Repairs (
	idbroken INT PRIMARY KEY IDENTITY,
	idride INT FOREIGN KEY REFERENCES Rides(idride)
);

CREATE TABLE BrokenRides (
	idbroken INT FOREIGN KEY REFERENCES Repairs(idbroken),
	idmec INT FOREIGN KEY REFERENCES Mechanics(idmec),
	datebroken DATETIME,
	CONSTRAINT PK_BrokenRides PRIMARY KEY (idbroken, idmec)
);

-- Exercise 2
GO 
CREATE OR ALTER PROCEDURE addMinutes (@M VARCHAR(100), @R VARCHAR(100), @T INT)
AS
BEGIN
	DECLARE @repairLog1 INT
    SET @repairLog1 = (SELECT BR.idmec 
					   FROM BrokenRides BR 
					   JOIN Mechanics M ON BR.idmec = M.idmec 
					   WHERE M.namemec = @M)
	
	DECLARE @repairLog2 INT
	SET @repairLog2 = (SELECT BR.idbroken 
					   FROM BrokenRides BR 
					   JOIN Repairs R ON BR.idbroken = R.idbroken
					   JOIN Rides RR ON R.idride = RR.idride
					   WHERE RR.nameride = @R)

    IF @repairLog1 IS NULL AND @repairLog2 IS NULL
    BEGIN
        RAISERROR ('The repair log does not exist!', 10, 1)
		RETURN
    END
    ELSE
    BEGIN
        UPDATE BrokenRides
		SET datebroken = DATEADD(MINUTE, @T, datebroken)
		WHERE idmec = @repairLog1 AND idbroken = @repairLog2
    END
END
GO

-- Exercise 3
GO
CREATE OR ALTER VIEW viewMechanics
AS
	SELECT m.namemec
	FROM Mechanics m 
	JOIN BrokenRides br ON m.idmec = br.idmec
	JOIN Repairs r ON br.idbroken = r.idbroken
	JOIN Rides rr ON r.idride = rr.idride
	JOIN RideGuests rg ON rr.idride = rg.idride
	GROUP BY m.namemec
	HAVING COUNT(DISTINCT r.idbroken) >= 10 AND AVG(DISTINCT rg.rating) > 4
GO

-- Exercise 4
GO
CREATE OR ALTER FUNCTION listGuests (@L INT) RETURNS TABLE
AS 
RETURN 
	SELECT g.nameguest
	FROM Guests g 
	INNER JOIN RideGuests rg ON g.idguest = rg.idguest
	INNER JOIN Rides r ON rg.idride = r.idride
	GROUP BY g.nameguest
	HAVING SUM(r.idride) >= @L
GO