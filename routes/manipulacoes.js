import fs from 'fs/promises';
import {Produto, loja, Loja} from '../public/js/classes.js'

async function lerArquivo(){

    const buffer = await fs.readFile('./data/loja.json');
    const dados = JSON.parse(buffer)
    return dados
}

async function gravarArquivo(produto, valor, categoria){

    const dadosLoja = await lerArquivo();

    const verificar = produtosExistentes(dadosLoja, produto)

    if(!verificar){
        return false
    }

    const id = dadosLoja.produtos[dadosLoja.produtos.length - 1].id + 1;

    if(id == undefined || isNaN(id)) id = 1;

    const novoProduto = Produto.criarProduto(produto, valor, categoria, id);

    dadosLoja.produtos.push(novoProduto);

    await fs.writeFile('./data/loja.json', JSON.stringify(dadosLoja));

    return dadosLoja;
}

async function retornarDadosAntigos(){

    Loja.adicionaProdutosEstaticos(loja);

    await fs.writeFile('./data./loja.json', JSON.stringify(loja))

    return
}

function produtosExistentes(loja, nomenovoProduto){

    const nomesiguais = loja.produtos.filter(produto => produto.produto == nomenovoProduto
    );
    
    
    if(nomesiguais.length != 0){
        return false
    }

    return true
    
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

        const HTMLprodutos = produtosCorrespondente.reduce( (acumulador, produto) => {
            
            const valor = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.valor)
            acumulador += `
            <li class="produto">
                <p>${produto.produto}</p> <span>${valor} </span>
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

        const valor = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.valor);

        HTMLprodutos += `
            <li>
                <p> ${produto.produto} </p>  <span class="valor"> ${valor} </span>  <span class="id"> #${produto.id} </span>
                <span class="categoria"> ${produto.categoria} </span> 
            </li>
        `
    }

    return HTMLprodutos;
}

async function deletandoProduto(id){

    const loja = await lerArquivo();

    const arrayProdutos = loja.produtos.filter( produto => produto.id != id)

    loja.produtos = arrayProdutos

    await fs.writeFile('./data/loja.json', JSON.stringify(loja));
}

export {lerArquivo, gravarArquivo, gerarHTMLCategorias, gerarHTMLProdutos, retornarDadosAntigos, deletandoProduto}