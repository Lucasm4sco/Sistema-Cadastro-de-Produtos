 
import { loja } from './js/classes.js';


async function getProdutos(){
    const promisse = await fetch('https://api-pr0dutos.herokuapp.com/produtos');

    const produtos = await promisse.json();

    produtos.forEach(produto => {
        loja.setProduto(produto);
    });

    console.log(loja)
    return
}

async function setNewProduto(produto){

    axios.post('https://api-pr0dutos.herokuapp.com/produtos', produto)

} 

export { getProdutos, setNewProduto }