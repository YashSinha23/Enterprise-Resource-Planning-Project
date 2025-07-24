-- 1. Designs
CREATE TABLE Designs (
    design_id   SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    file_url    TEXT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    remarks     TEXT
);

-- 2. Clients
CREATE TABLE Clients (
    client_id   SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    email       TEXT,
    phone       TEXT
);

-- 3. Orders
CREATE TABLE Orders (
    order_id              SERIAL PRIMARY KEY,
    design_id             INTEGER REFERENCES Designs(design_id),
    client_id             INTEGER REFERENCES Clients(client_id),
    order_date            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dispatch_date         TIMESTAMP,
    payment_received_date TIMESTAMP,
    invoice_amount        NUMERIC,
    specs                 TEXT,
    remarks               TEXT,
    created_by            TEXT,
    last_updated          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. RawMaterials (master)
CREATE TABLE RawMaterials (
    material_id   SERIAL PRIMARY KEY,
    material_name TEXT NOT NULL,
    live_quantity NUMERIC DEFAULT 0,
    last_updated  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. RawMaterialTransactions (log)
CREATE TABLE RawMaterialTransactions (
    raw_material_txn_id SERIAL PRIMARY KEY,
    material_id         INTEGER NOT NULL REFERENCES RawMaterials(material_id),
    order_id            INTEGER REFERENCES Orders(order_id),
    txn_type            VARCHAR(20) NOT NULL
                          CHECK (txn_type IN ('Inward','Consumed')),
    quantity            NUMERIC NOT NULL,
    shift               TEXT,
    operator            TEXT,
    timestamp           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    remarks             TEXT
);

-- 6. Sheets (master, composite-text PK)
CREATE TABLE Sheets (
    sheet_id        TEXT PRIMARY KEY,                     -- e.g. '470_1.2'
    sheet_size      NUMERIC NOT NULL,                     -- e.g. 470
    sheet_thickness NUMERIC NOT NULL,                     -- e.g. 1.2
    live_quantity   INTEGER DEFAULT 0,
    last_updated    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. SheetTransactions (log)
CREATE TABLE SheetTransactions (
    sheet_txn_id     SERIAL PRIMARY KEY,
    sheet_id         TEXT NOT NULL REFERENCES Sheets(sheet_id),
    order_id         INTEGER REFERENCES Orders(order_id),
    quantity         INTEGER NOT NULL,       -- usable sheets produced
    scrap            INTEGER DEFAULT 0,
    shift            TEXT,
    operator         TEXT,
    machine_id       TEXT,
    sheet_size       NUMERIC NOT NULL,       -- audit
    sheet_thickness  NUMERIC NOT NULL,       -- audit
    primary_material TEXT,
    additives        TEXT,
    timestamp        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    remarks          TEXT
);

-- 8. CupSpecs (master definitions, composite-text PK)
CREATE TABLE CupSpecs (
    label_id   TEXT PRIMARY KEY,     -- e.g. 'amul_350'
    label      TEXT NOT NULL,
    diameter   NUMERIC NOT NULL,
    volume     NUMERIC NOT NULL
);

-- 9. Cups (live inventory)
CREATE TABLE Cups (
    cup_id        TEXT PRIMARY KEY REFERENCES CupSpecs(label_id),
    live_quantity INTEGER DEFAULT 0,
    last_updated  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. CupTransactions (log)
CREATE TABLE CupTransactions (
    cup_txn_id     SERIAL PRIMARY KEY,
    cup_id         TEXT NOT NULL REFERENCES Cups(cup_id),
    order_id       INTEGER REFERENCES Orders(order_id),
    quantity       INTEGER NOT NULL,
    sheet_consumed INTEGER DEFAULT 0,
    sheet_id       TEXT REFERENCES Sheets(sheet_id),
    rejected_cups  INTEGER DEFAULT 0,
    shift          TEXT,
    operator       TEXT,
    machine_id     TEXT,
    timestamp      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    remarks        TEXT
);

-- 11. PrintedCups (master)
CREATE TABLE PrintedCups (
    printed_cup_id TEXT PRIMARY KEY REFERENCES CupSpecs(label_id),  
    design_id      INTEGER REFERENCES Designs(design_id),
    live_quantity  INTEGER DEFAULT 0,
    last_updated   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12. PrintedCupTransactions (log)
CREATE TABLE PrintedCupTransactions (
    printed_cup_txn_id SERIAL PRIMARY KEY,
    printed_cup_id     TEXT NOT NULL REFERENCES PrintedCups(printed_cup_id),
    order_id           INTEGER REFERENCES Orders(order_id),
    cup_id             TEXT REFERENCES Cups(cup_id),
    design_id          INTEGER REFERENCES Designs(design_id),
    machine_id         TEXT,
    quantity           INTEGER NOT NULL,
    rejected_cups      INTEGER DEFAULT 0,
    shift              TEXT,
    operator           TEXT,
    timestamp          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    remarks            TEXT
);
