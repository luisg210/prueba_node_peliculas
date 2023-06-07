create database prueba_db;
use prueba_db;

create table movie (
	id int not null primary key auto_increment,
	title varchar(50) not null,
	description text,
	image text,
	stock int not null,
	rental_price decimal(10, 2) not null,
	sale_price decimal(10, 2) not null,
	is_available boolean not null default 1,
	likes int not null default 0
);
insert into movie(title, description, image, stock, rental_price, sale_price) values 
('Avengers: End Game', 'Movie Avenger: End Game. 2019 Movie', 'end_game.jpg', 200, 5.00, 6.00);
select * from movie;

create table user (
	id int not null primary key auto_increment,
	name varchar(50) not null,
	email varchar(150) not null unique,
	password text not null,
	role varchar(25) not null default 'user'
);
insert into user(name, email, password, rol) values ('Admin', 'admin@admin.com', '1234', 'admin'); 
select * from user;

create table likes (
	id int not null primary key auto_increment,
    email varchar(150) not null,
    id_movie int not null,
    constraint email_like foreign key(email) references user(email) on update cascade on delete cascade,
	constraint id_movie_like foreign key(id_movie) references movie(id) on update cascade on delete cascade
);
insert into likes(email, id_movie) values ('admin@admin.com', 1);
#delete from likes where id = 1;
select * from likes;

create table rent_movie (
	id int not null primary key auto_increment,
	return_movie varchar(100) not null,
	email varchar(150) not null,
	id_movie int not null,
	qty int not null,
	is_return boolean not null default 0, #false
	constraint email foreign key(email) references user(email) on update cascade on delete cascade,
	constraint id_movie_rent foreign key(id_movie) references movie(id) on update cascade on delete cascade
);
#insert into rent_movie(return_movie, email, id_movie, quantity) value ('10/06/2023', 'admin@admin.com', 1, 1);
select * from rent_movie;

create table sale_movie (
	id int not null primary key auto_increment,
	email varchar(150) not null,
	id_movie int not null,
	qty int not null,
	constraint email_sale foreign key(email) references user(email) on update cascade on delete cascade,
	constraint id_movie_sale foreign key(id_movie) references movie(id) on update cascade on delete cascade
);
select * from sale_movie;

/* TRIGGERS */
DELIMITER $$
CREATE TRIGGER add_likes_to_movie
AFTER INSERT ON likes
FOR EACH ROW
BEGIN
    UPDATE movie SET likes = likes + 1 WHERE id = NEW.id_movie;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER subtrac_likes_to_movie
AFTER DELETE ON likes
FOR EACH ROW
BEGIN
    UPDATE movie SET likes = likes - 1 WHERE id = OLD.id_movie;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER subtract_rent_movie_stock
AFTER INSERT ON rent_movie
FOR EACH ROW
BEGIN
    UPDATE movie SET stock = stock - NEW.qty WHERE id = NEW.id_movie;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER subtract_sale_movie_stock
AFTER INSERT ON sale_movie
FOR EACH ROW
BEGIN
    UPDATE movie SET stock = stock - NEW.qty WHERE id = NEW.id_movie;
END$$
DELIMITER ;
#drop trigger subtract_rent_movie_stock;
#drop trigger subtract_sale_movie_stock;
DELIMITER $$
CREATE TRIGGER add_rent_movie_stock
AFTER UPDATE ON rent_movie
FOR EACH ROW
BEGIN
    IF (OLD.is_return = 0) THEN
		IF (NEW.is_return = 1) THEN
			UPDATE movie SET stock = stock + OLD.qty WHERE id = NEW.id_movie;
		END IF;    
    END IF;    
END$$
DELIMITER ;
#drop trigger add_rent_movie_stock;