import { createTask, deleteTask, findAssign, getAllTask, getTask, taskExists, taskUpdate } from "../controllers/taskControl.js";
import taskModel from "../models/taskModel.js";
import express from "express"

const router = express.Router()

router.get('/',async (req,res) => {
  
    try{
        const {assignTo} = req.query
        
        const task = await getTask(assignTo)
        if(!task){

            throw new Error('Task not found')
            
        }
        return res.send({success:true,error:false,result:task,message:'success'})

    }
    catch(err){

        return res.send({success:false,error:true,message:err.message})
    }

})

router.get('/assignTo',async (req,res) => {
    try{
        
        const task = await findAssign(req.query._id)
        if(!task){

            throw new Error('Task not found')
            
        }
        return res.send({success:true,error:false,result:task,message:'success'})

    }
    catch(err){

        return res.send({success:false,error:true,message:err.message})
    }

})
router.get('/alltask',async (req,res) => {
  
    try{
        
        const task = await getAllTask()
        if(!task){

            throw new Error('Task not found')
            
        }
        return res.send({success:true,error:false,result:task,message:'success'})

    }
    catch(err){

        return res.send({success:false,error:true,message:err.message})
    }

})

router.post('/', async (req, res) => {

    let { assignTo, tasks } = req.body

    const { title, dueDate } = tasks

    // check field is not empty 
    if (!assignTo || !title || !dueDate) {

        return res.send({ success: false, error: true, message: 'All fields required' })

    }

    // if user exists update tasks 
    const assignUserExists = await taskModel.findOne({ assignTo: req.body.assignTo })

    if (assignUserExists) {

        // check if taskExists 
        try {

            taskExists(assignUserExists.tasks, tasks)

        }
        catch (error) {

            return res.send({ success: false, error: true, message: error.message })

        }

        // update the tasks 
        assignUserExists.tasks.push(tasks)
        const result = await assignUserExists.save()
        return res.send({ success: true, error: false, message: 'Task created successfully', result: result })

    }

    // if user is not exist create new task 
    try {

        const result = await createTask(req.body)
        return res.send({ success: true, error: false, message: 'Task created successfully', result: result })

    }
    catch (e) {

        return res.send({ success: false, error: true, message: e.message })

    }

})

router.put('/', async (req, res) => {
    
    const tasks = req.body.tasks
    try {

        const updatedTask = await taskUpdate(tasks)
       return res.send({ success: true, error: false, message: 'Task update successfully', result: updatedTask })

    }
    catch (e) {

        return res.send({ success: false, error: true, message: e.message })

    }


})

router.delete('/',async (req,res) => {

    try{

        const deletedTask = await deleteTask(undefined ,undefined ,req.body._id)
        return res.send({success:true,error:false,message:'Task deleted successfully',result:deletedTask})

    }
    catch(err){

        return res.send({success:false,error:true,message:err.message})

    }
  
})

export default router