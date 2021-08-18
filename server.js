const  appConfig  = require('./config');

// Config server
const express = require("express");
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// Assign port
const PORT = (process.env.PORT || appConfig.appConfig.port);

// Run server
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
});