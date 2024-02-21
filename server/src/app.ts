import express from 'express';
const app = express();
import * as dotenv from 'dotenv';
import cors from 'cors';


dotenv.config({ path: __dirname + '../.env' });

const PORT = process.env.PORT || 5000;

require('./db/conn');

app.use(cors({
    // origin: true,
    origin: 'https://share-bill-lemon.vercel.app',
    credentials: true
}));

app.use(express.json());
app.use(require("./router/auth"));


app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})