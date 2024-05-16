import express from 'express';
import upload from '../../middlewares/multerUpload.js';
import {uploadImage, getImages} from './uploadController.js';

const router = express.Router();

router.get('/images', getImages);
router.post('/upload', upload.single("image"), uploadImage);

export default router
