// create express app
const express = require('express')
const cors = require('cors')
const router = require('../router/index.js')

const app = express();

// allow all domains
app.use(cors( { origin: '*'}))

// connect to db
require('./db.config.js')

//parsing different data formats
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// mount app router
app.use('/api/v1/',router)


// handeling 404 page not found
app.use((req,res,next)=>{
    res.status(404).json({
        result:null,
        message:"Page not found!",
        meta:null
    })
})


// handeling other error
app.use((error,req,res,next)=>{

    let code = error.code?? 500;
    let message = error.message?? "Internal server error!";
    let result = error.result?? null;
    let meta = error.meta?? null;


     // Handle 11000 error of mongoose 
    // reusing email where email field doesnot allow duplicate 
    if(error.code === 11000){
        code = 400;
        let uniqueKeys = Object.keys(error.keyPattern)
        message = uniqueKeys.map((key)=> key + "should be unique");
        result = req.body
    }


    res.status(code).json({
        result,
        message,
        meta
    })
})




// export
module.exports = app;