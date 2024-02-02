//Set up dotenv
const dotenv = require('dotenv');
dotenv.config();

//Setup CORS 
const cors = require("cors");


//Set up Express server
const express = require('express');
const app = express();

// Table containing the allowed origins
const allowedOrigins = [
    "http://localhost:5173",
    "https://projet-01-maxrep-front.vercel.app",
    "https://maxrep.vercel.app"
];

const corsOptions = {


    origin: function (origin, callback) {
        //Verify if the origin of the request is in the allowed origins
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Origin not allowed by CORS"));
        }

    }


};
// Authorize cross-origin requests
app.use(cors(corsOptions));

// Body parser to provide res in JSON format
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Body parser for  application/x-www-urlencoded

//Use router TO point on index.js in router
const router = require('./router');
app.use('/api' , router);


//server listening
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening @ http://localhost:${port} ...`);
});