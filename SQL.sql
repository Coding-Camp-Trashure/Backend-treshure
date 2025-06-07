CREATE TABLE "User" (
    id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL,
    CONSTRAINT user_email_key UNIQUE (email),
    PRIMARY KEY (id)
);

CREATE TABLE Scan (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    jenis_sampah VARCHAR(50) NOT NULL,
    uang_didapat INTEGER NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES "User"(id)
);

CREATE TABLE Saldo (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    saldo INTEGER DEFAULT 0,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES "User"(id)
);