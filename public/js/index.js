const $selectCategoria = document.querySelector('#categorias');
const divCategoria = document.querySelector('#divCategoria');
const novaCategoria = document.querySelector('#novaCategoria');


const mostrarNovaCategoria = () => {
    if($selectCategoria.value == 'Generica'){
                
        divCategoria.classList.remove('display-none');
        return
    }
    divCategoria.classList.add('display-none');
}


mostrarNovaCategoria();

$selectCategoria.addEventListener('change', mostrarNovaCategoria);

const valor = document.querySelector('#valor');

const button = document.querySelector('.enviar')

button.onclick = function (){

    try{

        let categoria = $selectCategoria.value;

        if(categoria == 'Generica')
            categoria = novaCategoria.value;

        const nome = document.querySelector('#name');

        let novoValor = valor.value.replace(',', '.');

        [categoria, nome, valor.value].forEach( element => {
            if(element == undefined || element == null || element == ''){
                throw new Error('SyntaxError')
            }
        })

        novoValor = Number(novoValor);
        
        if(isNaN(novoValor)) {
            throw new Error('SyntaxError');
        } 
        
        document.formulario.submit();


    } catch(Error){
        
        alert('Preencha o formulário corretamente!')
        return 
    }

}
    




