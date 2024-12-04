import { connection } from '../../connection.js';

export default function endereco(req, res) {
	const { logradouro, numero, complemento, cep, cidade, bairro, empresa_id } = req.body;

	const query = `
      INSERT INTO enderecos (logradouro, numero, complemento, cep, cidade, bairro, empresa_id)
         VALUES ( ?, ?, ?, ?, ?, ?, ?);
   `;

	connection.query(query, [logradouro, numero, complemento, cep, cidade, bairro, empresa_id], (err, result) => {
		if (err) {
			console.error('Erro ao inserir no banco de dados:', err);
			return res.status(500).json({ message: 'Erro ao inserir no banco de dados.' });
		}
		console.log(result);
		return res.status(201).json({ message: 'Endereço cadastrado com sucesso!', id: result.insertId });
	});
}
