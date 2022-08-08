import fs from 'fs/promises';
import {criarProduto} from '../public/js/classes.js'

async function lerArquivo(){

    const buffer = await fs.readFile('./data/loja.json');
    const dados = JSON.parse(buffer)
    return dados
}

async function gravarArquivo(produto, valor, categoria){

    const dadosLoja = await lerArquivo();

    const id = dadosLoja.produtos.length + 1;
    const novoProduto = criarProduto(produto, valor, categoria, id);

    dadosLoja.produtos.push(novoProduto);

    await fs.writeFile('./data/loja.json', JSON.stringify(dadosLoja));

    return dadosLoja;
}

async function gerarCategorias(){
    
    const loja = await lerArquivo();

    const todasCategorias = loja.produtos.map( produto => produto.categoria );

    const categorias = new Set(todasCategorias);

    return { categorias, loja } 
}

async function gerarHTMLCategorias(){
    
    const {categorias, loja} = await gerarCategorias();

    const gerarProdutos = (categoria) => {

        const produtosCorrespondente = loja.produtos.filter( produto => produto.categoria == categoria );

        console.log(produtosCorrespondente);
        const HTMLprodutos = produtosCorrespondente.reduce( (acumulador, produto) => {
            
            acumulador += `
            <li class="produto">
                <p>${produto.produto}</p> <span>${produto.valor} </span>
            </li>`
            
            return acumulador

        }, '' )

        return HTMLprodutos;
        
    }

    let HTMLcategorias = '';

    for(let categoria of categorias){
        
        const produtos = gerarProdutos(categoria);
        HTMLcategorias += `
        <li class="${categoria}">
            <details>
                <summary>
                    <p> ${categoria} </p> <span class="simbolo"> ‹ </span> 
                </summary>
                ${produtos}
            </details>
        </li>`
    }

    return HTMLcategorias
}

async function gerarHTMLProdutos(){

    const {categorias, loja} = await gerarCategorias();

    loja.produtos.sort( (produto1, produto2) => produto1.id > produto2.id ? 1: produto1.id == produto2.id?  0 : -1 );

    let HTMLprodutos = '';
    for( let produto of loja.produtos ){

        HTMLprodutos += `
            <li>
                <p> ${produto.produto} </p> <span class="id"> ${produto.id} </span>
                <span class="categoria"> ${produto.categoria} </span> 
            </li>
        `
    }

    return HTMLprodutos;
}

export {lerArquivo, gravarArquivo, gerarHTMLCategorias, gerarHTMLProdutos}