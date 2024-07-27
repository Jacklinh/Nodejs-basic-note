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
B3. tạo các route 

trong file app.ts. ta tạo các route , như

```ts
import express, {Request, Response} from 'express';
app.get('/', (rep: Request, res: Response) => {
//   res.send('trang chủ')
  res.render('index') //Đang nhắm đến file views/index.html
})
// route get khớp với /users/1, /users/2, /users/1323, /users/17854
// :id chính là route prameter
// \d+: chứa 1 hoặc nhiều chữ số
app.get('/users/:id(\\d+)', (rep: Request, res: Response)=>{
    // id = rep.params.id
    const {id} = rep.params;
    res.send('user id is'+ id);
})
```

## Truy cập đến các tài nguyên tĩnh

- các tài nguyên tĩnh như các image, js, css,...
- lúc này khi bạn update các file trên lên server thì cần tạo 1 folder `public`, cùng cấp với folder `src`

b1: tại file app.ts, ta sẽ khai báo `path`
```ts
import path from 'path';
/* Khai báo thư mục chứa tài nguyên tĩnh http://localhost:3000/images/images1.jpg*/

app.use(express.static(path.join(__dirname, '../public')))
// or Thêm tiền tố ảo vào URL http://localhost:3000/static/images/images1.jpg
app.use('/static', express.static(path.join(__dirname, '../public')))
```
## Lưu ý

### HTTP status code

- là 1 danh sách của tất cả các mã trạng thái HTTP được trả về từ client gửi request lên server. 
- các mã này được sử dụng để cung cấp thông tin về kết quả của yêu cầu, đã được xử lý thành công hay lỗi.

#### 1xx infomation(thông tin)
- 100 Continue: chỉ 1 phần của request được nhận bởi server( có thể là header và client cần gửi tiếp body), nhưng miễn là nó k bị loại bỏ. client nên tiếp tục với request
- 101 switching protocols: request đã hỏi server về việc thay đổi protocol và server đã chấp nhận điều đó

#### 2xx Success(thành công)

- 200 ok: request đã được tiếp nhận và xử lý thành công. các request thực tế trả về sẽ phụ thuộc vào phương thức HTTP của request. 
--trong 1 GET request, response sẽ chứa 1 thực thể tương ứng với các tài nguyên yêu cầu,
-- trong 1 POST request response sẽ chứa 1 thực thể mô tả hoặc chứa các kết quả của các action

- 201 Created: Request đã được xử lý, kết quả của việc xử lý tạo ra 1 resoure mới.

- 202 Accepted: Request được chấp nhận cho xử lý, nhưng việc xử lý chưa hoàn thành
- 203 non-authoritative information(xuất hiện từ HTTP/1.1): server là nơi chuyển đổi proxy(ví dụ 1 web accelerator) đã nhận được 200 OK nhưng nó trả về 1 phiên bản thay đổi(có thể là header) của response nguyên gốc.
- 204 no Content; server đã xử lý thành công request nhưng k trả về bất cứ content nào.
- 205 reset content: server đã xử lý thành công request nhưng không trả về bất cứ content nào. không giống với 204 no content response này yêy cầu phía client phải thiết lập lại document view
- 206 Partial Content: Server chỉ trả về 1 phần của Resource(dạng byte) do 1 range header được gửi bới phái client. các range Header được sử dụng bới clinet để cho phép nối lại các phần của file dowload bị dán đoạn hoặc chia nhiều luồng dowload.

#### 3xx Redirection (sự chuyển hướng lại)
- 300 Multiple Choices: Một danh sách các link. Người sử dụng có thể chọn một link và tới vị trí đó. Tối đa 5 địa chỉ. Ví dụ: List các file video với format khác nhau
- 301 Moved Permanently: Request hiện tại và các request sau được yêu cầu di chuyển tới một URI mới.
- 302 Found: Đây là một ví dụ cho thấy sự mâu thuẫn giữa thực tiễn và quy chuẩn. Ở phiên bản HTTP/1.0 nó có nghĩa là yêu cầu Client chuyển hướng đến một URL tạm thời (tương tự như là 301 Moved Permanently) nhưng phần lớn các browser lại thực hiện nó với ý nghĩa của 303 See Other(sẽ nói sau đây). Do đó từ phiên bản HTTP/1.1 có thêm hai mã 303 và 307 để phân biệt rõ hành vi, nhưng một số ứng dụng web và framework vẫn sử dụng 302 như thể là 303.
- 303 See Other (Xuất hiện từ HTTP/1.1): Response trả về của Request có thể tìm thấy ở một URL khác bằng cách sử dụng phương thức GET.
- 304 Not Modified: Đây là Status-Code tới một If-Modified-Since hoặc If-None-Match header, nơi mà URL không được chỉnh sửa từ ngày cụ thể.
- 305 Use Proxy: Tài nguyên yêu cầu chỉ có sẵn thông qua một proxy, địa chỉ mà được cung cấp trong các Response. Nhiều HTTP Client (như Mozilla và Internet Explorer) không xử lý một cách chính xác phản ứng với mã trạng thái này, chủ yếu là vì các lý do an ninh.
- 306 Switch Proxy: Mã này hiện không còn được sử dụng, ý nghĩa ban đầu của nó là "Các Request tiếp theo nên sử dụng các proxy được chỉ định".
- 307 Temporary Redirect (xuất hiện từ HTTP/1.1): Trong trường hợp này, Request hiện tại cần được lặp lại một URI khác nhưng các Request trong tương lai vẫn sử dụng URI gốc.

#### 4xx: Client Error (Lỗi Client)
- 400 Bad Request: Server không thể xử lý hoặc sẽ không xử lý các Request lỗi của phía client (ví dụ Request có cú pháp sai hoặc Request lừa đảo định tuyến ...)
- 401 Unauthorized: Tương tự như 403 Forbidden nhưng được sử dụng khi yêu cầu xác thực là bắt buộc và đã không thành công. Các Response bắt buộc phải có thành phần WWW-Authenticate chứa các thách thức với tài nguyên được yêu cầu. Một số trang web vấn đề HTTP 401 khi một địa chỉ IP bị cấm từ các trang web (thường là các tên miền trang web) và địa chỉ cụ thể là từ chối quyền truy cập một trang web.
- 402 Payment Required: Hiện tại mã này chưa được sử dụng và nó được dự trữ cho tương lai. Mục đích ban đầu là mã này có thể được sử dụng như là một phần của đề án tiền mặt hoặc micropayment kỹ thuật số, nhưng điều đó đã không xảy ra, và mã này thường không được sử dụng. Google API sử dụng Status-Code này nếu một nhà phát triển đặc biệt đã vượt quá giới hạn số lần yêu cầu.
- 403 Forbidden: Request là hợp lệ nhưng server từ chối đáp ứng nó. Nó có nghĩa là trái phép, người dùng không có quyền cần thiết để tiếp cận với các tài nguyên.
- 404 Not Found: Các tài nguyên hiện tại không được tìm thấy nhưng có thể có trong tương lai. Các request tiếp theo của Client được chấp nhận.
- 405 Method Not Allowed: Request method không được hỗ trợ cho các tài nguyên được yêu cầu. Ví dụ Một GET request đến một POST resource, PUT Request gọi đến một tài nguyên chỉ đọc.
- 406 Not Acceptable: Server chỉ có thể tạo một Response mà không được chấp nhận bởi Client.
- 407 Proxy Authentication Required: Bạn phải xác nhận với một Server ủy quền trước khi Request này được phục vụ.
- 408 Request Timeout: Request tốn thời gian dài hơn thời gian Server được chuẩn bị để đợi.
- 409 Conflict: Request không thể được hoàn thành bởi vì sự xung đột, ví dụ như là xung đột giữa nhiều chỉnh sửa đồng thời.
- 410 Gone: Các resource được yêu cầu không còn nữa và sẽ không có sẵn một lần nữa, khi gặp mã lỗi này Client không nên có gắng tìm kiếm các tài nguyên này ở những lần sau.
- 411 Length Required: Content-Length không được xác định rõ. Server sẽ không chấp nhận Request nào không có nó.
- 412 Precondition Failed: Server sẽ không đáp ứng một trong những điều kiện tiên quyết của Client trong Request.
- 413 Payload Too Large: Server sẽ không chấp nhận yêu cầu, bởi vì đối tượng yêu cầu là quá rộng. Trước đây nó gọi là "Request Entity Too Large".
- 414 URI Too Long: URI được cung cấp là quá dài để Server xử lý, thường là kết quả của quá nhiều dữ liệu được mã hóa như là một truy vấn chuỗi của một GET Request, trong trường hợp đó nó phải được chuyển đổi sang một POST Request. Trước đây được gọi là "Request-URI Too Long"
- 415 Unsupported Media Type: Server sẽ không chấp nhận Request, bởi vì kiểu phương tiện không được hỗ trợ. Ví dụ khi Client upload một ảnh có định dạng image/svg+xml, nhưng server yêu cầu một định dạng khác.
- 416 Range Not Satisfiable: Client yêu cầu một phần của tập tin nhưng server không thể cung cấp nó. Trước đây được gọi là "Requested Range Not Satisfiable"
- 417 Expectation Failed: Máy chủ không thể đáp ứng các yêu cầu của trường Expect trong header.

#### 5xx: Server Error (Lỗi Server)
- 500 Internal Server Error: Một thông báo chung chung, được đưa ra khi Server gặp phải một trường hợp bất ngờ, Message cụ thể là không phù hợp.
- 501 Not Implemented: Server không công nhận các Request method hoặc không có khả năng xử lý nó.
- 502 Bad Gateway: Server đã hoạt động như một gateway hoặc proxy và nhận được một Response không hợp lệ từ máy chủ nguồn.
- 503 Service Unavailable: Server hiện tại không có sẵn (Quá tải hoặc được down để bảo trì). Nói chung đây chỉ là trạng thái tạm thời.
- 504 Gateway Timeout: Server đã hoạt động như một gateway hoặc proxy và không nhận được một Response từ máy chủ nguồn.

### HTTP Response

Response có nghĩa là phản hồi. Đây là kết quả server trả về cho client.


HTTP Response có cấu tạo gồm ba phần chính. Đó là status line, header và massage body

1. Request Line: Http Status Code, Reason-Phrase, HTTP version

2. Request Header: thông tin mở rộng cho request: cookie, thông tin về ủy quyền, tác nhân người dùng…

3. Message Body

ExpressJs hỗ trợ các phương thức response như sau:

| Method           | Description                                                                           |
| ---------------- | ------------------------------------------------------------------------------------- |
| res.download()   | Tải file.                                                       |
| res.end()        | Kết thúc xử lý reponse                                                            |
| res.json()       | Gửi một Json                                                                 |
| res.jsonp()      | Send a JSON response with JSONP support.                                              |
| res.redirect()   | Chuyển hướng request                                                                   |
| res.render()     | Render một giao diện                                                               |
| res.send()       | Send a response of various types.                                                     |
| res.sendFile()   | Send a file as an octet stream.                                                       |
| res.sendStatus() | Set the response status code and send its string representation as the response body. |

---

Dưới đây là ví dụ về một số phương thức trả về (response methods) trong Express.js:

1. **`res.send(data)`**: Gửi dữ liệu về cho client. Phương thức này tự động xác định kiểu nội dung và chuyển đổi tham số thành một chuỗi JSON bằng cách sử dụng `JSON.stringify()`. Tham số có thể là bất kỳ kiểu dữ liệu JSON nào, bao gồm object, array, string, Boolean, number hoặc null. Bạn cũng có thể sử dụng nó để chuyển đổi các giá trị khác thành JSON.

    ```javascript
    app.get('/', (req, res) => {
      res.send('Hello, Express!');
    });
    ```

2. **`res.json(data)`**: Trả về dữ liệu dưới dạng JSON. Phương thức này tương tự như `res.send()`, nhưng chỉ chuyển đổi tham số thành chuỗi JSON mà không cần xác định kiểu nội dung.

    ```javascript
    app.get('/user', (req, res) => {
      res.json({ name: 'John', age: 30 });
    });
    ```

3. **`res.status(code)`**: Xác định mã trạng thái HTTP cho phản hồi. Ví dụ, bạn có thể sử dụng nó để trả về mã 404 (Not Found) hoặc 500 (Internal Server Error).

    ```javascript
    app.get('/not-found', (req, res) => {
      res.status(404).send('Page not found');
    });
    ```

4. **`res.redirect(path)`**: Chuyển hướng đến một đường dẫn cụ thể.

    ```javascript
    app.get('/old-page', (req, res) => {
      res.redirect('/new-page');
    });
    ```

5. **`res.render(view, locals)`**: Trả về một view template. Bạn cần cài đặt một template engine như Pug, EJS hoặc Handlebars để sử dụng phương thức này.

    ```javascript
    app.get('/profile', (req, res) => {
      res.render('profile', { username: 'john_doe' });
    });
    ```


6. **`Gửi tệp tin để tải về (Download File)`**:
    - Sử dụng phương thức `res.download(file)` để gửi tệp tin đến client và cho phép người dùng tải về.
    - Đảm bảo rằng bạn đã cài đặt Express và có một tệp tin để thử nghiệm.

    ```javascript
    app.get('/download', (req, res) => {
      const file = `${__dirname}/path/to/your/file.txt`;
      res.download(file); // Gửi tệp tin đến client
    });
    ```

7. **`Gửi tệp tin (Send File)`**:
    - Sử dụng phương thức `res.sendFile()` để gửi tệp tin HTML hoặc tệp tin khác đến client.
    - Đảm bảo rằng bạn đã có tệp tin `test.html` trong thư mục của bạn.

    ```javascript
    app.get('/myendpoint', (req, res) => {
      res.sendFile(`${__dirname}/test.html`);
    });
    ```


---

### So sánh GET với POST
Xem: https://timoday.edu.vn/cac-phuong-thuc-request-trong-giao-thuc-http/#So_sanh_GET_voi_POST

### PUT and PATH
Trong RESTful API, PUT và PATCH là hai phương thức HTTP khác nhau được sử dụng để cập nhật tài nguyên. 

Có rất nhiều tranh luận nên dùng PUT hay PATH

|                    | PUT | PATCH |
|--------------------|-----|-------|
| Partial Updates    | ❌   | ✔️     |
| Bandwidth          | ⬆️   | ⬇️     |
| Creates a resource | ✔️   | ❌     |
| Idempotent         | ✔️   | ❌     |
| Safe               | ❌   | ❌     |

Tham khảo: <https://josipmisko.com/posts/patch-vs-put-rest-api>


Dưới đây là sự khác biệt giữa PUT và PATCH:

1. PUT (Cập nhật toàn bộ tài nguyên):
   - Phương thức PUT được sử dụng để cập nhật toàn bộ tài nguyên hoặc tạo mới nếu tài nguyên chưa tồn tại.
   - Khi sử dụng PUT, bạn gửi một yêu cầu cập nhật hoàn toàn và ghi đè lên tài nguyên hiện có. Điều này có nghĩa là tất cả các trường dữ liệu của tài nguyên sẽ được thay thế bằng dữ liệu mới được gửi.
   - Nếu bạn chỉ gửi một phần của tài nguyên trong yêu cầu PUT, những phần không được gửi sẽ bị xóa hoặc trở thành giá trị mặc định (nếu có) tuỳ thuộc vào ứng dụng.

Ví dụ có một record với thông tin sau:

```json

{
    "id": 1,
    "name": "John Smith",
    "age": 25,
    "skill": "Java, PHP"
}

```
Bây giờ muốn bổ sung thêm skill cho id : 1

Request: PUT /users/1

Request payload:

```json
"skill": "Java, PHP, Python, JavaScript"
```

Bây giờ mình kiểm tra lại xem thông tin John đã được cập nhật chưa.

Request: GET /user/1
Response:

```json
"skill": "Java, PHP, Python, JavaScript"
```

Cập nhật rồi, nhưng trường name, và age đã biến mất

2. PATCH (Cập nhật một phần tài nguyên):
   - Phương thức PATCH được sử dụng để cập nhật một phần của tài nguyên.
   - Khi sử dụng PATCH, bạn chỉ cần gửi các trường dữ liệu cần cập nhật trong yêu cầu. Các trường dữ liệu khác của tài nguyên sẽ không bị thay đổi.
   - Phương thức PATCH cho phép bạn thực hiện các thay đổi nhỏ mà không cần gửi lại toàn bộ tài nguyên. Điều này hữu ích khi bạn chỉ muốn cập nhật một số trường dữ liệu mà không ảnh hưởng đến các trường khác.


Cũng với ví dụ trên thực hiện với PATH thì sau khi cập nhật bạn nhật được response

```json

{
    "id": 1,
    "name": "John Smith",
    "age": 25,
    "skill": "Java, PHP, Python, JavaScript"
}

```

==> PATCH chỉ cập nhật những field được yêu cầu thay vì cập nhật toàn bộ.