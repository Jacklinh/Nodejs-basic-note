import {Request, Response, NextFunction} from 'express';
import categoriesService from '../services/categories.service';
import { sendJsonSuccess } from '../helpers/responseHandler';
import { uploadImage } from '../helpers/multerUpload';
import multer from 'multer';
const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await categoriesService.findAll(req.query);
        sendJsonSuccess(res,"success")(category); 
    }catch(error) {
        next(error)
    }
}
const findByID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const category = await categoriesService.findByID(id);
        sendJsonSuccess(res,"success")(category);
    }catch(error) {
        next(error)
    }
}
const createRecord = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        const category = await categoriesService.createRecord(payload);
        sendJsonSuccess(res,"success")(category);
    }catch(error) {
        next(error)
    }
}
const updateByID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const payload = req.body;
        const newCategory = await categoriesService.updateByID(id,payload);
        sendJsonSuccess(res,"success")(newCategory);
    }catch(error) {
        next(error)
    }
}
const deleteByID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const category = await categoriesService.deleteByID(id);
        sendJsonSuccess(res,"succcess")(category);
    }catch(error) {
        next(error)
    }
}
export default {
    findAll,
    findByID,
    createRecord,
    updateByID,
    deleteByID
}