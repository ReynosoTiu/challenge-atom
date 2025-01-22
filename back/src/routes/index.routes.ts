import { Router } from "express";
import usersRoutes from "./users.routes";
import tasksRoutes from "./tasks.routes";

const router = Router();

router.use('/users', usersRoutes);
router.use('/tasks', tasksRoutes);

export default router;