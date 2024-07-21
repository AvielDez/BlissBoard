import { Router } from "express";
import { login, register, updateUsername } from "../controllers/authController";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.put("/updateUsername/:userId", updateUsername);

export default router;
