//pega o endereço usando o CEP
function pegaEndereco(inputCep){
	var valorCep = inputCep.value.replace("-", "");
	let replaceCep = /[^\d-]/;
	if(replaceCep.test(inputCep.value)){
		inputCep.value = inputCep.value.replace(/[^\d-]/g, "");
	}

	if(validaCep(inputCep)){
		var httpCep = new XMLHttpRequest();
		httpCep.open("GET", `https://viacep.com.br/ws/${valorCep}/json`, true);

		httpCep.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				let resp = JSON.parse(this.response);
				var cepFeedback = document.getElementById("cepFeedback");

				if(resp.logradouro == undefined){
					inputCep.classList.add("is-invalid");
					cepFeedback.innerText = "Cep invalido!";
					limpaInput();
				} else {
					inputCep.classList.remove("is-invalid");
					populaInput(resp);
				}			
			}
		}
		httpCep.send();
	}
}

function mascaraCep(input){
	input.value = input.value.replace(/^(\d{5})$/, "$1-");
}

function cepInvalido(input){
	let padraoCep = /\d{5}-\d{3}/;

	if(validaInput(input, padraoCep)){
		return true;
	} else {
		inputCep.classList.add("is-invalid");
		cepFeedback.innerText = "Cep vazio ou incompleto!";
		limpaInput();
	}
}

//pega os dados, transforma em objeto e popula os inputs de endereço
function populaInput(dados){
	document.getElementById("inputRua").value = dados.logradouro;
	document.getElementById("inputBairro").value = dados.bairro;
	document.getElementById("inputCidade").value = dados.localidade;
	document.getElementById("inputUf").value = dados.uf;
}

function limpaInput(){
	document.getElementById("inputRua").value = "";
	document.getElementById("inputBairro").value = "";
	document.getElementById("inputCidade").value = "";
	document.getElementById("inputUf").value = "";
}

//verifica se o Cep está correto
function validaCep(valorCep){
	let padraoCep = /[\d]{5}-[\d]{3}/;
	if(validaInput(inputCep, padraoCep)){
		return true;
	}
}

//verifica se o Nome está vazio ou contém caracteres especiais
function validaNome(input, feedback){
	let nome = input.value;
	let padraoNome = /[a-zà-ú]/gi;
	const nomeFeedback = document.getElementsByClassName("nomeFeedback");

	if(validaInput(input, padraoNome)){
		input.classList.remove("is-invalid");
		return true;
	} else {
		input.classList.add("is-invalid");
		nomeFeedback[feedback].innerText = "Nome está vazio ou contém caracteres especiais";
	}
}

function nomeReplace(input){
	input.value = input.value.replace(/[^a-zà-ú ]/gi, "");
}

function validaEmail(input){
	let padraoEmail = /^[^\W-_](\w|\.(?!\.))*@\w+\.(?!\.)(\w|\.(?!\.))*[^\W-_]$/;

	if(validaInput(input, padraoEmail)){
		input.classList.remove("is-invalid");
		return true;
	} else {
		input.classList.add("is-invalid");
		document.getElementById("emailFeedback").innerText = "Email está vazio ou não corresponde ao formato de email";
	}
}

function mascaraCpf(input){
	let valor = input.value;
	
	//mascara CPF / CNPJ
	if(valor.length < 14){
		valor = valor.replace(/^(\d{3})(?!\.)/, "$1.");
		valor = valor.replace(/^(\d{3})\.(\d{3})(?!\.)/, "$1.$2.");
		valor = valor.replace(/^(\d{3})\.(\d{3})\.(\d{3})(?!\-)/, "$1.$2.$3-");
	} else if (valor.length == 14){
		let cnpj = valor.replace(/[\.-]/g, "");
		valor = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(?!\/)/, "$1.$2.$3/");
	} else{
		valor = valor.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(?!-)/, "$1.$2.$3/$4-");
	} 

	input.value = valor;
}

function replaceCpf(input){
	input.value = input.value.replace(/[^\d-/\.]/g, "");
}

function validaCpf(input){
	let padraoCpfCnpj;
	if(input.value.length <= 14){
		padraoCpfCnpj = /\d{3}\.\d{3}\.\d{3}-\d{2}/;
	} else {
		padraoCpfCnpj = /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/;
	}
	if(validaInput(input, padraoCpfCnpj)){
		input.classList.remove("is-invalid");
		return true;
	} else {
		input.classList.add("is-invalid");
		document.getElementById("cpfFeedback").innerText = "CPF/CNPJ está vazio ou incompleto!";
	}
}

//Telefone
function mascaraTelefone(input, event, digit){
	let key = event.keyCode;
	let telefone = input.value.replace(/[\(\)-]/g, "");

	if(key != 8){
		telefone = telefone.replace(/^(\d{2})/, "($1)");
		if(digit == 4){
			telefone = telefone.replace(/(\d{4})/, "$1-");
		} else {
			telefone = telefone.replace(/(\d{5})/, "$1-");
		}
		 
		input.value = telefone;
	}
}

function telefoneReplace(input){
	input.value = input.value.replace(/[^\d\(\)-]/g, "");
}

function validaTelefone(input, feedback){
	let padraoTelefone = /^\([\d]{2}\)[\d]{4,5}-[\d]{4}/;

	if(validaInput(input, padraoTelefone)){
		input.classList.remove("is-invalid");
		return true;
	} else {
		input.classList.add("is-invalid");
		document.getElementsByClassName("telefoneFeedback")[feedback].innerText = "Telefone está vazio ou incompleto!";
	}
}

function numeroReplace(input){
	input.value = input.value.replace(/\D/g, "");
}

function validaNumero(input){
	if(validaInput(input, /\d/g)){
		input.classList.remove("is-invalid");
		return true;
	} else {
		input.classList.add("is-invalid");
		document.getElementById("numeroFeedback").innerText = "Número está vazio!";
	}
}

//verifica se o input esta vazio e compara com a regexp
function validaInput(input, padrao){
	if(input.value != "" && padrao.test(input.value)){
		return true;
	}
}

function verificaInputs(){
	const inputs = document.getElementsByTagName("input");
	let ok = false;

	//verifica todos inputs
	if(validaNome(inputs[0], 0)){
		ok = true;
	} else { ok = false; }
	if(validaNome(inputs[1], 1)){
		ok = true;
	} else { ok = false; }
	if(validaEmail(inputs[2])){
		ok = true;
	} else { ok = false; }
	if(validaCpf(inputs[3])){
		ok = true;
	} else { ok = false; }
	if(validaTelefone(inputs[4], 0)){
		ok = true;
	} else { ok = false; }
	if(validaTelefone(inputs[5], 1)){
		ok = true;
	} else { ok = false; }
	if(cepInvalido(inputs[6])){
		ok = true;
	} else { ok = false; }
	if(inputs[7].value == ""){
		ok = false;
	} else { ok = true; }
	if(validaNumero(inputs[8])){
		ok = true;
	} else { ok = false; }

	return ok;
}


localStorage.clear();

//salva os dados no localStorage
function salvar(){
	if(verificaInputs()){
		console.log("Nice!");

		let ID = localStorage.length;
		const inputs = document.getElementsByTagName("input");

		let dados = {
			ID: ID,
			nome: inputs[0].value,
			sobrenome: inputs[1].value,
			email: inputs[2].value,
			cpf: inputs[3].value,
			telefone: inputs[4].value,
			celular: inputs[5].value,
			cep: inputs[6].value,
			rua: inputs[7].value,
			numero: inputs[8].value,
			bairro: inputs[9].value,
			cidade: inputs[10].value,
			uf: inputs[11].value
		};
		
		localStorage.setItem(`ID ${ID}`, JSON.stringify(dados));
		console.log(localStorage);
	}
}