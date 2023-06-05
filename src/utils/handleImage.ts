import { Request } from 'express';
import DatauriParser from 'datauri/parser';
import path from 'path';
import { cloudinary } from '../config/cloudinary';

class HandleImage {

    public dataUri = (req: Request ) => {
        const parser = new DatauriParser();
        return parser.format(path.extname(req.file?.originalname as string).toString(), req.file?.buffer as Buffer);
    }

    public uploadMethod = async(file: string, type: 'Avatar' | 'QRCode' | 'Event') => {
        try {
            const result = await cloudinary.v2.uploader.upload(file, { folder: type })
            return result
        } catch (error) {
            return false
        }
    }

    public deleteMethod = async(publicId: string) => {
        try {
            await cloudinary.v2.uploader.destroy(publicId)
            return true
        } catch (error) {
            return false
        }
    }
}

export default new HandleImage