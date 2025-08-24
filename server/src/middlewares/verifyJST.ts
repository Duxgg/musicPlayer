
require('dotenv').config();
import jwt, { Secret } from 'jsonwebtoken';
const verifyJWT = (req: { headers: { [x: string]: any; }; user: any; }, res: { sendStatus: (arg0: number) => any; }, next: () => void) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);
    console.log(authHeader); // Bearer token
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_KEY as Secret,
        (err: any, decoded: any) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded?.username;
            next();
        }
    );
}

module.exports = verifyJWT