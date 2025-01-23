import { Router } from "express";
import TasksController from "../controllers/tasks.controller";
const router = Router();

router.get('', TasksController.getTasks);
router.post('', TasksController.addTask);
router.put('/:taskId', TasksController.updateTask);
router.delete('/:taskId', TasksController.deleteTask);

export default router;