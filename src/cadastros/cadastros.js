import e from 'express';
export const router = e.Router();

//Imports
import empresa from './empresasRoutes.js';
import comprador from './compradoresRoutes.js';
import comprador_empresa from './compradoresEmpresasRouter.js';
import endereco from './enderecosRoutes.js';

//Routes
router.post('/empresas', empresa);
router.post('/comprador', comprador);
router.post('/comprador-empresa', comprador_empresa);
router.post('/enderecos', endereco);
