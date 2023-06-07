import { RentModel } from "../model/index.js";

export const rentMovie = async (req, res) => {
    try {
        const { email, return_movie, qty, id_movie } = req.body;
        console.log("Cantidad" + qty);
        const insertRent = await RentModel.create({
            email, 
            return_movie,
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

export const returnMovie = async (req, res) => {
    try {
        const { is_return } = req.body;
        const { id } = req.params;
        
        const updateRows = await RentModel.update({
            is_return
        }, {
            where: {
                id
            }
        });

        //Busca solo el campo 'return_movie'
        const { return_movie } = await RentModel.findOne({
            attributes: ['return_movie']
        }, {
            where: {
                id
            }
        });

        if (updateRows > 0)
            //retorna la penalidad, si la hay, se cancelan dos dolares
            return res.status(200).send({
                'penalty': {
                    hasPenalty: hasPenalty(return_movie),
                    money: '2.00'
                },
                
            });
        else {
            return res.status(500).send({
                msg: 'An error has ocurred or movie has returned'
            })
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
             msg: 'An error has ocurred'
        });
    }
}

//Retorna si hay penalidad o no
const hasPenalty = (return_movie) => {
    let dateReturn = new Date(return_movie);
    let dateNow = new Date(dateReturn.toLocaleDateString());

    return dateReturn < dateNow;
}