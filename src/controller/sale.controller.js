import { SaleModel } from "../model/index.js";

export const saleMovie = async (req, res) => {
    try {
        const { email, qty, id_movie } = req.body;
        
        const insertRent = await SaleModel.create({
            email, 
            qty,
            id_movie
        });

        res.status(201).send(insertRent);

    } catch (error) {
        console.error('Error en rentController: ' + error);
        res.status(500).json({
             msg: 'An error has ocurred'
        });
    }
}