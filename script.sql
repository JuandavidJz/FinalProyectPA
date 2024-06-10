-- Active: 1717959940251@@127.0.0.1@3306@universidad
CREATE TABLE Estudiantes (
    cod_e BIGINT CHECK(cod_e > 0),
    nom_e VARCHAR(100) NOT NULL,
    dir_e VARCHAR(200),
    tel_e VARCHAR(100),
    fech_nac DATE,
    PRIMARY KEY (cod_e)
);

CREATE TABLE Profesores (
    id_p BIGINT CHECK(id_p > 0),
    nom_p VARCHAR(100) NOT NULL,
    dir_p VARCHAR(200),
    tel_p VARCHAR (200),
    profesion VARCHAR(100),
    PRIMARY KEY (id_p)
);

CREATE TABLE Asignaturas (
    cod_a BIGINT CHECK(cod_a > 0),
    nom_a VARCHAR(100) NOT NULL,
    int_h INTEGER CHECK(int_h BETWEEN 0 AND 4) DEFAULT 0,
    creditos_a INTEGER NOT NULL CHECK (creditos_a BETWEEN 0 AND 4) DEFAULT 0,
    PRIMARY KEY (cod_a)
);

CREATE TABLE Imparte (
    grupo BIGINT CHECK(grupo > 0),
    cod_a BIGINT NOT NULL,
    id_p BIGINT NOT NULL,
    horario VARCHAR(50),
    PRIMARY KEY (grupo, cod_a, id_p),
    FOREIGN KEY (id_p) REFERENCES Profesores(id_p),
    FOREIGN KEY (cod_a) REFERENCES Asignaturas(cod_a)
);

CREATE TABLE Inscribe (
    cod_e BIGINT NOT NULL,
    grupo BIGINT NOT NULL,
    cod_a BIGINT NOT NULL,
    id_p BIGINT NOT NULL,
    n1 INTEGER CHECK (n1 BETWEEN 0 AND 5) DEFAULT 0,
    n2 INTEGER CHECK (n2 BETWEEN 0 AND 5) DEFAULT 0,
    n3 INTEGER CHECK (n3 BETWEEN 0 AND 5) DEFAULT 0,
    PRIMARY KEY (cod_e, grupo, cod_a, id_p),
    FOREIGN KEY (grupo, cod_a, id_p) REFERENCES Imparte(grupo, cod_a, id_p),
    FOREIGN KEY (cod_e) REFERENCES Estudiantes(cod_e)
);


-- Inserciones para la tabla Estudiantes
INSERT INTO Estudiantes (cod_e, nom_e, dir_e, tel_e, fech_nac) VALUES 
(1, 'Juan Pérez', 'Calle Principal 123', 123456789, '2000-05-10'),
(2, 'María García', 'Avenida Central 456', 987654321, '2001-08-15'),
(3, 'Pedro López', 'Plaza Mayor 789', 567890123, '1999-12-20'),
(4, 'Luis Martínez', 'Avenida Secundaria 234', 345678901, '2002-02-28'),
(5, 'Ana Rodríguez', 'Calle Primaria 567', 789012345, '2003-06-05'),
(6, 'Sofía Hernández', 'Paseo Mayor 890', 234567890, '2000-10-15'),
(7, 'Diego Gómez', 'Avenida Central 123', 901234567, '2001-03-20'),
(8, 'Lucía Pérez', 'Calle Principal 456', 345678901, '1999-07-25');

-- Inserciones para la tabla Profesores
INSERT INTO Profesores (id_p, nom_p, dir_p, tel_p, profesion) VALUES 
(1, 'Ana Martínez', 'Calle Secundaria 321', 234567890, 'Matemáticas'),
(2, 'Carlos Rodríguez', 'Paseo Secundario 654', 890123456, 'Física'),
(3, 'Laura Gómez', 'Avenida Principal 987', 456789012, 'Historia'),
(4, 'Pedro Sánchez', 'Calle Mayor 234', 123456789, 'Inglés'),
(5, 'María López', 'Avenida Principal 456', 789012345, 'Química'),
(6, 'Juan García', 'Calle Secundaria 789', 234567890, 'Biología'),
(7, 'Sofía Martínez', 'Paseo Mayor 123', 901234567, 'Literatura'),
(8, 'Diego Rodríguez', 'Avenida Central 456', 345678901, 'Arte');

-- Inserciones para la tabla Asignaturas con materias de Ingeniería de Sistemas
INSERT INTO Asignaturas (cod_a, nom_a, int_h, creditos_a) VALUES 
(201, 'Introducción a la Programación', 4, 4),
(202, 'Estructuras de Datos', 4, 4),
(203, 'Bases de Datos', 4, 4),
(204, 'Diseño de Algoritmos', 4, 4),
(205, 'Ingeniería de Software', 4, 4),
(206, 'Redes de Computadoras', 4, 4),
(207, 'Sistemas Operativos', 4, 4),
(208, 'Inteligencia Artificial', 4, 4);

-- Inserciones para la tabla Imparte
INSERT INTO Imparte (grupo, cod_a, id_p, horario) VALUES 
(1, 201, 1, 'Lunes y Miércoles de 8:00 a 10:00'),
(2, 202, 2, 'Martes y Jueves de 10:00 a 12:00'),
(3, 203, 3, 'Viernes de 14:00 a 16:00'),
(4, 204, 4, 'Lunes de 14:00 a 16:00'),
(5, 205, 5, 'Martes de 8:00 a 10:00'),
(6, 206, 6, 'Miércoles de 14:00 a 16:00'),
(7, 207, 7, 'Jueves de 10:00 a 12:00'),
(8, 208, 8, 'Viernes de 8:00 a 10:00');

-- Inserciones para la tabla Inscribe con códigos de materias de Ingeniería de Sistemas
INSERT INTO Inscribe (cod_e, grupo, cod_a, id_p, n1, n2, n3) VALUES 
(1, 1, 201, 1, 4, 3, 5),
(2, 2, 202, 2, 5, 4, 4),
(3, 3, 203, 3, 3, 3, 4),
(4, 4, 204, 4, 4, 4, 3),
(5, 5, 205, 5, 3, 5, 4),
(6, 6, 206, 6, 5, 4, 4),
(7, 7, 207, 7, 4, 3, 5),
(8, 8, 208, 8, 5, 5, 4);


