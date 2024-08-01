# Restful api sử dụng controller với sevice
Tiếp tục maintenance project theo Follow

>* Tạo Routes theo phiên bản
>* Tạo Controllers
>* Tạo Services
>* Handle Errors inside routes, controllers, services
>
## Tạo Controller

Tiếp tục refactor các routes, chuyển thành các controllers

### Tại sao phải cần đến `Controller` ?

**Trong mô hình API với Express.js và Node.js**, ba thành phần quan trọng là **Routes**, **Controllers**, và **Services** đóng vai trò quan trọng trong việc phát triển ứng dụng. Mỗi khái niệm nó có vai trò riêng:

**Routes (Định tuyến)**:

- Routes xác định các **tuyến API** và xử lý các yêu cầu HTTP từ client.
- Chúng định nghĩa các **đường dẫn URL** và liên kết chúng với các **controllers** tương ứng.

- Routes có thể xử lý các phương thức HTTP như **GET**, **POST**, **PUT**, và **DELETE**.
- Ví dụ: Đường dẫn `/users` có thể liên kết với controller để xử lý việc lấy thông tin người dùng.

**Controllers**:
- Controllers là nơi **xử lý logic kinh doanh** của ứng dụng.
- Khi một request đã đi qua Middleware, nó sẽ được chuyển đến Controller để xử lý.
- Controllers thực hiện các nhiệm vụ như:
  - **Gọi services** để truy vấn cơ sở dữ liệu.
  - **Xử lý dữ liệu** từ request và chuẩn bị dữ liệu để trả về cho client.
  - **Quản lý luồng logic** của ứng dụng.
- Ví dụ: Controller xử lý việc lấy thông tin người dùng từ cơ sở dữ liệu.


---
### Refactor Code
chúng ta copy v1 thành v2 . để nâng cấp 
1. trong folder route/v2/categories.route.ts , ta thấy categories đều chung biến nên ta chuyển name `categories` sang cho app xử lý
file  categories.route.ts , ta xoá `categories` ở route
```ts
router.get('', (req: Request, res: Response) => {
  res.status(200).json({
    data: cates
  });
});
```
và file app.ts ta edit thành
```ts
// import các route v2
import categoriesRouteV2 from './routes/v2/categories.route';
// v2
app.use('/api/v2/categories', categoriesRouteV2)
```

2. tạo file xxx.controller.ts trong folder controllers
tách hàm xử lý req, res, next trong file xxx.route.ts ra để xử lý

file xxx.controller.ts
```ts
import express, {Request, Response, NextFunction} from 'express'
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
const findAll = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({
            data: cates
        });
    }catch(error) {
        next(error)
    }
    
}
export default {
    findAll
}
```
và edit file xxx.route.ts
```ts
import categoriesController from '../../controllers/categories.controller';
router.get('', categoriesController.findAll);
```
cũng theo logic đó chúng ta tách các xử lý khác ra(lúc này nhớ kiểm tra, import biến nào k dùng tới thì remove luôn - tránh khi buid sẽ bị kiểm tra và remove)

##  Tạo Service
**Services**:
- Services là lớp **quản lý dữ liệu** trong ứng dụng.
- Chúng thực hiện các tác vụ như:
    - **Truy vấn cơ sở dữ liệu** (sử dụng Model).
    - **Xử lý logic kinh doanh** phức tạp.
    - **Định nghĩa các quan hệ giữa các đối tượng** (nếu sử dụng cơ sở dữ liệu liên quan).
- Services giúp tách biệt logic kinh doanh và cơ sở dữ liệu.
- Ví dụ: Service thực hiện truy vấn thông tin người dùng từ cơ sở dữ liệu.

---

Tách dữ liệu fake categories thành file json

Tạo file `src/database/categories.json` 
```json
[
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
```

và trong file  `src/controllers/categories.controller.ts`
chúng ta sử dụng file system của nodejs để import file json vào.
và khai báo biến type cho object ( lúc này nếu update add mới record sẽ được update trực tiếp với database)
```ts
// import fs for nodejs
import fs from "node:fs"
// dữ liệu đầu vào
// do sử dụng fs nên khi vào nó sẽ tìm  và đi từ file server.ts 
const fileName = './src/database/categories.json';
type typeCategories = {
    id: number,
    name: string,
    image: string,
    creationAt: string,
    updatedAt: string
}
const findAll = (req: Request, res: Response, next: NextFunction) => {
    try {
        // b1: đọc nội dung file, có chứa tiếng viết 
        const data = fs.readFileSync(fileName, { encoding: 'utf-8', flag: 'r' });
        // b2: convert từ json qua objet
        const cates: typeCategories[] = JSON.parse(data);
        res.status(200).json({
            data: cates
        });
    }catch(error) {
        next(error)
    }
}
```

đến đây ta đọc lại phần service, thì nó kết nối trực tiếp với database nên sẽ move việc đọc file qua file `src/services/xxx.service.ts và viết 1 hàm xử lý riêng, tách phần xử lý ra để return giá trị 
```ts
// kết nối trực tiếp với database
// import fs for nodejs
import fs from "node:fs"
// dữ liệu đầu vào
// do sử dụng fs nên khi vào nó sẽ tìm  và đi từ file server.ts 
const fileName = './src/database/categories.json';
type typeCategories = {
    id: number,
    name: string,
    image: string,
    creationAt: string,
    updatedAt: string
}
const findAll = () => {
    // b1: đọc nội dung file, có chứa tiếng viết 
    const data = fs.readFileSync(fileName, { encoding: 'utf-8', flag: 'r' });
    // convert qua objet
    const cates: typeCategories[] = JSON.parse(data);
    return cates;
}

export default {
    findAll
}
```
và edit tiếp file xxx.controller.ts

```ts
// import servers
import categoriesService from '../services/categories.service';
const findAll = (req: Request, res: Response, next: NextFunction) => {
    try {
        // lấy data từ services
        const cates = categoriesService.findAll();
        // trả lại cho client
        res.status(200).json({
            data: cates
        });
    }catch(error) {
        next(error)
    }
}
```
## handle res- tạo folder helpers
mục đích để handle phần xử lý khi success và error
- trong folder src/helpers/responseHandler.ts
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

- trong file app.ts ta import helpers vào để xử lý thay thế cho error và success
```ts
import {sendJsonErrors} from './helpers/responseHandler';
// const statusCode = err.status || 500;
//   res.status(statusCode).json({ 
//   statusCode: statusCode, 
//   message: err.message 
// });
// thay thế bằng
sendJsonErrors(res, err);
```
và file categories.controller.ts
ta thay thế các success 
```ts
import { sendJsonSuccess } from '../helpers/responseHandler';
// lấy data từ services
  const cates = categoriesService.findAll();
  // trả lại cho client
  // res.status(200).json({
  //     data: cates
  // });
  sendJsonSuccess(res,"success")(cates);
```

==> như vậy đến hôm nay ta đã biết cách clear code dùng folder helpers, controllers, services, routes
