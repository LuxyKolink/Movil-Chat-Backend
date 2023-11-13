import express from 'express';
const router = express.Router();

import UserModel from '../model/User.js';

router.get('/users', UserModel.getUsers);
router.get('/users/:id', UserModel.getUserById);
router.get('/users/:email', UserModel.getUserByEmail);
router.post('/users', UserModel.createUser);
router.put('/users/:id', UserModel.updateUser)
router.delete('/users/:id', UserModel.deleteUser);

export default router;

