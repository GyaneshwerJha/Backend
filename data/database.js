import mongoose from "mongoose";

const connect = () => mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Database connected to the server"))
    .catch((e) => console.log(e));

export { connect }