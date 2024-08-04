import {Request, Response, NextFunction} from 'express'
import productsService from '../services/products.service';
import { sendJsonSuccess } from '../helpers/responseHandler';

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cates = await productsService.findAll();
        sendJsonSuccess(res,"success")(cates);
    }catch(error) {
        next(error)
    }
}
const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      const product = await productsService.findByID(id)
      sendJsonSuccess(res,"success")(product);
    }catch(error) {
      next(error)
    }
}
const createRecord = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const product = await productsService.createRecord(req.body)
        sendJsonSuccess(res,"success")(product);
    }catch(error) {
        next(error)
    }
    
}
const updateByID = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      const payload = req.body;
      const newProduct = await productsService.updateByID(id,payload);
      sendJsonSuccess(res,"success")(newProduct);
    }catch(error) {
      next(error)
    }
}
const deleteByID =async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      const product =await productsService.deleteByID(id)
      sendJsonSuccess(res,"success")(product);
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