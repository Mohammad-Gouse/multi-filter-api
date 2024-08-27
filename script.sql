-- Table Creation

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    age INT NOT NULL
);

-- Index Creation

CREATE INDEX idx_employee_name ON employees(name);
CREATE INDEX idx_employee_salary ON employees(salary);
CREATE INDEX idx_employee_age ON employees(age);

-- Employee Date

INSERT INTO employees (name, salary, age) VALUES
('John Doe', 50000.00, 25),
('Jane Smith', 60000.00, 28),
('Michael Johnson', 55000.00, 30),
('Emily Davis', 62000.00, 27),
('William Brown', 48000.00, 35),
('Jessica Wilson', 70000.00, 32),
('Daniel Taylor', 52000.00, 24),
('Sarah Anderson', 56000.00, 26),
('David Thomas', 65000.00, 29),
('Laura Martinez', 59000.00, 31),
('Chris Moore', 53000.00, 22),
('Amanda Jackson', 61000.00, 33),
('James White', 57500.00, 40),
('Patricia Harris', 68500.00, 37),
('Robert Lee', 49500.00, 34),
('Linda Walker', 62500.00, 36),
('Mark Hall', 51500.00, 23),
('Susan Allen', 63500.00, 38),
('Steven Young', 47500.00, 39),
('Karen King', 64000.00, 41),
('Matthew Wright', 54500.00, 42),
('Lisa Scott', 71000.00, 43),
('Anthony Green', 54000.00, 44),
('Nancy Adams', 57000.00, 45),
('Andrew Nelson', 66000.00, 46),
('Karen Turner', 68000.00, 47),
('Joshua Carter', 53000.00, 48),
('Barbara Mitchell', 65000.00, 49),
('Edward Perez', 60000.00, 50),
('Donna Roberts', 58000.00, 51),
('Kenneth Cox', 62000.00, 52),
('Margaret Evans', 49000.00, 53),
('Brian Edwards', 66000.00, 54),
('Deborah Collins', 67000.00, 55),
('George Stewart', 54000.00, 56),
('Rebecca Sanchez', 56000.00, 57),
('Paul Morris', 62500.00, 58),
('Michelle Rogers', 60500.00, 59),
('Kevin Reed', 59000.00, 60),
('Sandra Cook', 57000.00, 61),
('Jason Bell', 63000.00, 62),
('Helen Murphy', 54000.00, 63),
('Charles Bailey', 59000.00, 64),
('Angela Rivera', 65500.00, 65),
('Ronald Cooper', 68000.00, 66),
('Sharon Richardson', 61000.00, 67),
('Timothy Hughes', 54000.00, 68),
('Brenda Flores', 67000.00, 69),
('Raymond Parker', 70000.00, 70);
