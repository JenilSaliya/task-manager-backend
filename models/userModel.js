import mongoose, { Schema } from "mongoose";

// define schema for user 
const userSchema = new Schema({

    name: {type:String, required:true},
    email: {type:String , required:true , unique:true},
    password: { type: String, required: true }

})

const userModel = mongoose.model('User',userSchema)

export default userModel