import jwt from 'jsonwebtoken';

import { jwtSecret } from '../config/environment.js';

export const generateToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
    };
    return jwt.sign(payload, jwtSecret, { expiresIn: '24h' });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, jwtSecret);
    } catch (error) {
        return null;
    }
};
