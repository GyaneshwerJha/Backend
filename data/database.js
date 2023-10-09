import mongoose from "mongoose";

const connect = () => mongoose
    .connect(process.env.MONGO_URL)
    .then((c) => console.log(`Database connected with ${c.connection.host}`))
    .catch((e) => console.log(e));

export { connect }