class Loja{
    nome;
    propietario;
    produtos = [];
    constructor(nome, dono){
        this.nome = nome;
        this.propietario = dono;
        
    }
    setProduto(produto){
        this.produtos.push(produto);
    }
}

class Produto {
    id = 0;
    constructor(nome, valor){
        this.produto = nome;
        this.valor = valor;
        this.id = Produto.setID();

    }

    static setID(){
        this.id++
        return this.id;
    }

}

class Acessorio extends Produto{
    constructor(nome, valor){
        super(nome, valor);
        this.categoria = 'Acessórios';
    }
}

class Alimento extends Produto{
    constructor(nome, valor){
        super(nome, valor);
        this.categoria = 'Alimentos';
    }
}

class Bebida extends Produto{
    constructor(nome, valor){
        super(nome, valor);
        this.categoria = 'Bebidas';
    }
}

class Eletronico extends Produto{
    constructor(nome, valor){
        super(nome, valor);
        this.categoria = 'Eletrônicos';
    }
}

class Generica extends Produto{
    constructor(nome, valor, categoria){
        super(nome, valor);
        this.categoria = categoria;
    }
}

function criarProduto(nome, valor, categoria){
    let produto;
    switch(categoria){
        case 'Acessorio': produto = new Acessorio(nome, valor); break;
        case 'Alimento': produto = new Alimento(nome, valor); break;
        case 'Bebida': produto = new Bebida(nome, valor); break;
        case 'Eletronico': produto = new Eletronico(nome, valor); break;
        default:
            produto = new Generica(nome, valor, categoria);
    }
    
    return produto;
}

const loja = new Loja('Big 1,99', 'Lucas');

function adicionaProdutos(){
    loja.produtos = [];
    
    loja.setProduto(criarProduto('Celular', 2000, 'Eletronico'));
    loja.setProduto(criarProduto('Pulseira Masculina', 20, 'Acessorio'));
    loja.setProduto(criarProduto('Energético', 5, 'Bebida'));
    loja.setProduto(criarProduto('Boné', 50, 'Acessorio'))
    loja.setProduto(criarProduto('Headset', 183.90, 'Eletronico'))
}



export { loja, criarProduto , adicionaProdutos}






