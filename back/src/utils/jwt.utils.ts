import jwt from 'jsonwebtoken'
import { USER_PAYLOAD } from '../interfaces/users.interface';
require('dotenv').config();

export const generateToken = (payload: USER_PAYLOAD) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY || "alterKey", {
        expiresIn: process.env.JWT_EXPIRATION,
    });
}

export const verify_token = (token: string): USER_PAYLOAD => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    return decoded as USER_PAYLOAD;
}

export const get_user_payload = (token: string): USER_PAYLOAD | null => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        return decoded as USER_PAYLOAD;
    } catch (error) {
        return null;
    }
}