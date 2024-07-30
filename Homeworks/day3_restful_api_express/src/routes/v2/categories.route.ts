import express from 'express'
// import controllers
import categoriesController from '../../controllers/categories.controller';
const router = express.Router();
// Get all categories
//GET localhost:8080/api/v2/categories
router.get('', categoriesController.findAll);
// Get a single category
//GET localhost:8080/api/v2/categories/1
router.get('/:id(\\d+)',categoriesController.findByID)
// post create-a-category
// POST localhost:8080/api/v2/categories/
router.post('', categoriesController.createRecord)
// Update a category
// PUT localhost:8080/api/v2/categories/2
router.put('/:id(\\d+)',categoriesController.updateByID)
// Delete a category
// DELETED localhost:8080/api/v2/categories/2
router.delete('/:id(\\d+)',categoriesController.deleteByID)
export default router;