import { Router } from "express";
import { login, register, updateUsername } from "../controllers/authController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.put("/updateUsername/:userId", authenticateToken, updateUsername);

export default router;
