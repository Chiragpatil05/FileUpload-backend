// importing express and creating instance of the express
const express = require("express");
const app = express();

// finding port 
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// middleware for body parsing
app.use(express.json());

// middleware for file upload
const fileUpload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// connect with database 
const db = require("./config/database");
db();

// connect with cloudinary
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// importing routes and mounting
const Upload = require("./routes/fileUploadRoutes");
app.use("/api/v1/upload",Upload);

// listening the port
app.listen(PORT,()=>{
    console.log(`App is sucessfully running at port ${PORT}`);
})
