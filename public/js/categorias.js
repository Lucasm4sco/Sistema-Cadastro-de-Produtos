import { loja } from './classes.js'
import { getProdutos } from '../requisicao.js';

getProdutos()

console.log(loja);

const listaCategorias = document.querySelector('#lista');
let categoriasJaColocadas = [];

function produtosCorrespondente(categoria){

    const produtos = loja.produtos.filter( produto => produto.categoria == categoria );

    let li = '';

    produtos.forEach( element => li += `<li>${element.produto} <span>${element.valor}</span></li>` )

    return li

}

async function gerarCategorias() {

    await getProdutos();

    let categorias = loja.produtos.reduce((acumulador, produto) => {

        if (categoriasJaColocadas.indexOf(produto.categoria) == -1) {

            categoriasJaColocadas.push(produto.categoria)

            const listaProdutos = produtosCorrespondente(produto.categoria)

            return acumulador += `<li class="${produto.categoria}"> 
                            <details> 
                            <summary> <p>${produto.categoria}</p> <span class="simbolo"> ‹ </span> </summary> 
                            ${listaProdutos}
                            </details> 
                            </li>`;
        };



        return acumulador += '';

    }, '')

    listaCategorias.innerHTML = categorias;
}

gerarCategorias()
