const multer = require('multer')



//definig storage location for the uploaded data with multipart/FormData header
const storage = multer.diskStorage({

    
    destination: (req,file,callback)=>{
        callback(null,'./uploads')
    },

//defining filename for the stored data
filename:(req,file,callback)=>{
    const filename = `image-${Date.now()}-${file.originalname}`
    callback(null,filename)
}
})


//filtering the type of the uploaded file
const fileFilter = (req,file,callback)=>{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/jpeg' ){
        callback(null,true)
    }else{
        callback(null,false)
        return callback(new Error("Please upload files with following extensions (png,jpg,jpeg) only"))
    }
}

const multerConfig = multer({
    storage,fileFilter
})

module.exports = multerConfig