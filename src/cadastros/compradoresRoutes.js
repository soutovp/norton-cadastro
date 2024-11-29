import e from 'express';
export const router = e.Router();
import { connection } from '../../connection.js';

router.post('/cadastrar', async (req, res) => {
	const { nome_comprador, mail_comprador_contato, mail_comprador_faturamento } = req.body;

	if (!nome_comprador || !mail_comprador_contato || !mail_comprador_faturamento) {
		return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
	}
	const query = `
		INSERT INTO compradores (comprador, email, email_faturamento)
		VALUES (?, ?, ?);
	`;
	connection.query(query, [nome_comprador, mail_comprador_contato, mail_comprador_faturamento], (err, result) => {
		if (err) {
			console.error('Erro ao inserir no banco de dados:', err);
			return res.status(500).json({ message: 'Erro ao inserir no banco de dados.' });
		}
		res.status(201).json({ message: 'Comprador inserido com sucesso!', id: result.insertId });
	});
});
