import express, {Express, Request, Response, NextFunction} from 'express';

const app: Express = express();


/* Bắt được dữ liệu từ body của request */
app.use(express.json())
//Mã hóa url
app.use(express.urlencoded({ extended: true }));
app.get('/',(req: Request, res: Response) => {
    res.status(200).json({message: 'Express + TypeScript Server'});
})
export default app
