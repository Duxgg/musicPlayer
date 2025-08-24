 
import express from 'express'
const router = express.Router();
 
const registerController = require('../../controllers/auth/register-controller');
 
router.post('/', registerController.handleNewUser);

module.exports = router;