import jwt from 'jsonwebtoken';

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Asegúrate de extraer el token de los encabezados
    console.log('Token', token);
    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.user = decoded; // Almacena la información del usuario decodificada en req.user
        console.log('Usuario', decoded);
        next(); // Continúa con la siguiente función middleware
    });
};

export default verifyToken;
