import { connection } from '../../../connection.js';

export default function deleteComprador(req, res) {
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
}
