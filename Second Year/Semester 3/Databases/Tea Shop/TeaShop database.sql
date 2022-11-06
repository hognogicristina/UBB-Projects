create database TeaShop
go

use TeaShop -- be sure you use this database
go

create table TeaTypes(
	ttid int primary key IDENTITY,
	name varchar(50) NOT NULL
)

create table Teas (
tid int primary key identity,
name varchar(20) not null,
price int not null,
tid int foreign key references TeaTypes(tid)
)

create table Shops(
sid int primary key identity,
name varchar(20) not null,
city varchar(20) not null default 'Cluj-Napoca'
)

create table TeasShops (
tid int foreign key references Teas(tid),
sid int foreign key references Shops(sid),
constraint PK_TeaShops primary key(tid,sid)
)

create table Managers(
sid int foreign key references Shops(sid),
name varchar(20) not null,
salary int,
constraint PK_Managers primary key (sid)
)