import multer from 'multer';

const storageDisk = multer.diskStorage({});
export const uploadDisk = multer({ storage: storageDisk });
