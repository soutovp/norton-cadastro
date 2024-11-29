import mysql from 'mysql2';
import 'dotenv/config';

export const connection = mysql.createConnection({
	host: 'localhost',
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DATABASE,
});
