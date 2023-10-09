import mongoose from "mongoose";


const schema = new mongoose.Schema({
    title: String,
    description: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
})

const Task = mongoose.model("Task", schema)
export { Task }