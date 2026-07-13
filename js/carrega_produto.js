import { produtos } from "./produtos.js";

const sectionCards = document.querySelector("#cards");
const menuSecoes = document.querySelector("#menu-secoes");
const campoPesquisa = document.querySelector("#campo-pesquisa");

let carrinho = [];

function listarProdutos(lista = produtos){

    sectionCards.innerHTML = "";

    lista.forEach(produto=>{

        const card = document.createElement("div");
        card.classList.add("card");


        const imagem = document.createElement("img");
        imagem.src = produto.caminho_da_imagem;
        imagem.alt = produto.descricao_produto;
        imagem.classList.add("img_card");


        const titulo = document.createElement("h2");
        titulo.innerHTML = produto.descricao_produto;


        const valor = document.createElement("h3");
        valor.classList.add("valor_card");
        valor.innerHTML = `R$ ${produto.valor_unitario.toFixed(2).replace(".",",")}`;


        const botao = document.createElement("button");
        botao.classList.add("btn_card");
        botao.innerHTML = "Adicionar";


        // será implementado na parte 2

        botao.addEventListener("click",()=>{

            adicionarCarrinho(produto);

        });


        card.appendChild(imagem);
        card.appendChild(titulo);
        card.appendChild(valor);
        card.appendChild(botao);

        sectionCards.appendChild(card);

    });

}

function listarSecoes(){

    const mapa = new Map();

    produtos.forEach(produto=>{

        mapa.set(produto.id_secao,produto);

    });

    return [...mapa.values()];

}

function montarSecoes(){

    menuSecoes.innerHTML = "";


    const liTodos = document.createElement("li");

    const aTodos = document.createElement("a");

    aTodos.href="#";

    aTodos.classList.add("lnk-secao");

    aTodos.innerHTML="Todos";


    aTodos.addEventListener("click",(e)=>{

        e.preventDefault();

        listarProdutos();

    });


    liTodos.appendChild(aTodos);

    menuSecoes.appendChild(liTodos);



    listarSecoes().forEach(secao=>{

        const li = document.createElement("li");

        const a = document.createElement("a");

        a.href="#";

        a.classList.add("lnk-secao");

        a.innerHTML = secao.nome_secao;



        a.addEventListener("click",(e)=>{

            e.preventDefault();

            const lista = produtos.filter(produto=>{

                return produto.id_secao === secao.id_secao;

            });

            listarProdutos(lista);

        });

        li.appendChild(a);

        menuSecoes.appendChild(li);

    });

}

function salvarCarrinho(){

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

}


function carregarCarrinho(){

    const dados = localStorage.getItem("carrinho");

    if(dados){

        carrinho = JSON.parse(dados);

    }

}


function adicionarCarrinho(produto){

    const existe = carrinho.find(item => item.id_produto === produto.id_produto);


    if(existe){

        existe.quantidade++;

    }

    else{

        carrinho.push({

            id_produto: produto.id_produto,
            descricao_produto: produto.descricao_produto,
            caminho_da_imagem: produto.caminho_da_imagem,
            valor_unitario: produto.valor_unitario,
            quantidade:1

        });

    }

    salvarCarrinho();

    montarCarrinho();

    atualizarContador();

    alert("Produto adicionado ao carrinho!");

}


function atualizarContador(){

    const contador = document.querySelector("#contador-carrinho");

    if(!contador) return;

    let quantidade = 0;

    carrinho.forEach(produto=>{

        quantidade += produto.quantidade;

    });

    contador.innerHTML = quantidade;

}


if(campoPesquisa){

    campoPesquisa.addEventListener("keyup",()=>{

        const texto = campoPesquisa.value.toLowerCase();

        const lista = produtos.filter(produto=>{

            return produto.descricao_produto
                .toLowerCase()
                .includes(texto);

        });

        listarProdutos(lista);

    });

}

function removerCarrinho(idProduto){

    carrinho = carrinho.filter(produto => produto.id_produto !== idProduto);

    salvarCarrinho();

    montarCarrinho();

    atualizarContador();

}


function limparCarrinho(){

    carrinho = [];

    salvarCarrinho();

    montarCarrinho();

    atualizarContador();

}


function calcularTotal(){

    let total = 0;

    carrinho.forEach(produto=>{

        total += produto.valor_unitario * produto.quantidade;

    });

    return total;

}


function aumentarQuantidade(idProduto){

    const produto = carrinho.find(item => item.id_produto === idProduto);

    if(produto){

        produto.quantidade++;

        salvarCarrinho();

        montarCarrinho();

        atualizarContador();

    }

}


function diminuirQuantidade(idProduto){

    const produto = carrinho.find(item => item.id_produto === idProduto);

    if(!produto) return;

    produto.quantidade--;

    if(produto.quantidade <= 0){

        removerCarrinho(idProduto);

        return;

    }

    salvarCarrinho();

    montarCarrinho();

    atualizarContador();

}


function obterCarrinho(){

    return carrinho;

}


function montarCarrinho(){

    const tabela = document.querySelector("#lista-carrinho");

    if(!tabela) return;

    tabela.innerHTML="";

    let total = 0;

    carrinho.forEach(produto=>{

        const subtotal = produto.quantidade * produto.valor_unitario;

        total += subtotal;

        tabela.innerHTML += `

        <tr>

            <td>

                <img src="../${produto.caminho_da_imagem}" width="80">

            </td>

            <td>

                ${produto.descricao_produto}

            </td>

            <td>

                R$ ${produto.valor_unitario.toFixed(2).replace(".",",")}

            </td>

            <td>

                <button onclick="diminuirQuantidade(${produto.id_produto})">-</button>

                ${produto.quantidade}

                <button onclick="aumentarQuantidade(${produto.id_produto})">+</button>

            </td>

            <td>

                R$ ${subtotal.toFixed(2).replace(".",",")}

            </td>

            <td>

                <button onclick="removerCarrinho(${produto.id_produto})">

                    Remover

                </button>

            </td>

        </tr>

        `;

    });

    const totalGeral = document.querySelector("#total-geral");

    if(totalGeral){

        totalGeral.innerHTML =
        `Total: R$ ${total.toFixed(2).replace(".",",")}`;

    }

}   



carregarCarrinho();

if(sectionCards){

    listarProdutos();

}

if(menuSecoes){

    montarSecoes();

}

atualizarContador();

montarCarrinho();


window.aumentarQuantidade = aumentarQuantidade;
window.diminuirQuantidade = diminuirQuantidade;
window.removerCarrinho = removerCarrinho;

export {

    obterCarrinho,
    removerCarrinho,
    aumentarQuantidade,
    diminuirQuantidade,
    limparCarrinho,
    montarCarrinho,
    calcularTotal

};
