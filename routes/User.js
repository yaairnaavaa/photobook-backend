const express = require('express');
const userRouter = express.Router();

// Models
const User = require('../models/User');

// Register User
userRouter.post('/new',(req,res)=>{
  const newUser = req.body;
  console.log("Registering user");
  User.findOne({username: newUser.username},(err,user)=>{
      if(err) {
        res.status(500).json({message : {msgBody : "Ocurrió un error al buscar usuarios existentes", msgError: true}});
      }
      if(user) {
        res.status(400).json({message : {msgBody : "El nombre de usuario ingresado ya está en uso, elegir uno nuevo", msgError: true}});
      } else{
        User.create(newUser)
        .then(async newU => {
          if(newU){
            res.status(200).json({message : {msgBody : "Cuenta creada con éxito", msgError: false}});
          } else {
            res.status(500).json({message : {msgBody : "Ocurrió un error al guardar usuario", msgError: true}});
          }
        });
      }
  });
});

// Get all users
userRouter.get('/getAll',(req,res)=>{
  console.log("Getting all users");
  User.find({role:"user"}).exec((err,users)=>{
        if(err){
          return next(error);
        }
        else{
            res.status(200).json(users);
        }
    });
});

// Get user by username
userRouter.route('/get/:username').get((req, res, next) => {
  const username = req.params.username;
  console.log("Getting user by username");
  User.find({username : username},{ password: 0, role: 0 }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json(data[0]);
    }
  })
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
    }, 
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({message : {msgBody : "User updated successfully", msgError : false}});
      }
  })
});

// Delete user
userRouter.delete('/delete/:userId',(req, res, next) => {
  const userId = req.params.userId;
  console.log("Deleting user");
  User.deleteOne({_id:userId}, (error, data) => {
    if (error) {
      res.status(500).json({message : {msgBody : "Ocurrió un error al eliminar el usuario", msgError: true}});
    } else {
      res.status(200).json({message : {msgBody : "Cuenta eliminada con éxito", msgError: false}});
    }
  })
});

module.exports = userRouter;
