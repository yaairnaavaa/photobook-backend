const  appConfig  = require('./config');

// Config server
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('dev'));

// Models
const User = require('./models/User');

// Routes
const userRouter = require('./routes/User');

// Use routes
app.use('/user',userRouter);

// Conection to mongodb
mongoose.connect(`mongodb://${appConfig.dbConfig.host}:${appConfig.dbConfig.port}/${appConfig.dbConfig.dbName}`,{useNewUrlParser : true,useUnifiedTopology: true},()=>{
    console.log('Successfully connected to database photoBook-db');
});

// Assign port
const PORT = (process.env.PORT || appConfig.appConfig.port);

// Run server
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
});