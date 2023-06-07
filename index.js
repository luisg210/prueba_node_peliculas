import express from "express";
import morgan from 'morgan';
import { movieRouter, rentRouter, saleRouter, userRoutes } from "./src/router/index.js";
import dotenv from 'dotenv';
import cors from 'cors';

const PORT = 5000 || process.env.PORT;

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
dotenv.config();

app.use('/movies/api/v1', movieRouter);
app.use('/users/api/v1', userRoutes);
app.use('/rent_movies/api/v1', rentRouter);
app.use('/sale_movies/api/v1', saleRouter);

app.listen(PORT, () => {
    console.log(`Server is on port ${PORT}`);
});