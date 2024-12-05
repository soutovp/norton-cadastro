import { connection } from '../../connection.js';

export default async function geral(req, res) {
	const { nomeEmpresa, cnpj, logradouro, numero, complemento, cep, cidade, bairro, nomeComprador, mailContato, mailFaturado } = req.body;

	connection.beginTransaction((err) => {
		if (err) {
			console.error('Erro ao iniciar transação:', err);
			return res.status(500).json({ message: 'Erro ao iniciar transação.', error: err.message });
		}

		// 1. Inserir empresa
		connection.query('INSERT INTO empresas (nome, cnpj) VALUES (?, ?)', [nomeEmpresa, cnpj], (err, empresaResult) => {
			if (err) {
				console.error('Erro ao inserir empresa:', err);
				return rollbackWithError(res, 'Erro ao inserir empresa.', err);
			}
			const empresaId = empresaResult.insertId;

			// 2. Inserir endereço
			connection.query('INSERT INTO enderecos (logradouro, numero, complemento, cep, cidade, bairro, empresa_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [logradouro, numero, complemento, cep, cidade, bairro, empresaId], (err) => {
				if (err) {
					console.error('Erro ao inserir endereço:', err);
					return rollbackWithError(res, 'Erro ao inserir endereço.', err);
				}

				// 3. Inserir comprador
				connection.query('INSERT INTO compradores (comprador, email, email_faturamento) VALUES (?, ?, ?)', [nomeComprador, mailContato, mailFaturado], (err, compradorResult) => {
					if (err) {
						console.error('Erro ao inserir comprador:', err);
						return rollbackWithError(res, 'Erro ao inserir comprador.', err);
					}
					const compradorId = compradorResult.insertId;

					// 4. Vincular comprador à empresa
					connection.query('INSERT INTO compradores_empresas (comprador, empresas) VALUES (?, ?)', [compradorId, empresaId], (err) => {
						if (err) {
							console.error('Erro ao vincular comprador à empresa:', err);
							return rollbackWithError(res, 'Erro ao vincular comprador à empresa.', err);
						}

						// Commit se tudo deu certo
						connection.commit((err) => {
							if (err) {
								console.error('Erro ao confirmar transação:', err);
								return rollbackWithError(res, 'Erro ao confirmar transação.', err);
							}

							res.status(201).json({
								message: 'Cadastro realizado com sucesso!',
								empresaId,
								compradorId,
							});
						});
					});
				});
			});
		});
	});

	// Função auxiliar para rollback e envio de erro
	function rollbackWithError(res, message, error) {
		connection.rollback(() => {
			res.status(500).json({ message, error: error.message });
		});
	}
}
