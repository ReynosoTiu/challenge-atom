import { Request, Response } from "express";

class UsersController {
    public async getUsers(req: Request, res: Response): Promise<any> {
        return res.json({ message: 'Hello World' });
    }

    public async addUser(req: Request, res: Response): Promise<any> {
        return res.json({ message: 'Hello World' });
    }
}

const usersController = new UsersController();
export default usersController;