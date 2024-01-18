import userModel from "../models/userModel.js";
//const userModel = require('../models/userModel.js')
import  { comparePassword, hashPassword } from "../helpers/authHelper.js"
//const hashPassword = require('../helpers/authHelper.js');
import JWT from "jsonwebtoken";
import orderModel from "../models/orderModel.js";

// function for registeration of new user
export const registerController = async(req,res) =>{
    try{
        const {name,email,password,phone,address,answer} = req.body;

        // Log the received data for debugging
        console.log('Received data:', { name, email, password, answer });
        //validation (check all values to be provided)

        if (!name){
            return res.send({error: 'name is required'})
        }
        if (!email){
            return res.send({error: 'email is required'})
        }
        if (!password){
            return res.send({error: 'password is required'})
        }
        if (!phone){
            return res.send({error: 'phone number is required'})
        }
        if (!address){
            return res.send({error: 'address is required'})
        }
        if (!answer){
            return res.send({error: 'answer is required'})
        }

        //checking existing user (not having same email ID)
        const existinguser = await userModel.findOne({email})

        if (existinguser){
            return res.status(200).send({
                success:false,
                message:'Already registered please login',
            })
        }

        //register user
        const hashedPassword = await hashPassword(password);

        //save
        const user = await new userModel({name,email,phone,address,password:hashedPassword,answer}).save();
        res.status(201).send({
            success:true,
            message:'user registered successfully',
            user
        })


    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'error in registration',
            error
        });

    }

}

// function for login of user
export const loginController = async(req,res) => {
    try{
        const { email , password} = req.body;

        //validation (check all values to be provided)
        if (!email){
            return res.send({error: 'email is required'})
        }
        if (!password){
            return res.send({error: 'password is required'})
        }
        //check user
        //checking matched email
        const user = await userModel.findOne({email});
        if (!user){
            return res.status(404).send({
                success:false,
                message:'Email is not registered'
            })
        }
        //checking matched password
        const match = await comparePassword(password,user.password);
        if (!match){
            return res.status(200).send({
                success:false,
                message:'Invalid Password'
            })
        }
        // if both email and password have been checked then move further for token
        //token
        const token = await JWT.sign({_id: user._id }, process.env.JWT_SECRET,{
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              phone: user.phone,
              address: user.address,
              role: user.role,
            },
            token,
        });

    }
    catch (error){
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'error in login',
            error
        });
    }
}

//function for forgot password

export const forgotpasswordController = async (req,res) => {
    try{
        const {email , answer , newPassword} = req.body;
        //validation (check all values to be provided)
        if (!email){
            return res.send({error: 'email is required'})
        }
        if (!answer){
            return res.send({error: 'answer is required'})
        }
        if (!newPassword){
            return res.send({error: 'new password is required'})
        }
        //check
        const user = userModel.findOne({email,answer});
        // validation
        if (!user){
            return res.status(404).send({
                success:false,
                message:'wrong Email or Answer'
            })
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id , { password: hashed});

        res.send({
            success:true,
            message:'password reset successfully'
            
        });




    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message:"something went wrong",
            error
        })
    }
};

//test controller for protecting routes
export const testController = (req, res) => {
    try {
      res.send("Protected Routes");
    } 
    catch (error) {
      console.log(error);
      res.send({ error });
    }
  };

  //update controller

  export const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
};

//Orders
export const getOrderController = async (req,res) => {
    try {
        const orders = await orderModel
          .find({buyer:req.user._id})
          .populate("products", "-photo")
          .populate("buyer", "name");
        res.json(orders);
      } 
    catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error WHile Geting Orders",
          error,
        });
    }
}

//orders
export const getAllOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name");
      res.json(orders);
    } 
    catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
};

//order status
export const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await orderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
        error,
      });
    }
  };
  


// export default registerController
// export default loginController;