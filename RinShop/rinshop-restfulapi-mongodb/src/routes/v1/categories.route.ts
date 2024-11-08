import express from "express";
import categoriesController from "../../controllers/categories.controller";
const router = express.Router();
// 1 get all categories
//GET localhost:8000/api/v1/categories
router.get('',categoriesController.findAll)
//2. Get One Category
//GET localhost:8000/api/v1/categories/:id
router.get('/:id',categoriesController.findByID)
//3. Create a new category
//POST localhost:8000/api/v1/categories
//router.post('',categoriesController.createRecord)
// khi có up image
router.post('',categoriesController.createDocument)
//4. Update a category
//PUT localhost:8000/api/v1/categories/:id
router.put('/:id',categoriesController.updateByID)
//5. Delete a category
//DELETE localhost:8000/api/v1/categories/:id
router.delete('/:id',categoriesController.deleteByID)
export default router;