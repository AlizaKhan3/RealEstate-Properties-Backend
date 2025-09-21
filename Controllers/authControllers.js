import { v4 as uuidv4 } from 'uuid';
import { createUser, findUserByEmail } from '../utils/authCRUD.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!email || !name || !password) {
            return res.status(400).json({ success: false, message: "Please enter all fields" })
        }

        //if user already exists. 
        const userExist = await findUserByEmail(email)
        if (userExist) {
            return res.status(400).json({ success: false, message: "Email already Registered, Please Login." })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);


        // let  userRole = "user";
        const user = {
            id: uuidv4(),
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
        }

        createUser(user);

        const token = jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })


        return res.status(200).json({ success: true, message: "Registered Successfully!", token: token, data: user })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


// export const registerController = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         if (!email || !name || !password) {
//             console.log("❌ Missing field:", { email, name, password });
//             return res.status(400).json({ success: false, message: "Please enter all fields" })
//         }

//         // If user already exists
//         const userExist = await findUserByEmail(email)
//         if (userExist) {
//   console.log("❌ Duplicate email:", email);

//             return res.status(400).json({ success: false, message: "Email already Registered, Please Login." })
//         }

//         const salt = bcrypt.genSaltSync(10);
//         const hashedPassword = bcrypt.hashSync(password, salt);

//         // default role = user
//         const user = {
//             id: uuidv4(),
//             name,
//             email: email.toLowerCase(),
//             password: hashedPassword,
//             role: "user"
//         }

//         createUser(user);

//         // create payload for token
//         const payload = {
//             userId: user.id,
//             userName: user.name,
//             email: user.email,
//             role: user.role
//         };

//         const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

//         // don’t return password in response
//         const { password: _, ...userWithoutPassword } = user;

//         return res.status(200).json({
//             success: true,
//             message: "Registered Successfully!",
//             token: token,
//             data: userWithoutPassword
//         });

//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message })
//     }
// }


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Enter Email & Password!" })
        }

        //check user in db by email
        const userExist = await findUserByEmail(email);
        if (!userExist) {
            return res.status(402).json({ success: false, message: "Invalid Email, Account not found!" })
        }

        //check if existing user entered password correctly or not.
        // Load hash from your password DB
        const checkPassword = bcrypt.compareSync(password, userExist.password); // true

        if (!checkPassword) {
            return res.status(402).json({ success: false, message: "Invalid Password" })
        }

        delete userExist.password;

        const payload = {
            userId: userExist.id,
            userName: userExist.name,
            email: userExist.email,
            role: userExist.role
        }


        //check if admin or regular user using role;
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

        return res.status(200).json({ success: true, message: "Login Successfully!", token: token, data: userExist })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


export const dashboardController = (req, res) => {
    return res.status(200).json({ success: true, message: "Welcome to dashboard Admin!" })

}

export const homeController = (req, res) => {
    return res.status(200).json({ success: true, message: "Welcome User!" })


}