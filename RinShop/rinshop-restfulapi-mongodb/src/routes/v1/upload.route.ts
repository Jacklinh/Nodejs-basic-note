import express from "express";
import multer from 'multer';
import { uploadImage } from "../../helpers/multerUpload";
const router = express.Router();

// Cos handle loi response
router.post('/photo', (req, res, next)=>{
uploadImage(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log(err);
        res.status(500).json({
          statusCode: 500,
          message: err.message,
          typeError: 'MulterError'
      })
      } else if (err) {
        res.status(500).json({
          statusCode: 500,
          message: err.message,
          typeError: 'UnKnownError'
      })
      }
      res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: {
            link: `uploads/${req.file?.filename}`,
            payload: req.body
        }
    });
    })
})

export default router;
