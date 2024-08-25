# Tạo restful api width mongodb(cài đặt thủ công)

## công nghệ sử dụng
- ExpressJs Framework
- mongoose
- dotenv
- http-errors
## Cấu trúc dự án
Phát triển dự án theo cấu trúc saum sử dụng TypeScript:

```html
project-restful-apis/
├─ node_modules/
├─ public/
├─ src/
│  ├─ controllers/
│  ├─ middleware/
│  ├─ models/
│  ├─ services/
│  ├─ helpers/
│  ├─ validations/
│  ├─ configs/
│  ├─ routes/
│  │  ├─ v1/
│  │  ├─ v2/
│  ├─ app.ts
├─ .env
├─ server.ts
├─ .gitignore
├─ package.json
├─ README.md

```
## các bước thực hiện

- b1:  trong folder dự án chạy lệnh `yarn init -y ` để  tạo file `package.json` khởi tạo dự án
- b2: tích hợp ExpressJs với lệnh `yarn add express` lúc này nó sinh ra folder node_modules và dependencies trong `package.json`
 cài thêm package dotenv (https://www.npmjs.com/package/dotenv) 

 ```bash
 yarn add dotenv 
 ```

- b3: cài thêm `yarn add -D typescript  @types/express @types/node ts-node-dev` nếu dùng typescript

- b4: tạo file `tsconfig.json` chạy lệnh 
```bash
npx tsc --init
```

Sau đó mở file tsconfig.json và tìm sửa lại những thông tin sau:
với ourDir là folder chứa khi render
```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "outDir": "dist/",
    "strict": true,
    "sourceMap": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}

```
- b5: Tạo file app.ts trong folder src.
và copy code hellowold của express
```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```
edit lại code theo typescript như sau
```ts
import express, {Express, Request, Response, NextFunction} from 'express';

const app: Express = express();
const POST = 3000;

/* Bắt được dữ liệu từ body của request */
app.use(express.json())
//Mã hóa url
app.use(express.urlencoded({ extended: true }));

app.get('/',(req: Request, res: Response) => {
    res.status(200).json({message: 'Express + TypeScript Server'});
})
app.listen(POST, () => {
    console.log(`Example app listening on port http://localhost:${POST}`)
  })
```

- b6: Cấu hình lại package.json
thêm script vào sau license. 
nếu có folder src/app.ts thì edit lại dev là `ts-node-dev --respawn --transpile-only src/app.ts` 
và khi biên dịch từ ts sang js , edit lại folder: `node dist/app.ts`. với `dist` là mình cấu hình `"outDir": "dist/",` ở file tsconfig.json ở trên
còn k có folder src thì remove đường dẫn src đi
```json
"scripts": {
    "build": "npx tsc -p",
    "start": "node dist/app.ts",
    "dev": "ts-node-dev --respawn --transpile-only src/app.ts"
  },
```

- b7: khởi chạy dự án
```bash
yarn dev
```

- b8: cài thêm mongoose `yarn add mongoose --save` <https://mongoosejs.com/docs/>

sử dụng dotenv lúc nảy đã cài, tạo file .env để lưu cổng `POST`

tạo file .env nằm cùng cấp với package.json

```bash
# Dùng để chứa thông tin bảo mật
# thường là các hằng số
# mongodb://localhost:xxxxx/HomeworkNodejs là tên database tương ứng như SQL, nếu chưa có thì nó sẽ tự tao;
NODE_ENV= development
PORT= 8080
MONGODB_URL= mongodb://localhost:27017/HomeworkNodejs
```
lúc này .env sẽ k được push lên git nên chúng ta cần tạo file copy từ .env đặt tên .env.example

```bash
# Dùng để chứa thông tin bảo mật
NODE_ENV= 
PORT= 
MONGODB_URL= 
```
tạo biến `MONGODB_URL` để lưu thông tin kết nối mongoose ở file /src/constants/configs.ts
```ts
export const globalConfig = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL
}
// process.env.MONGODB_URL từ file .env 
```

file app.ts chúng ta edit lại như sau, dùng export 
```ts
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
   
```

Tạo ra file server.ts như sau để import POST
```ts
import app from "./src/app";
import { globalConfig } from "./src/constants/configs"
const POST = globalConfig.PORT;
// import mongoose
import mongoose from "mongoose";
mongoose.connect(globalConfig.MONGODB_URL as string)
.then(() => {
    console.log('connected to mongodb');
    //should listen app here
    // Bạn có thể đưa đoạn code khởi tạo server của Express vào chổ `//should listen app here` để đảm bảo rằng. Phải kết nối server Mongoo thành công thì mới khởi tạo server NodeJs.
})
.catch((err) => {
    console.log('failded to connect to mongodb error');
})

app.listen(POST, () => {
    console.log(`Example app listening on port http://localhost:${POST}`)
})
```

lúc này ta edit là server.ts trong file package.json 
```json
"start": "node dist/server.js",
"dev": "ts-node-dev --respawn --transpile-only server.ts"
```

- b8: cài thêm `yarn add http-errors`

trong file src/helpers/responseHandler.ts , ta handler error ở dạng json
```ts
import { Response } from 'express';

// hàm gửi khi thành công
const sendJsonSuccess = (res: Response, message = "Success", code = 200) => {
    return (data: any = null) => {
        const resData = data ? {
            statusCode: code,
            message,
            data
        }: {
            statusCode: code,
            message
        }
        res.status(code).json(resData);
    }
}

// hàm gọi khi có lỗi
const sendJsonErrors = (res: Response, error: any) => {
    return res.status(error.status || 500).json({
        statusCode: error.status || 500,
        message: error.message || "Unhandled error",
        data: null
    })
}

export {
    sendJsonSuccess,
    sendJsonErrors
}
```
và trong file app.ts ta edit 
```ts
import express, {Express, Request, Response, NextFunction} from 'express';
import createError from 'http-errors';
import { sendJsonErrors } from './helpers/responseHandler';
const app: Express = express();

/* Bắt được dữ liệu từ body của request */
app.use(express.json())
//Mã hóa url
app.use(express.urlencoded({ extended: true }));

// errors 404, not found
app.use((rep: Request, res: Response, next: NextFunction) => {
    next(createError(404))
})
// Báo lỗi ở dạng JSON
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    sendJsonErrors(res,err)
});

export default app
```

- b9: tạo các schema type trong models
doc <https://mongoosejs.com/docs/schematypes.html>
trong folder src/types/ tạo file `models.ts` để khai báo type 
```ts
import { ObjectId } from "mongoose";

export type TypeStaff = {
    _id?: ObjectId;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    password: string;
    active?: boolean,
    role?: string;
}
```
trong folder src/models tạo file `staffs.model.ts` để tạo các schema
```ts
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

```

sử dụng `yarn add bcrypt` để tăng bảo mật cho trường password

cách sử dụng <https://www.npmjs.com/package/bcrypt#user-content-usage> và cách so khớp password <https://www.npmjs.com/package/bcrypt#user-content-to-check-a-password>

- b10: tạo các services

trong folder src/services tạo file `staffs.service.ts` để tạo ra các query

```ts

import createError from 'http-errors';
import Staff from '../models/staffs.model';
import { TypeStaff } from '../types/models';
const findAll = async (query: any) => {
    /* Phân trang */
    const page_str = query.page;
    const limit_str = query.limit;
    const page = page_str ? parseInt(page_str as string): 1;
    const limit = limit_str ? parseInt(limit_str as string): 10;
    const offset = (page - 1) * limit;
    //Đếm tổng số record hiện có của collection
    const totalRecords = await Staff.countDocuments();
    /* end phan trang */
    /* Sắp xếp */
    let objSort: any = {};
    const sortBy = query.sort || 'updateAt'; // Mặc định sắp xếp theo ngày tạo giảm dần
    const idBy = query._id && query._id == 'ASC' ? 1: -1;
    const nameBy = query.last_name && query.last_name == 'ASC' ? 1: -1;
    objSort = {...objSort, [sortBy]: idBy,nameBy} // Thêm phần tử sắp xếp động vào object {}
    /* Select * FROM product */
    const staffs = await Staff
    .find()
    .sort(objSort)
    .select('-__v -id')
    .skip(offset)
    .limit(limit)
    ;

    return {
        staffs_list: staffs,
        // Phân trang
        pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalRecords / limit), //tổng số trang
        totalRecords
        }
    }
}
const findByID = async (id: string) => {
    const staff = await Staff.findById(id).select('-__v');
    if(!staff) {
        throw createError(400,'staffs not found')
    }
    return staff;
}
const createRecord = async (payload: TypeStaff) => {
    const staff = await Staff.create(payload);
    return staff;
}
const updateByID = async (id: string, payload: TypeStaff) => {
    //b1.Kiểm tra sự tồn tại của danh mục có id này
    const staff = await findByID(id);
    //2. Update = cách ghi đè thuộc tính
    Object.assign(staff,payload)
    await staff.save();
    //3. Trả về kết quả
    return staff;
}
const deleteByID = async (id: string) => {
    const staff = await findByID(id);
    await Staff.deleteOne({ _id: staff._id })
    return staff;
}
export default {
    findAll,
    findByID,
    createRecord,
    updateByID,
    deleteByID
}
```

- b11: tạo các controllers

trong folder src/controllers tạo file `staffs.controller.ts` dùng để xử lý kết nối các services ở b10
```ts
import {Request, Response, NextFunction} from 'express'
import staffsService from '../services/staffs.service';
import { sendJsonSuccess } from '../helpers/responseHandler';

const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cates = await staffsService.findAll(req.query);
        sendJsonSuccess(res,"success")(cates);
    }catch(error) {
        next(error)
    }
}
const findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      const staff = await staffsService.findByID(id)
      sendJsonSuccess(res,"success")(staff);
    }catch(error) {
      next(error)
    }
}
const createRecord = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const staff = await staffsService.createRecord(req.body)
        sendJsonSuccess(res,"success")(staff);
    }catch(error) {
        next(error)
    }
    
}
const updateByID = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      const payload = req.body;
      const newStaff = await staffsService.updateByID(id,payload);
      sendJsonSuccess(res,"success")(newStaff);
    }catch(error) {
      next(error)
    }
}
const deleteByID =async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      const staff =await staffsService.deleteByID(id)
      sendJsonSuccess(res,"success")(staff);
    }catch(error) {
      next(error)
    }
}
export default {
    findAll,
    findById,
    createRecord,
    updateByID,
    deleteByID
}
``` 

- B12: tạo các router để xử lý

trong folder src/routes/v1 tạo file `staffs.route.ts`

```ts
import express from 'express'
import staffsController from '../../controllers/staffs.controller';
const router = express.Router();
//1. Get All Staffs
//GET localhost:8080/api/v1/staffs
router.get('', staffsController.findAll);
//2. Get One Category
//GET localhost:8080/api/v1/staffs/:id
router.get('/:id',staffsController.findById)
//3. Create a new category
//POST localhost:8080/api/v1/staffs
router.post('', staffsController.createRecord)
//4. Update a category
//PUT localhost:8080/api/v1/staffs/:id
router.put('/:id',staffsController.updateByID)
//5. Delete a category
//DELETE localhost:8080/api/v1/staffs/:id
router.delete('/:id',staffsController.deleteByID)
export default router;
```

- B13: import các routes vào file app.ts

```ts
/* import các routes */
import staffsRoute  from './routes/v1/staffs.route'

// BẮT ĐẦU KHAI BÁO ROUTES ở trên app.use handle error
app.use('/api/v1/staffs', staffsRoute)

```

- B14: tạo dữ liệu ảo cho data bằng cách sử dụng Fake Database to MongoDB

sử dụng <https://fakerjs.dev> chạy lệnh `yarn add @faker-js/faker --dev`

trong folder src/databases/seed tạo file `db.ts`
```ts
//File này dùng để tạo dữ liệu cho database
import mongoose from 'mongoose'
import {globalConfig} from '../../constants/configs'
import { faker } from '@faker-js/faker';
import Staff from '../../models/staffs.model';

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

const runDB = async ()=>{
    //tạo mới 5 item ngẫu nhiên
    for (let index = 1; index < 5; index++) {
        
        const staff = new Staff({
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            phone: faker.phone.number(),
            email: faker.internet.email(),
            active: faker.datatype.boolean(),
            password: faker.internet.password(8, true, /[A-Z]/, 'Aa1!')
        });
        //Đến bước nó mới chính thức ghi xuống DB
        await staff.save();
    }
}

  

try {
  runDB()
} catch (error) {
  console.log(error);
}
```

lúc này trong file `package.json` ta thêm đoạn scripts để chạy 
```json
"seed": "ts-node-dev src/databases/seed/db.ts",
```
sau đó chạy `yarn seed` để thực hiện tạo database ảo cho table

Ngoài ra ta có thể thêm dữ liệu từ folder- cùng cấp với src http/staff.http

```http
###

POST http://localhost:8000/api/v1/staffs
Content-Type: application/json

{
  "first_name": "Admin",
  "last_name": "Rin",
  "phone": "0234567899",
  "email": "rinshop@gmail.com",
  "active": true,
  "password": "Rinadmin@2024"
}

```

- B15: tạo middlewares để xử lý login (yêu cầu bài toán, khi vào page dashboard thì phải đăng nhập thành công với email và password đã đăng ký)

    - trong folder src/middlewares tạo file `auth.middleware.ts`
    cài thêm `yarn add jsonwebtoken`

    ```ts
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
            const decoded = jwt.verify(token, globalConfig.JWT_SECRET_KEY as string) as decodedJWT;
            // trong đó JWT_SECRET_KEY=catFly200miles khai báo ở .env
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
    ```
    - tạo file auth.service.ts
    ```ts
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
    ```
    - tạo file `auth.controller.ts
    ```ts
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
        console.log(`res.locals`,res.locals);

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
    ```

    - tạo file auth.route.ts
    ```ts
    import express from 'express';
    import authController from '../../controllers/auth.controller';

    const router = express.Router()

    //POST v1/auth/login
    router.post('/login', authController.login)

    export default router
    ```
    - file app.ts thêm
    ```ts
    import authRoute from './routes/v1/auth.route'
    app.use('/api/v1/auth', authRoute)
    ```
    - cài thêm `yarn add cros`(Cross-Origin Resource Sharing) để giao tiếp với cơ sở dữ liệu MongoDB 