import {gravarArquivo, gerarHTMLCategorias, gerarHTMLProdutos} from './manipulacoes.js'
import { StatusCodes } from 'http-status-codes';

async function paginaCadastro(req, res, next){
    res.status(StatusCodes.OK).render('./pages/index.ejs')
}

async function adicionarProduto(req, res, next){

    const produto = req.body.produto;
    const valor = req.body.valor;
    let categoria = req.body.categoria;
    
    if(categoria == 'Generica'){
        categoria = req.body.novaCategoria;
    }

    gravarArquivo(produto, valor, categoria)

    res.render('./pages/index.ejs');
}

async function paginaCategorias(req, res, next){

    const html = await gerarHTMLCategorias();
    res.render('../views/pages/categorias.ejs', { title: 'Categorias', html: html});
} 

async function paginaProdutos( req, res, next){
    
    const html = await gerarHTMLProdutos();
    res.render('../views/pages/produtos', { title : 'Produtos', html: html });
}

export { paginaCadastro, paginaCategorias, paginaProdutos, adicionarProduto }