import { Profesores} from '../models/profesoresModels';
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';


//TRAE TODOS
export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM profesores';

    db.query(queryString, (err, result) => {
        if (err) { callback(err); }

        const rows = <RowDataPacket[]>result;
        const profesores: Profesores[] = [];

        rows.forEach(row => {
            const prof: Profesores = {
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

//GET BY ID

export const getByteacher = (id_p: number, callback: Function) => {
    const queryString = `
        SELECT p.id_p, p.nom_p, p.dir_p, p.tel_p, p.profesion
        FROM Profesores p
        INNER JOIN Inscribe i ON p.id_p = i.id_p
        WHERE i.id_p = ?
    `;

    db.query(queryString, [id_p], (err, result) => {
        if (err) {
            callback(err);
            return;
        }

        const rows = <RowDataPacket[]>result;
        const profesores: Profesores[] = [];

        rows.forEach(row => {
            const prof: Profesores = {
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




export const create = (profesores: Profesores, callback: Function) => {
	const queryString = 'INSERT INTO profesores (id_p, nom_p, dir_p, tel_p, profesion) VALUES (?, ?, ?, ?, ?)';

	db.query(
		queryString,
		[profesores.id_p, profesores.nom_p, profesores.dir_p, profesores.tel_p, profesores.profesion],
		(err, result) => {
			if (err) { callback(err); }

			const insertId = (<OkPacket>result).insertId;
			callback(null, insertId);
		}
	);
};



export const update = (profesores: Profesores, callback: Function) => {
    const queryString = 'UPDATE profesores SET nom_p = ?, dir_p = ?, tel_p = ?, profesion = ? WHERE id_p = ?';

    db.query(
        queryString,
        [profesores.nom_p, profesores.dir_p, profesores.tel_p, profesores.profesion, profesores.id_p],
        (err, result) => {
            if (err) { callback(err); }

            callback(null, result);
        }
    );
};

// Controlador para el método DELETE
export const deleteProfesor = (id_p: number, callback: Function) => {
    const queryString = 'DELETE FROM profesores WHERE id_p = ?';

    db.query(queryString, id_p, (err, result) => {
        if (err) { callback(err); }

        callback(null, result);
    });
};