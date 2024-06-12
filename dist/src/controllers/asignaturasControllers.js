"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAsig = exports.getAll = exports.create = void 0;
const db_1 = require("../../db");
const create = (asignaturas, callback) => {
    const queryString = 'INSERT INTO asignaturas (cod_a, nom_a, int_h, creditos_a) VALUES (?, ?, ?, ?)';
    db_1.db.query(queryString, [asignaturas.cod_a, asignaturas.nom_a, asignaturas.int_h, asignaturas.creditos_a], (err, result) => {
        if (err) {
            callback(err);
        }
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
// Controlador para el método GET
const getAll = (callback) => {
    const queryString = 'SELECT * FROM asignaturas';
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
};
exports.getAll = getAll;
// Controlador para el método DELETE
const deleteAsig = (cod_a, callback) => {
    const queryString = 'DELETE FROM asignaturas WHERE cod_a = ?';
    db_1.db.query(queryString, cod_a, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
};
exports.deleteAsig = deleteAsig;
