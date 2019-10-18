//variaveis de validação
let nome = false, sobrenome = false, email = false, cpf = false, telefone = false, celular = false, cep = false, numero = false;

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
				cepFeedback.innerText = "";

				if(resp.logradouro == undefined){
					inputCep.classList.add("is-invalid");
					cepFeedback.innerText = "Cep invalido!";
					cep = false;
					limpaInput();
				} else {
					inputCep.classList.remove("is-invalid");
					cep = true;
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
		cepFeedback.innerText = "";
		return true;
	} else {
		inputCep.classList.add("is-invalid");
		cepFeedback.innerText = "Cep vazio ou incompleto!";
		cep = false;
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
	let padraoNome = /[\D]{3}?/g;
	const nomeFeedback = document.getElementsByClassName("nomeFeedback");

	if(validaInput(input, padraoNome)){
		input.classList.remove("is-invalid");
		nomeFeedback[feedback].innerText = "";
		if(feedback == 0){
			nome = true;
		} else {
			sobrenome = true;
		}
		return true;
	} else {
		input.classList.add("is-invalid");
		nomeFeedback[feedback].innerText = "Nome deve ter no mínimo três caracteres!";
		if(feedback == 0){
			nome = false;
		} else {
			sobrenome = false;
		}
	}
}

function nomeReplace(input){
	input.value = input.value.replace(/[\d]/g, "");
}

function validaEmail(input){
	let padraoEmail = /^[^\W-_](\w|\.(?!\.))*@\w+\.(?!\.)(\w|\.(?!\.))*[^\W-_]$/;

	if(validaInput(input, padraoEmail)){
		input.classList.remove("is-invalid");
		document.getElementById("emailFeedback").innerText = "";
		email = true;
		return true;
	} else {
		input.classList.add("is-invalid");
		document.getElementById("emailFeedback").innerText = "Email está vazio ou não corresponde ao formato de email";
		email = false;
	}
}

function mascaraCpf(input, event){
	let valor = input.value;
	let cpf = valor.replace(/[.\-\/]/g, "");
	let key = event.keyCode;
	

	if(key != 8){
		if(cpf.length == 3){
			valor = cpf.replace(/(\d{3})/, "$1.");
		}
		else if(cpf.length == 6){
			valor = cpf.replace(/(\d{3})(\d{3})/, "$1.$2.");
		}
		else if(cpf.length == 9){
			valor = cpf.replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3-");
		}
		else if(cpf.length == 11){
			valor = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
		}
		else if(cpf.length == 12){
			valor = cpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, "$1.$2.$3/$4-");
		}
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
			document.getElementById("cpfFeedback").innerText = "";
			cpf = true;
			return true;
		} else {
			input.classList.add("is-invalid");
			document.getElementById("cpfFeedback").innerText = "CPF/CNPJ está vazio ou incompleto!";
			cpf = false;
		}		
}

//Telefone
function mascaraTelefone(input, digit){
	let key = event.keyCode;
	let telefone = input.value.replace(/[\(\)-]/g, "");

	telefone = telefone.replace(/^(\d{2})/, "($1)");
	if(digit == 4){
		telefone = telefone.replace(/(\d{4})/, "$1-");
	} else {
		telefone = telefone.replace(/(\d{5})/, "$1-");
	}
		 
	input.value = telefone;
}

function telefoneReplace(input){
	input.value = input.value.replace(/[^\d\(\)-]/g, "");
}

function validaTelefone(input, feedback){
	let padraoTelefone = /^\([\d]{2}\)[\d]{4,5}-[\d]{4}/;

	if(validaInput(input, padraoTelefone)){
		input.classList.remove("is-invalid");
		document.getElementsByClassName("telefoneFeedback")[feedback].innerText = "";
		if(feedback == 0){
			telefone = true;
		} else {
			celular = true;
		}
		return true;
	} else {
		input.classList.add("is-invalid");
		document.getElementsByClassName("telefoneFeedback")[feedback].innerText = "Telefone está vazio ou incompleto!";
		if(feedback == 0){
			telefone = false;
		} else {
			celular = false;
		}
	}
}

function numeroReplace(input){
	input.value = input.value.replace(/\D/g, "");
}

function validaNumero(input){
	if(validaInput(input, /\d/g)){
		input.classList.remove("is-invalid");
		document.getElementById("numeroFeedback").innerText = "";
		numero = true;
		return true;

	} else {
		input.classList.add("is-invalid");
		document.getElementById("numeroFeedback").innerText = "Número está vazio!";
		numero = false;
	}
}

//verifica se o input esta vazio e compara com a regexp
function validaInput(input, padrao){
	if(input.value != "" && padrao.test(input.value)){
		return true;
	}
}

function allVarChange(value){
	nome = value, sobrenome = value, email = value, cpf = value, telefone = value, celular = value, cep = value, numero = value;
}

function verificaInputs(){
	let ok = true;
	const btnSalvar = document.getElementById("btnSalvar");

	//verifica todos inputs
	if(nome == false){
		ok = false;
	}
	if(sobrenome == false){
		ok = false;
	}
	if(email == false){
		ok = false;
	}
	if(cpf == false){
		ok = false;
	}
	if(telefone == false){
		ok = false;
	}
	if(celular == false){
		ok = false;
	}
	if(cep == false){
		ok = false;
	}
	if(numero == false){
		ok = false;
	}

	if(ok == false){
		btnSalvar.setAttribute("disabled", "true");
		return false;
	}
	btnSalvar.removeAttribute("disabled");
	return true;
}

//apaga toda a tabela, e coloca de volta voltando os dados armazenados.
function atualizaTabela(){
	const listaDados = document.getElementById("listaDados");
	const tblDados = document.getElementById("tblDados");

	listaDados.innerHTML = "";
	let ok = false;

	for(i = 0; i < localStorage.length; i++){
		let dados = JSON.parse(localStorage.getItem(`ID ${i}`));

		const tr = document.createElement("tr");
		listaDados.appendChild(tr);

		tr.classList.add("linha");

		if(dados != null){
			ok = true;
			criaTd(dados.ID, tr);
			criaTd(dados.nome, tr);
			criaTd(dados.sobrenome, tr);
			criaTd(dados.email, tr);
			criaTd(dados.cpf, tr);
			criaTd(dados.telefone, tr);
			criaTd(dados.celular, tr);
			criaTd(dados.cep, tr);
			criaTd(dados.numero, tr);
			criaTd("<input onclick=\"selectTd(this)\" type=\"checkbox\">", tr)
		}
	}

	const btnExcluir = document.getElementById("btnExcluir");
	const btnEditar = document.getElementById("btnEditar");

	if(ok == false){
		tblDados.setAttribute("hidden", "true");
		btnEditar.setAttribute("disabled", "true");
		btnExcluir.setAttribute("disabled", "true");
	} else {
		tblDados.removeAttribute("hidden");
		btnEditar.removeAttribute("disabled");
		btnExcluir.removeAttribute("disabled");
	}
}

function selectTd(checkbox){
	if(checkbox.checked == true){
		checkbox.parentNode.parentNode.classList.add("table-primary");
	} else {
		checkbox.parentNode.parentNode.classList.remove("table-primary");
	}
}

//cria td da tabela e insere o texto nela
function criaTd(text, tr){
	let td = document.createElement("td");
	tr.appendChild(td);
	td.innerHTML = text;
}

function excluir(){
	editando = false;
	let linhaSelecionada = document.getElementsByClassName("table-primary");

	for(let i = 0; i < linhaSelecionada.length; i++){
		colunas = linhaSelecionada[i].children;
		id = colunas[0].innerText;
		localStorage.setItem(`ID ${id}`, "null");
	}
	atualizaTabela();
}

var editando = false;
function editar(){
	allVarChange(true);
	document.getElementById("btnSalvar").removeAttribute("disabled");
	let linhaSelecionada = document.getElementsByClassName("table-primary");
	if(linhaSelecionada.length > 1){
		alert("Escolha apenas uma linha para editar!");
		return;
	}
	colunas = linhaSelecionada[0].children;
	const inputs = document.getElementsByTagName("input");

	for(i = 0; i < 7; i++){
		inputs[i].value = colunas[i+1].innerText;
	}
	inputs[8].value = colunas[8].innerText;
	pegaEndereco(inputs[6]);
	editando = true;
}
function buttonActive(){
	const inputs = document.getElementsByTagName("input");
	for(let i = 0; i < 12; i++){
		inputs[i].addEventListener("blur", function(){
			verificaInputs();
		})
	}
}

//salva os dados no localStorage
function salvar(){
	const btnSalvar = document.getElementById("btnSalvar");
	const loading = document.getElementById("loading");
	loading.removeAttribute("hidden");
	setTimeout(function(){
		if(verificaInputs())
		{
			let ID;
	
			if(editando == true){
				let linha = document.getElementsByClassName("table-primary");
				ID = linha[0].children[0].innerText;
				editando = false;
			} else {
				ID = localStorage.length;
			}
			
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
			
			for(i in inputs){
				inputs[i].value = "";
			}
			btnSalvar.setAttribute("disabled", "true");
			atualizaTabela();
			loading.setAttribute("hidden", "true");
	
			//reseta as variaveis de validação
			allVarChange(false);
		}
	}, 2000);
}

window.onload = function() {
	buttonActive();
	atualizaTabela();
}