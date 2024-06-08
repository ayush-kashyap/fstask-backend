import Router from 'express'
import jwt from 'jsonwebtoken'
import { UserModel } from '../schemas/UserSchema.js'
const router =Router()

const getUserData=async(req,res)=>{
    var token=req.header('Authorization')
    if(token){
        token=token.replace("Bearer","").trim()
        var userDetail=await jwt.verify(token,process.env.JWT_SECRET)
        var user=await UserModel.findOne({username:userDetail.username}).select({password:0})
        res.status(200).send(user)
    }else{
        res.status(401).send("Not Authorized")
    }
}

router.get("/user",getUserData)
export{router as getUser}