import  express  from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getProductController, getsingleProductController, productPhotoController, updateProductController } from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
//create product
router.post("/create-product" , requireSignIn , isAdmin , formidable() , createProductController);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug" , getsingleProductController)

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/product/:pid", deleteProductController);

//update product
router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(),updateProductController);

export default router;
