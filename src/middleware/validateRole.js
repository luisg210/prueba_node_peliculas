import { UserModel } from "../model/index.js";

export const validateRole = async (req, res, next) => {
    const email = req.body.email || req.header('email');
    const {role} = await UserModel.findOne({
        attributes: ['role'],
        where: {
            email
        }
    });
    
    if (role != 'admin') {
        return res.status(401).send({
            msg: 'Unauthorized'
        });
    }
    
    next();
} 