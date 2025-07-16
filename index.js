import express from "express"
import dotenv from "dotenv"
import appRoutes from "./Routes/appRoutes.js"

dotenv.config();

const app = express();
const PORT = 8000;

//parsing body;
app.use(express.json());

//main route of app
app.use('/products', appRoutes)

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})