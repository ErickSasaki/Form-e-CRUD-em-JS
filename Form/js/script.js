//pega o endereço usando o CEP
function pegaEndereco(inputCep){
	var valorCep = inputCep.value.replace("-", "");
	let replaceCep = /[^\d-]/;
	if(replaceCep.test(inputCep.value)){
		inputCep.value = inputCep.value.replace(/[^\d-]/g, "");
	}


	inputCep.value = inputCep.value.replace(/^(\d{5})$/, "$1-");

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

function cepInvalido(input){

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
	} else {
		input.classList.add("is-invalid");
		nomeFeedback[feedback].innerText = "Nome está vazio ou contém caracteres especiais";
	}
}

function nomeReplace(input){
	input.value = input.value.replace(/[^a-zà-ú ]/gi, "");
}

function validaCpf(input){
	
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
	} else {
		input.classList.add("is-invalid");
		document.getElementsByClassName("telefoneFeedback")[feedback].innerText = "Telefone está vazio ou incompleto!";
	}
}

function validaCelular(input){

}


//verifica se o input esta vazio e compara com a regexp
function validaInput(input, padrao){
	if(input.value != "" && padrao.test(input.value)){
		return true;
	}
}



function salvar(){
	console.log(inputNome.maxLength);
}

localStorage.clear();
//localStorage.setItem(("id"+localStorage.length), "ruatop");
console.log(localStorage);