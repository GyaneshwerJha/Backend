import express from "express";
import userRouter from "./routes/user.js"
import { config } from "dotenv"
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.js"
import { errorMiddleWare } from "./middlewares/error.js";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use("/api/v1/users", userRouter)
app.use("/api/v1/tasks", taskRouter)


config({
    path: "./data/config.env"
})

app.get("/", (req, res) => {
    res.send("Nice Working")
})

app.use(errorMiddleWare)


export { app }