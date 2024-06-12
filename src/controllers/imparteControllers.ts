
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';
import { Imparte } from '../models/imparteModels';

export const create = (imparte: Imparte, callback: Function) => {
    const queryString = 'INSERT INTO Imparte (grupo, cod_a, id_p, horario) VALUES (?, ?, ?, ?)';

    db.query(
        queryString,
        [imparte.grupo, imparte.cod_a, imparte.id_p, imparte.horario],
        (err, result) => {
            if (err) { callback(err); }

            callback(null, {
                grupo: imparte.grupo,
                cod_a: imparte.cod_a,
                id_p: imparte.id_p,
            });
        }
    );
};

export const deleteImparte = (id_p: number, callback: Function) => {
    const queryString = 'DELETE FROM Imparte WHERE id_p = ?';

    db.query(queryString, id_p, (err, result) => {
        if (err) { callback(err); }

        callback(null, result);
    });
};
export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM Imparte';

    db.query(queryString, (err, result) => {
        if (err) { callback(err); }

        const rows = <RowDataPacket[]>result;
        const imparte: Imparte[] = [];

        rows.forEach(row => {
            const imp: Imparte = {
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