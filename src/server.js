import express from 'express';
const app = express();
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRouter from './routes/users.js'

import authRouter from './routes/auth.js';
import logoutRouter from './routes/logout.js';
import refreshRouter from './routes/refresh.js';
import registerRouter from './routes/register.js';

import verifyJWT from './middleware/verifyJWT.js';
import corsOptions from './config/corsOptions.js';
import credentials from './middleware/credentials.js';
import client from './config/dbConnect.js';
const PORT = process.env.PORT /*|| 3000*/;

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use('/', userRouter);

app.use('/register', registerRouter);
app.use('/auth', authRouter);
app.use('/refresh', refreshRouter);
app.use('/logout', logoutRouter);

app.use(verifyJWT);

client.connect(() => {
    console.log('Connected to Postgres database');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})