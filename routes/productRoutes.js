import  express  from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { brainTreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getsingleProductController, productCategoryController, productCountController, productFilterController, productListController, productPhotoController, realtedProductController, searchProductController, updateProductController } from "../controllers/productController.js";
import formidable from "express-formidable";
import braintree from "braintree";

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

//filter product
router.post('/product-filters' , productFilterController);

//product count
router.get('/product-count' , productCountController);

//product per page
router.get('/product-list/:page' , productListController);

//search product
router.get('/search/:keyword' , searchProductController);

//similar product
router.get('/related-product/:pid/:cid' , realtedProductController)

//category wise product
router.get('/product-category/:slug' , productCategoryController)

//payments route
//token
router.get('/braintree/token' , braintreeTokenController);

//payments
router.post('/braintree/payment' , requireSignIn , brainTreePaymentController)
export default router;
