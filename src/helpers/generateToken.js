import jwt from "jsonwebtoken";

export const generateToken = ( email ) => {
    try {
        const payload = { email };

        const token = jwt.sign( payload, process.env.SECRET_WORD , {
            expiresIn: '12h'
        });
        
        return token;

    } catch (err) {
        console.log(err);
    }
}