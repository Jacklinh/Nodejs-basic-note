import express from 'express'
import studentsController from '../../controllers/students.controller';
const router = express.Router();
router.get('', studentsController.findAll);
router.get('/:id',studentsController.findById)
router.post('', studentsController.createRecord)
export default router;