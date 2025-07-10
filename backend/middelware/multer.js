import multer from 'multer';

// set storage configuration for uploaded files
const storage = multer.diskStorage({
    filename:function(req,file,callback){ // set file name 
        callback(null,file.originalname)
    }
})
// storage configuration when initailizing multer 
const upload = multer({storage});

export default upload