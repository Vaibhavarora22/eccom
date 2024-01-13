import express from "express";
import { forgotpasswordController, registerController, testController } from "../controllers/authController.js";
import { loginController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//routing
//REGISTER NEW USER (sign up) || METHOS : POST
router.post('/register',registerController);

//LOGIN || METHOD : POST
router.post('/login',loginController);

//Forgot Password || POST
router.post('/forgot-password' , forgotpasswordController);

//for test controller protected routes
router.get('/test', requireSignIn , isAdmin , testController);

//protected route auth
router.get('/user-auth' , requireSignIn , (req , res) => {
    res.status(200).send({ok : true});
});

export default router;