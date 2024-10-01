import { Request, Response, NextFunction, response } from "express";
import productsService from "../services/products.service";
import { sendJsonSuccess } from "../helpers/responseHandler";
import {uploadImage} from "../helpers/multerUpload"
import multer from "multer";
const findAll = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productsService.findAll(req.query);
        sendJsonSuccess(res,"success")(product);
    }catch(error) {
        next(error);
    }
}
const findByID = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const product = await productsService.findByID(id);
        sendJsonSuccess(res,"success")(product)
    }catch(error) {
        next(error);
    }
}
const findAllCategoryBySlug = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {slug} = req.params;
        const product = await productsService.findAllCategoryBySlug(slug);
        sendJsonSuccess(res,"success")(product);
    }catch(error) {
        next(error);
    }
}
const findOneBySlug = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {slug} = req.params;
        const product = await productsService.findOneBySlug(slug);
        sendJsonSuccess(res,"success")(product)
    }catch(error) {
        next(error);
    }
}
const createRecord = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productsService.createRecord(req.body)
        sendJsonSuccess(res,"success")(product);
    }catch(error) {
        next(error)
    }
}
const createDocument = async (req: Request, res: Response, next: NextFunction)=>{
    try {
      uploadImage(req, res, async function (error) {
        if (error instanceof multer.MulterError) {
           // 1 lỗi của Multer xảy ra khi upload.
           res.status(500).json({
              statusCode: 500,
              message: error.message,
              typeError: 'MulterError'
          })
        } else if (error) {
          // 1 lỗi không xác định xảy ra khi upload.
          res.status(500).json({
              statusCode: 500,
              message: error.message,
              typeError: 'UnKnownError'
          })
        }
        else{
        //Nếu upload hình thành công thì mới tạo sản phẩm
        const product = await productsService.createDocument({
            ...req.body,
            thumbnail: `uploads/${req.file?.filename}`, //cập nhật lại link sản phẩm
        })
        sendJsonSuccess(res)(product)
        }
      })
    } catch (error) {
      next(error)
    }
}

const updateByID = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const payload = req.body;
        const product = await productsService.updateByID(id,payload);
        sendJsonSuccess(res,"success")(product)
    }catch(error) {
        next(error);
    }
}
const deleteByID = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const product = await productsService.deleteByID(id);
        sendJsonSuccess(res,"success")(product)
    }catch(error) {
        next(error);
    }
}
export default {
    findAll,
    findByID,
    findAllCategoryBySlug,
    findOneBySlug,
    createRecord,
    createDocument,
    updateByID,
    deleteByID
}