import type { Request } from "express";
import multer, { type FileFilterCallback } from "multer";
import { v4 } from "uuid";

const uploadImage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, `${v4()}_${file.originalname.split(" ").join("_").toLowerCase()}`)
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"]

    if(!allowedTypes.includes(file.mimetype)){
        return cb(new Error("Format de fichier non autorisé"));
    }

    cb(null, true);
}

const uploadImagesMiddleware = multer({
    storage: uploadImage,
    fileFilter, 
    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MO
    }

}).array("images", 10);

const uploadImageMiddleware = multer({
    storage: uploadImage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
}).single("image");


export {uploadImagesMiddleware, uploadImageMiddleware}

