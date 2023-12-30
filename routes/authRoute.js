import express from "express";
import { registerController, testController } from "../controllers/authController.js";
import { loginController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//routing
//REGISTER NEW USER (sign up) || METHOS : POST
router.post('/register',registerController);

//LOGIN || METHOD : POST
router.post('/login',loginController);

//for test controller protected routes
router.get('/test', requireSignIn , isAdmin , testController);

export default router;