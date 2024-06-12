"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInscribe = exports.updateGrades = exports.getByStudent = exports.getBySubjectAndGroup = exports.create = void 0;
const db_1 = require("../../db");
const create = (inscribe, callback) => {
    const queryString = 'INSERT INTO Inscribe (cod_e, grupo, cod_a, id_p, n1, n2, n3) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db_1.db.query(queryString, [inscribe.cod_e, inscribe.grupo, inscribe.cod_a, inscribe.id_p, inscribe.n1, inscribe.n2, inscribe.n3], (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
const getBySubjectAndGroup = (cod_a, grupo, callback) => {
    const queryString = 'SELECT * FROM Inscribe WHERE cod_a = ? AND grupo = ?';
    db_1.db.query(queryString, [cod_a, grupo], (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        const rows = result;
        const inscribe = [];
        rows.forEach(row => {
            const ins = {
                cod_e: row.cod_e,
                grupo: row.grupo,
                cod_a: row.cod_a,
                id_p: row.id_p,
                n1: row.n1,
                n2: row.n2,
                n3: row.n3
            };
            inscribe.push(ins);
        });
        callback(null, inscribe);
    });
};
exports.getBySubjectAndGroup = getBySubjectAndGroup;
const getByStudent = (cod_e, callback) => {
    const queryString = 'SELECT * FROM Inscribe WHERE cod_e = ?';
    db_1.db.query(queryString, [cod_e], (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        const rows = result;
        const inscribe = [];
        rows.forEach(row => {
            const ins = {
                cod_e: row.cod_e,
                grupo: row.grupo,
                cod_a: row.cod_a,
                id_p: row.id_p,
                n1: row.n1,
                n2: row.n2,
                n3: row.n3
            };
            inscribe.push(ins);
        });
        callback(null, inscribe);
    });
};
exports.getByStudent = getByStudent;
const updateGrades = (inscribe, callback) => {
    const queryString = 'UPDATE Inscribe SET n1 = ?, n2 = ?, n3 = ? WHERE cod_e = ? AND grupo = ? AND cod_a = ? AND id_p = ?';
    db_1.db.query(queryString, [inscribe.n1, inscribe.n2, inscribe.n3, inscribe.cod_e, inscribe.grupo, inscribe.cod_a, inscribe.id_p], (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, result);
    });
};
exports.updateGrades = updateGrades;
// Controlador para el método DELETE
const deleteInscribe = (inscribe, callback) => {
    const queryString = 'DELETE FROM Inscribe WHERE cod_e = ? AND grupo = ? AND cod_a = ? AND id_p = ?';
    db_1.db.query(queryString, [inscribe.cod_e, inscribe.grupo, inscribe.cod_a, inscribe.id_p], (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, result);
    });
};
exports.deleteInscribe = deleteInscribe;
