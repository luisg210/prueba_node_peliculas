import { Router } from "express";
import { createMovie, deleteMovie, desLikeMovie, getAllMovies, getAllMoviesAvailables, getMovie, getMoviesFilter, likeMovie, searchMovie, updateMovie } from "../controller/index.js";
import { validateRole, validateToken } from "../middleware/index.js";
import { upload } from "../helpers/index.js";

export const movieRouter = Router();

//Todos los usuario, solo peliculas disponibles
movieRouter.get('/', getAllMoviesAvailables);
movieRouter.get('/all_movies', validateToken, validateRole, getAllMovies);
movieRouter.get('/filter/:filter', validateToken, validateRole, getMoviesFilter);
movieRouter.get('/search/:q', searchMovie);
movieRouter.get('/:id', getMovie);
movieRouter.post('/', validateToken, validateRole, upload.single('image'), createMovie);
movieRouter.post('/like', validateToken, likeMovie);
movieRouter.delete('/deslike/:id', validateToken, desLikeMovie);
movieRouter.put('/:id', validateToken, validateRole, upload.single('image'), updateMovie);
movieRouter.delete('/:id', validateToken, validateRole, deleteMovie);