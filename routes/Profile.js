const express = require('express');
const profileRouter = express.Router();

// Models
const Profile = require('../models/Profile');
const User = require('../models/User');

// Register Profile
profileRouter.post('/new',(req,res)=>{
  const userId = req.body.userId;  
  const newProfile = req.body;
  console.log("Registering profile");
    Profile.create(newProfile)
    .then(async newP => {
        if(newP){
            User.updateOne(
                { _id: userId }, { $set: {profile : newP._id} }, 
                (error, data) => {
                    if (error) {
                        res.status(500).json({message : {msgBody : "Ocurrió un error al guardar perfil", msgError: true}});
                    } else {
                        res.status(200).json({message : {msgBody : "Perfil creado con éxito", msgError: false}});
                    }
              })
        } else {
        res.status(500).json({message : {msgBody : "Ocurrió un error al guardar perfil", msgError: true}});
        }
    });
});


// Get Profile By userId
profileRouter.route('/get/:userId').get((req, res, next) => {
    const userId = req.params.userId;
    console.log("Getting profile by userId");

    User.find({_id : userId},{ password: 0, role: 0 })
    .populate({
        path: 'profile', model: 'Profile'
    }).then(
        user => {       
            console.log(user);
            res.status(200).json(user);
        }
    );
});

// Update Profile By Profile Id
profileRouter.route('/update').put((req, res, next) => {
  const updateProfile = req.body;
  console.log("Updating profile");
  Profile.updateOne(
    {
      _id: updateProfile._id
    }, 
    {
      $set: updateProfile
    }, 
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({message : {msgBody : "Profile updated successfully", msgError : false}});
      }
  })
});

module.exports = profileRouter;
