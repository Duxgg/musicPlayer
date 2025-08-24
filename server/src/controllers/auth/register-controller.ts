
const usersDB = {
    users: require('../../models/users.json'),
    setUsers: function (data:any) { this.users = data }
}
import { promises as fsPromises } from 'fs';
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req: { body: { user: any; pwd: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: any; success?: string; }): void; new(): any; }; }; sendStatus: (arg0: number) => any; }) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    // check for duplicate usernames in the db
    const duplicate = usersDB.users.find((person: { username: any; }) => person.username === user);
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //store the new user
        const newUser = { "username": user, "password": hashedPwd };
        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '../..', 'models', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users);
        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ 'message': err.message });
        } else {
            res.status(500).json({ 'message': 'An unknown error occurred.' });
        }
    }
}

module.exports = { handleNewUser };
