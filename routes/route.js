import express  from "express";
import { paginaCadastro, paginaCategorias , paginaProdutos, adicionarProduto} from './requisicoes.js';

const router = express.Router();

router.get('/', paginaCadastro);

router.post('/', adicionarProduto);

router.get('/categorias', paginaCategorias);

router.get('/produtos', paginaProdutos);

export default router
 