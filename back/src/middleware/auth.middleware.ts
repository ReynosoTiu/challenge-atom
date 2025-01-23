import { Request, Response, NextFunction } from "express";
import { verify_token } from "../utils/jwt.utils";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ status: false, data: "Token no proporcionado." });
        return;
    }

    try {
        const decoded = verify_token(token);
        if(decoded){
            req.user = decoded;
            next();
        }else{
            res.status(401).json({ status: false, data: "Token inválido o expirado." });
        }
    } catch (error) {
        res.status(401).json({ status: false, data: "Token inválido o expirado." });
    }
};