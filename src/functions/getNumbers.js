import { Router } from "express"
import { UserModel } from "../schemas/UserSchema.js"
const router = Router()

const GetNumbers=async(req,res)=>{
    var data=req.body
    var amount=data.amount
    var points=data.points-amount
    var rand=Math.ceil(Math.random()*6)
    var rand2=Math.ceil(Math.random()*6)
    if(data.option==="lucky" && rand+rand2===7){
        amount=amount*5
    }
    else if((data.option==="above" && rand+rand2>7)||(data.option==="below" && rand+rand2<=7)){
        amount=amount*2
    }
    else{
        amount=0
    }
    var Totalamount=amount+points
    console.log(Totalamount)
    await UserModel.updateOne({username:data.username},{$set:{points:Totalamount}})
    res.status(200).send({gained:amount,amount:Totalamount,numbers:{first:rand,second:rand2}})
}

router.put('/numbers',GetNumbers)
export {router as getNumbers}

