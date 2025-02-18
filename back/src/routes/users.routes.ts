import { Router } from "express";
import UsersController from "../controllers/users.controller";

const router = Router();

router.get('/:email', UsersController.getUsers);
router.post('', UsersController.addUser);

export default router;