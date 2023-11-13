import express from 'express'
const router = express.Router();
import handleRefreshToken from '../controller/refreshTokenController.js'

export default router.get('/', handleRefreshToken);