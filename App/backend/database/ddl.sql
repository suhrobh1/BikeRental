-- CS 340 Project Step 3 Draft
-- Projct Title: Bike Rental System (BRS)
-- Document: Data Definition Language (DDL) SQL
-- Team: Group 24
-- Members: Arvin Mirtorabi, Arstanbek Bulanbekov, Suhrob Hasanov

/*
# Signing in and using db
$ mysql -u cs340_ONIDUsername -h classmysql.engr.oregonstate.edu -p
$ use cs340_ONIDUsername;
$ source data_def_ddl.sql;

# Backup
$ mysqldump -u cs340_ONIDUsername -h classmysql.engr.oregonstate.edu -p cs340_ONIDUsername > data_def_ddl_bu.sql
*/

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT=0;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS CustomerPayments;
DROP TABLE IF EXISTS RentalBikes;
DROP TABLE IF EXISTS BikeMaintenanceLogs;
DROP TABLE IF EXISTS MaintenanceLogs;
DROP TABLE IF EXISTS Payments;
DROP TABLE IF EXISTS Rentals;
DROP TABLE IF EXISTS Bikes;
DROP TABLE IF EXISTS Customers;

/* ----------------------------------------------------- */
/* Create Table Customers */
/* ----------------------------------------------------- */

CREATE TABLE IF NOT EXISTS Customers (
  customer_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  phone varchar(15) NOT NULL
);

-- Insert example data into Customers table
INSERT INTO Customers (name, email, phone)
VALUES
('Johnny Crein', 'johnc@gmail.com', '671-222-1111'),
('Mary Sigh', 'marysigh@gmail.com', '872-333-2222'),
('Alison Doe', 'alisondoe@gmail.com', '312-444-3333');

/* ----------------------------------------------------- */
/* Create Table Bikes */
/* ----------------------------------------------------- */

CREATE TABLE IF NOT EXISTS Bikes (
  bike_id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(100) NOT NULL,
  status ENUM('available', 'rented', 'maintenance') NOT NULL,
  hourly_rate DECIMAL(6,2) NOT NULL
);

-- Insert example data into Bikes table
INSERT INTO Bikes (type, status, hourly_rate)
VALUES
('Trek Marlin 5 Mountain Bike', 'available', 10.00), -- EDIT: Changed db example data match bikes type with more info
('Trek FX 2 Road Bike', 'available', 15.00),
('Aventon Soltera2 Electric Bike', 'available', 20.00);

/* ----------------------------------------------------- */
/* Create Table Rentals */
/* ----------------------------------------------------- */

CREATE TABLE IF NOT EXISTS Rentals (
  rental_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  bike_id INT NOT NULL,
  rental_date TIMESTAMP NOT NULL,
  return_date TIMESTAMP NULL, -- EDIT: Was not null, now null to allow tracking of ongoing rentals
  total_cost DECIMAL(6,2) NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE,
  FOREIGN KEY (bike_id) REFERENCES Bikes(bike_id) ON DELETE CASCADE
);

-- Insert example data into Rentals table
INSERT INTO Rentals (customer_id, bike_id, rental_date, return_date, total_cost)
VALUES
(1, 1, '2025-01-15 15:00:00', '2025-01-15 17:00:00', 20.00),
(2, 2, '2025-02-05 12:00:00', '2025-02-05 14:00:00', 30.00),
(3, 3, '2025-02-08 13:30:00', '2025-02-08 15:30:00', 40.00);

/* ----------------------------------------------------- */
/* Create Table Payments */
/* ----------------------------------------------------- */

CREATE TABLE IF NOT EXISTS Payments (
  payment_id INT AUTO_INCREMENT PRIMARY KEY,
  rental_id INT NOT NULL,
  amount DECIMAL(6,2) NOT NULL,
  payment_date TIMESTAMP NULL DEFAULT NULL, -- EDIT: was not null, now null to allow optional payment date
  paid TINYINT(1) NOT NULL, -- boolean type (1 = paid, 0 = unpaid)
  FOREIGN KEY (rental_id) REFERENCES Rentals(rental_id) ON DELETE CASCADE
);

-- Insert example data into Payments table
INSERT INTO Payments (rental_id, amount, payment_date, paid)
VALUES
(1, 20.00, '2025-01-15 17:00:00', 1),
(2, 30.00, '2025-02-05 14:00:00', 1),
(3, 40.00, '2025-02-08 15:30:00', 1);

/* ----------------------------------------------------- */
/* Create Table MaintenanceLogs */
/* ----------------------------------------------------- */

-- EDIT: bike_id and FK was removed, as bike_id is already in the BikeMaintenanceLogs table
CREATE TABLE IF NOT EXISTS MaintenanceLogs (
  maintenance_id INT AUTO_INCREMENT PRIMARY KEY,
  service_date TIMESTAMP NULL DEFAULT NULL, -- EDIT: was null, now default null to allow tracking of ongoing maintenance
  description TEXT
);

-- Insert example data into MaintenanceLogs table
INSERT INTO MaintenanceLogs (service_date, description)
VALUES
('2025-01-15 17:00:00', 'Replaced the Trek and Marintire and chain.'),
('2025-02-05 14:00:00', 'Replaced the Trek brake pads.'),
('2025-02-08 15:30:00', 'Replaced the Aventon Soltera2 battery.');

/* ----------------------------------------------------- */
/* Create Table BikeMaintenanceLogs Intersection Table */
/* ----------------------------------------------------- */

CREATE TABLE IF NOT EXISTS BikeMaintenanceLogs (
  bike_id INT NOT NULL,
  maintenance_id INT NOT NULL,
  PRIMARY KEY (bike_id, maintenance_id),
  FOREIGN KEY (bike_id) REFERENCES Bikes(bike_id) ON DELETE CASCADE,
  FOREIGN KEY (maintenance_id) REFERENCES MaintenanceLogs(maintenance_id) ON DELETE CASCADE
);

-- Insert example data into BikeMaintenanceLogs table
INSERT INTO BikeMaintenanceLogs (bike_id, maintenance_id)
VALUES
(1, 1),
(2, 2),
(3, 3);

/* ----------------------------------------------------- */
/* Create Table CustomerPayments Intersection Table */
/* ----------------------------------------------------- */

CREATE TABLE IF NOT EXISTS CustomerPayments (
  customer_id INT NOT NULL,
  payment_id INT NOT NULL,
  PRIMARY KEY (customer_id, payment_id),
  FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE,
  FOREIGN KEY (payment_id) REFERENCES Payments(payment_id) ON DELETE CASCADE
);

-- Insert example data into CustomerPayments table
INSERT INTO CustomerPayments (customer_id, payment_id)
VALUES
(1, 1),
(2, 2),
(3, 3);

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS=1;
COMMIT;
