DROP DATABASE IF EXISTS bamazon_db

CREATE DATABASE bamazon_db

USE bamazon_db

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price DECIMAL(10,2) NULL,
    stock_quantity INT(200),
    PRIMARY KEY (id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bracelet", "jewlery", 38.99, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Echo", "electronics", 99.99, 129);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("earrings", "jewlery", 25.00, 65);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("basketball", "sports", 19.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("collar", "pets", 12.58, 28);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("baseball", "sports", 26.00, 48);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("t-shirt",  "clothing", 24.99, 90);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("skirt", "clothing", 38.67, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("fishing-pole", "sports", 149.98, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("speaker", "electronics", 189.99, 76);
