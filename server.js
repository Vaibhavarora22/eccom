import express from "express";
import dotenv from 'dotenv';  //nahi pata abhi
import mongoose from 'mongoose';
import bodyParser from "body-parser"; // use for req.body
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from './routes/CategoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import path from 'path';
import {fileURLToPath} from 'url';

//configure env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//rest object
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname , './client/build')));

//mongodb connection
const DB_URL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.0c2rwqx.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(DB_URL).then(() => {
    console.log("connection established successfully");
    // app.get("/" , function(req,res) {
    //     res.send("this is the home page");

    // });
    
    
});

//routes
app.use('/api/v1/auth' , authRoutes);
app.use('/api/v1/category' , categoryRoutes);
app.use('/api/v1/product' , productRoutes);

//rest api
app.use('*' , function(req,res){
    res.sendFile(path.join(__dirname , "./client/build/index.html"));
})

//PORT
const PORT = process.env.PORT || 8080;

//run listen 
app.listen(PORT , () => {
    console.log(`server running on ${PORT} `);
})