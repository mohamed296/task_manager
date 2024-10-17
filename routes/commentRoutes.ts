import { Router } from "express";
import commentControllers from "../controllers/commentControllers";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/create",authMiddleware.authenticateToken,commentControllers.createComment);
router.delete("/delete/:id",authMiddleware.authenticateToken,authMiddleware.authorizeTask, commentControllers.deleteComment);

export default router;