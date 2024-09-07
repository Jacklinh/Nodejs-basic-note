import { Schema, model } from "mongoose";
import { TypeStaff } from "../types/models";
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
        match: /^[0-9]{10}$/
    },
    email: {
        type: String,
        required: true,
        maxlength: 150,
        unique: true,
        match: /.+\@.+\..+/,
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
        min: 8
    }
},{ 
    timestamps: true 
})
// tạo 1 thuộc tính ảo fullname
staffSchema.virtual('fullName').get(function () {
    return this.first_name + ' ' + this.last_name;
});
// tăng tính bảo mật cho password dùng bcrypt
// staffSchema.pre('save', async function (next) {
//     const staff = this;
//     const hash = bcrypt.hashSync(staff.password, saltRounds);
//     staff.password = hash;
  
//     next();
//   });
const Staff = model<TypeStaff>("Staff", staffSchema);
export default Staff
