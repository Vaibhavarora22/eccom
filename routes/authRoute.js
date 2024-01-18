import express from "express";
import { forgotpasswordController, getAllOrdersController, getOrderController, orderStatusController, registerController, testController, updateProfileController } from "../controllers/authController.js";
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

//protected user route auth
router.get('/user-auth' , requireSignIn , (req , res) => {
    res.status(200).send({ok : true});
});

//protected admin route auth
router.get('/admin-auth' , requireSignIn , isAdmin , (req , res) => {
    res.status(200).send({ok : true});
});

//update profile
router.put('/profile' , requireSignIn , updateProfileController);

//orders
router.get('/orders' , requireSignIn , getOrderController);

//all orders
router.get('/all-orders' , requireSignIn ,isAdmin, getAllOrdersController);

//order status update
router.put("/order-status/:orderId" , requireSignIn , isAdmin , orderStatusController);
export default router;