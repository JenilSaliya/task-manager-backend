import userModel from "../models/userModel.js"

// const getUser = async (email,password)=>{
const getUser = async ()=>{

    try{

    //    const user = await userModel.findOne({email:email,password:password})
       const user = await userModel.find({})
       return user

    }
    catch(err){

        throw new Error('User not found '+err.message)

    }

}

const getLoginUser = async (email,password) => {
    try{

           const user = await userModel.findOne({email:email,password:password})
           return user
    
        }
        catch(err){
    
            throw new Error('User not found '+err.message)
    
        }
}


// create new user 
const createUser = async (body) => {

    try {

        let newUser = new userModel(body)
        await newUser.save()
        return newUser

    }
    catch (err) {

        throw new Error('User Creation failed: email is exist')

    }
}

// check if user exists 
const userExists = (Ename, name, Eemail, email) => {

    if (Ename == name && Eemail == email) {

        throw new Error('User is already exists')

    }
}

//update user
const updateUser = async (id,updateName,updateEmail,updatePassword) => {

    try{
       const updatedUser = await userModel.findByIdAndUpdate(
            id, 
            { name: updateName, email: updateEmail, password: updatePassword }, 
            {new:true}
        )

        return updatedUser
    }
    catch(err){

        throw new Error('User is not updated check id and try again: ')

    }
}

const deleteUser = async (id)=>{

    try{
        
        const deletedUser = await userModel.findByIdAndDelete(id)
        if(!deletedUser){
            throw new Error('user is not found')
        }
        
        return deletedUser
        
    }
    catch(err){

        throw new Error('User is not deleted' +err.message)
    }
}

export { getUser,getLoginUser,createUser, userExists , updateUser , deleteUser }
