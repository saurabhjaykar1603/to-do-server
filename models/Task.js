import { Schema, model } from "mongoose";

const TaskSchema = new Schema({
    tital: String,
    description: String
})

// model 

const Task = model('Task', TaskSchema)


export default Task