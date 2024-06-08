import Express, { json } from 'express'
import {getNumbers} from './functions/getNumbers.js'
import pkg from 'cors'
import 'dotenv/config';
import mongoose from 'mongoose';
import  {auth}  from './functions/auth.js';
import { getUser } from './functions/getUserData.js';

const cors=pkg;
const app=Express();
app.use(json())
app.use(cors())

mongoose.connect(process.env.MONGO_DATABASE).then(()=>{
    console.log("Connected to Database")
})
app.get("/",(req,res)=>{
    res.send("hiii I am server is the")
})
app.use('/get',getNumbers)
app.use('/auth',auth)
app.use('/get',getUser)
app.listen(process.env.PORT,()=>{
    console.log("listening on port")
})