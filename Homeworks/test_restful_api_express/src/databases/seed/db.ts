import { globalConfig } from "../../constants/configs"
// import mongoose
import mongoose from "mongoose";
// import  model
import Student from "../../models/students.model";
// kết nối mongoose
mongoose.connect(globalConfig.MONGODB_URL as string)
.then(() => {
    console.log('connected to mongodb');
    //should listen app here
    // Bạn có thể đưa đoạn code khởi tạo server của Express vào chổ `//should listen app here` để đảm bảo rằng. Phải kết nối server Mongoo thành công thì mới khởi tạo server NodeJs.
})
.catch((err) => {
    console.log('failded to connect to mongodb error');
})
// tạo nhiều document 
const students = [
  {
    "fullName": "Le Van Linh",
    "age": 30,
    "email": "levanlinh@gmail.com",
    "mobile": "0342681138",
    "class": "batch39",
  },
  {
    "fullName": "Hoang thi ngoc",
    "age": 20,
    "email": "ngoclinh@gmail.com",
    "mobile": "0342681139",
    "class": "batch39",
  },
  {
    "fullName": "Nguyen ngoc nhan",
    "age": 32,
    "email": "ngocnhan@gmail.com",
    "mobile": "0342681140",
    "class": "batch39",
  },
  {
    "fullName": "Hoang van de",
    "age": 30,
    "email": "hoangde@gmail.com",
    "mobile": "0342681141",
    "class": "batch39",
  },
  {
    "fullName": "Hoang thi nhan",
    "age": 18,
    "email": "hoangngocnhan@gmail.com",
    "mobile": "0342681142",
    "class": "batch39",
  }
]
const runDB = async ()=>{
    // tạo nhiều document 
    await Student.insertMany(students);
}

try {
    runDB()
}catch(error) {
    console.log(error);
}