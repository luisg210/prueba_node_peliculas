import { generateToken } from "../helpers/index.js";
import { LikesModel, UserModel } from "../model/index.js";
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll();

        return res.status(200).json(users);

    } catch (error) {
        console.error("Error getAllUser" + error);
        return res.status(500).json({
             msg: 'An error has ocurred'
        }); 
    }
}

export const login = async ( req, res ) => {
    let user_ = {};
    let token;
    
    const { email, password } = await req.body;
    
    try {
        user_ = await UserModel.findOne( { 
            where: {
                email
            }
         } );

        if (user_) {
            const validPass = await bcrypt.compare( password, user_.password );
            
            if ( validPass ) {
                token = generateToken( user_.email, user_.name );
                
                return res.status(200).send({
                    email,
                    user: user_,
                    token 
                });

            } else {
                return res.status(500).send({
                    msg: 'Error al crear token'
                });
            }
        }

        return res.status(500).send({
            msg: 'Login failed!'
        })

    } catch (error) {
        console.error('Error en login' + error);
        res.status(500).json({
             msg: 'An error has ocurred'
        }); 
    }   
}

export const renew = async (req, res) => {
    try {
        const { email } = await req.body;

        const data = await UserModel.findOne({
            where: {
                email
            }
        });
        
        if (data) {
            const token = generateToken( email, data.dataValues.email );
    
            const user_ = await UserModel.findOne( { 
                where: {
                    email
                }
            } ); 
    
            return res.send({
                token,
                user: user_
            });
    
        } else {
            res.status(404).json({
                msg: 'User not found'
           }); 
        } 

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'An error has ocurred'
       }); 
    }
}

export const createUser = async (req, res) => {
    let userDB;
    let token;

    try {
        const { name, email, password } = await req.body;

        userDB = await UserModel.findOne( { 
            where: {
                email
            }
         } );
         
        if ( userDB ) {
            return res.status(500).json({
                msg: 'User alredy exist!'
           }); 

        } else {
            const salt = bcrypt.genSaltSync();
            const passwordEncripted = bcrypt.hashSync( password, salt );
            const newUser = await UserModel.create( {email, password: passwordEncripted, name} );

            token = generateToken( newUser.email, newUser.name );

            return res.status(200).json({
                msg: 'User created!',
                token,
                newUser
           }); 
        }
    
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'An error has ocurred',
       }); 
    }
}

export const updateUser = async (req, res) => {
    try {
        const { name, email, rol, password } = req.body;
        let affectedCount;
        const salt = bcrypt.genSaltSync();
        const passwordEncripted = bcrypt.hashSync( password, salt ); 

        affectedCount = await UserModel.update({
            name,
            email,
            rol, 
            password: passwordEncripted
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
        console.error(error);
        return res.status(500).json({
             msg: 'An error has ocurred'
        });
    }
}

export const getRoleByEmail = (email) => async () => {
    let role = {};

    try {
        role = await UserModel.findOne({
            attributes: ['role'],
            where: {
                email
            }
        });

    } catch (error) {
        console.error(error);
    }

    return role;
} 

export const getLikesByUser = async (req, res) => {
    try {
        const data = await LikesModel.findAll({
            where: {
                email: req.params.email 
            }
        });
        console.log(data)
        return res.status(200).json(data);

    } catch (error) {
        console.error("Error getAllUser" + error);
        return res.status(500).json({
             msg: 'An error has ocurred'
        }); 
    }
}