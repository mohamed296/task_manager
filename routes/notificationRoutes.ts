import { Router } from "express";
import notificationControllers from "../controllers/notificationController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get("/get",authMiddleware.authenticateToken, notificationControllers.getNotification);
router.put("/update/:id",authMiddleware.authenticateToken, notificationControllers.markAsRead);

export default router;
