import { Router } from "express";
import { loginController, registerController, dashboardController, homeController } from "../Controllers/authControllers.js";
import { authMiddleware, roleMiddleware } from "../middleware/middleware.js";
const router = Router();

//auth routes 
router.post("/register", registerController)
router.post("/login", loginController)

router.get("/dashboard", authMiddleware, roleMiddleware("admin"), dashboardController)
router.get("/home", authMiddleware, roleMiddleware("user"), homeController)


export default router;