import { connect } from "./data/database.js"
import { app } from "./index.js"

connect()

app.listen(process.env.PORT, () => {
    console.log(`Server is working on port ${process.env.PORT} in ${process.env.NODE_ENV} Mode`);
});