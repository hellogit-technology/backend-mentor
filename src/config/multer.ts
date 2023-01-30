import multer from 'multer';
import {Request} from 'express'
import DatauriParser from 'datauri/parser';
import path from 'path'

const parser = new DatauriParser();
const storage = multer.memoryStorage()
export const upload = multer({ storage: storage });

export const dataUri = (req: Request) => {
    return parser.format(path.extname(req.file?.originalname as string).toString(), req.file?.buffer as Buffer)        
}

