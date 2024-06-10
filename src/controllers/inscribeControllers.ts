
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';
import { Inscribe } from '../models/inscribeModels';


export const create = (inscribe: Inscribe, callback: Function) => {
    const queryString = 'INSERT INTO Inscribe (cod_e, grupo, cod_a, id_p, n1, n2, n3) VALUES (?, ?, ?, ?, ?, ?, ?)';

    db.query(
        queryString,
        [inscribe.cod_e, inscribe.grupo, inscribe.cod_a, inscribe.id_p, inscribe.n1, inscribe.n2, inscribe.n3],
        (err, result) => {
            if (err) {
                callback(err);
                return;
            }

            const insertId = (<OkPacket>result).insertId;
            callback(null, insertId);
        }
    );
};

export const getBySubjectAndGroup = (cod_a: number, grupo: number, callback: Function) => {
    const queryString = 'SELECT * FROM Inscribe WHERE cod_a = ? AND grupo = ?';

    db.query(queryString, [cod_a, grupo], (err, result) => {
        if (err) {
            callback(err);
            return;
        }

        const rows = <RowDataPacket[]>result;
        const inscribe: Inscribe[] = [];

        rows.forEach(row => {
            const ins: Inscribe = {
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

export const getByStudent = (cod_e: number, callback: Function) => {
    const queryString = 'SELECT * FROM Inscribe WHERE cod_e = ?';

    db.query(queryString, [cod_e], (err, result) => {
        if (err) {
            callback(err);
            return;
        }

        const rows = <RowDataPacket[]>result;
        const inscribe: Inscribe[] = [];

        rows.forEach(row => {
            const ins: Inscribe = {
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

export const updateGrades = (inscribe: Inscribe, callback: Function) => {
    const queryString = 'UPDATE Inscribe SET n1 = ?, n2 = ?, n3 = ? WHERE cod_e = ? AND grupo = ? AND cod_a = ? AND id_p = ?';

    db.query(
        queryString,
        [inscribe.n1, inscribe.n2, inscribe.n3, inscribe.cod_e, inscribe.grupo, inscribe.cod_a, inscribe.id_p],
        (err, result) => {
            if (err) {
                callback(err);
                return;
            }

            callback(null, result);
        }
    );
};
