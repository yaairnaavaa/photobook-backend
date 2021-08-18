const  appConfig  = require('./config');

// Config server
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const cookieParser = require("cookie-parser");
const path = require('path');
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Config multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});
app.use(multer({storage}).single('image'))

// Models
const User = require('./models/User');

// Routes
const userRouter = require('./routes/User');
const imageRouter = require('./routes/Image');
const profileRouter = require('./routes/Profile');

// Use routes
app.use('/user',userRouter);
app.use('/image',imageRouter);
app.use('/profile',profileRouter);
app.use('/public',express.static(`${__dirname}/storage/imgs`));

// Conection to mongodb
mongoose.connect(`mongodb://${appConfig.dbConfig.host}:${appConfig.dbConfig.port}/${appConfig.dbConfig.dbName}`,{useNewUrlParser : true,useUnifiedTopology: true},()=>{
    console.log('Successfully connected to database photoBook-db');
});

createAdminUser();

// Assign port
const PORT = (process.env.PORT || appConfig.appConfig.port);

// Run server
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
});


function createAdminUser(){
    // Admin data
    const adminUser ={
        username:"admin",
        password:"123456",
        role:"admin"
    }

    // Verified if admin user exist
    User.findOne({username:'admin'},(err,user)=>{
        if(err) {
            console.log("Error has occured");
        }
        if(user) {
            console.log("Admin user is already created");
        }
        else{
            // If not exist then create
            const newUser = new User(adminUser);
            newUser.save(err=>{
                if(err) {
                    console.log("Error has occured");
                }
                else {
                    console.log("Admin user has been created");
                }
            });
        }
    });
}