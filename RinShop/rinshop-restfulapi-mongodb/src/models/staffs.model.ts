import { Schema, model } from "mongoose";
import { TypeStaff } from "../types/models";
import bcrypt from 'bcrypt';
const saltRounds = 8;
const staffSchema = new Schema<TypeStaff>({
    first_name: {
        type: String,
        required: true,
        maxlength: 50
    },
    last_name: {
        type: String,
        required: true,
        maxlength: 50
    },
    phone: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        maxlength: 150,
        unique: true
    },
    /* Khóa tài khoản  */
    active: {
        type: Boolean,
        default: true,
        require: false
    },
    password: {
        type: String,
        maxlength: 255,
        require: false,
        default: null,
        validate: {
            validator: function(password) {
                // Kiểm tra độ dài tối thiểu 8 ký tự
                if (password.length < 8) {
                    return false;
                }
                // Kiểm tra có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt
                const hasUppercase = /[A-Z]/.test(password);
                const hasLowercase = /[a-z]/.test(password);
                const hasNumber = /\d/.test(password);
                const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
                return hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
            },
            message: props => `Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.`
        }
    }
},{ 
    timestamps: true 
})
// tạo 1 thuộc tính ảo fullname
staffSchema.virtual('fullName').get(function () {
    return this.first_name + ' ' + this.last_name;
});
// tăng tính bảo mật cho password dùng bcrypt
staffSchema.pre('save', async function (next) {
    const staff = this;
    const hash = bcrypt.hashSync(staff.password, saltRounds);
    staff.password = hash;
  
    next();
  });
const Staff = model<TypeStaff>("Staff", staffSchema);
export default Staff
