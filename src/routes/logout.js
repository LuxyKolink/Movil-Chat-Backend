import express from 'express';
const router = express.Router();
import handleLogout from '../controller/logoutController.js'

export default router.get('/', handleLogout);