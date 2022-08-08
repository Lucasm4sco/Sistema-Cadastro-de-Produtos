

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



