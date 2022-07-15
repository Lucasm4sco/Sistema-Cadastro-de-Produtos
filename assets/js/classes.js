class Loja{
    produtos = [];
    constructor(nome, dono){
        this.nome = nome;
        this.dono = dono;
        
    }
    setProduto(produto){
        this.produtos.push(produto);
    }
}

class Produto {
    static id = 0;
    constructor(nome, valor){
        this.nome = nome;
        this.valor = valor;
        this.id = Produto.setID();
    }
    static setID(){
        this.id++
        return this.id;
    }

}

class Acessorios extends Produto{
    constructor(nome, valor){
        super(nome, valor);
        this.categoria = 'Acessórios';
    }
}

class Alimento extends Produto{
    constructor(nome, valor){
        super(nome, valor);
        this.categoria = 'Alimento';
    }
}

class Bebida extends Produto{
    constructor(nome, valor){
        super(nome, valor);
        this.categoria = 'Bebidas';
    }
}

class Eletronico extends Produto{
    constructor(categoria, nome, valor){
        super(nome, valor);
        this.categoria = 'Eletrônico';
    }
}

class Generica extends Produto{
    constructor(categoria, nome, valor){
        super(nome, valor);
        this.categoria = categoria;
    }
}

const loja = new Loja('Big 1,99', 'Lucas');








