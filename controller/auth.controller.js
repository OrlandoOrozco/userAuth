import jwt from 'jsonwebtoken';
import User from '../models/users.js';

// Registrar un nuevo usuario
export const register = async (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({ username, email });
    user.password = await user.encryptPassword(password);

    try {
        await user.save();
        res.status(201).json({ message: 'Usuario registrado' });
    } catch (error) {
        res.status(500).json({ error: 'Error registrando usuario' });
    }
};

// Iniciar sesión
export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};


