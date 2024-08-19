import express from 'express'
import productsController from '../../controllers/products.controller';
const router = express.Router();
router.get('', productsController.findAll);
router.get('/:id',productsController.findById)
router.post('', productsController.createRecord)
router.put('/:id',productsController.updateByID)
router.delete('/:id',productsController.deleteByID)
export default router;