"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
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
