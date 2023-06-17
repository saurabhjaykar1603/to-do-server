import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Task from "./models/Task.js";


const app = express();
app.use(express.json());


async function connectMongoDB() {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    if (conn) {
        console.log("Connected to Mongodb");
    }
}
connectMongoDB();

app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: "all Good"
    })
})

// POST /task 
app.post('/task', async (req, res) => {
    const { tital, description } = req.body;

    const newTask = new Task({
        tital: tital,
        description: description
    })

    const savedTask = await newTask.save();

    res.json({
        success: true,
        message: 'Task saved Successfully',
        data: savedTask
    })


})

// GET /tasks
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json({
        success: true,
        message: 'All Tasks fetched Successfully',
        data: tasks
    })
})

// GET /task

app.get('/task', async (req, res) => {
    const taskId = req.query.taskId;

    let task;
    try {
       task = await Task.findById({ taskId });

    }
    catch (e) {
        return res.json({
            success: false,
            message: e.message,
            data: []
        });
    }


    if (!task) {
        return res.json({
            success: false,
            message: 'Task not found',
            data: []
        });
    }
    res.json({
        success: true,
        message: 'task Successfully',
        data: task
    })

})

// DELET /task/delet

// PUT /task


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
});