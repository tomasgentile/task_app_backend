import express from 'express';
import { registrar, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword, perfil } from '../controllers/usuarioController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

// Autenticación, registro y confirmación de usuarios
router.post('/', registrar);                              // Crear un nuevo usuario
router.post('/login', autenticar);                        // Autentica mail y password
router.get('/confirmar/:token', confirmar);               // Confirmar usuario con JWT
router.post('/olvide-password', olvidePassword);          // Genera un token para blanquear el password
router.route('/olvide-password/:token')
    .get(comprobarToken)
    .post(nuevoPassword);                                 // Genera un nuevo password

router.get('/perfil', checkAuth, perfil);

export default router;

