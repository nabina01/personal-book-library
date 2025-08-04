import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT ||3000;

app.get('/',(request,response) =>{
    response.send("Hello from express js server!");
});

app.listen(PORT, () =>{
console.log(`server is running on http://localhost:${PORT}`);
})

