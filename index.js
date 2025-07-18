import express from "express"
import dotenv from "dotenv"
import appRoutes from "./Routes/appRoutes.js"
import authRoutes from "./Routes/authRoutes.js"
import cors from "cors"

dotenv.config();

const app = express();
const PORT = 8000;

app.use(cors({
    origin: "http://localhost:5173"
}))

//parsing body;
app.use(express.json());


//main route 

//products
app.use('/products', appRoutes)

//auth route 
app.use('/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})