import express from 'express'
const router = express.Router();
import handleNewUser from '../controller/registerController.js'

export default router.post('/', handleNewUser);