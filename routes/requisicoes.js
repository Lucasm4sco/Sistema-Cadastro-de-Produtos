import {gravarArquivo, gerarHTMLCategorias, gerarHTMLProdutos, retornarDadosAntigos, deletandoProduto, modificandoProduto} from './manipulacoes.js'
import { StatusCodes } from 'http-status-codes';


async function paginaCadastro(req, res, next){
    res.status(StatusCodes.OK).render('./pages/index.ejs', {mensagem: ''})
}

async function adicionarProduto(req, res, next){
    
    try{
        const produto = req.body.produto;
        const valor = req.body.valor.replace(',', '.');
        let categoria = req.body.categoria;
    
        if(categoria == 'Generica'){
            categoria = req.body.novaCategoria;
        }
        
        const resposta = await gravarArquivo(produto, valor, categoria);


        if(!resposta){

            res.render('./pages/index.ejs', { mensagem: 'O Produto já existe, insira outro nome!' })
            return
        }

        res.render('./pages/index.ejs', { mensagem: 'O produto foi adicionado!' });
    }
    catch (err){

        if(err.name == 'SyntaxError'){
  
            await retornarDadosAntigos();

            res.status(StatusCodes.SERVICE_UNAVAILABLE).send(
                '<h1 style="margin: 20% auto; text-align: center"> Houve uma ruptura ao arquivo, sentimos muito</h1>'
            )
            return
        }

        res.status(StatusCodes.BAD_REQUEST).send(
            `<h1 style="margin: 20% auto; text-align: center"> ERRO: ${err.message}</h1>`
        )
    }
    
}

async function paginaCategorias(req, res, next){

    try{

        const html = await gerarHTMLCategorias();
        res.render('../views/pages/categorias.ejs', { title: 'Categorias', html: html});
        
    } catch(err){

        res.status(StatusCodes.BAD_REQUEST).send(
            `<h1 style="margin: 20% auto; text-align: center"> ERRO: ${err.message}</h1>`
        )
    }
    
} 

async function paginaProdutos(req, res, next){
    
    try{

        const html = await gerarHTMLProdutos();
        res.render('../views/pages/produtos', { title : 'Produtos', html: html, message: ''});

    } catch(err){

        res.status(StatusCodes.BAD_REQUEST).send(
            `<h1 style="margin: 20% auto; text-align: center"> ERRO: ${err.message}</h1>`
        )
    }
    
}

async function deletarProduto(req, res, next){

    try{

        const id = req.params.idProduto;

        await deletandoProduto(Number(id));

        res.status(StatusCodes.ACCEPTED).send('Produto deletado')

    }catch(err){

        res.status(StatusCodes.FORBIDDEN).send(err);
    }
}

async function modificarProduto(req, res, next){

    try{

        const id = req.params.idProduto;

        const body = req.body;

        await modificandoProduto(id, body);

        res.status(StatusCodes.ACCEPTED).send('Produto modificado');

    }catch(err){

        res.status(StatusCodes.FORBIDDEN).send(err);
    }
}

export { paginaCadastro, paginaCategorias, paginaProdutos, adicionarProduto, deletarProduto, modificarProduto}