import express from 'express'
// import controllers
import categoriesController from '../../controllers/categories.controller';
const router = express.Router();
// Get all categories
//GET localhost:8080/api/v1/categories
router.get('', categoriesController.findAll);
// Get a single category
//GET localhost:8080/api/v1/categories/1
router.get('/:id',categoriesController.findById)
// post create-a-category
// POST localhost:8080/api/v1/categories/
router.post('', categoriesController.createRecord)
// Update a category
// PUT localhost:8080/api/v1/categories/2
router.put('/:id',categoriesController.updateByID)
// Delete a category
// DELETED localhost:8080/api/v1/categories/2
router.delete('/:id',categoriesController.deleteByID)
export default router;