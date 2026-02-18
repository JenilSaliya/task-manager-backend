import mongoose,{Schema} from "mongoose";

let taskItemSchema = new Schema({

        title: {type:String,required:true},
        desc: String,
        dueDate: Date,
        priority:{

            type:Number,
            enum:[0,1,2],
            default:0,
            required:true

        },
        status:{

            type:String,
            enum:['pending','complete','accept','failed','overdue'],
            default:'pending'

        }
},{timestamps:true})

// define schema for task 
let taskSchema = new Schema({

    assignTo: {type:Schema.Types.ObjectId, ref:'User'},
    tasks: [taskItemSchema]
})

let taskModel = mongoose.model('Task',taskSchema)

export default taskModel