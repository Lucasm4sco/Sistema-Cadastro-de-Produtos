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
const $cancelar = document.querySelector('.cancelar img');

function sairpopUp(){

    popUp.style.animation = "sair-popup .5s ease forwards";
    setTimeout( () => window.location.reload(), 200 )
}

async function excluirProduto(){

    const $id = document.querySelector('span#id');
    const promisse = await fetch(`/produtos/${$id.innerHTML}`, { method: 'DELETE'})

    if(promisse){

        alert('O produto foi excluído!');
        sairpopUp();
    }
}

function verificarProduto(){

    const inputs = document.querySelectorAll('form input');

    for(let input of inputs){

        if( input.value == '' || input.value == null || input.value == undefined ){
            alert('Não é possível fazer essa alteração!');
            return
        }
    }

    const categoria = inputs[0].value;
    const produto = inputs[1].value;
    const valor = Number( inputs[2].value )
    const id = Number( document.querySelector('span#id').innerHTML )

    if(isNaN(valor)) {
        alert('O valor informado deve ser um número!')
        return
    }

    gravarDados(categoria, produto, valor, id);

};

async function gravarDados(categoria, produto, valor, id){
    
    const promisse = await fetch(`/produtos/${id}`, { 
        method: 'PUT',
        headers: { 'Content-type': 'application/json; charset=utf-8' },
        body: JSON.stringify( { categoria, produto, valor } )
    })

    if(promisse){
        
        alert('O produto foi modificado com sucesso!');
        sairpopUp();
    }
}

$botoes.forEach( botao => 

    botao.addEventListener('click', function(){

        botao.classList.add('click');
        setTimeout(() => {

            botao.classList.remove('click');

            if(botao.className == "excluir"){
                excluirProduto();
                return
            }

            verificarProduto();
    
        }, 200)

    })
)

$cancelar.addEventListener('click', sairpopUp)



