import express from 'express';
import uploadFile from './imageUpload/index.js';

const router = express.Router();

router.use('/file', uploadFile);


const parentRouter = express.Router();
parentRouter.use('/api', router);


export default parentRouter;




