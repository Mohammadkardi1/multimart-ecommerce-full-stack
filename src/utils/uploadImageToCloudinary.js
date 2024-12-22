const uploadImageToCloudinary = async file => {

    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME

    
    const uploadData = new FormData()
    uploadData.append('file', file)
    uploadData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
    uploadData.append("folder", process.env.REACT_APP_CLOUDINARY_FOLDER_NAME)


    
    try {
        // Cloudinary's upload API endpoint
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: uploadData
        })

        const data = await response.json()

        // Return the details of the uploaded file (e.g., URL, ID) as a JavaScript object.
        return data
    } catch (error) {
        console.log("Error uploading image to Cloudinary:", error.message);
    }
}

export default uploadImageToCloudinary