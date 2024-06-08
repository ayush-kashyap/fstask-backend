import mongoose, { Schema } from 'mongoose'
import jwt from 'jsonwebtoken'
const UserSchema= new Schema({
    "name":{
        type:'string',
        required:true
    },
    "username":{
        type:'string',
        required:true
    },
    "email":{
        type:'string',
        required:true
    },
    "password":{
        type:'string',
        required:true
    },
    "points":{
        type:'Number',
        default:5000
    }
})

UserSchema.methods.genToken=async function(){
    var data={
        name:this.name,
        username:this.username,
        id:this._id.toString()
    }
    var token =await jwt.sign(data,process.env.JWT_SECRET)
    return token
}

const UserModel= mongoose.model('user',UserSchema)

export{UserModel}
