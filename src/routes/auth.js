import express from 'express';
const router = express.Router();
import handleLogin from '../controller/authController.js'

export default router.post('/', handleLogin);