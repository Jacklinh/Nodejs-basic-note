import express, {Express, Request, Response, NextFunction} from 'express';
import createError from 'http-errors';
// import các route 
import categoriesRoute from './routes/v1/categories.route';
import brandsRoute from './routes/v1/brands.route';
import customersRoute from './routes/v1/customers.route';
import staffsRoute from './routes/v1/staffs.route';
import productsRoute from './routes/v1/products.route';
import ordersRoute from './routes/v1/orders.route';
// import helper error 
import {sendJsonErrors} from './helpers/responseHandler'
const app: Express = express();


/* Bắt được dữ liệu từ body của request */
app.use(express.json())
//Mã hóa url
app.use(express.urlencoded({ extended: true }));


// BẮT ĐẦU KHAI BÁO ROUTErS TỪ ĐÂY
app.use('/api/v1/categories', categoriesRoute)
app.use('/api/v1/brands', brandsRoute)
app.use('/api/v1/customers', customersRoute)
app.use('/api/v1/staffs', staffsRoute)
app.use('/api/v1/products', productsRoute)
app.use('/api/v1/orders', ordersRoute)

// Handle errors( phải nằm sau phần khai báo routers)

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
