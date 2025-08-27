import { Router } from "express";
import { getAllUsers, createUsers, getOneUser, updateUser, deleteUser ,loginUser} from '../controllers/users.contoller.js';
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get('/auth',getAllUsers);
router.get('/', getAllUsers);
router.post('/login',loginUser);
router.get('/:id', getOneUser);
router.delete('/:id', deleteUser);
router.put('/:id',auth, updateUser);
router.post('/',auth, createUsers);

// router.get('/',(request,response)=>{
//     response.send('hello from user routes!');
// })


export default router;