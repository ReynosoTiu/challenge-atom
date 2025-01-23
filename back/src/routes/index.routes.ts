import { Router } from "express";
import usersRoutes from "./users.routes";
import tasksRoutes from "./tasks.routes";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.use('/users', usersRoutes);
router.use('/tasks', authenticate, tasksRoutes);

export default router;