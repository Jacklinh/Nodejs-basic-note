import express from 'express'
import customersController from '../../controllers/customers.controller';
const router = express.Router();
router.get('', customersController.findAll);
router.get('/:id',customersController.findById)
router.post('', customersController.createRecord)
router.put('/:id',customersController.updateByID)
router.delete('/:id',customersController.deleteByID)
export default router;