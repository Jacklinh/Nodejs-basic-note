import jwt, { JwtPayload }  from 'jsonwebtoken';
import Staff from '../models/staffs.model';
import { Request, Response, NextFunction } from "express";
import createError from 'http-errors';
import { globalConfig } from '../constants/configs';

interface decodedJWT extends JwtPayload {
    _id?: string
}
// xác thực tài khoản 
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {

    //Get the jwt token from the head
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    //If token is not valid, respond with 401 (unauthorized)
    if (!token) {
        return next(createError(401, 'Unauthorized'));
    }
    try {
        // giải mã token 
        const decoded = jwt.verify(token, globalConfig.JWT_SECRET_KEY as string) as decodedJWT;
        //try verify staff exits in database
        const staff = await Staff.findById(decoded._id);
        if (!staff) {
            return next(createError(401, 'Unauthorized'));
        }
        //Đăng ký biến staff global trong app
        res.locals.staff = staff;

        next();

    } catch (err) {
        return next(createError(403, 'Forbidden-authenticateToken'));
    }
};
// kiểm tra quyền truy cập dựa vào role
export const authorizationAccess = (roles: string[] = []) => {
    if(typeof roles === 'string'){
        roles = [roles]
    }
    return (req: Request, res: Response, next: NextFunction) => {
        const staffRole = res.locals.staff.role;
        // kiêm tra nếu nhân viên k có quyền truy cập
        if(roles.length && staffRole && !roles.includes(staffRole)) {
            return next(createError(403,'Bạn không có quyền truy cập vào chức năng này'));
        }
        // nếu quyền hợp lê thì cho phép truy cập
        next()
    }
}
  
  