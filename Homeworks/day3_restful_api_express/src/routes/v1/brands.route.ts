import express from 'express'
import brandsController from '../../controllers/brands.controller';
const router = express.Router();
router.get('', brandsController.findAll);
router.get('/:id',brandsController.findById)
router.post('', brandsController.createRecord)
router.put('/:id',brandsController.updateByID)
router.delete('/:id',brandsController.deleteByID)
export default router;