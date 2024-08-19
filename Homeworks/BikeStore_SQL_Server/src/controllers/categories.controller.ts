import {Request, Response, NextFunction} from 'express'
// import servers
import categoriesService from '../services/categories.service';
// import handle success
import { sendJsonSuccess } from '../helpers/responseHandler';

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // lấy data từ services
        const cates = await categoriesService.findAll(req.query);
        // trả lại cho client
        // res.status(200).json({
        //     data: cates
        // });
        // trả lại cho client 
        sendJsonSuccess(res,"success")(cates);
    }catch(error) {
        next(error)
    }
}
const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      /**
     * SELECT * FROM categories WHERE id = ''
     */
      const category = await categoriesService.findByID(id)
      sendJsonSuccess(res,"success")(category);
    }catch(error) {
      next(error)
    }
}
const createRecord = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const category = await categoriesService.createRecord(req.body)
        sendJsonSuccess(res,"success")(category);
    }catch(error) {
        next(error)
    }
    
}
const updateByID = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      const payload = req.body;
      // kiểm tra sự tồn tại của danh mục
      const newCategory = await categoriesService.updateByID(id,payload);
      sendJsonSuccess(res,"success")(newCategory);
    }catch(error) {
      next(error)
    }
}
const deleteByID =async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      const category =await categoriesService.deleteByID(id)
      // return 
      sendJsonSuccess(res,"success")(category);
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