import { Request, Response } from "express";
import db from "../config/firebase";

const users_collection = 'users';

class TaskController {
    public async getTasks(req: Request, res: Response): Promise<any> {
        try {
            const { email } = req.params;
            const snapshot = await db
                .collection(users_collection)
                .where('email', '==', email)
                .get();

            if (snapshot.empty)
                return res.status(404).json({ message: 'Usuario no encontrado' });

            const data = snapshot.docs.map(doc => ({ ...doc.data() }));
            return res.json(data[0]);
        } catch (error: any) {
            return res.status(500).json({ message: error.toString() });
        }
    }

    public async addTask(req: Request, res: Response): Promise<any> {
        return res.json({ message: 'Hello World' });
    }

    public async updateTask(req: Request, res: Response): Promise<any> {
        return res.json({ message: 'Hello World' });
    }

    public async deleteTask(req: Request, res: Response): Promise<any> {
        return res.json({ message: 'Hello World' });
    }
}

const taskController = new TaskController();
export default taskController;