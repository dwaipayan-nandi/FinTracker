////SQL CODES////

create database fin_tracker;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL
);



CREATE TABLE financial_entries (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(255) NOT NULL,
  category varchar(255) NOT NULL,
  item_name varchar(255) NOT NULL,
  amount decimal(10,2) NOT NULL,
  entry_date date default(CURRENT_DATE),
  PRIMARY KEY (id)
);