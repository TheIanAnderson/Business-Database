DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(45) NOT NULL
);

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL
);

INSERT INTO employees (id, name, role_id)
VALUES
  (1, 'John Smith', 1), 
  (2, 'Alice Johnson', 2),
  (3, 'Bob Brown', 3);


DROP TABLE IF EXISTS roles;

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  description VARCHAR(100), -- Add a description column
  salary DECIMAL(10, 2) -- Assuming salary is a decimal type
);

  INSERT INTO departments (id, name)
VALUES
  (1, 'Fulfillment'),
  (2, 'Customer Service'),
  (3, 'Website');

  INSERT INTO roles (id, name, description, salary)
VALUES
  (1, 'Role 1', 'This role is for the agents who coordinates deliveries to online customers', 50000),
  (2, 'Role 2', 'This is for the agents who communicate with customers regarding fulfillment', 60000),
  (3, 'Role 3', 'This is the role for agents who update the business website', 70000);