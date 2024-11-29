import e from 'express';
export const router = e.Router();
import { connection } from '../../connection.js';

router.get('/comprador', (req, res) => {
	const query = 'SELECT comprador, id, email FROM compradores;';
	connection.query(query, (err, results) => {
		if (err) {
			console.error('Erro ao consultar o banco:', err);
			return res.status(500).json({ message: 'Erro ao buscar compradores.' });
		}
		// console.log(JSON.parse(results));
		res.status(200).json(JSON.stringify(results));
	});
});

router.post('/delete/comprador', (req, res) => {
	const { id } = req.body;
	const query = `DELETE FROM compradores WHERE id = ${id}`;
	connection.query(query, (err, result) => {
		if (err) {
			console.error('Erro ao inserir no banco de dados:', err);
			return res.status(500).json({ message: 'Erro ao inserir no banco de dados.' });
		}
		if (result.affectedRows === 0) {
			return res.status(400).json({ message: 'Nenhum comprador encontrado' });
		}
		console.log(result);
		res.status(201).json({ message: 'Comprador deletado com sucesso!', id: result.insertId });
	});
});

router.post('/load/comprador', (req, res) => {
	const { id } = req.body;
	const query = `SELECT comprador, email, email_faturamento FROM compradores WHERE id = ${id}`;
	connection.query(query, (err, result) => {
		if (err) {
			console.error('Erro ao verificar no banco de dados:', err);
			return res.status(500).json({ message: 'Erro ao inserir no banco de dados.' });
		}
		res.status(201).json({ message: 'Dados do comprador Carregao', result });
	});
});
