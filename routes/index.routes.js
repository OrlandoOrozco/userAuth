import { Router } from 'express';
import authorizationsRoutes from './auth.routes.js';
import verifyToken from '../auth/verifyToken.js';

const indexRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: Index
 *     description: Rutas del índice
 * 
 * /test:
 *   get:
 *     summary: Devuelve un saludo
 *     description: Retorna un mensaje de saludo al usuario.
 *     tags:
 *       - Index
 *     responses:
 *       200:
 *         description: Operación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "hello world"
 */
indexRouter.get('/test', (req, res) => {
    res.json('hi dude!');
});

/**
 * @swagger
 * /protected:
 *   get:
 *     summary: Acceso a una ruta protegida
 *     description: Retorna un mensaje y la información del usuario autenticado.
 *     tags:
 *       - Api
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: Acceso exitoso a la ruta protegida.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Ruta protegida'
 *                 user:
 *                   type: object
 *                   description: Información del usuario autenticado.
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID del usuario.
 *                       example: '60b7c5a7f5e03a001c8e9c2e'
 *                     username:
 *                       type: string
 *                       description: Nombre de usuario.
 *                       example: 'johndoe'
 *       401:
 *         description: No autorizado, token inválido o no proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'No autorizado'
 */
indexRouter.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Access Route', user: req.user });
});


indexRouter.use('/auth', authorizationsRoutes);

export default indexRouter;
