import { request, response } from 'express';
import  prisma  from './../utils/prisma-clients.js';
import { generateToken } from '../utils/json.js';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import uploadFile from'./../utils/upload.js';


// const getAllUsers = (request,response)=>{
//     let  users;
//       prisma.user.findMany().then(
//         (data)=>{
//             users = data;
//             response.status(200).json(users);
//         },

//     );
// }

//wrap function with aysnc keyword while creating function with function keyword
//async function getUsers
const getAllUsers = async (req, res) => {
    try {
        const { name, email } = req.query;
        const users = await prisma.user.findMany({
            where: {
                ...(name && { name: { contains: name } }),
                ...(email && { email: { contains: email } })
            },
        });
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server Error' })
    }
}
const createUsers = async (req, res) => {
    try {
        const body = req.body;

        console.log("creating user", body);

        const existingUser = await prisma.user.findUnique({
            where: { email: body.email }
        });

        if (existingUser) {
            return res.status(409).json({ error: 'Email already exist' });
        }
        const file = req.files?.profile_picture;
        const allowedMines =['image/jpeg','image/png','image/gif'];
        
        const fileUri =await uploadFile(file,allowedMines);

        //  Declare file first, then check
        // 
        // if (!file) {
        //     return res.status(400).json({ message: 'file not received' });
        // }

        // // check mine type of the files
        // const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        
        // if (!allowedMimeTypes.includes(file.mimetype)) {
        //     return res.status(400).json({ message: 'Invalid file type' });
        // }

        // const fileName = `${Date.now()}_${file.name}`;
        // const fullFilePath = path.join(uploadDir, fileName);
        // fs.writeFileSync(fullFilePath, file.data);

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(body.password, salt);

        // build a proper file URI or path
        // const fileUri = `/upload/${fileName}`;

        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                phone_number: body.phone_Number,
                password: hashedpassword,
                profile_picture: fileUri,
            }
        });

        const { password, ..._user } = user;
        res.status(201).json(_user);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server Error' });
    }
};


//const hashedpassword =hash (password)
//hashing is the process of converting plaintext into a fixed-size string of characters, 
// which is typically a digest that is unique to the input data.

//login
//userInputHash = hash(body.password)
//compare(databasePasswordHash, userInputHash)

const getOneUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(userId),
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//create detelteUser and updateuser

const updateUser = async (request, response) => {
    //take id as params
    //also data from req.body
    //if logged in vako user le matra aafno
    const id = request.params.id;
    const body = request.body;
    const loginUser = request.user;
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }

        });

        if (!existingUser) {
            return response.status(404).json({ message: "User Not Found" });
        }
        if (loginUser.id !== parseInt(id)) {
            return response.status(403).json({ message: "You cannot update infromation of other users" });
        }

        const user = await prisma.user.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name: body.name,
                email: body.email,
                phone_number: body.phone_Number,
                password: body.password
            }
        });
        response.status(200).json(user);

    } catch (error) {
        console.log(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};



const deleteUser = async (req, res) => {
    //take id as params
    try {
        const deleteId = req.params.id;
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(deleteId),
            }
        });
        res.status(204).json(user);
        //       res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
//wrap the function using try-catch function

const loginUser = async (req, res) => {
    //take email and password from request.body
    //find user using email
    //if user vetyo vane then check password and generate token
    //vetena vane throw invalid credentials error

    //use case of token
    try {
        const body = req.body;
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
        //if password do not match throw Invalid credentials
        //we will change this logic later after implementing hashing


        const isMatch = await bcrypt.compare(body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const token = generateToken(user);
        res.status(200).json({
            message: "Login Sucessful",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone_number: user.phone_number,
            }
        })
    }
    catch (error) {
        console.log(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }

}
export {
    getAllUsers, createUsers, getOneUser, updateUser, deleteUser, loginUser,
}