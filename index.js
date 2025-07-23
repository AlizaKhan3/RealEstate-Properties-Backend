import express from "express"
import dotenv from "dotenv"
import appRoutes from "./Routes/appRoutes.js"
import authRoutes from "./Routes/authRoutes.js"
import cors from "cors"
//for multer image
import path, { dirname } from 'path'
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
///-----

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
// app.use('/products', appRoutes)
app.use('/properties', appRoutes)


//auth route 
app.use('/auth', authRoutes)


app.use(express.static("public"));
app.use('/images', express.static(path.join(__dirname, '../images')));

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})



// {
//     "id": "3b71425f-09d7-4917-8127-f3366dd480de",
//     "name": "Clothing"
// },
// {
//     "id": "bd873b5b-708d-4fb9-827a-f822f645f677",
//     "name": "Electronics"
// },
// {
//     "id": "4f996809-95c7-4395-938a-ef0e0b1a06df",
//     "name": "Crockery"
// },
// {
//     "id": "2ecb88bf-957f-4e56-adca-5eec5d2011e9",
//     "name": "Shoes"
// },
// {
//     "id": "f7630ac8-d37c-4bec-9ff7-2e204e1c81c5",
//     "name": "Smart Phones"
// },


//postman se ese jaraha hei
//{  "title": "Realme C25s 256GB Ram, 8GB Rom",
//   "slug": "-abc",
//   "price": 1200,
//   "description": "A fast abc",
//   "categoryName": "Smart Phones",
//   "images": [
//                 "img111.jpg",
//                 "img2.jpg",
//                 "img3.jpg"
//             ]
// }