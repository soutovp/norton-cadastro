let { form, cnpj, nome, logradouro, numero, complemento, cep, cidade, bairro } = '';
form = document.getElementById('form_cadastro_empresa');
cnpj = document.getElementById('cnpj');
nome = document.getElementById('nome');
logradouro = document.getElementById('logradouro');
numero = document.getElementById('numero');
complemento = document.getElementById('complemento');
cep = document.getElementById('cep');
cidade = document.getElementById('cidade');
bairro = document.getElementById('bairro');
const resultado = document.getElementById('resultado');

form.addEventListener('submit', async (e) => {
	e.preventDefault();
	const data = {
		cnpj: cnpj.value,
		nome: nome.value,
		logradouro: logradouro.value,
		numero: numero.value,
		complemento: complemento.value,
		cep: cep.value,
		cidade: cidade.value,
		bairro: bairro.value,
	};
	cadastrarEmpresa(data);
});

async function cadastrarEndereco(data) {
	console.log('dados são :');
	console.log(data);
	console.log('------------');
	try {
		const response = await fetch('/cadastros/enderecos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				logradouro: data.logradouro,
				numero: data.numero,
				complemento: data.complemento,
				cep: data.cep,
				cidade: data.cidade,
				bairro: data.bairro,
				empresa_id: data.empresa_id,
			}),
		});
		if (response.ok) {
			const result = await response.json();
			resultado.style.color = 'green';
			resultado.innerText = 'Cadastro realizado com sucesso';
		} else {
			const error = await response.json();
			console.error('Erro ao inserir:', error);
			resultado.style.color = 'red';
			resultado.innerText = error.message;
		}
	} catch (error) {
		console.error('Erro na requisição:', error);
	}
}

async function cadastrarEmpresa(data) {
	let resultadoId = {};
	try {
		const response = await fetch('/cadastros/empresas', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				nome: data.nome,
				cnpj: data.cnpj,
			}),
		});
		if (response.ok) {
			const result = await response.json();
			console.log('Sucesso:', result);
			cadastrarEndereco({
				logradouro: data.logradouro,
				numero: data.numero,
				complemento: data.complemento,
				cep: data.cep,
				cidade: data.cidade,
				bairro: data.bairro,
				empresa_id: result.id,
			});
		} else {
			const error = await response.json();
			console.error('Erro ao inserir:', error);
			resultado.style.color = 'red';
			resultado.innerText = error.message;
		}
	} catch (error) {
		console.error('Erro na requisição:', error);
	}
}
