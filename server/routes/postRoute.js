import express, { Router } from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import PostSchema from '../MongoDB/models/post.js'

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//GET ALL POST
router.route('/').get(async(req, res) => {
    try {
        const posts = await PostSchema.find({});
        res.status(200).json({ success : true, data : posts })
    } catch (error) {
        res.status(500).json({ success : false, message : error })
    }    
})
//CREAT NEW POST
router.route('/').post(async (req, res) => {
    try {
        const { prompt, photo, name } = req.body;
        const photoUrl = cloudinary.uploader.upload(photo);
        console.log(photoUrl)
        const newPost = await PostSchema.create({
            name,
            prompt,
            photo: photoUrl.url
        })

        res.status(200).json({ success: true, data: newPost })
    } catch (error) {
        res.status(500).json({ success: false, message:error })
    }
})
export default router;
