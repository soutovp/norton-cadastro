import { connection } from '../../../connection.js';
export default function getCompradores(req, res) {
	const query = 'SELECT comprador, id, email FROM compradores;';
	connection.query(query, (err, results) => {
		if (err) {
			console.error('Erro ao consultar o banco:', err);
			return res.status(500).json({ message: 'Erro ao buscar compradores.' });
		}
		// console.log(JSON.parse(results));
		res.status(200).json(results);
	});
}
