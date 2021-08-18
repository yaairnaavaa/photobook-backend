const express = require('express');
const userRouter = express.Router();
const fs = require('fs-extra');
const cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: 'photobookapp', 
    api_key: '576621899759921', 
    api_secret: '6awlKDqWyAc8x8fe_Ne6apfWrXs' 
});

// Models
const Image = require('../models/Image');


// Get all images
userRouter.get('/getImages',(req, res, next) => {
    console.log("Get images");
    Image.find()
    .populate({
        path: 'user', model: 'User'
    }).then(
        images => {       
            res.json(images);
        }
    );
});

// Get all user images
userRouter.get('/getUserImages/:userId',(req, res, next) => {
    console.log("Get user images");
    const userId = req.params.userId;
    Image.find({user:userId})
    .then(
        images => {       
            res.json(images);
        }
    );
});

// Get image by id
userRouter.get('/getImage/:imageId',(req, res, next) => {
    console.log("Get image by id");
    const imageId = req.params.imageId;
    Image.find({_id:imageId})
    .populate({
        path: 'user', model: 'User'
    }).then(
        images => {       
            res.json(images);
        }
    );
});

// Upload image
userRouter.post('/saveImage',async (req, res, next) => {
    console.log("Upload image");
    const data = req.body;
    const image = req.file;

    const imageUpload = await uploadImageCloudinary(image);

    const newImage = {
        user: data.userId,
        description: data.description,
        imageURL: imageUpload.url,
        public_id: imageUpload.public_id
    }
    
    Image.create(newImage)
    .then(async newImage => {
        if(newImage){
            await fs.unlink(image.path);
            res.status(201).json({message : {msgBody : "Imagen almacenada con éxito", msgError: false}});
        } else {
            res.status(500).json({message : {msgBody : "Ocurrió un error al guardar imagen", msgError: true}});
        }

    });
});


const uploadImageCloudinary = (image) => {
    return new Promise( async (resolve) => {
        const result = await cloudinary.v2.uploader.upload(image.path,{folder:'photobook'});
        resolve({url:result.secure_url,public_id:result.public_id});
    })
}

module.exports = userRouter;
