CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(450) NOT NULL,
  department_name VARCHAR(45),
  price DECIMAL(10,2) NULL,
  stock_quantity INT DEFAULT 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Genuine Leather Waiter Organizer-black", "Handmade", 26.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Oracle Database 11g SQL", "Books", 16.49, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Perry Ellis Portfolio Men's Two Button Slim Fit Solid Suit", "Clothing", 118.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Buttoned Down Men's Non-Iron Slim Fit Spread-Collar Pattern Dress Shirt", "Clothing", 49.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ben Sherman Men's Two Button Paisley Cotton Blazer", "Clothing", 101.49, 11);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Stacy Adams Men's Fairchild-Bike Toe Slip-On Loafer", "Shoes", 42.77, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Stacy Adams Men's Dickinson Cap-Toe Oxford", "Shoes", 66.49, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pulsar Women's Quartz Stainless Steel Casual Watch", "Watches", 84.51, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("DKNY Women's 'Minetta' Quartz and Stainless-Steel-Plated ", "Watches", 155.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Daya by Zendaya Women's Starke Gladiator Sandal", "Shoes", 99.95, 3);