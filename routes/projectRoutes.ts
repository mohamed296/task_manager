import { Router } from "express";
import projectControllers from "../controllers/projectControllers";
import authMiddleware from "../middleware/authMiddleware";


const router = Router();


router.post("/create",authMiddleware.authenticateToken,projectControllers.createProject);
router.get("/get",authMiddleware.authenticateToken, projectControllers.getProject);
router.get("/get/:id",authMiddleware.authenticateToken, projectControllers.getProjectById);
router.put("/update/:id",authMiddleware.authenticateToken, projectControllers.updateProject);
router.delete("/delete/:id",authMiddleware.authenticateToken, projectControllers.deleteProject);

export default router;
