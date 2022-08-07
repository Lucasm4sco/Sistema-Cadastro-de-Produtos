const botaoMenu = document.querySelector('.menu');
const menu = document.querySelector('nav')
const n1 = document.querySelector('span.n1');
const n2 = document.querySelector('span.n2');
const n3 = document.querySelector('span.n3');
let AbrirMenu = true, fecharMenu = false;

botaoMenu.addEventListener('click', animacaoMenu)

function animacaoMenu() {

    if (AbrirMenu) {

        AbrirMenu = false;
        menu.style.animation = " menu 1s forwards";
        n1.style.animation = "virar .5s normal forwards";
        n2.style.opacity = "0";
        n3.style.animation = "virar2 .5s normal forwards";
        
        setTimeout( () => fecharMenu = true, 1000);

        return
    }

    if (fecharMenu) {

        fecharMenu = false;
        menu.style.animation = "voltarMenu .8s forwards";
        n1.style.animation = "retornar .5s normal forwards";
        n3.style.animation = "retornar2 .5s normal forwards";


        setTimeout(() => n2.style.opacity = "1", 200)

        setTimeout(() => AbrirMenu = true, 800)
    }
}