# Xây dựng cấu trúc RESTFul-APIs
RESTful API là một loại giao diện lập trình ứng dụng (API) được thiết kế theo các nguyên tắc của kiến trúc REST (Representational State Transfer). REST là một kiểu kiến trúc phần mềm dựa trên giao thức HTTP và các tiêu chuẩn web liên quan khác.

RESTful API cho phép các ứng dụng giao tiếp và trao đổi dữ liệu với nhau qua mạng. Nó sử dụng các phương thức HTTP như GET, POST, PUT và DELETE để thực hiện các hoạt động CRUD (Create, Read, Update, Delete) trên dữ liệu.

| Method    | Semantics     |
|-----------|---------------|
| POST      | Create        |
| GET       | Read/Retrieve |
| PUT/PATCH | Update        |
| DELETE    | Delete        |
| --------  | --------      |

Các RESTful API được thiết kế để hoạt động dựa trên nguyên tắc "stateless" (không lưu trạng thái). Điều này có nghĩa là mỗi yêu cầu từ client đến server phải chứa tất cả thông tin cần thiết để server hiểu và xử lý yêu cầu, không phụ thuộc vào bất kỳ trạng thái trước đó nào. Server không lưu trạng thái của client giữa các yêu cầu.

Một RESTful API thường sử dụng các đường dẫn URL để xác định tài nguyên và các phương thức HTTP để xác định hành động trên tài nguyên đó. Các dữ liệu thường được truyền qua các định dạng như JSON hoặc XML.

RESTful API đã trở thành một phương pháp phổ biến để xây dựng các dịch vụ web và ứng dụng di động, vì nó đơn giản, linh hoạt và dễ dùng.

Từng bước xây dựng dự án theo mô hình

## 1. Cấu trúc dự án
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

Cài đặt xem lại ở bài học trước với TypeScript



**/Controllers** - Thư mục này sẽ chứa tất cả các chức năng dể viết các API của bạn. Cách đặt tên: xxxxx.controller.ts trong đó xxx là nhiệm vụ thôi, ví dụ: login.controller.ts

**/Routes** - Thư mục này sẽ chứa tất cả các tuyến đường mà bạn đã tạo bằng cách sử dụng Express Router và kết hợp với Controllers. Cách đặt tên cũng như trên xxxxx.routes.ts

**/Models** - Thư mục này sẽ chứa tất cả các files như schema của bạn và và các chức năng cần thiết cho schema cũng sẽ nằm ở đây. Đặt tên xxxxx.model.ts

**/Middleware** - Thư mục này sẽ chứa tất cả phần mềm trung gian mà bạn đã tạo, ví dụ như là xác thực chẳng hạn... Cách đặt tên: xxxxx.middleware.ts /

**Helpers** - Các chức năng phổ biến mà bạn sẽ yêu cầu nhiều lần trong suốt mã của mình ví dụ như check missing params trước khi xử lý dữ liệu chẳng hạn. Rất cần thiết.

**/Configs** - File này dùng cấu hình cho các API / dịch vụ của bên thứ ba như passport / S3, v.v. Những thông số như keyAPI các kiểu.

Đó là những folders rất quan trọng, có thể nói là không thể thiếu. Ngoài ra còn những files trong root như là:

**server.ts** - Tập tin khởi chạy ứng dụng Express

**app.ts** - Tệp này về cơ bản sẽ là khai báo của ứng dụng Express

**package.json** - File này chứa tất cả các chi tiết npm của dự án, các lệnh chạy như scripts và các phần dependencies

**.gitignore** - Những file mà bạn không muốn đẩy sang git


Hôm nay chúng ta sẽ sử dụng các để tạo các request như (https://fakeapi.platzi.com/en/rest/products/)
- file: app.ts,server.ts
- folder: Routes

## các bước thực 

trong folder dự án chạy lệnh bash như sau

- B1: Chạy lệnh trong folder dự án

```bash
npm init
#hoặc
yarn init -y
```
Để khởi tạo file package.json

- B2: cài thêm package dotenv (https://www.npmjs.com/package/dotenv)

```bash
npm install express dotenv --save
#hoặc
yarn add express dotenv 
```

để sử dụng file .env giúp bạn quản lý các biến môi trường trong ứng dụng 1 cách dễ dàng và an toàn. điều này giúp bảo vệ thông tin quan trọng và tăng tính bảo mật cho ứng dụng.
Biến môi trường là các biến được sử dụng để lưu trữ thông tin cấu hình như cổng kết nối của cơ sở dữ liệu , thông tin nhạy cảm khác và k nên lưu trữ trực tiếp trong mã nguồn ứng dụng. 

- B3: cài thêm typesript liên quan 
```bash
npm i -D typescript  @types/express @types/node ts-node-dev
#or
yarn add -D typescript  @types/express @types/node ts-node-dev
```

- B4: tạo file tsconfig.json
```bash
npx tsc --init
```
Sau đó mở file tsconfig.json và tìm sửa lại những thông tin sau:

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
  },
}

```

- B5: tạo file app.ts trong folder src

cấu hình file app.ts như sau
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

- B6: cấu hình lại file package.json để chạy file app.ts
thêm đoạn script sau vào dưới LIMIT
```bash
  "scripts": {
    "build": "npx tsc",
    "start": "node dist/app.js",
    "dev": "ts-node-dev --respawn --transpile-only src/app.ts"
  },
```
sau đó chạy lệnh 
```bash
yarn dev
// để chạy server

```

- B7: sử dụng dotenv lúc nảy đã cài, tạo file .env để lưu cổng `POST`

tạo file .env nằm cùng cấp với package.json

```bash
# Dùng để chứa thông tin bảo mật
NODE_ENV= development
PORT= 8080
```
lúc này .env sẽ k được push lên git nên chúng ta cần tạo file copy từ .env đặt tên .env.example

```bash
# Dùng để chứa thông tin bảo mật
NODE_ENV= 
PORT= 
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
import dotenv  from "dotenv";
dotenv.config();
const POST = 8080 || 3000;
app.listen(POST, () => {
    console.log(`Example app listening on port http://localhost:${POST}`)
})
```

Tiếp tục cấu hình lại file package.json để chạy server
```json
  "scripts": {
    "build": "npx tsc",
    "start": "node dist/server.js",
    "dev": "ts-node-dev --respawn --transpile-only server.ts"
  },
```

trong folder src/constants/ tạo file configs.ts để move các hằng số server vào
file configs.ts
```ts
import dotenv from 'dotenv'
dotenv.config()
/**
 * lấy được các biến môi trường
 * từ file .env
 */

export const globalConfig = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT
}
```
khi đó ta edit lại file server.ts để import config vào
file server.ts
```ts
import { globalConfig } from "./src/constants/configs"
const POST = globalConfig.PORT || 3000;
```
lúc này ta chạy cổng server là 8080 (http://localhost:8080/)

## Tạo ra 1 restful api

Thông tường trong thực tế một API sẽ có địa chỉ. tương tự như (https://api.escuelajs.co/api/v1/categories)

```html
https://domain.com/api/v1/end-points
```
Dựa vào đó người ta nhận ra ngay được đó là hệ thống RestFul API có phiên bản.

Bây giờ chúng ta tạo một end-point có cấu trúc đường dẫn tương tự trên.


```html
https://localhost:8080/api/v1/categories
```

Trả về danh sách Danh mục

- B1: Trong folder src/routes/v1 , tạo file categories.route.ts

cài thêm thư viện `http-errors` để bắt lỗi từ request và hệ thống
```bash
yarn add http-errors 
```
vào file app.ts để handle errors cho hiển thị dạng kiểu json
```ts
import createError from 'http-errors';
// Handle errors( phải nằm sau phần khai báo routers)
// errors 404, not found
app.use((rep: Request, res: Response, next: NextFunction) => {
    next(createError(404))
})
// Báo lỗi ở dạng JSON
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    const statusCode = err.status || 500;
    res.status(statusCode).json({ 
    statusCode: statusCode, 
    message: err.message 
    });
});
```
lúc này file categories.route.ts 
```ts
import express, {Request, Response, NextFunction} from 'express'
import createError from 'http-errors';
const router = express.Router();

// dữ liệu đầu vào
const cates = [
  {
    "id": 1,
    "name": "Clothes",
    "image": "https://i.imgur.com/QkIa5tT.jpeg",
    "creationAt": "2024-07-30T08:16:05.000Z",
    "updatedAt": "2024-07-30T08:16:05.000Z"
  },
  {
    "id": 2,
    "name": "Electronics",
    "image": "https://i.imgur.com/ZANVnHE.jpeg",
    "creationAt": "2024-07-30T08:16:05.000Z",
    "updatedAt": "2024-07-30T08:16:05.000Z"
  },
  {
    "id": 3,
    "name": "Furniture",
    "image": "https://i.imgur.com/Qphac99.jpeg",
    "creationAt": "2024-07-30T08:16:05.000Z",
    "updatedAt": "2024-07-30T08:16:05.000Z"
  },
  {
    "id": 4,
    "name": "Shoes",
    "image": "https://i.imgur.com/qNOjJje.jpeg",
    "creationAt": "2024-07-30T08:16:05.000Z",
    "updatedAt": "2024-07-30T08:16:05.000Z"
  },
  {
    "id": 5,
    "name": "Miscellaneous",
    "image": "https://i.imgur.com/BG8J0Fj.jpg",
    "creationAt": "2024-07-30T08:16:05.000Z",
    "updatedAt": "2024-07-30T08:16:05.000Z"
  },
  {
    "id": 9,
    "name": "furniture",
    "image": "http://placeimg.com/640/480",
    "creationAt": "2024-07-30T09:25:01.000Z",
    "updatedAt": "2024-07-30T09:25:01.000Z"
  },
  {
    "id": 10,
    "name": "furniture",
    "image": "http://placeimg.com/640/480",
    "creationAt": "2024-07-30T09:30:42.000Z",
    "updatedAt": "2024-07-30T09:30:42.000Z"
  }
]
// Get all categories
//GET localhost:8080/api/v1/categories
router.get('/categories', (req: Request, res: Response) => {
  res.status(200).json({
    data: cates
  });
});

export default router;
```

- B2: chỉnh sửa lại file app.ts để import các route vào
```ts
// import các route 
import categoriesRoute from './routes/v1/categories.route'

// BẮT ĐẦU KHAI BÁO ROUTES TỪ ĐÂY
app.use('/api/v1', categoriesRoute)
```

=> như vậy hôm nay chúng ta đã biết cách sử dụng folder routes , .env, server.ts ,constants