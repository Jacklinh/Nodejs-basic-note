import { Schema, model } from "mongoose";

const staffschema = new Schema({
    first_name: {
        type: String,
        maxlength: 50
      },
      last_name: {
        type: String,
        maxlength: 50
      },
      phone: {
        type: String,
        maxlength: 50,
      },
      email: {
        type: String,
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
        default: null
      }
},{ 
    timestamps: true 
})

const Staff = model("Staff", staffschema);
export default Staff