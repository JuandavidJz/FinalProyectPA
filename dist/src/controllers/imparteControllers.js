"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImparte = exports.getAll = exports.create = void 0;
const db_1 = require("../../db");
const create = (imparte, callback) => {
    const queryString = 'INSERT INTO Imparte (grupo, cod_a, id_p, horario) VALUES (?, ?, ?, ?)';
    db_1.db.query(queryString, [imparte.grupo, imparte.cod_a, imparte.id_p, imparte.horario], (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            grupo: imparte.grupo,
            cod_a: imparte.cod_a,
            id_p: imparte.id_p,
        });
    });
};
exports.create = create;
const getAll = (callback) => {
    const queryString = 'SELECT * FROM Imparte';
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const imparte = [];
        rows.forEach(row => {
            const imp = {
                grupo: row.grupo,
                cod_a: row.cod_a,
                id_p: row.id_p,
                horario: row.horario
            };
            imparte.push(imp);
        });
        callback(null, imparte);
    });
};
exports.getAll = getAll;
// Controlador para el método DELETE
const deleteImparte = (id_p, callback) => {
    const queryString = 'DELETE FROM Imparte WHERE id_p = ?';
    db_1.db.query(queryString, id_p, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
};
exports.deleteImparte = deleteImparte;
