import express from 'express'
import staffsController from '../../controllers/staffs.controller';
import { authorizationAccess } from '../../middlewares/auth.middleware';
import { EnumRole } from '../../types/models';
const router = express.Router();
//1. Get All Staffs
//GET localhost:8000/api/v1/staffs
router.get('', staffsController.findAll);
//2. Get One staff
//GET localhost:8000/api/v1/staffs/:id
router.get('/:id',staffsController.findByID)
//3. Create a new staff
//POST localhost:8000/api/v1/staffs
// authorizationAccess([EnumRole.Admin,EnumRole.SubAdmin]),
router.post('', staffsController.createRecord)
//4. Update a staff
//PUT localhost:8000/api/v1/staffs/:id
router.put('/:id',staffsController.updateByID)
//5. Delete a staff
//DELETE localhost:8000/api/v1/staffs/:id
router.delete('/:id',staffsController.deleteByID)
export default router;