import { connection } from '../../connection.js';

export default async function comprador_empresa(req, res) {
	const { empresa, comprador } = req.body;
	const query = `
      INSERT INTO compradores_empresas (comprador, empresas) VALUES (?, ?)
   `;
	connection.query(query, [empresa, comprador], (err, result) => {
		if (err) {
			console.error('Erro ao inserir no banco de dados:', err);
			return res.status(500).json({ message: 'Erro ao inserir no banco de dados.' });
		}
		console.log(result);
		return res.status(201).json({ message: 'Empresa cadastrada com sucesso!', id: result.insertId });
	});
}
