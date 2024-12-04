import { connection } from '../../../connection.js';

export default function loadCompradoresEmail(req, res) {
	const { email } = req.body;
	console.log(email);
	const query = `SELECT comprador, email, email_faturamento FROM compradores WHERE email = "${email}"`;
	connection.query(query, (err, result) => {
		if (err) {
			console.error('Erro ao verificar no banco de dados:', err);
			return res.status(500).json({ message: 'Erro ao inserir no banco de dados.' });
		}
		console.log(result);
		res.status(200).json({ message: 'Dados do comprador Carregao', result });
	});
}
