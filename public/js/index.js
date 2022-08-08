const $selectCategoria = document.querySelector('#categorias');
const divCategoria = document.querySelector('#divCategoria');
const novaCategoria = document.querySelector('#novaCategoria');


const mostrarNovaCategoria = () => {
    if($selectCategoria.value == 'Generica'){
                
        divCategoria.classList.remove('display-none');
        novaCategoria.setAttribute('required', 'required');
        return
    }
    divCategoria.classList.add('display-none');
    novaCategoria.removeAttribute('required');
}


mostrarNovaCategoria();

$selectCategoria.addEventListener('change', mostrarNovaCategoria);

const valor = document.querySelector('#valor');

const button = document.querySelector('button')

button.onclick = function (){

    try{
        let novoValor = valor.value.replace(',', '.');
        novoValor = Number(novoValor);
        
        if(isNaN(novoValor)) {
            throw new Error('SyntaxError');
        } 
        else {
            document.formulario.submit();
        }

        

    } catch(Error){
        
        alert('O valor deve conter um número!')
        return 
    }

}
    




