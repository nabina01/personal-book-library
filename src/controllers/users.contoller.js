import { request, response } from 'express';
import { prisma } from '../utils/prisma-clients.js';
import { generateToken}  from '../utils/json.js';

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
const getAllUsers = async (request, response) => {
    try {
        const {name,email}=request.query;
        const users = await prisma.user.findMany({
            where: {
                ...(name && { name: { contains: name } }),
                ...(email && { email: { contains: email } })
            },
        });
        response.status(200).json(users);
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: 'Internal server Error' })
    }
}

const createUsers = async (request, response) => {
    try {
        const body = request.body;

        console.log("creating user",body);

        const existingUser = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });
        if (existingUser) {
            return response.status(409).json({ error: 'Email already exist' });
        }
        

        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                phone_number: body.phone_Number,
                password: body.password,
            }

        })
        response.status(201).json(user);
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: 'Internal server Error' })
    }
};
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
    const body =request.body;
    const loginUser= request.user;
    try {
        const existingUser = await prisma.user.findUnique({
            where:{
                id:parseInt(id)
            }
            
        });

        if(!existingUser ){
            return response.status(404).json({message:"User Not Found"});
        }
        if(loginUser.id !== parseInt(id)){
            return response.status(403).json({message:"You cannot update infromation of other users"});
        }

        const user = await prisma.user.update({
            where: {
                id: parseInt(id),
            },
            data:{
                name: body.name,
                email: body.email,
                phone_number: body.phone_Number,
                password:body.password
            }
        });
        response.status(200).json(user);

    } catch (error) {
        console.log(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};



const deleteUser = async (request, response) => {
    //take id as params
    try {
        const deleteId = request.params.id;
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(deleteId),
            }
        });
        response.status(204).json(deleteUser);
        //       response.status(204).send();
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};
//wrap the function using try-catch function

const loginUser= async(request,response)=>{
    //take email and password from request.body
    //find user using email
    //if user vetyo vane then check password and generate token
    //vetena vane throw invalid credentials error

    //use case of token
    try{
        const body = request.body;
        const{email,password}=request.body;
        const user = await prisma.user.findUnique({
            where: {
                email:email
        }
    })
        if(!user){
            return response.status(401).json({message:"Invalid Credentials"});
        }
       //if password do not match throw Invalid credentials
       //we will change this logic
       if(user.password !== password){
        return response.status(401).json({message:"Invalid Credentials"});
       }
       const token = generateToken(user);
       response.status(200).json({
        message:"Login Sucessful",
        token:token,
        user:{
            id:user.id,
            name: user.name,
            email: user.email,
            phone_number: user.phone_number,
        }
       })
    }
    catch(error){
        console.log(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }

}
export {
    getAllUsers, createUsers, getOneUser, updateUser, deleteUser, loginUser,
}