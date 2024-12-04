import { connection } from '../../../connection.js';

export default function loadCompradores(req, res) {
	const { id } = req.body;
	const query = `SELECT comprador, email, email_faturamento FROM compradores WHERE id = ${id}`;
	connection.query(query, (err, result) => {
		if (err) {
			console.error('Erro ao verificar no banco de dados:', err);
			return res.status(500).json({ message: 'Erro ao inserir no banco de dados.' });
		}
		res.status(201).json({ message: 'Dados do comprador Carregao', result });
	});
}
