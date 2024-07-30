import {Request, Response, NextFunction} from 'express'
// import servers
import categoriesService from '../services/categories.service';
const findAll = (req: Request, res: Response, next: NextFunction) => {
    try {
        // lấy data từ services
        const cates = categoriesService.findAll();
        // trả lại cho client
        res.status(200).json({
            data: cates
        });
    }catch(error) {
        next(error)
    }
}
const findByID = (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      const category = categoriesService.findByID(parseInt(id))
      res.status(200).json({
        data: category
      })
    }catch(error) {
      next(error)
    }
}
const createRecord = (req: Request, res: Response, next: NextFunction)=>{
    try {
        const category = categoriesService.createRecord(req.body)
        res.status(201).json({
            data: category
        })
    }catch(error) {
        next(error)
    }
    
}
const updateByID = (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      const payload = req.body;
      // kiểm tra sự tồn tại của danh mục
      const newCategory = categoriesService.updateByID(parseInt(id),payload)
      res.status(200).json({
        data: newCategory
      })
    }catch(error) {
      next(error)
    }
}
const deleteByID = (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      const category = categoriesService.deleteByID(parseInt(id));
      // return 
      res.status(200).json({
        data: category
      })
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