import {Request, Response, NextFunction} from 'express'
import staffsService from '../services/staffs.service';
import { sendJsonSuccess } from '../helpers/responseHandler';

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cates = await staffsService.findAll();
        sendJsonSuccess(res,"success")(cates);
    }catch(error) {
        next(error)
    }
}
const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      const staff = await staffsService.findByID(id)
      sendJsonSuccess(res,"success")(staff);
    }catch(error) {
      next(error)
    }
}
const createRecord = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const staff = await staffsService.createRecord(req.body)
        sendJsonSuccess(res,"success")(staff);
    }catch(error) {
        next(error)
    }
    
}
const updateByID = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      const payload = req.body;
      const newStaff = await staffsService.updateByID(id,payload);
      sendJsonSuccess(res,"success")(newStaff);
    }catch(error) {
      next(error)
    }
}
const deleteByID =async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      const staff =await staffsService.deleteByID(id)
      sendJsonSuccess(res,"success")(staff);
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