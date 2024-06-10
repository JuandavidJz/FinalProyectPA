"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.update = exports.create = void 0;
const db_1 = require("../../db");
const create = (estudiante, callback) => {
    const queryString = 'INSERT INTO estudiantes (cod_e, nom_e, dir_e, tel_e, fech_nac) VALUES (?, ?, ?, ?, ?)';
    db_1.db.query(queryString, [estudiante.cod_e, estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac], (err, result) => {
        if (err) {
            callback(err); // Devolvemos el error si ocurrió uno durante la consulta
        }
        else {
            const insertId = result.insertId;
            callback(null, insertId); // Llamamos a la función de devolución de llamada con el ID del estudiante insertado
        }
    });
};
exports.create = create;
const update = (cod_e, estudiante, callback) => {
    const queryString = 'UPDATE estudiantes SET nom_e = ?, dir_e = ?, tel_e = ?, fech_nac = ? WHERE cod_e = ?';
    db_1.db.query(queryString, [estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac, cod_e], (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        const affectedRows = result.affectedRows;
        callback(null, affectedRows);
    });
};
exports.update = update;
const getAll = (callback) => {
    const queryString = 'SELECT * FROM estudiantes';
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const imparte = [];
        rows.forEach(row => {
            const imp = {
                cod_e: row.cod_e,
                nom_e: row.nom_e,
                dir_e: row.dir_e,
                tel_e: row.tel_e,
                fech_nac: row.fech_nac
            };
            imparte.push(imp);
        });
        callback(null, imparte);
    });
};
exports.getAll = getAll;
