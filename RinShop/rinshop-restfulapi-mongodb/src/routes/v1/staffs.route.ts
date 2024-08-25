import express from 'express'
import staffsController from '../../controllers/staffs.controller';
const router = express.Router();
//1. Get All Staffs
//GET localhost:8080/api/v1/staffs
router.get('', staffsController.findAll);
//2. Get One Category
//GET localhost:8080/api/v1/staffs/:id
router.get('/:id',staffsController.findById)
//3. Create a new category
//POST localhost:8080/api/v1/staffs
router.post('', staffsController.createRecord)
//4. Update a category
//PUT localhost:8080/api/v1/staffs/:id
router.put('/:id',staffsController.updateByID)
//5. Delete a category
//DELETE localhost:8080/api/v1/staffs/:id
router.delete('/:id',staffsController.deleteByID)
export default router;