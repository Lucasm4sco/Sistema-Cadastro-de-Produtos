const categoria = document.querySelector('#categorias');
const divCategoria = document.querySelector('#divCategoria')

categoria.addEventListener('change', () => {
    if(categoria.value == 'Generica'){
        divCategoria.removeAttribute('hidden');
        return
    }
    divCategoria.setAttribute('hidden', 'hidden');
})
