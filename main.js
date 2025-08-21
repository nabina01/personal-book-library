import express from 'express';
import dotenv from 'dotenv';
import router from './src/routes/routes.js';

import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})

