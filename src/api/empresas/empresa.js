import e from 'express';
export const router = e.Router();

//imports
import getEmpresaCnpj from './getEmpresaCnpj.js';

//Routes
router.post('/getEmpresaCnpj', getEmpresaCnpj);
