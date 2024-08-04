import {Request, Response, NextFunction} from 'express'
import brandsService from '../services/brands.service';
import { sendJsonSuccess } from '../helpers/responseHandler';

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cates = await brandsService.findAll();
        sendJsonSuccess(res,"success")(cates);
    }catch(error) {
        next(error)
    }
}
const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      const brand = await brandsService.findByID(id)
      sendJsonSuccess(res,"success")(brand);
    }catch(error) {
      next(error)
    }
}
const createRecord = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const brand = await brandsService.createRecord(req.body)
        sendJsonSuccess(res,"success")(brand);
    }catch(error) {
        next(error)
    }
    
}
const updateByID = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      const payload = req.body;
      const newBrand = await brandsService.updateByID(id,payload);
      sendJsonSuccess(res,"success")(newBrand);
    }catch(error) {
      next(error)
    }
}
const deleteByID =async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      const brand =await brandsService.deleteByID(id)
      sendJsonSuccess(res,"success")(brand);
    }catch(error) {
      next(error)
    }
}
export default {
    findAll,
    findById,
    createRecord,
    updateByID,
    deleteByID
}