
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';
import { Inscribe } from '../models/inscribeModels';

//total
export const getAllInscribe = (callback: Function) => {
    const queryString = 'SELECT * FROM inscribe';

    db.query(queryString, (err, result) => {
        if (err) { 
            callback(err); 
            return; 
        }

        const rows = <RowDataPacket[]>result;
        const inscribes: Inscribe[] = [];

        rows.forEach(row => {
            const inscribe: Inscribe = {
                cod_e: row.cod_e,
                grupo: row.grupo,
                cod_a: row.cod_a,
                id_p: row.id_p,
                n1: row.n1,
                n2: row.n2,
                n3: row.n3
            };
            inscribes.push(inscribe);
        });
        callback(null, inscribes);
    });
};


//consultar por grupo y estudiante 
export const getStudentAndNotesByAsignaturaAndGrupo = (cod_a: number, grupo: number, callback: Function) => {
    const queryString = 'SELECT inscribe.cod_e, inscribe.n1, inscribe.n2, inscribe.n3, estudiantes.nom_e FROM inscribe INNER JOIN estudiantes ON inscribe.cod_e = estudiantes.cod_e WHERE inscribe.cod_a = ? AND inscribe.grupo = ?';

    db.query(queryString, [cod_a, grupo], (err, result) => {
        if (err) { 
            callback(err); 
            return; 
        }

        const rows = <RowDataPacket[]>result;
        const studentsAndNotes = rows.map(row => ({
            cod_e: row.cod_e,
            nom_e: row.nom_e,
            n1: row.n1,
            n2: row.n2,
            n3: row.n3
        }));

        callback(null, studentsAndNotes);
    });
};

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

export const getBySubjectAndGroup = (cod_a: number, callback: Function) => {
    const queryString = 'SELECT * FROM Inscribe WHERE cod_a = ? ';

    db.query(queryString, [cod_a], (err, result) => {
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

