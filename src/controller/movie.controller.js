import { Op } from "sequelize";
import { MovieModel, LikesModel } from "../model/index.js";

export const getAllMovies = async (req, res) => {
    try {
        const offset = req.header('offset');
        const order = req.header('order') || 'title';
        
        const movies = await MovieModel.findAndCountAll({
            order: [[order, 'DESC']],
            limit: 10,
            offset: parseInt(offset) 
        }); 
        res.status(200).json(movies);

    } catch (error) {
        console.error(error);
        res.status(500).json({
             msg: 'An error has ocurred'
        }); 
    }  
}   

export const getAllMoviesAvailables = async (req, res) => {
    try {
        const offset = req.header('offset');
        const order = req.header('order') || 'title';
        
        const movies = await MovieModel.findAndCountAll({
            order: [[order, 'DESC']],
            limit: 10,
            offset: parseInt(offset),
            where: {
                is_available: true
            }
        });
        res.status(200).json(movies);

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
             msg: 'An error has ocurred'
        }); 
    } 
}

export const getMoviesFilter = async (req, res) => {
    try {
        const offset = req.header('offset');
        const filter = req.params.filter;
        const order = req.header('order') || 'title';
        //si el el parametro viene available se asigna un uno = true, caso contrario 0 = false
        const filterValue = filter === 'available' ? 1 : 0; 
       
        const movies = await MovieModel.findAndCountAll({
            order: [[order, 'DESC']],
            limit: 10,
            offset: parseInt(offset),
            where: {
                is_available: filterValue
            }
        });
        res.status(200).json(movies);

    } catch (error) {
        console.error(error);
        res.status(500).json({
             msg: 'An error has ocurred'
        }); 
    } 
}  

export const searchMovie = async (req, res) => {
    try {
        const offset = req.header('offset');
        const q = req.params.q;
        const order = req.header('order') || 'title';
        
        const movies = await MovieModel.findAndCountAll({
            order: [[order, 'DESC']],
            limit: 10,
            offset: parseInt(offset),
            where: {
                title: {
                    [Op.like]: `%${q}%`  
                }
            }
        });
        res.status(200).json(movies);

    } catch (error) {
        console.error(error);
        res.status(500).json({
             msg: 'An error has ocurred'
        }); 
    } 
}

export const getMovie = async (req, res) => {
    try {
        const movie = await MovieModel.findOne({
            where: {id: req.params.id}
        });

        if (movie)
            return res.status(200).json(movie);
        else 
            return res.status(404).json({
                msg: 'Movie not found'
            });

    } catch (error) {
        res.status(500).json({
             msg: 'An error has ocurred'
        });
    }
}

export const createMovie = async (req, res) => {
    try {
        let file = req.file;
        const { title, description, stock, rental_price, sale_price, is_available } = req.body;
        let newMovie;
        //image in base64
        const image = file && bufferToBase64(file.buffer);
        
        newMovie = await MovieModel.create({
            title,
            description,
            stock,
            image,
            rental_price,
            sale_price,
            is_available,
        });

        res.status(201).json(newMovie);

    } catch (error) {
        console.error(error);
        res.status(500).json({
             msg: 'An error has ocurred'
        });
    }
}

export const updateMovie = async (req, res) => {
    try {
        let file = req.file;
        let { title, description, stock, rental_price, sale_price, is_available } = req.body;
        let affectedCount;
        //image in base64
        const image = file && bufferToBase64(file.buffer);

        affectedCount = await MovieModel.update({
            title,
            description,
            stock,
            rental_price,
            image,
            sale_price, 
            is_available
        }, {
            where: {
                id: req.params.id
            }
        });

        if (affectedCount > 0)
            return  res.status(200).json({msg: 'Updated'});
        else 
            return  res.status(500).json({msg: 'An error has ocurred'}); 

    } catch (error) {
        console.log(`Error: ${error}`)
        res.status(500).json({
             msg: 'An error has ocurred'
        });
    }
}

export const deleteMovie = async (req, res) => {
    try {
        const movieDelete = await MovieModel.destroy({
            where: {id: req.params.id}
        });
       
        if (movieDelete > 0)
            return res.sendStatus(204);
        else 
            return res.status(404).json({
                msg: 'Movie not found'
            });

    } catch (error) {
        return res.status(500).json({
             msg: 'An error has ocurred'
        });
    }
}

export const likeMovie = async (req, res) => {
    try {
        const { email, id_movie } = req.body;
        const data = await LikesModel.findOrCreate({
            where: {
                email,
                id_movie
            }, 
            defaults: {
                email,
                id_movie
            }
        });

        if (data[1]) 
            return res.sendStatus(201);
        else 
            return res.status(500).json({
                msg: 'post liked'
            });    

    } catch (error) {
        console.error(error);
        res.status(500).json({
             msg: 'An error has ocurred'
        }); 
    } 
}

export const desLikeMovie = async (req, res) => {
    try {
        const id = req.params.id;
        const email = req.header('email');

        const { dataValues: like} = await LikesModel.findOne({
            where: {
                id_movie: id,
                email 
            }
        });
        
        if (like) {
            const deslikeCount = await LikesModel.destroy({
                where: {id: like.id}
            }); 

            if (deslikeCount > 0)
                return res.sendStatus(204)
            else {
                return res.status(500).json({
                    msg: 'An error has ocurred'
                });
            }

        } else 
            return res.sendStatus(404);
           
    } catch (error) {
        console.error(error);
        res.status(500).json({
             msg: 'An error has ocurred'
        }); 
    } 
}

const bufferToBase64 = (buffer) => Buffer.from(buffer).toString('base64');