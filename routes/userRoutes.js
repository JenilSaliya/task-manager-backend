import express from "express";
import { createUser, deleteUser, getUser, updateUser, userExists } from "../controllers/userControl.js";
import userModel from "../models/userModel.js";

const router = express.Router()

router.get('/',async (req,res)=>{
    
      // try{
  
      //     const user = await getUser(req.body.email,req.body.password)
      //     if(!user){
      //       throw new Error('Wrong id or password')
      //     }
      //     return res.send({success:true,error:false,result:user,message:'success'})
  
      // }
      // catch(err){
  
      //     return res.send({success:false,error:true,message:err.message})
      // }


      try{
  
          const user = await getUser()
          
          return res.send({success:true,error:false,result:user,message:'success'})
  
      }
      catch(err){
  
          return res.send({success:false,error:true,message:err.message})
      }
  

})

router.post('/', async (req, res) => {
  try {
    //check fields is not empty
    const { name, email, password } = req.body
    if (!name || !email || !password) {

      return res.json({ success: false, error: true, message: 'All fields required' })

    }

    // check user is exist or not
    const userExist = await userModel.findOne({ name: req.body.name })
    if (userExist) {

      try {

        userExists(userExist.name, name, userExist.email, email)

      }
      catch (error) {

        return res.send({ success: false, error: true, message: error.message })

      }
    }


    // create new user
    const user = await createUser(req.body)
    return res.json({ success: true, error: false, message: 'User created', result: user })

  }
  catch (err) {
    return res.json({ success: false, error: true, message: err.message })
  }
})

router.put('/', async (req, res) => {
  const { id, name, email, password } = req.body

  try {

    const updatedUser = await updateUser(id, name, email, password)
    return res.send({ success: true, error: false, result: updatedUser,message:"User updated successfully" })

  }
  catch (err) {

    return res.send({ success: false, error: true, message: err.message })

  }

}
)

router.delete('/',async (req,res)=>{
  try{
    
    const deletedUser = await deleteUser(req.body.id)
    return res.send({success:true,error:false,result:deletedUser,message:"User deleted successfully"})

  }
  catch(err){

    return res.send({success:false,error:true,message:err.message})

  }
})

export default router

