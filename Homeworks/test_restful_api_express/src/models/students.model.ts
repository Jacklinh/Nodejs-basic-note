import { Schema, model } from "mongoose";
import { TStudent } from "../types/models";

const studentSchema = new Schema<TStudent>({
	fullName: {
		type: String,
		maxlength: 50,
		required: true,
		trim: true
	},
	age: {
		type: Number,
		min: 1,
		required: true
	},
	email: {
		type: String,
		maxlength: 150,
		unique: true,
		match: /.+\@.+\..+/
	},
	mobile: {
		type: String,
		maxlength: 10,
		match: /^[0-9]{10}$/
	},
	class: {
		type: String,
		maxlength: 50,
	}
},{ 
	timestamps: true 
})

const Student = model("student", studentSchema);
export default Student