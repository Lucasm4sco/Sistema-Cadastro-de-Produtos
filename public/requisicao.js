import { loja, adicionaProdutos } from './js/classes.js';

async function getProdutos(){

    adicionaProdutos();

    const promisse = await fetch('https://api-pr0dutos.herokuapp.com/produtos');

    const produtos = await promisse.json();


    produtos.forEach(produto => {
        loja.setProduto(produto)
    });

    console.log(loja)
    return
}

async function setNewProduto(produto){

    await axios.post('https://api-pr0dutos.herokuapp.com/produtos', produto)

    await getProdutos();

    console.log(loja);

} 

export { getProdutos, setNewProduto }