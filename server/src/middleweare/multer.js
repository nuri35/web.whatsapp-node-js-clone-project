const multer = require("multer")
const path = require("path");


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,`${process.env.UPLOADS_FILES}`)
    },

    filename:(req,file,cb)=>{
      
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) 
    cb(null, uniqueSuffix +  '-' +  path.extname(file.originalname))
    }

})


const fileFilter  = (req,file,cb)=>{
   
    const fileSize = parseInt(req.headers['content-length']);
   
    const filetypes = /jpeg|jpg|png|pdf|txt|text|docx|xlsx|document|sheet/;
 
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
   
 
    if(extname && mimetype){
     
        if(fileSize <=3228281){
            cb(null,true) 
        }else{
            cb(null,false) 
        }
    
    }else{
    
        cb(null,false) 
      
    }



}


const uploadfiles = multer({storage,fileFilter})


module.exports = uploadfiles;