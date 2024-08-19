import express from 'express'
import ordersController from '../../controllers/orders.controller';
const router = express.Router();
router.get('', ordersController.findAll);
router.get('/:id',ordersController.findById)
router.post('', ordersController.createRecord)
router.put('/:id',ordersController.updateByID)
router.delete('/:id',ordersController.deleteByID)
export default router;