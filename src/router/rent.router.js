import { Router } from "express";
import { validateToken } from "../middleware/index.js";
import { rentMovie, returnMovie } from "../controller/index.js";

export const rentRouter = Router();

rentRouter.post('/', validateToken, rentMovie);
rentRouter.patch('/return_movie/:id', validateToken, returnMovie);