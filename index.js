import express from 'express';
import cors from 'cors';
import apis from './apis/app.js';

const app = express();
const port = 8088;

app.use(cors());

app.use('/uploads', express.static('uploads'));

app.use(apis);

app.listen(port, () => {
    console.log(`server started listening at port: ${port}`);
})

