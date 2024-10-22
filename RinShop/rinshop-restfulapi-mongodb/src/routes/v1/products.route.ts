import express from "express";
import productsController from "../../controllers/products.controller";
import { authenticateToken } from "../../middlewares/auth.middleware";
const router = express.Router();
// route public
router.get('/slug/:slug',productsController.findAllCategoryBySlug)
router.get('/details/:slug',productsController.findOneBySlug)
// check token để các route là private
router.use(authenticateToken)
// 1 get all products
//GET localhost:8000/api/v1/products
router.get('',productsController.findAll)
//2. Get One products
//GET localhost:8000/api/v1/products/:id
router.get('/:id',productsController.findByID)
//3. Create a new products
//POST localhost:8000/api/v1/products
//router.post('',productsController.createRecord)
router.post('',productsController.createDocument)
//4. Update a products
//PUT localhost:8000/api/v1/products/:id
router.put('/:id',productsController.updateByID)
//5. Delete a products
//DELETE localhost:8000/api/v1/products/:id
router.delete('/:id',productsController.deleteByID)
export default router;