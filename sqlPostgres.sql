create database prueba_db;
use prueba_db;

create table movie (
	id serial primary key,
	title varchar(50) not null,
	description text,
	image text,
	stock int not NULL,
	rental_price decimal(10, 2) not null,
	sale_price decimal(10, 2) not null,
	is_available boolean not null default true,
	likes int not null default 0
);
insert into movie(title, description, image, stock, rental_price, sale_price) values 
('Avengers: End Game', 'Movie Avenger: End Game. 2019 Movie', 200, 5.00, 6.00);
select * from movie;

create TABLE "user" (
	id serial primary KEY,
	name varchar(50) not null,
	email varchar(150) not NULL unique,
	password text not null,
	role varchar(25) not null DEFAULT 'user'
);
insert INTO "user"(name, email, password, ROLE) values ('Admin', 'admin@admin.com', '$2a$10$RRWFeERYm.swuU8ZY7JUu.0cFeZVUjNq.APkLs7jQEnIikil16O4.', 'admin'); 
SELECT * FROM "user";

create table likes (
	id serial primary key,
    email varchar(150) not null,
    id_movie int not null,
    constraint email_like foreign key(email) REFERENCES "user"(email) on update cascade on delete cascade,
	constraint id_movie_like foreign key(id_movie) references movie(id) on update cascade on delete cascade
);
insert into likes(email, id_movie) values ('admin@admin.com', 1);
select * from likes;

create table rent_movie (
	id serial primary key,
	return_movie varchar(100) not null,
	email varchar(150) not null,
	id_movie int not null,
	qty int not null,
	is_return boolean not null default FALSE, 
	constraint email foreign key(email) REFERENCES "user"(email) on update cascade on delete cascade,
	constraint id_movie_rent foreign key(id_movie) references movie(id) on update cascade on delete cascade
);
/*insert into rent_movie(return_movie, email, id_movie, quantity) value ('10/06/2023', 'admin@admin.com', 1, 1);*/
select * from rent_movie;

create table sale_movie (
	id serial primary key,
	email varchar(150) not null,
	id_movie int not null,
	qty int not null,
	constraint email_sale foreign key(email) REFERENCES "user"(email) on update cascade on delete cascade,
	constraint id_movie_sale foreign key(id_movie) references movie(id) on update cascade on delete cascade
);
select * from sale_movie;

/* TRIGGERS */
CREATE OR REPLACE FUNCTION add_likes_to_movie()
RETURNS TRIGGER AS '
BEGIN
    UPDATE movie SET likes = likes + 1 WHERE id = NEW.id_movie;
    RETURN NEW;
END;
' LANGUAGE plpgsql;

CREATE TRIGGER add_likes_to_movie
AFTER INSERT ON likes
FOR EACH ROW
EXECUTE FUNCTION add_likes_to_movie();

CREATE OR REPLACE FUNCTION subtract_likes_from_movie()
RETURNS TRIGGER AS '
BEGIN
    UPDATE movie SET likes = likes - 1 WHERE id = OLD.id_movie;
    RETURN OLD;
END;
' LANGUAGE plpgsql;

CREATE TRIGGER subtract_likes_from_movie
AFTER DELETE ON likes
FOR EACH ROW
EXECUTE FUNCTION subtract_likes_from_movie();

CREATE OR REPLACE FUNCTION subtract_rent_movie_stock()
RETURNS TRIGGER AS '
BEGIN
    UPDATE movie SET stock = stock - NEW.qty WHERE id = NEW.id_movie;
    RETURN NEW;
END;
' LANGUAGE plpgsql;

CREATE TRIGGER subtract_rent_movie_stock
AFTER INSERT ON rent_movie
FOR EACH ROW
EXECUTE FUNCTION subtract_rent_movie_stock();

CREATE OR REPLACE FUNCTION subtract_sale_movie_stock()
RETURNS TRIGGER AS '
BEGIN
    UPDATE movie SET stock = stock - NEW.qty WHERE id = NEW.id_movie;
    RETURN NEW;
END;
' LANGUAGE plpgsql;

CREATE TRIGGER subtract_sale_movie_stock
AFTER INSERT ON sale_movie
FOR EACH ROW
EXECUTE FUNCTION subtract_sale_movie_stock();

CREATE OR REPLACE FUNCTION add_rent_movie_stock()
RETURNS TRIGGER AS '
BEGIN
    IF (OLD.is_return = false) THEN
		IF (NEW.is_return = TRUE) THEN
			UPDATE movie SET stock = stock + OLD.qty WHERE id = NEW.id_movie;
		END IF;    
    END IF;
    RETURN NEW;
END;
' LANGUAGE plpgsql;

CREATE TRIGGER add_rent_movie_stock
AFTER UPDATE ON rent_movie
FOR EACH ROW
EXECUTE FUNCTION add_rent_movie_stock();
