import { Estudiantes} from '../models/estudiantesModels';
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';


export const create = (estudiante: Estudiantes, callback: Function) => {
    const queryString = 'INSERT INTO estudiantes (cod_e, nom_e, dir_e, tel_e, fech_nac) VALUES (?, ?, ?, ?, ?)';

    db.query(
        queryString,
        [estudiante.cod_e, estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac],
        (err, result) => {
            if (err) { 
                callback(err); // Devolvemos el error si ocurrió uno durante la consulta
            } else {
                const insertId = (<OkPacket>result).insertId;
                callback(null, insertId); // Llamamos a la función de devolución de llamada con el ID del estudiante insertado
            }
        }
    );
};


export const update = (cod_e: number, estudiante: Estudiantes, callback: Function) => {
	const queryString = 'UPDATE estudiantes SET nom_e = ?, dir_e = ?, tel_e = ?, fech_nac = ? WHERE cod_e = ?';

	db.query(
		queryString,
		[estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac, cod_e],
		(err, result) => {
			if (err) { 
				callback(err);
				return;
			}

			const affectedRows = (<OkPacket>result).affectedRows;
			callback(null, affectedRows);
		}
	);
};

export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM estudiantes';

    db.query(queryString, (err, result) => {
        if (err) { callback(err); }

        const rows = <RowDataPacket[]>result;
        const imparte: Estudiantes[] = [];

        rows.forEach(row => {
            const imp: Estudiantes = {
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