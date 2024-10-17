import { Router } from "express";
import  authorController from "../controllers/authControllers";

const router = Router();

router.post("/register", authorController.register);
router.post("/login", authorController.login);

export default router;