//pega o endereço usando o CEP
function pegaEndereco(inputCep){
	var valorCep = inputCep.value;
	inputCep.value = valorCep.replace(/\D/g, "");
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

//verifica se o Cep tem 8 digitos
function validaCep(valorCep){
	let padraoCep = /[0-9]{8}/;
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

function validaCpf(input){
	
}

function validaTelefone(input){
	let telefone = input.value;
	let padraoTelefone = /[0-9]{10}/;

	if(validaInput(input, padraoTelefone)){
		console.log("Nice");
	} else {
		console.log("fail");
	}
}

function validaCelular(input){

}

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