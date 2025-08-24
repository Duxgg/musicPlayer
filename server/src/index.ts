import express from 'express' 
import cors from 'cors'; 
// import userRouter from './routes/user/user-route'
import bodyParser from 'body-parser'
import path from 'path' 
import prisma from './utils/prisma';
const app = express()
const PORT = process.env.PORT || 5000
const fsPromises = require('fs').promises;
app.use(cors()); 
 
// app.use('/', userRouter)
app.use(express.static(path.join(__dirname, "public")));
 
//const corsOptions = require('./config/corsOptions'); 
//const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middlewares/verifyJST');
import cookieParser  from  'cookie-parser' 
const credentials = require('./middlewares/creentials');
 

// Handle options credentials check - before CORS 
// fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
//app.use(cors(corsOptions));

//  handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

//  middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes 
app.use('/register', require('./routes/auth/register'));
app.use('/auth', require('./routes/auth/auth'));
app.use('/refresh', require('./routes/auth/refresh'));
// app.use('/logout', require('./routes/logout')); too lazy to implement

app.use(verifyJWT);
 

//app.use(errorHandler); too lazy to implement

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  