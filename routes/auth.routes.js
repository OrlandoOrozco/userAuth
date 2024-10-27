import { Router } from 'express';
import { register, login } from '../controller/auth.controller.js';
import verifyToken from '../auth/verifyToken.js';

const router = Router();

// Rutas de autenticación

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     description: Crea un nuevo usuario en el sistema.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario del nuevo usuario.
 *                 example: 'johndoe'
 *               email:
 *                 type: string
 *                 description: Correo electrónico del nuevo usuario.
 *                 example: 'johndoe@example.com'
 *               password:
 *                 type: string
 *                 description: Contraseña del nuevo usuario.
 *                 example: 'mysecurepassword'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Usuario registrado'
 *       500:
 *         description: Error al registrar el usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Error registrando usuario'
 */
router.post('/register', register);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión con un usuario existente
 *     description: Verifica las credenciales del usuario y genera un token JWT.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *                 example: 'johndoe@example.com'
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *                 example: 'mysecurepassword'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso, devuelve un token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Usuario no encontrado'
 *       401:
 *         description: Contraseña incorrecta.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Contraseña incorrecta'
 */
router.post('/login', login);


export default router;
