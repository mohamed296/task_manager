import { Router } from "express";
import deleteUserControllers from "../controllers/deleteUserControllers";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.delete("/delete/:id",
               authMiddleware.authenticateToken,
               authMiddleware.authorize,
               deleteUserControllers,
            );


export default router;