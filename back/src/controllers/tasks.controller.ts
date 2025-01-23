import { Request, Response } from "express";
import db from "../config/firebase";
import { USER_PAYLOAD } from "../interfaces/users.interface";
import { RESPONSE_GET_TASKS, RESPONSE_TASK, TASK } from "../interfaces/tasks.interface";

const tasks_collection = 'tasks';
const users_collection = 'users';

class TaskController {

    constructor() {
        this.getTasks = this.getTasks.bind(this);
        this.addTask = this.addTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.validateUser = this.validateUser.bind(this);
    }
    
    public async getTasks(req: Request, res: Response): Promise<any> {
        try {
            let user: USER_PAYLOAD = req.user as USER_PAYLOAD;
            let response: RESPONSE_GET_TASKS = {
                status: false,
                message: 'Tareas encontradas',
                data: []
            }

            const isValidUser = await this.validateUser(user);
            if (!isValidUser) {
                response.message = 'Usuario no encontrado';
                return res.status(404).json(response);
            }

            const taskSnapshot = await db
                .collection(tasks_collection)
                .where('email', '==', user.email)
                .get();

            const data = taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as TASK[];

            data.sort((a, b) => {
                const dateA = new Date(a.createdAt.split('/').reverse().join('-'));
                const dateB = new Date(b.createdAt.split('/').reverse().join('-'));
                return dateB.getTime() - dateA.getTime();
            });

            response.status = true;
            response.data = data as TASK[];

            return res.json(response);
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ message: error.toString() });
        }
    }

    public async addTask(req: Request, res: Response): Promise<any> {
        try {
            let user: USER_PAYLOAD = req.user as USER_PAYLOAD;
            const task: TASK = req.body.task;
            let response: RESPONSE_TASK = {
                status: false,
                message: 'Tareas encontradas',
                data: task
            }

            const isValidUser = await this.validateUser(user);
            if (!isValidUser) {
                response.message = 'Usuario no encontrado';
                return res.status(404).json(response);
            }

            const newTask = {
                ...task,
                email: user.email,
                createdAt: this.getCurrentDate(),
            }

            const id_task = await db.collection(tasks_collection).add(newTask);
            newTask.id = id_task.id;
            response.status = true;
            response.message = 'Tarea creada exitosamente';
            response.data = newTask;



            return res.json(response);
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ message: error.toString() });
        }
    }

    public async updateTask(req: Request, res: Response): Promise<any> {
        try {
            let user: USER_PAYLOAD = req.user as USER_PAYLOAD;
            const { taskId } = req.params;
            let task: TASK = req.body.task;

            let response: RESPONSE_TASK = {
                status: false,
                message: 'Tareas encontradas',
                data: task
            }

            const isValidUser = await this.validateUser(user);
            if (!isValidUser) {
                response.message = 'Usuario no encontrado';
                return res.status(404).json(response);
            }

            const isTaskOfUser = await this.taskOfUser(taskId, user);
            if (!isTaskOfUser) {
                response.message = 'Tarea no encontrada';
                return res.status(404).json(response);
            }

            let update = await db.collection(tasks_collection)
                .doc(taskId || '0')
                .update(task as any);

            if (!update) {
                response.message = 'Error al actualizar la tarea';
                return res.status(500).json(response);
            }

            response.status = true;
            response.message = 'Tarea actualizada exitosamente';
            response.data = task;

            return res.json(response);
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ message: error.toString() });
        }
    }

    public async deleteTask(req: Request, res: Response): Promise<any> {
        try {
            let user: USER_PAYLOAD = req.user as USER_PAYLOAD;
            const { taskId } = req.params;
            let task: TASK = req.body.task;

            let response: RESPONSE_TASK = {
                status: false,
                message: 'Tareas encontradas',
                data: task
            }

            const isValidUser = await this.validateUser(user);
            if (!isValidUser) {
                response.message = 'Usuario no encontrado';
                return res.status(404).json(response);
            }

            const isTaskOfUser = await this.taskOfUser(taskId, user);
            if (!isTaskOfUser) {
                response.message = 'Tarea no encontrada';
                return res.status(404).json(response);
            }

            const documentDelete = await db.collection(tasks_collection).doc(taskId).delete();
            if (!documentDelete) {
                response.message = 'Error al eliminar la tarea';
                return res.status(500).json(response);
            }

            response.status = true;
            response.message = 'Tarea eliminada exitosamente';

            return res.json(response);
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ message: error.toString() });
        }
    }

    private async validateUser(user: USER_PAYLOAD): Promise<boolean> {
        const userSnapshot = await db
            .collection(users_collection)
            .where('email', '==', user.email)
            .get();
        return !userSnapshot.empty;
    }

    public async taskOfUser(idTask: string, user: USER_PAYLOAD): Promise<boolean> {

        const docRef = db.collection(tasks_collection).doc(idTask);
        const docSnapshot = await docRef.get();
        if (!docSnapshot.exists) return false;

        const data = docSnapshot.data() as TASK;
        return data.email === user.email;
    }


    private getCurrentDate(): string {
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false, // Formato 24 horas
        };

        return new Intl.DateTimeFormat('en-GB', options).format(new Date()).replace(',', '');
    };

}

const taskController = new TaskController();
export default taskController;