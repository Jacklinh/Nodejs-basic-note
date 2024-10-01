import {Request, Response, NextFunction} from 'express'
import studentsService from '../services/students.service';
import { sendJsonSuccess } from '../helpers/responseHandler';

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const students = await studentsService.findAll(req.query);
        sendJsonSuccess(res,"success")(students);
    }catch(error) {
        next(error)
    }
}
const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      const student = await studentsService.findByID(id)
      sendJsonSuccess(res,"success")(student);
    }catch(error) {
      next(error)
    }
}
const createRecord = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const student = await studentsService.createRecord(req.body)
        sendJsonSuccess(res,"success")(student);
    }catch(error) {
        next(error)
    }
    
}
export default {
    findAll,
    findById,
    createRecord
}