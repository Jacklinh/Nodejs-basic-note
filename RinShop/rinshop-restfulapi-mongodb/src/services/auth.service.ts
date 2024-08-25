import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import createError from 'http-errors';
import { globalConfig } from '../constants/configs';
import Staff from '../models/staffs.model';

const login = async(email: string, password: string)=>{
    //b1. Check xem tồn tại staff có email này không
    const staff = await Staff.findOne({
      email: email
    })
  
    if(!staff){
      throw createError(400, "Invalid email or password")
    }
    //b2. Nếu tồn tại thì đi so sánh mật khẩu xem khớp ko
    const passwordHash = staff.password;
    const isValid = await bcrypt.compareSync(password, passwordHash); // true
    if(!isValid){
      //Đừng thông báo: Sai mật mật khẩu. Hãy thông báo chung chung
      throw createError(400, "Invalid email or password")
    }
  
    console.log('<<=== 🚀 Login thành công ===>>');
    //3. Tạo token
    const access_token = jwt.sign(
        {
          _id: staff?._id,
          email: staff.email
        },
        globalConfig.JWT_SECRET_KEY as string,
        {
          expiresIn: '30d', //Xác định thời gian hết hạn của token
          //algorithm: 'RS256' //thuật toán mã hóa
        }
    );
  
    //Fresh Token hết hạn lâu hơn
    const fresh_token = jwt.sign(
      {
        _id: staff?._id,
        email: staff.email,
        //role: staff.role,  //phân quyền
      },
      globalConfig.JWT_SECRET_KEY as string,
      {
        expiresIn: '30d', //Xác định thời gian hết hạn của token
        //algorithm: 'RS256' //thuật toán mã hóa
      }
  );
    //4.Trả về token về cho client
    return {
      access_token,
      fresh_token,
      
    }
}
const getProfile = async(id: string)=>{
    // SELECT * FROM staff WHERE id = id
    const staff = await Staff.
    findOne({
      _id: id
    }).
    select('-password -__v');
    if(!staff){
      throw createError(400, 'Staff Not Found')
    }
    return staff
}
export default {
    getProfile,
    login
  }