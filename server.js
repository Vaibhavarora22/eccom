import express from "express";
import dotenv from 'dotenv';  //nahi pata abhi
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from "body-parser"; // use for req.body
import authRoutes from "./routes/authRoute.js";
import cors from "cors";

//configure env
dotenv.config();

//rest object
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//mongodb connection
mongoose.connect("mongodb+srv://vaibhavaroramait:79dKrrzkCpBSBQeb@cluster0.0c2rwqx.mongodb.net/?retryWrites=true&w=majority").then(() => {
    // app.get("/" , function(req,res) {
    //     res.send("this is the home page");
    // });
    //routes
    app.use('/api/v1/auth' , authRoutes);
    //rest api
    app.get('/',(req,res)=> {
        res.send({
            message : "welcome to website"
        })
    });

});


//PORT
const PORT = process.env.PORT || 8080;

//run listen 
app.listen(PORT , () => {
    console.log(`server running on ${PORT} `);
})