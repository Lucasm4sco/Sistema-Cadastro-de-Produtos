const produtos = document.querySelectorAll('main ul li');
const popUp = document.querySelector('.pop-up');

function pegarDados(elemento){

    const filhos = elemento.children
    
    const nomeProduto = filhos[0].innerText;

    let valorProduto = filhos[1].innerText
        .replace('R$', '')
        .replace('.', '')
        .replace(',', '.')

    const idProduto = filhos[2].innerText.replace('#', '');

    const categoriaProduto = filhos[3].innerText;

    const produto = {
        nome: nomeProduto,
        id: idProduto,
        valor: valorProduto,
        categoria: categoriaProduto
    }

    return produto

}

function aparecerProduto(produto){

    popUp.style.animation = "aparecer-popup .5s ease forwards";

    const $id = document.querySelector('span#id');
    const $categoria = document.querySelector('#categoria');
    const $nome = document.querySelector('#name');
    const $valor = document.querySelector('#valor');

    

    $id.innerHTML = produto.id;
    $categoria.value = produto.categoria;
    $nome.value = produto.nome;
    $valor.value = produto.valor;
}

produtos.forEach( elemento => {

    elemento.addEventListener('click', () => {
        
        elemento.classList.add('click');
        setTimeout( () => {

            elemento.classList.remove('click');
            const produto = pegarDados(elemento);
            aparecerProduto(produto);

        }, 200 )

    }  );
})

const $botoes = document.querySelectorAll('.pop-up button');

async function excluirProduto(){

    const $id = document.querySelector('span#id');
    const promisse = await fetch(`/produtos/${$id.innerHTML}`, { method: 'DELETE'})

    if(promisse){
        alert('O produto foi excluído!');
        window.location.reload()
    }
}

$botoes.forEach( botao => 

    botao.addEventListener('click', function(){

        botao.classList.add('click');
        setTimeout(() => {

            botao.classList.remove('click');

            if(botao.className == "excluir"){
                excluirProduto();
            }
    
        }, 200)

    })
)