This project serves as a backend service to handle file uploads. It leverages Express.js for routing, MongoDB for data storage, and Cloudinary for cloud-based file storage and management.
# File Upload App Backend API

## Upload File to Local Server

- **URL:** `/api/v1/localFileUpload`
- **Method:** POST
- **Description:** Upload a file to the local server and create an entry in the database.
- **Request Body:** Form data containing the file to upload.
- **Response:** Metadata of the uploaded file.

## Upload Image to Cloudinary

- **URL:** `/api/v1/imageUpload`
- **Method:** POST
- **Description:** Upload an image file to Cloudinary and create an entry in the database.
- **Request Body:** Form data containing the image file to upload.
- **Response:** Metadata of the uploaded image.

## Upload Video to Cloudinary

- **URL:** `/api/v1/videoUpload`
- **Method:** POST
- **Description:** Upload a video file to Cloudinary and create an entry in the database.
- **Request Body:** Form data containing the video file to upload.
- **Response:** Metadata of the uploaded video.

## Upload Compressed Image to Cloudinary

- **URL:** `/api/v1/imageSizeReducer`
- **Method:** POST
- **Description:** Upload an image file to Cloudinary after compressing it and create an entry in the database.
- **Request Body:** Form data containing the image file to compress and upload.
- **Response:** Metadata of the compressed and uploaded image.
