const express = require('express');
const userRouter = express.Router();
const JWT = require('jsonwebtoken');
const passport = require('passport');
const passportConfig = require('../passport');

// Models
const User = require('../models/User');

// JWT
const signToken = userID =>{
  return JWT.sign({
      iss : "NoobCoder",
      sub : userID
  },"NoobCoder",{expiresIn : "24h"});
}

// Register User
userRouter.post('/new',(req,res)=>{
  const newUser = req.body;
  console.log("Registering user");
  User.findOne({username: newUser.username},(err,user)=>{
      if(err) {
        res.status(500).json({message : {msgBody : "An error occurred while searching for existing users", msgError: true}});
      }
      if(user) {
        res.status(400).json({message : {msgBody : "Username is already in use, choose a new one", msgError: true}});
      } else{
        User.create(newUser)
        .then(async newU => {
          if(newU){
            res.status(200).json({message : {msgBody : "Account Created successfully", msgError: false}});
          } else {
            res.status(500).json({message : {msgBody : "An error occurred while saving user", msgError: true}});
          }
        });
      }
  });
});

// Get all users
userRouter.get('/getAll',(req,res)=>{
  console.log("Getting all users");
  User.find({role:"user"})
  .then(async users => {
    if(users){
      res.status(200).json(users);
    } else {
      res.status(500).json(null);
    }
  });
});

// Get user by username
userRouter.route('/get/:username').get((req, res, next) => {
  const username = req.params.username;
  console.log("Getting user by username");
  User.find({username : username},{ password: 0, role: 0 })
  .populate({
    path: 'profile', model: 'Profile',
  })
  .then(async user => {
    if(user[0]){
      res.status(200).json(user[0]);
    } else {
      res.status(500).json(null);
    }
  });
});

// Update user by id
userRouter.route('/update').put((req, res, next) => {
  const updateUser = req.body;
  console.log("Updating user");

  User.updateOne(
  {
    _id: updateUser._id
  }, 
  {
    $set: updateUser
  })
  .then(async newU => {
    if(newU){
      res.status(200).json({message : {msgBody : "User updated successfully", msgError : false}});
    } else {
      res.status(500).json({message : {msgBody : "An error occurred while updating user", msgError: true}});
    }
  });
});

// Delete user
userRouter.delete('/delete/:userId',(req, res) => {
  const userId = req.params.userId;
  console.log("Deleting user");
  User.deleteOne({_id:userId}, (error, data) => {
    if (error) {
      res.status(500).json({message : {msgBody : "An error occurred while deleting the user", msgError: true}});
    } else {
      res.status(200).json({message : {msgBody : "Account successfully deleted", msgError: false}});
    }
  })
});

// Login
userRouter.post('/login',passport.authenticate('local',{session : false}),(req,res)=>{
  console.log("Login");
  if(req.isAuthenticated()){
     const {_id,username,role} = req.user;
     const token = signToken(_id);
     res.cookie('access_token',token,{httpOnly: true, sameSite:true}); 
     res.status(200).json({isAuthenticated : true,user : {username,role,token,_id}});
  }
});

// Logout
userRouter.get('/logout',(req,res)=>{
  console.log("Logout");
  res.clearCookie('access_token');
  res.json({user:{username : "", role : ""},success : true});
});

// Verify authentication
userRouter.get('/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
  console.log("Verify autentication");
  const {username,role} = req.user;
  res.status(200).json({isAuthenticated : true, user : {username,role}});
});

module.exports = userRouter;
