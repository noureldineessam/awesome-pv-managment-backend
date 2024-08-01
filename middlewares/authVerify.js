import jwt from 'jsonwebtoken';
import { userService } from '../app.js';
import { jwtSecret } from '../config/environment.js';


const authVerify = async (req, res, next) => {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (token) {
        try {
            const decoded = jwt.verify(token, jwtSecret);
            req.user = await userService.getUserById(decoded.id);
        } catch (error) {
            console.error('Authentication error:', error);
        }
    }
    next();
};

export default authVerify;