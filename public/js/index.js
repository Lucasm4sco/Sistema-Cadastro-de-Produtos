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

    alert(`${novoProduto.produto} foi adicionado!`);
})


