import { Router } from "express";
import { validateToken } from "../middleware/index.js";
import { saleMovie } from "../controller/index.js";

export const saleRouter = Router();

saleRouter.post('/', validateToken, saleMovie);