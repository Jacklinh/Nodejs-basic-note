import {Request, Response, NextFunction} from 'express';
import { sendJsonSuccess } from '../helpers/responseHandler';
import dashboardService from '../services/dashboard.service';

const getStatistics = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const statistics = await dashboardService.getStatistics();
        sendJsonSuccess(res, "success")(statistics);
    }catch(error) {
        next(error);
    }
}

export default {
    getStatistics
}