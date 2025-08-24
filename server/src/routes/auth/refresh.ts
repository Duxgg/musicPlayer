import express from 'express'
const router = express.Router();
const refreshTokenController = require('../../controllers/auth/refreshtoken-controller');

router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router;