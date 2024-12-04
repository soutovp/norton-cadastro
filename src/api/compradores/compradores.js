import e from 'express';
export const router = e.Router();

//Imports
import getCompradores from './getCompradores.js';
import loadCompradores from './loadCompradores.js';
import deleteComprador from './deleteComprador.js';
import loadCompradoresEmail from './loadCompradoresEmail.js';

//Routes
// Carrega compradores.
router.get('/get/comprador', getCompradores);
// Carrega dados do comprador a partir de dados especificos.
router.post('/load/id', loadCompradores);
router.post('/load/email', loadCompradoresEmail);
// Deleta compradores a partir do ID.
router.post('/delete/comprador', deleteComprador);
