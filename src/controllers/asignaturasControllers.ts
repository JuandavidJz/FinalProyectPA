import { Asignaturas} from '../models/asignaturasModels';
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';

export const create = (asignaturas: Asignaturas, callback: Function) => {
	const queryString = 'INSERT INTO asignaturas (cod_a, nom_a, int_h, creditos_a) VALUES (?, ?, ?, ?)';

	db.query(
		queryString,
		[asignaturas.cod_a, asignaturas.nom_a, asignaturas.int_h, asignaturas.creditos_a],
		(err, result) => {
			if (err) { callback(err); }

			const insertId = (<OkPacket>result).insertId;
			callback(null, insertId);
		}
	);
}; 

// Controlador para el método GET
export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM asignaturas';

    db.query(queryString, (err, result) => {
        if (err) { callback(err); }

        callback(null, result);
    });
};

// Controlador para el método DELETE
export const deleteAsig = (cod_a: string, callback: Function) => {
    const queryString = 'DELETE FROM asignaturas WHERE cod_a = ?';

    db.query(queryString, cod_a, (err, result) => {
        if (err) { callback(err); }

        callback(null, result);
    });
};
