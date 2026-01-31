-- HOUSEMATE DATABASE SCHEMA (Oracle 11g)

-- 1. Users Table
CREATE TABLE HM_USERS (
    id VARCHAR2(20) PRIMARY KEY,
    name VARCHAR2(100) NOT NULL,
    email VARCHAR2(100) UNIQUE NOT NULL,
    password VARCHAR2(100) NOT NULL,
    role VARCHAR2(20) CHECK (role IN ('OWNER', 'TENANT')),
    flat_id VARCHAR2(20)
);

-- 2. Flats Table
CREATE TABLE HM_FLATS (
    id VARCHAR2(20) PRIMARY KEY,
    name VARCHAR2(50) NOT NULL,
    owner_id VARCHAR2(20) NOT NULL,
    tenant_id VARCHAR2(20),
    cost NUMBER(10, 2) NOT NULL,
    description VARCHAR2(255),
    CONSTRAINT fk_owner FOREIGN KEY (owner_id) REFERENCES HM_USERS(id)
);

-- 3. Bills Table
CREATE TABLE HM_BILLS (
    id VARCHAR2(20) PRIMARY KEY,
    flat_id VARCHAR2(20) NOT NULL,
    bill_type VARCHAR2(50) NOT NULL,
    amount NUMBER(10, 2) NOT NULL,
    status VARCHAR2(20) CHECK (status IN ('PAID', 'UNPAID', 'OVERDUE')),
    due_date VARCHAR2(20),
    billing_month VARCHAR2(50)
);

-- 4. Maintenance Table
CREATE TABLE HM_MAINTENANCE (
    id VARCHAR2(20) PRIMARY KEY,
    flat_id VARCHAR2(20) NOT NULL,
    user_id VARCHAR2(20) NOT NULL,
    description VARCHAR2(500),
    status VARCHAR2(20) CHECK (status IN ('OPEN', 'IN_PROGRESS', 'RESOLVED')),
    created_at VARCHAR2(20)
);

-- Seed Initial Data
INSERT INTO HM_USERS (id, name, email, password, role) VALUES ('owner1', 'Building Admin', 'owner@housemate.com', 'pass123', 'OWNER');
INSERT INTO HM_FLATS (id, name, owner_id, cost, description) VALUES ('flat101', 'A-101', 'owner1', 15000, '2BHK Apartment');
COMMIT;