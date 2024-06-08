import Router from 'express'
import { UserModel } from '../schemas/UserSchema.js';
import bcryptjs from 'bcryptjs'

const router = Router()

const Signup = async (req, res) => {
    var data = req.body
    if (req.msg === "") {
        try {
            var user = await UserModel.findOne({ email: data.email })
            if (!user) {
                var salt = await bcryptjs.genSalt(10)
                var password = await bcryptjs.hash(data.password, salt)
                data['password'] = password
                var user = await UserModel.create(data)
                res.json({ success: true, msg: "user created succesfully" })
            } else {
                res.json({ success: false, msg: "Email already registered" })
            }
        }
        catch (err) {
            res.json({ success: false, msg: "Some Error occured" })
        }
    } else {
        res.json({ success: false, msg: "Username already taken choose new one." })
    }

}

const Validator = async (req, res, next) => {
    var data = req.body;
    try {
        var user = await UserModel.findOne({ username: data.username })
        user ? req.msg = "username already taken!!" : req.msg = ""
        next()
    }
    catch (err) {
        res.send(err)
    }
}

const Login= async(req,res)=>{
    var data = req.body
    try {
        var user = await UserModel.findOne({ username: data.username })
        if (user) {
            var matched=await bcryptjs.compare(data.password,user.password)
            
            if(matched){
                res.json({ success: true, msg: "user login succesfull",token:await user.genToken() })
            }else{
                res.json({ success: false, msg: "Invalid Credentials" })
            }
        } else {
            res.json({ success: false, msg: "user not found" })
        }
    }
    catch (err) {
        res.json({ success: false, msg: "Some Error occured" })
    }
}


router.post('/signup', Validator, Signup)
router.post('/login', Login)

export { router as auth }