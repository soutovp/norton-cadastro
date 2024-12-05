//Elements
const mailContato = document.getElementById('mailContato');
const mailContato_check = document.getElementById('mailContato-check');
const cnpj = document.getElementById('cnpj');
const cnpj_check = document.getElementById('cnpj-check');
const formResponse = document.getElementById('response');
//Formulario
const formularioCompleto = document.getElementById('form_cadastro_geral');
//GET FORM DATA
function getFormData() {
	let data = {
		nomeComprador: '',
		mailContato: '',
		mailFaturado: '',
		nomeEmpresa: '',
		cnpj: '',
		logradouro: '',
		numero: '',
		complemento: '',
		cep: '',
		cidade: '',
		bairro: '',
	};
	formResponse.innerHTML = '';
	let error;
	for (key in data) {
		const elemento = document.getElementById(key);
		if (elemento.attributes['invalid']) {
			const li = document.createElement('li');
			li.style.color = 'red';
			li.innerText = `${elemento.getAttribute('name')} invalido;`;
			formResponse.appendChild(li);
			error = true;
		}
		data[key] = elemento.value;
	}
	if (error) return;
	return data;
}
getFormData();
let inicial;
let contadorCNPJ;
//Constants Publicas
const check = {
	email: {
		yes: {
			url: '/static/images/check.svg',
			alt: 'Dados validados e disponíveis para inserir no banco de dados',
		},
		no: {
			url: '/static/images/no-check.svg',
			alt: 'Este campo já contém dados existentes no banco de dados',
		},
		invalid: {
			url: '/static/images/no-check.svg',
			alt: 'Formato de e-mail inválido.',
		},
	},
	cnpj: {
		yes: {
			url: '/static/images/check.svg',
			alt: 'Dados validados e disponíveis para inserir no banco de dados',
		},
		no: {
			url: '/static/images/no-check.svg',
			alt: 'Este campo já contém dados existentes no banco de dados',
		},
		invalid: {
			url: '/static/images/no-check.svg',
			alt: 'Formato de CNPJ inválido.',
		},
	},
};

// Event Listeners
cnpj.addEventListener('input', async (e) => {
	clearTimeout(contadorCNPJ);
	let cnpj;
	e.currentTarget.value = formatarCNPJ(e.currentTarget.value, 'formatar');
	cnpj_check.innerHTML = '';
	if (validarCNPJ(formatarCNPJ(e.currentTarget.value)) === false) return;
	cnpj = formatarCNPJ(e.currentTarget.value);
	if (cnpj.length >= 14) {
		contadorCNPJ = setTimeout(() => verificarCnpjServidor({ cnpj: cnpj }), 1000);
	}
});
mailContato.addEventListener('input', async (e) => {
	clearTimeout(inicial);
	const email = e.target.value.trim();
	mailContato_check.innerHTML = '';

	if (email === '') return;

	if (!validarEmail(email)) {
		const img = document.createElement('img');
		img.src = check.email.invalid.url;
		img.alt = check.email.invalid.alt;
		mailContato_check.appendChild(img);
		return;
	}
	inicial = setTimeout(() => verificarEmailServidor({ email: email }), 1000);
});
formularioCompleto.addEventListener('submit', (e) => {
	e.preventDefault();
	const data = getFormData();
	console.log(data);
});
// HTTP Requests -------------------
const verificarCnpjServidor = async (data) => {
	try {
		const response = await fetch('http://127.0.0.1/api/empresas/getEmpresaCnpj', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (response.ok) {
			const result = await response.json();
			const img = document.createElement('img');
			const cnpjResult = result.length > 0 ? 'no' : 'yes';
			if (cnpjResult === 'no') cnpj.invalid = 'true';
			console.log(cnpjResult);
			img.src = check.cnpj[cnpjResult].url;
			img.alt = check.cnpj[cnpjResult].alt;
			cnpj_check.appendChild(img);
		}
	} catch (err) {
		console.error(err);
	}
};
const verificarEmailServidor = async (data) => {
	try {
		const response = await fetch('/api/compradores/load/email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (response.ok) {
			const result = await response.json();
			const img = document.createElement('img');
			const mailResult = result.result.length > 0 ? 'no' : 'yes';
			img.src = check.email[mailResult].url;
			img.alt = check.email[mailResult].alt;

			mailContato_check.appendChild(img);
		}
	} catch (err) {
		console.error(err);
	}
};

// ---------------------------------------

// Função para validar estrutura do e-mail
function validarEmail(email) {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para e-mail
	return regex.test(email);
}

function validarCNPJ(cnpj) {
	cnpj = cnpj.replace(/[^\d]+/g, '');
	if (cnpj.length < 14) return false;
}
function formatarCNPJ(cnpj, atividade) {
	// Remove todos os caracteres não numéricos
	cnpj = cnpj.replace(/\D/g, '');
	if (atividade !== 'formatar') return cnpj;
	// Aplica a máscara de acordo com a quantidade de dígitos
	if (cnpj.length <= 2) {
		return cnpj; // Apenas os dois primeiros dígitos
	} else if (cnpj.length <= 5) {
		return cnpj.replace(/^(\d{2})(\d+)/, '$1.$2');
	} else if (cnpj.length <= 8) {
		return cnpj.replace(/^(\d{2})(\d{3})(\d+)/, '$1.$2.$3');
	} else if (cnpj.length <= 12) {
		return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d+)/, '$1.$2.$3/$4');
	} else {
		return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d+)/, '$1.$2.$3/$4-$5');
	}
}
