import { Router } from "express";

import taskControllers from "../controllers/taskControllers";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/create",authMiddleware.authenticateToken,taskControllers.createTask);
router.get("/get/",authMiddleware.authenticateToken, taskControllers.getTasks);
router.get("/get/:id",authMiddleware.authenticateToken, taskControllers.getTaskById);
router.put("/update/:id",authMiddleware.authenticateToken,authMiddleware.authorizeTask, taskControllers.updateTask);
router.delete("/delete/:id",authMiddleware.authenticateToken,authMiddleware.authorizeTask, taskControllers.deleteTask);

export default router;