import { loja, criarProduto } from './classes.js';


import { getProdutos, setNewProduto } from '../requisicao.js'

getProdutos()


const categoria = document.querySelector('#categorias');
const divCategoria = document.querySelector('#divCategoria');
const produto = document.querySelector('#name');
const valorProduto = document.querySelector('#valor');
const novaCategoria = document.querySelector('#novaCategoria');


// define a categoria que o produto irá receber
const mostrarNovaCategoria = () => {
    if(categoria.value == 'Generica'){
        divCategoria.removeAttribute('hidden');
        return
    }
    divCategoria.setAttribute('hidden', 'hidden');
}


mostrarNovaCategoria();

categoria.addEventListener('change', mostrarNovaCategoria);

const botaoCadastro = document.querySelector('button');

// enviando novo produto para a API
botaoCadastro.addEventListener('click', () => {

    let categoriaProduto = categoria.value;

    if(produto.value == '' || valorProduto.value == ''){
        alert('Preencha os campos corretamente: ');
        return
    }
    if(categoria.value == 'Generica'){
        if(novaCategoria.value == ''){
            alert('Informe a categoria');
            return
        }
        categoriaProduto = novaCategoria.value;
    }

    const novoProduto = criarProduto(produto.value, valorProduto.value, categoriaProduto);

    setNewProduto(novoProduto);
})

const botaoMenu = document.querySelector('.menu');
const menu = document.querySelector('nav')
const n1 = document.querySelector('.n1');
const n2 = document.querySelector('.n2');
const n3 = document.querySelector('.n3');
let condicaoAbrirMenu = true;

// configurações botao Menu
botaoMenu.addEventListener('click', () => {
    if(condicaoAbrirMenu){
        menu.style.animation = " menu 1s forwards";
        n1.style.animation = "virar .5s normal forwards";
        n2.style.opacity = "0";
        n3.style.animation = "virar2 .5s normal forwards";

        condicaoAbrirMenu = false;
        
        return
    }

    if(menu.offsetLeft == 0){

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
        setTimeout( () => {
            n2.style.opacity = "1";
        }, 200)

        setTimeout( () => {
            
            condicaoAbrirMenu = true;
            menu.style.left = "0";

            n1.style.top = "0";
            n1.style.transform = "rotate(0deg)";
            
            n3.style.top = "20px";
            n3.style.transform = "rotate(0deg)";
            
        }, 400 ) 
    }
    

})

