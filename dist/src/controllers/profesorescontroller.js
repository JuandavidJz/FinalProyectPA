"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfesor = exports.update = exports.getAll = exports.create = void 0;
const db_1 = require("../../db");
const create = (profesores, callback) => {
    const queryString = 'INSERT INTO profesores (id_p, nom_p, dir_p, tel_p, profesion) VALUES (?, ?, ?, ?, ?)';
    db_1.db.query(queryString, [profesores.id_p, profesores.nom_p, profesores.dir_p, profesores.tel_p, profesores.profesion], (err, result) => {
        if (err) {
            callback(err);
        }
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
const getAll = (callback) => {
    const queryString = 'SELECT * FROM profesores';
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const profesores = [];
        rows.forEach(row => {
            const prof = {
                id_p: row.id_p,
                nom_p: row.nom_p,
                dir_p: row.dir_p,
                tel_p: row.tel_p,
                profesion: row.profesion
            };
            profesores.push(prof);
        });
        callback(null, profesores);
    });
};
exports.getAll = getAll;
// Controlador para el método UPDATE (PUT)
const update = (profesores, callback) => {
    const queryString = 'UPDATE profesores SET nom_p = ?, dir_p = ?, tel_p = ?, profesion = ? WHERE id_p = ?';
    db_1.db.query(queryString, [profesores.nom_p, profesores.dir_p, profesores.tel_p, profesores.profesion, profesores.id_p], (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
};
exports.update = update;
// Controlador para el método DELETE
const deleteProfesor = (id_p, callback) => {
    const queryString = 'DELETE FROM profesores WHERE id_p = ?';
    db_1.db.query(queryString, id_p, (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null, result);
    });
};
exports.deleteProfesor = deleteProfesor;
