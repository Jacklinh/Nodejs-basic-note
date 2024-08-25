import {Request, Response, NextFunction} from 'express'
import authService from '../services/auth.service'
import { sendJsonSuccess } from '../helpers/responseHandler';

const login = async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const {email, password} = req.body;

    const tokens = await authService.login(email, password);
    sendJsonSuccess(res)(tokens);

  } catch (error) {
    next(error)
  }
}

interface AuthRequest extends Request {
  locals: {
    _id: string
  }
}

const profile = async (req: AuthRequest, res: Response, next: NextFunction)=>{
  try {
    const {_id} = res.locals.staff;

    const result = await authService.getProfile(_id)
    sendJsonSuccess(res)(result);

  } catch (error) {
    next(error)
  }
}

export default {
  login,
  profile
}