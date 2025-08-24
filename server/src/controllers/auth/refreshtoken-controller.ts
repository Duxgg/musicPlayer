const usersDB = {
    users: require('../../models/users.json'),
    setUsers: function (data:any) { this.users = data }
}
import jwt from 'jsonwebtoken'; 
require('dotenv').config();

const handleRefreshToken = (req: any, res: any) => {
    const cookies = req.cookies;
    console.log(req); 
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = usersDB.users.find((person: { refreshToken: any; }) => person.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY!,
        (err: any, decoded: any) => {
            if (err || !decoded || foundUser.username !== decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "username": decoded.username },
                process.env.ACCESS_TOKEN_KEY!,
                { expiresIn: '30s' }
            );
            res.json({ accessToken })
        }
    );
}

module.exports = { handleRefreshToken }