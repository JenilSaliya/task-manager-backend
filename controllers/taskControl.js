import config from "../config/config.js"
import taskModel from "../models/taskModel.js"

//get task from user
const getTask = async (assignTo) => {

  try {

    const task = await taskModel.findOne({ assignTo: assignTo })
    if (task && task.tasks) {
      task.tasks.sort((a, b) => b.priority - a.priority)
    }
    return task

  }
  catch (err) {

    throw new Error('Task not found ')

  }

}

const getAllTask = async () => {

  try {

    const data = await taskModel.find()
    let allTasks = data.flatMap(item => item.tasks)
    allTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    return allTasks

  }
  catch (err) {

    throw new Error('Task not found ')

  }

}

// create new task 
const createTask = async (data) => {

  try {

    const newTask = new taskModel(data)
    await newTask.save()
    return newTask

  }
  catch (error) {

    throw new Error('Task creation failed ' + error.message)

  }

}

// check if task taskExists 
const taskExists = (taskArr, task) => {

  taskArr.map((item) => {

    let dueDate = item.dueDate.toISOString().split('T')[0];
    if (item.title == task.title && dueDate == task.dueDate) {

      throw new Error('Task is already exists')

    }
  })
}

const taskUpdate = async (tasks) => {

  try {
    const findAllTasks = await taskModel.find()

    for (const taskDoc of findAllTasks) {
      const taskIndex = taskDoc.tasks.findIndex(
        (t) => t._id.toString() === tasks._id.toString()
      );
      if (taskIndex !== -1) {
        if (tasks.assignTo) {
          if (tasks.assignTo == taskDoc.assignTo) {
            taskDoc.tasks[taskIndex] = { ...taskDoc.tasks[taskIndex], ...tasks }
            await taskDoc.save()
            return taskDoc
          } else {

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
              "assignTo": tasks.assignTo,
              "tasks": {
                "title": tasks.title,
                "desc": tasks.desc,
                "dueDate": tasks.dueDate,
                "priority": tasks.priority,
                "status": tasks.status
              }
            })

            const requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow"
            };

            const response = await fetch(`${config.host_URI}task`, requestOptions)
            const result = await response.json()
            deleteTask(taskDoc.assignTo, taskIndex)
            return result
          }
        }
      }
    }
  }
  catch (err) {
    throw new Error('Task not updated ' + err.message)
  }

}

const deleteTask = async (assignTo = "", taskIndex = "",id="") => {
  if (assignTo && taskIndex) {

    const findTasks = await taskModel.findOne({ assignTo: assignTo })

    if (taskIndex !== -1) {

      findTasks.tasks.splice(taskIndex, 1)
      await findTasks.save()
      return findTasks
    }

  } else if (id) {
    try {

      const findAllTasks = await taskModel.find({})

      for (const taskDoc of findAllTasks) {
        const taskIndex = taskDoc.tasks.findIndex(
          (t) => t._id.toString() === id.toString()
        );
          if (taskIndex !== -1) {
           
            taskDoc.tasks.splice(taskIndex, 1)
            await taskDoc.save()
            return taskDoc
          }
       }

    }
    catch (err) {

      throw new Error('Task is not deleted: ' + err.message)

    }
  }
}
const findAssign = async (id) =>{
  const findAllTasks = await taskModel.find()
  let taskDoc = ""
  for (const taskDocs of findAllTasks) {
    const taskIndex = taskDocs.tasks.findIndex((t)=> t._id.toString() === id.toString());
    if(taskIndex !== -1){
      return taskDocs.assignTo
    }
  }
  }
export { getTask, getAllTask, createTask, taskExists, taskUpdate, deleteTask,findAssign }