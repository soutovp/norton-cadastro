import { connection } from '../../connection.js';
export default async function empresa(req, res) {
	const { nome, cnpj } = req.body;

	const query = `
   INSERT INTO 
      empresas (nome, cnpj)
      VALUES (?,?);
   `;

	connection.query(query, [nome, cnpj], (err, result) => {
		if (err) {
			if (err.code === 'ER_DUP_ENTRY') {
				console.error('Erro: CNPJ duplicado');
				return res.status(500).json({ message: 'CNPJ já cadastrado no banco de dados...' });
			} else {
				console.error('Erro ao inserir no banco de dados:', err);
				return res.status(500).json({ message: 'Erro ao inserir no banco de dados.' });
			}
		}
		console.log(result);
		return res.status(201).json({ message: 'Empresa cadastrada com sucesso!', id: result.insertId });
	});
}
