async function buscarCEP() {

    const numeroCEP = cep.value.replace(/\D/g, "");

    if (numeroCEP.length !== 8) {
        alert("CEP inválido.");
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