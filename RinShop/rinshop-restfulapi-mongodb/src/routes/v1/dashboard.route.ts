import express from 'express';
import dashboardController from '../../controllers/dashboard.controller';

const router = express.Router();

router.get('', dashboardController.getStatistics);

export default router;