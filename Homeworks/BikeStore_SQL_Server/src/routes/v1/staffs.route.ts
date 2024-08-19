import express from 'express'
import staffsController from '../../controllers/staffs.controller';
const router = express.Router();
router.get('', staffsController.findAll);
router.get('/:id',staffsController.findById)
router.post('', staffsController.createRecord)
router.put('/:id',staffsController.updateByID)
router.delete('/:id',staffsController.deleteByID)
export default router;