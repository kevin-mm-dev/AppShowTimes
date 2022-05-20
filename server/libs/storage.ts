const multer  = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid');


const storage=multer.diskStorage({
    destination:function (req: any,file: any,cb: (arg0: null, arg1: string) => void){
        cb(null,('public/images'))
        // cb(null,path.join(__dirname,'../public/images'))
    },
    filename:function (req: any,file: any,cb: (arg0: null, arg1: string) => void){
        const ext = file.originalname.split('.').pop();
        // cb(null,`${Date.now()}.${ext}`);
        cb(null,uuidv4()+path.extname(file.originalname).toLocaleLowerCase());
    }
})
const FileFilter=(req: any, file: { mimetype: string; }, cb: (arg0: null, arg1: boolean) => void)=>{
    //reject a file
    if (file.mimetype ==='image/jpeg' || file.mimetype ==='image/png' || file.mimetype ==='image/jpg') {
        cb(null,true)
    }else{
        cb(null,false)
    }
}

const upload=multer({
    storage:storage, 
    limits:{filesize:1024*1024*5},
    fileFilter:FileFilter
})

export default upload;