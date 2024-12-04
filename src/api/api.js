import e from 'express';
export const router = e.Router();
//Imports
import { router as empresas } from './empresas/empresa.js';
import { router as compradores } from './compradores/compradores.js';
//Uses
router.use('/empresa', empresas);
router.use('/compradores', compradores);
