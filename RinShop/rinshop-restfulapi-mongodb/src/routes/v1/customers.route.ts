import express from 'express'
import customersController from '../../controllers/customers.controller';
import customerValidation from '../../validations/customer.validation';
import validateSchema from '../../middlewares/validateSchema.middleware';
const router = express.Router();
//1. Get All customers
//GET localhost:8000/api/v1/customers
router.get('', customersController.findAll);
//2. Get One customers
//GET localhost:8000/api/v1/customers/:id
router.get('/:id',customersController.findByID)
//3. Create a new customers
//POST localhost:8000/api/v1/customers
router.post('', validateSchema(customerValidation.createSchema), customersController.createRecord)
//4. Update a customers
//PUT localhost:8000/api/v1/customers/:id
router.put('/:id',customersController.updateByID)
//5. Delete a customers
//DELETE localhost:8000/api/v1/customers/:id
router.delete('/:id',customersController.deleteByID)
export default router;