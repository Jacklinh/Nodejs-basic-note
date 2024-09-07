import express, {Express, Request, Response, NextFunction} from 'express';
import createError from 'http-errors';
import { sendJsonErrors } from './helpers/responseHandler';
/* import các routes */
import staffsRoute  from './routes/v1/staffs.route'
import authRoute from './routes/v1/auth.route'
import categoriesRoute from './routes/v1/categories.route';
import cors from 'cors'
const app: Express = express();
app.use(cors())
/* Bắt được dữ liệu từ body của request */
app.use(express.json())
//Mã hóa url
app.use(express.urlencoded({ extended: true }));


// BẮT ĐẦU KHAI BÁO ROUTES ở trên app.use handle error
app.use('/api/v1/staffs', staffsRoute)
app.use('/api/v1/categories',categoriesRoute)
app.use('/api/v1/auth', authRoute)
// errors 404, not found
app.use((rep: Request, res: Response, next: NextFunction) => {
    next(createError(404))
})
// Báo lỗi ở dạng JSON
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    sendJsonErrors(res,err)
});

export default app