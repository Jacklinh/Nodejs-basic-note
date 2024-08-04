import {Request, Response, NextFunction} from 'express'
import customersService from '../services/customers.service';
import { sendJsonSuccess } from '../helpers/responseHandler';

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cates = await customersService.findAll();
        sendJsonSuccess(res,"success")(cates);
    }catch(error) {
        next(error)
    }
}
const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      const customer = await customersService.findByID(id)
      sendJsonSuccess(res,"success")(customer);
    }catch(error) {
      next(error)
    }
}
const createRecord = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const customer = await customersService.createRecord(req.body)
        sendJsonSuccess(res,"success")(customer);
    }catch(error) {
        next(error)
    }
    
}
const updateByID = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      const payload = req.body;
      const newCustomer = await customersService.updateByID(id,payload);
      sendJsonSuccess(res,"success")(newCustomer);
    }catch(error) {
      next(error)
    }
}
const deleteByID =async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      const customer =await customersService.deleteByID(id)
      sendJsonSuccess(res,"success")(customer);
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