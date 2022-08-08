class Loja{
    nome;
    propietario;
    produtos = [];
    static id = 0;

    constructor(nome, dono){
        this.nome = nome;
        this.propietario = dono;
    }

    setProduto(produto){
        this.produtos.push(produto);
    }

    static setID(){
        this.id++
        return this.id;
    }

    static adicionaProdutosEstaticos(loja){

        loja.setProduto(Produto.criarProduto('Celular', 2000, 'Eletronico'));
        loja.setProduto(Produto.criarProduto('Pulseira Masculina', 20, 'Acessorio'));
        loja.setProduto(Produto.criarProduto('Energético', 5, 'Bebida'));
        loja.setProduto(Produto.criarProduto('Boné', 50, 'Acessorio'))
        loja.setProduto(Produto.criarProduto('Headset', 183.90, 'Eletronico'))
    }
}

class Produto {

    constructor(nome, valor, categoria){

        this.produto = nome;
        this.valor = valor;
        this.categoria = categoria;
        this.id = Loja.setID();
    }

    static criarProduto(nome, valor, categoria, id){
        
        let produto= new Produto(nome, valor, categoria);
    
        if(id != undefined){
            produto.id = id;
        }
    
        return produto;
    }
}

const loja = new Loja('Big 1,99', 'Lucas');


export { loja, Produto , Loja}






