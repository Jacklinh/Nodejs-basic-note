# ExpressJs Framwork

## 1.ExpressJs Framework

- ExpressJs là 1 framework ứng dụng web có mã nguồn mỡ và miễn phí được xây dựng dựa trên nền tảng Nodejs.
- ExpressJs được sử dụng để thiết kế và phát triển các ứng dụng web 1 cách nhanh chóng
- Framwork là nói đến nó có thể vừa đảm nhận vai trò làm client vừa làm server được.

### Cài đặt
(Theo kiểu cài đặt thủ công)
#### B1 - khởi tạo dự án
```bash
npm init or yarn init -y 
```
để tạo file package.json

#### B2 - tích hợp ExpressJs
```bash
npm install expres --save or yarn add express
```
với typescipt thì cài thêm
```bash
npm i -D typescript  @types/express @types/node ts-node-dev
#or
yarn add -D typescript  @types/express @types/node ts-node-dev
```

#### Bước 3 - Cấu hình Typescript

Tạo file tsconfig.json

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
#### Bước 4 - Tạo ứng dụng
Tạo file app.ts trong folder src.
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
// const express = require('express')
// do ts đã dùng es6 nên sẽ dùng import thay require
import express, {Express, Request, Response} from 'express';
// Express, Request, Response là kiểu typescript tương ứng với express, req, res
const app: Express = express()
const port = 3000

// sử dụng phương thức get

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

#### Bước 5 - Cấu hình lại package.json
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
#### Bước 6 - Khởi chạy dự án

```bash
yarn dev
# hoặc
npm run dev
```

lúc này server sẽ lắng nghe cổng 3000. ta chạy http://localhost:3000/

Hoặc bạn Sử dụng gói cài đặt có sẵn express-generator (javascript)

Tại thư mục gốc dự án bạn mở cửa sổ Terminal và nhập lệnh

```bash
npx express-generator
```

Xem chi tiết: https://expressjs.com/en/starter/generator.html

## Router và HTTP method

Router là 1 thành phần cực kỳ quan trọng của 1 website. Nó giúp website biết người dùng truy cập đến nơi nào của website. từ đó phản hồi lại 1 cách thiết hợp.

cú pháp định nghĩa 1 route
```js
app.METHOD(PATH, HANDLER);
```
Trong đó
Method là các phương thức như `get`, `post`, `put`, `delete`
PATH là đường dẫn url hoặc là các Route paths
Handller: là các function xử lý callback, trả về Request và Response
đọc thêm sự khác nhau giữa get, post (https://timoday.edu.vn/cac-phuong-thuc-request-trong-giao-thuc-http/#So_sanh_GET_voi_POST)

Path chúng ta có 2 loại 
- 1 là route path tĩnh như `/`,`/product`, `/user`,...
- 2 là route path động như `/product/:id`,...
## Route paths

Ngoài cách bạn định nghĩa path một cách cụ thể như ví dụ trên thì bạn có thể tạo ra các `path` với một `string patterns`
ta sẽ sử dụng regex như trong javscript (https://regex101.com/)

vd1: router khớp với chữ số như /users/1, /users/1323,...

```ts
// :id chính là route prameter
app.get('/users/:id(\\d+)', (req: Request, res: Response)=>{
    // id = req.params.id
    const {id} = req.params; // cú pháp es6
    res.send('user id is'+ id);
})
```

vd2: route get khớp với /users/tuanhung1234, /users/124thienthan, /users/saytinh
```ts
// [a-zA-Z0-9]+:  chỉ chấp nhận 1 or nhiều chữ cái hoặc chữ số 
app.get('/users/:username([a-zA-Z0-9]+)', (req: Request, res: Response)=>{
    // username = req.params.username
    const {username} = req.params;
    res.send('username page is '+ username);
})
```

vd2: route get khớp với /article/iphone-15-pro-max-gia-re.html , /article/5-cong-thuc-thanh-cong-tu-chuyen-gia.html
```ts
// [a-zA-Z0-9-]+\.html$: chấp nhận 1 hoặc nhiều chữ cái , chữ số và kết thúc .html
app.get('/article/:slug([a-zA-Z0-9-]+\.html$)', (req: Request, res: Response)=>{
    // slug = req.params.slug
    const {slug} = req.params;
    res.send('article detail page is '+ slug);
})
```

## sử dụng template engines với expressjs
Chúng ta biết rằng Express là một framework nên nó có thể đảm nhận công việc client side, có thể dùng để làm một ứng dụng, một website bình thường.

Bằng cách sử dụng `template engines` phổ biến làm việc với Express như Pug, Mustache, and EJS.
Ví dụ sử dụng EJS

B1: Cài đặt
```bash
npm install ejs
yarn add ejs
```
B2: Thêm 2 dòng này vào app.ts
trong folder src ta tạo folder views chứa các file html
```ts
import path from 'path';

// cấu hình kiểu tập tin template
app.engine('.html', require('ejs').__express);
// Cấu hình thư mục template views
app.set('views', path.join(__dirname, 'views'));
// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');

```



