import express from 'express';
import validateSchemaYup from '../../middlewares/validateSchemaYup.middleware';
import authYupValidation from '../../validations/authYup.validation';
import authController from '../../controllers/auth.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';

const router = express.Router()

//POST v1/auth/login
router.post('/login', validateSchemaYup(authYupValidation.loginSchema), authController.login)

router.get('/profile', authenticateToken, authController.profile)

export default router
