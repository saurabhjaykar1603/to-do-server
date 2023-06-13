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

// GET /task

// DELET /task/delet

// PUT /task


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
});