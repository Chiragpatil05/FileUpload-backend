const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

// localfileupload handler , ye client ke path se media fetch karta hai and usko server(server is case mai apna computer hi hai) par kisi path par uplaod kar deta hai
exports.localFileUpload = async (req,res) => {
    try{
        // fetch file (file is the key word in postman)
        const file = req.files.file;
        console.log("file is : ",file);

        // server par kis path pe store karna hai ? path is the server's path here
        // current directory(__dirname) mai ek folder banao "files" uska mai filr store karo jiska name hoga "date.now"
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("server path :" , path)

        // server ke path pe file ko move(mv) karo
        file.mv(path , (err)=>{
            console.log(err);
        });

        res.status(200).json({
            success:true,
            message:"local file uploaded sucessfully"
        })

    }catch(error){
        console.log("Error while uploading the file");
        console.log(error);
    }
}

// function to check wheather the file type is suported or not 
function isFileTypeSupported(type , supportedTypes){
    return supportedTypes.includes(type);
}

// function to upload files at cloudinary
async function uploadFileToCloudinary (file,folder,quality){
    const options = {folder};
    console.log("temp file path : ",file.tempFilePath);

    if(quality){
        options.quality = quality;
    }

    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

// image upload handler
exports.imageUpload = async (req,res) => {
    try{
        // step 1 : fetch the data from request body
        const {name , tags , email} = req.body;
        console.log(name,tags,email);

        // step 2 : receive the file (imageFile is key int the postman )
        const file = req.files.imageFile;
        console.log(file);

        // step3 : validate the file for supported types
        const supportedTypes = ["jpg","jpeg","png"];
        // our file type , which we have received 
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType)

        // check karo ki received file ka jo type hai wo supportedTypes mai hai ki nahi
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format not supported for this image:-("
            })
        }

        // step 4 : file format supported - uplaod the file at cloudinary by uploader.upload function
        console.log('wait image file is uploading .....')
        // MediaData is the folder in cloudinary where the file has been stored
        const response = await uploadFileToCloudinary(file, "MediaData");
        console.log(response);

        // step 5 : save entry in the database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        return res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image sucessfully uploaded at cloudinary"
        })

    }catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"File cannot be uploaded , something went wrong"
        })
    }
}

// video upload handler
exports.videoUpload = async (req,res) =>{
    try{
        // step 1 : fetch the data from requerst body
        const {name , tags , email} = req.body;
        console.log(name,tags,email);

        // step 2 : recieve the video file
        const file = req.files.videoFile;
        console.log(file);

        // step 3 : validate the file for supported types
        const supportedTypes = ["mp4","mov"];
        // file type of our file which we have received
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType);

        // check karo ki received file ka jo type hai wo supportedTypes mai hai ki nahi
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File format does not supported for this video :-("
            })
        }

        // step 4 : file format or type is supported and we have to upload the video file in cloudinary
        console.log("wait video file is uploading");
        const response = await uploadFileToCloudinary(file,"MediaData");
        console.log(response);

        // step 5 : save or create entry in the database
        const fileData = await File.create({
            name,
            tags,
            email,
            videoUrl:response.secure_url
        })



    }catch(error){
        console.error(error);
        res.status(200).json({
            success:false,
            message:"Video cannot be uploaded , something went wrong ..."
        })
    }
}

// image size reduce upload
exports.imageSizeReducer = async (req,res)=>{
    try{
        // step 1 : fetch the data from request body
        const{name , tags , email} = req.body;
        console.log(name,tags,email);

        // step 2 : receive the file
        const file = req.files.imageFile;
        console.log(file);
        
        // step 3 : validate the file on file format
        const supportedTypes = ["jpg","jpeg","png"];
        // file type of the file that we have received
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType);

        // check karo ki file ka type supported hai ki nhi
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file format of image reduced is not supported"
            })
        }

        // step 4 : file type or format is supported , upload the file on cloudinary
        console.log("wait file is compressing and uploading");
        const response = await uploadFileToCloudinary(file,"MediaData",30);
        console.log(response);

        // step 5 : create or save the entry in the database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })

    }catch(error){
        console.error(error);
        return res.status(200).json({
            success:false,
            message:"image size cannot be compressed and can't be uploaded"
        })
    }
}