import { loja } from './classes.js'
import { getProdutos } from '../requisicao.js';

getProdutos()

const botaoMenu = document.querySelector('.menu');
const menu = document.querySelector('nav')
const n1 = document.querySelector('.n1');
const n2 = document.querySelector('.n2');
const n3 = document.querySelector('.n3');
let condicaoAbrirMenu = true;

//configuraçoes da animacao
function animacaoMenu() {
    if (condicaoAbrirMenu) {
        menu.style.animation = " menu 1s forwards";
        n1.style.animation = "virar .5s normal forwards";
        n2.style.opacity = "0";
        n3.style.animation = "virar2 .5s normal forwards";

        condicaoAbrirMenu = false;

        return
    }

    if (menu.offsetLeft == 0) {

        // atribuindo os valores que teram após a animação finalizar e definindo a outra animação

        menu.style.left = "-100%";
        menu.style.animation = "voltarMenu 1s forwards";

        n1.style.transform = "rotate(-45deg)";
        n1.style.top = "10px";
        n3.style.transform = "rotate(45deg)";
        n3.style.top = "10px";

        n1.style.animation = "retornar .5s normal forwards";
        n3.style.animation = "retornar2 .5s normal forwards";


        //atribuindo condicoes que terão após a execução das animações
        setTimeout(() => {
            n2.style.opacity = "1";
        }, 200)

        setTimeout(() => {

            condicaoAbrirMenu = true;
            menu.style.left = "0";

            n1.style.top = "0";
            n1.style.transform = "rotate(0deg)";

            n3.style.top = "20px";
            n3.style.transform = "rotate(0deg)";

        }, 400)
    }
}

console.log(loja);

botaoMenu.addEventListener('click', animacaoMenu)

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
