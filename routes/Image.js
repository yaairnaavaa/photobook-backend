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
        path: 'user',
        model: 'User',
        select: {
            password: 0
        },
        populate: {
            path: 'profile',
            model: 'Profile'
        }
    })
    .then(
        images => {       
            res.status(200).json(images);
        }
    );
});

// Get all user images
userRouter.get('/getUserImages/:userId',(req, res, next) => {
    console.log("Get user images");
    const userId = req.params.userId;
    Image.find({user:userId})
    .populate({
        path: 'user', model: 'User',
        select: {
            password: 0
        }
    })
    .then(
        images => {       
            res.status(200).json(images);
        }
    );
});

// Get image by id
userRouter.get('/getImage/:imageId',(req, res, next) => {
    console.log("Get image by id");
    const imageId = req.params.imageId;
    Image.find({_id:imageId})
    .populate({
        path: 'user',
        model: 'User',
        select: {
            password: 0
        }
    })
    .populate({
        path: 'coments.user', model: 'User',
        select: {
            password: 0
        },
        populate: {
            path: 'profile',
            model: 'Profile'
        }
    })
    .then(
        images => {       
            res.status(200).json(images);
        }
    );
});

// Upload image
userRouter.post('/saveImage',async (req, res, next) => {
    console.log("Upload image");
    const data = req.body;
    const image = req.file;

    const imageUpload = await uploadImageCloudinary(image);

    console.log(data);
    const newImage = {
        user: data.userId,
        name: data.name,
        description: data.description,
        imageURL: imageUpload.url,
        public_id: imageUpload.public_id
    }
    
    Image.create(newImage)
    .then(async newImage => {
        if(newImage){
            await fs.unlink(image.path);
            res.status(200).json({message : {msgBody : "Image Stored Successfully", msgError: false}});
        } else {
            res.status(500).json({message : {msgBody : "An error occurred while saving the image", msgError: true}});
        }

    });
});

// Save comment
userRouter.put('/saveComment',async (req, res, next) => {
    console.log("Save comment image");
    const data = req.body;
    console.log(data);
    Image.updateOne(
    {
        _id: data.imgId
    }, 
    {
        $push: {
            coments : {
                user : data.comment.user,
                comment : data.comment.comment.newComment
            }
        }
    }, 
    (error, data) => {
        if (error) {
            res.status(500).json({message : {msgBody : "Comment don't save", msgError : true}});
        } else {
            res.status(200).json({message : {msgBody : "Comment save", msgError : false}});
        }
    })
});


const uploadImageCloudinary = (image) => {
    return new Promise( async (resolve) => {
        const result = await cloudinary.v2.uploader.upload(image.path,{folder:'photobook'});
        resolve({url:result.secure_url,public_id:result.public_id});
    })
}

module.exports = userRouter;
