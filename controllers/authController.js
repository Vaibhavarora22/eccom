import userModel from "../models/userModel.js";
//const userModel = require('../models/userModel.js')
import  { comparePassword, hashPassword } from "../helpers/authHelper.js"
//const hashPassword = require('../helpers/authHelper.js');
import JWT from "jsonwebtoken";

// function for registeration of new user
export const registerController = async(req,res) =>{
    try{
        const {name,email,password,phone,address} = req.body;

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
        const user = await new userModel({name,email,phone,address,password:hashedPassword}).save();
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
        res.send({
            success:true,
            message:'user login successfully',
            user,
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
// export default registerController
// export default loginController;