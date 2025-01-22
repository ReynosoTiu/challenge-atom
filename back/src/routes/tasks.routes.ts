import { Router } from "express";
import TasksController from "../controllers/tasks.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get('', authenticate, TasksController.getTasks);
router.post('', authenticate, TasksController.addTask);
router.put('/:taskId', authenticate, TasksController.updateTask);
router.delete('/:taskId', authenticate, TasksController.deleteTask);

export default router;