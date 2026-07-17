const cep = document.querySelector("#cep");
const logradouro = document.querySelector("#logradouro");
const bairro = document.querySelector("#bairro");
const cidade = document.querySelector("#cidade");
const estado = document.querySelector("#estado");

// Executa a função sempre que o usuário digitar no campo CEP
cep.addEventListener("input", buscarCEP);

async function buscarCEP() {

    // Pega apenas os números digitados
    const numeroCEP = cep.value.replace(/\D/g, "");

    // Só consulta quando houver 8 dígitos
    if (numeroCEP.length !== 8) {
        return;
    }

    try {

        const resposta = await fetch(
            `https://viacep.com.br/ws/${numeroCEP}/json/`
        );

        const dados = await resposta.json();

        if (dados.erro) {
            alert("CEP não encontrado.");
            return;
        }

        logradouro.value = dados.logradouro;
        bairro.value = dados.bairro;
        cidade.value = dados.localidade;
        estado.value = dados.uf;

    } catch (erro) {

        alert("Erro ao consultar o CEP.");

    }

}