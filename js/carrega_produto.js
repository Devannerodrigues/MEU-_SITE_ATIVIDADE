//IMPORTANDO O ARRAY DOS PRODUTOS
import { produtos } from "./produtos.js";

//PEGANDO ELEMENTOS O DOM
const section_cards = document.querySelector('#cards')  

//FUNÇÃO PARA CARREGAER OS PRODUTOS
const listaprodutos = () => {  
    section_cards.innerHTML = ''
    produtos.forEach((elem, i) => {  
        const divCard = document.createElement('div')
        divCard.setAttribute('class', 'card')

        const imgProduto = document.createElement('img')
        imgProduto.setAttribute('src', elem.caminho_da_imagm)  
        imgProduto.setAttribute('alt', elem.descricao_produto)
        imgProduto.setAttribute('class', 'img_card')

        const h2Titulo = document.createElement('h2')
        h2Titulo.innerHTML = elem.descricao_produto

        const divValor = document.createElement('h3')  
        divValor.setAttribute('class', 'valor_card')
        divValor.innerHTML = `R$ ${parseFloat(elem.valor_unitario).toFixed(2).replace('.', ',')}`
        const bntCard = document.createElement('button')
        bntCard.setAttribute('class', 'bnt_card')  
        bntCard.innerHTML = 'Adicionar'

        divCard.appendChild(imgProduto)  
        divCard.appendChild(h2Titulo)  
        divCard.appendChild(divValor)  
        divCard.appendChild(bntCard)

        section_cards.appendChild(divCard)
    })
}

listarProdutos() 

//FILTRANDO AS SEÇÕES COM A COLEÇÃO map
const listarSecoes = () => { 
    const secoesFiltradas = new Map()  

    produtos.forEach((elem, i) => {
        secoesFiltradas.set(elem.id_secao, elem)  
    })

    const secoesMenu = Array.from(secoesFiltradas.values())  

    return secoesMenu
}

//MONTANDO OS LINKS SEÇÕES
const montarSecoes = () => {
    //PEGANDO O ELEMENTO DOM
    const ulMenu = document.querySelector('#menu-secoes')
    //
    ulMenu.innerHTML = ''

    listarSecoes().forEach((elem, i) => {
        const liSecao = documento.createElement('li')
        const aSecao = document.createElement('a')
        aSecao.setAttribute('href', '#')
        aSecao.setAttribute('class','lnk-secao')
        aSecao.innerHTML = elem.nome_secao
        aSecao.addEventListener('click',()=>{
            console.log(elem.id_secao)
        })

        liSecao.appendChild(aSecao)

        ulMenu.appendChild(liSecao)
    })  
}

montarSecoes()

//FILTRANDO PRODUTOS
const produtosFiltrados = (idSecao)=>{
    return produtos.filter(elem=> elem.id_secao === idSecao)
}

//MONTANDO CARDS
const montandoCards = (objArray)=>{
    
}