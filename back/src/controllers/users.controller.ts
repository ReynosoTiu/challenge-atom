import { Request, Response } from "express";
import db from "../config/firebase";
import { generateToken } from "../utils/jwt.utils";
import { USER_PAYLOAD } from "../interfaces/users.interface";
require('dotenv').config();

const users_collection = 'users';

class UsersController {
    public async getUsers(req: Request, res: Response): Promise<any> {
        try {
            const { email } = req.params;
            const snapshot = await db
                .collection(users_collection)
                .where('email', '==', email)
                .get();

            if (snapshot.empty)
                return res.status(404).json({ message: 'Usuario no encontrado' });
            const data = snapshot.docs.map(doc => ({ ...doc.data() }));
            const token = generateToken(data[0] as USER_PAYLOAD);
            return res.json({token});
        } catch (error: any) {
            return res.status(500).json({ message: error.toString() });
        }
    }

    public async addUser(req: Request, res: Response): Promise<any> {
        try {
            const { email } = req.body;
            let newUser: any = {
                email
            }

            const userQuerySnapshot = await db
                .collection(users_collection)
                .where('email', '==', email)
                .get();

            if (!userQuerySnapshot.empty)
                return res.status(400).json({ message: 'El usuario ya existe' });

            await db.collection(users_collection).add(newUser);
            return res.json({ message: 'Usuario creado exitosamente' });
        } catch (error: any) {
            return res.status(500).json({ message: error.toString() });
        }
    }
}

const usersController = new UsersController();
export default usersController;