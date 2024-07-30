import express, {Express, Request, Response, NextFunction} from 'express';
import createError from 'http-errors';
// import các route 
import categoriesRoute from './routes/v1/categories.route';
import brandsRoute from './routes/v1/brands.route';
import productRoute from './routes/v1/products.route';
const app: Express = express();


/* Bắt được dữ liệu từ body của request */
app.use(express.json())
//Mã hóa url
app.use(express.urlencoded({ extended: true }));


// BẮT ĐẦU KHAI BÁO ROUTErS TỪ ĐÂY
app.use('/api/v1', categoriesRoute)
app.use('/api/v1', brandsRoute)
app.use('/api/v1', productRoute)
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

    const statusCode = err.status || 500;
    res.status(statusCode).json({ 
    statusCode: statusCode, 
    message: err.message 
    });
});

app.get('/',(req: Request, res: Response) => {
    res.status(200).json({message: 'Express + TypeScript Server'});
})

export default app
