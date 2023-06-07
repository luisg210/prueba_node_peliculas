import jwt from "jsonwebtoken";

const verify = jwt.verify;

export const validateToken = ( req, res, next ) => {
    const token = req.header('x-token');
    
    if (!token) {
        return res.status(401).json({ 
            msg: 'No token sent'
        });
    }

    try {
        const { email, user } = jwt.verify(
            token, 
            process.env.SECRET_WORD 
        );
        req.email = email;
        req.user = user;

    } catch ( error ) {
        console.error('Error en login' + error);
        return res.status(401).json({
            msg: 'No valid token: '
        });
    }

    next();
}