import{ produtos } from "./produtos.js";

//PEGANDO ELEMENTOS O DOM
const section_cards = document.querySelector(#cards)

//FUNÇÃO PARA CARREGAER OS PRODUTOS
const listaprodutos =()=>{
    section_cards.innerHTML = ''
    produtos.foreach((elem,i)=>{
const divCard = document.createElement('div')
divCard.setAttribute('class','card')

const imgProduto = document.createElement('img')
imgProduto.setAttribute('scr',elem.caminho_da_imagm)
imgProduto.setAttribute('alt',elem.descricao_produto)
imgProduto.setAttribute('class','img_card')

const h2Titulo = document.createElement('h2')
h2Titulo.innerHTML = elem.descricao_produto

const divValor = document.createElement('h3')
divValor.setAttribute('class','valor_card')
divValor.innerHTML`R$ ${parseFloat(elem.valor_unitario).toFixed(2).replace('.',',')}´

const bntCard = document.createElement('button')
bntCard.setAttiribute('class','bnt_card')
bntCard.innerHTML = 'Adicionar'

divCard.appndChild(imgProduto)
divCard.appndChild(h2Tilulo)
divCard.appndChild(h3Valor)
divCard.appndChild(bntCard)

section_cards.appendChild(divCard)

    })
}

listarProdutos()