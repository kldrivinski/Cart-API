create table shopping_cart(
	id serial primary key,
	product VARCHAR(40),
	price SMALLINT,
	quantity SMALLINT
);