const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () =>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log("database and server connected successfully");
    })
    .catch((error)=>{
        console.log("OOPS , error while connecting database and server....");
        console.log(error);
        console.error(error);
        process.exit(1);
    })
}

module.exports = dbConnect;