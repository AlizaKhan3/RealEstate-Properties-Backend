import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, 'db/users.json');


export const readUsers = async () => {
    //using readFile---> doesnot blocks the Main thread, directly resolves
    const userData = await fs.promises.readFile(filePath, "utf-8")
    return JSON.parse(userData)
}

export const createUser = async (user) => {
    const users = await readUsers();
    //sending role user by default so that jo bhi user register ho wo user he bane admin nhi bane.
    const newUser = {...user, role: "user"};
    users.push(newUser);
    const stringifyData = JSON.stringify(users);
    await fs.promises.writeFile(filePath, stringifyData, "utf-8")
}

export const findUserByEmail = async (email) => {
    const users = await readUsers()
    const userExist = users.find((user) => user.email.toLowerCase() === email.toLowerCase())

    return userExist;
}