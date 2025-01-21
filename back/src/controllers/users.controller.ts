import { Request, Response } from "express";
import db from "../config/firebase";

const users_collection = 'users';

class UsersController {
    public async getUsers(req: Request, res: Response): Promise<any> {
        try {
            const { email } = req.params;
            const snapshot = await db
            .collection(users_collection)
            .where('email', '==', email)
            .get();
            if (snapshot.empty) return res.status(404).json({ message: 'No user found' });
            const data = snapshot.docs.map(doc => ({ ...doc.data() }));
            return res.json(data);
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
                return res.status(400).json({ message: 'The user already exists' });

            await db.collection(users_collection).add(newUser);
            return res.json({ message: 'User added successfully' });
        } catch (error: any) {
            return res.status(500).json({ message: error.toString() });
        }
    }
}

const usersController = new UsersController();
export default usersController;