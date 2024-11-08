import express from 'express'
import ordersController from '../../controllers/orders.controller';
const router = express.Router();
//1. Get All orders
//GET localhost:8000/api/v1/orders
router.get('', ordersController.findAll);
//2. Get One staff
//GET localhost:8000/api/v1/orders/:id
router.get('/:id',ordersController.findByID)
//3. Create a new staff
//POST localhost:8000/api/v1/orders
router.post('',ordersController.createRecord)
//4. Update a staff
//PUT localhost:8000/api/v1/orders/:id
router.put('/:id',ordersController.updateByID)
//5. Delete a staff
//DELETE localhost:8000/api/v1/orders/:id
router.delete('/:id',ordersController.deleteByID)
export default router;