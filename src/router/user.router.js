import { Router } from "express";
import { createUser, getAllUsers, login, renew, updateUser } from "../controller/index.js";
import { validateRole, validateToken } from "../middleware/index.js";

export const userRoutes = Router();

userRoutes.get('/', validateToken, validateRole,  getAllUsers);  
 
userRoutes.post('/login', login);
     
userRoutes.post('/renew', validateToken, renew);

userRoutes.post('/register', createUser);

userRoutes.put('/:id', validateToken, validateRole, updateUser);