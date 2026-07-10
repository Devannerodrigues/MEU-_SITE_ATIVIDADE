import { produtos } from "./produtos.js";

const cards = document.querySelector("#cards");
const menu = document.querySelector("#menu-secoes");
const pesquisa = document.querySelector("#campo-pesquisa");

//===============================
// CARREGAR PRODUTOS
//===============================

function listarProdutos(lista = produtos){

    cards.innerHTML="";

    lista.forEach(produto=>{

        const card=document.createElement("div");
        card.className="card";

        card.innerHTML=`

            <img src="${produto.caminho_da_imagem}" class="img_card">

            <h2>${produto.descricao_produto}</h2>

            <h3 class="valor_card">
            R$ ${produto.valor_unitario.toFixed(2).replace(".",",")}
            </h3>

            <button class="btn_card">
                Adicionar
            </button>

        `;

        cards.appendChild(card);

    });

}

//===============================
// PEGAR SEÇÕES
//===============================

function listarSecoes(){

    const mapa=new Map();

    produtos.forEach(produto=>{

        mapa.set(produto.id_secao,produto);

    });

    return [...mapa.values()];

}

//===============================
// MENU
//===============================

function montarSecoes(){

    menu.innerHTML="";

    const liTodos=document.createElement("li");

    liTodos.innerHTML=`
        <a href="#" class="lnk-secao">
            Todos
        </a>
    `;

    liTodos.onclick=(e)=>{

        e.preventDefault();

        listarProdutos();

    };

    menu.appendChild(liTodos);

    listarSecoes().forEach(secao=>{

        const li=document.createElement("li");

        li.innerHTML=`

        <a href="#" class="lnk-secao">

            ${secao.nome_secao}

        </a>

        `;

        li.onclick=(e)=>{

            e.preventDefault();

            const lista=produtos.filter(produto=>produto.id_secao===secao.id_secao);

            listarProdutos(lista);

        };

        menu.appendChild(li);

    });

}

//===============================
// PESQUISA
//===============================

pesquisa.addEventListener("keyup",()=>{

    const texto=pesquisa.value.toLowerCase();

    const lista=produtos.filter(produto=>{

        return produto.descricao_produto
        .toLowerCase()
        .includes(texto);

    });

    listarProdutos(lista);

});

//===============================
// INICIAR
//===============================

listarProdutos();

montarSecoes();