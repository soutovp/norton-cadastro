const form = document.getElementById('form-cadastro-enderecos');

const logradouro = document.getElementById('logradouro');
const numero = document.getElementById('numero');
const complemento = document.getElementById('complemento');
const cep = document.getElementById('cep');
const cidade = document.getElementById('cidade');
const bairro = document.getElementById('bairro');
const empresa_id = document.getElementById('cnpj');
const validacaoFormulario = document.getElementById('validacaoFormulario');
const resultado = document.querySelector('.resultado');
let empresaId;
let validacaoFormularioGroup = {
	logradouro: '',
	numero: '',
	complemento: '',
	cep: '',
	cidade: '',
	bairro: '',
	cnpj: '',
	dados: '',
};
function changeValidacao(element, value) {
	validacaoFormularioGroup[element] = value;
	validacaoFormulario.innerHTML = '';
	console.log(element);
	console.log(value);
	for (el in validacaoFormularioGroup) {
		if (validacaoFormularioGroup[el] !== '') {
			const p = document.createElement('p');
			p.innerText = validacaoFormularioGroup[el].string;
			p.style.color = validacaoFormularioGroup[el].color;
			validacaoFormulario.appendChild(p);
		}
	}
	validacaoFormulario;
}
empresa_id.addEventListener('input', async (e) => {
	// Remove pontuações e espaços
	const value = e.currentTarget.value.replace(/[^\d]+/g, '');

	if (value.length < 14 || value.length > 14) {
		e.currentTarget.style.borderColor = 'red';
		e.currentTarget.style.outlineColor = 'red';
		e.currentTarget.style.color = 'red';
		validacaoFormulario.innerText = 'CNPJ deve conter 14 digitos';
		validacaoFormulario.style.color = 'red';
	}
	if (value.length === 14) {
		e.currentTarget.style.borderColor = 'green';
		e.currentTarget.style.outlineColor = 'green';
		e.currentTarget.style.color = 'green';
		validacaoFormulario.innerText = '_';
		validacaoFormulario.style.color = 'transparent';
		empresa_id.setAttribute('disabled', 'true');
		try {
			const response = await fetch('/api/empresa/getEmpresaCnpj', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					cnpj: value,
				}),
			});
			if (response.ok) {
				const result = await response.json();
				if (result.length === 0) {
					empresa_id.style.borderColor = 'red';
					empresa_id.style.outlineColor = 'red';
					empresa_id.style.color = 'red';
					empresa_id.removeAttribute('disabled');
					changeValidacao('dados', { string: `CNPJ não encontrado...`, color: 'red' });
				} else {
					empresaId = result[0].id;
					empresa_id.removeAttribute('disabled');
					changeValidacao('dados', { string: `${result[0].nome}`, color: 'green' });
				}
			} else {
				const error = await response.json();
				console.error('Erro ao inserir:', error);
			}
		} catch (err) {
			console.error('Erro na requisição:', err);
		}
	}
});
console.log(form);
form.addEventListener('submit', (e) => {
	e.preventDefault();
	cadastrarEndereco({
		logradouro: logradouro.value,
		numero: numero.value,
		complemento: complemento.value,
		cep: cep.value,
		cidade: cidade.value,
		bairro: bairro.value,
		empresa_id: empresaId,
	});
});

async function cadastrarEndereco(data) {
	console.log(data);
	try {
		const response = await fetch('/cadastros/enderecos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (response.ok) {
			const result = await response.json();
			resultado.style.color = 'green';
			resultado.innerText = 'Cadastro realizado com sucesso';
		} else {
			const error = await response.json();
			console.error('Erro ao inserir:', response.message);
			resultado.style.color = 'red';
			resultado.innerText = error.message;
		}
	} catch (error) {
		console.error('Erro na requisição:', error);
	}
}
