import express from 'express';
const app = express();
import 'dotenv/config';
import client from './config/dbConnect.js';
const PORT = process.env.PORT /*|| 3000*/;

client.connect(() => {
    console.log('Connected to Postgres database');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})