import express from 'express';
const app = express();
import * as dotenv from 'dotenv';
// import cors from 'cors';


dotenv.config({ path: __dirname + '/.env' });

const PORT = process.env.PORT || 5000;

require('./db/conn');

// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true
// }));

app.use(express.json());
app.use(require("./router/auth"));


app.get('/', (req, res) => {
    res.json({ message: "Server setup is done" });
})

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})