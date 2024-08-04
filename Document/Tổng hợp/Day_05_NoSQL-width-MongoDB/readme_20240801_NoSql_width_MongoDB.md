# NoSQL width MongoDB

## Giới thiệu

###  MongoDB là gì ?
1. Khái niệm
- MongoDB là một hệ quản trị cơ sở dữ liệu mã nguồn mở, là CSDL thuộc NoSql và được hàng triệu người sử dụng.
- MogoDb là 1 database hướng tài liệu(document), các dữ liệu lưu trữ trong document kiểu JSON thay vì dạng bảng như csdl quan hệ nên truy vấn sẽ rất nhanh.
- với csdl quan hệ chúng ta có khái niệm bảng, các cơ sở dữ liệu quan hệ (như mysql hay sql server...) sử dụng các bảng để lưu trữ dữ liệu thì với mongoDB chúng ta sẽ dùng tới khái niệm là collection thay vì bảng
- RDBMS(Relational Database Management System) - hệ thống quản lý csdl quan hệ, được thiết kế để lưu trữ và quản lý dữ liệu theo mô hình dữ liệu quan hệ.
- so với RDBMS thì trong mongoDB collection ứng với table, còn document sẽ ứng với row, MongoDB sẽ dùng các document thay cho row trong RDBMS.
- các collection trong mongoDB được cấu trúc rất linh hoạt, cho phép các dữ liệu lưu trữ không cần tuân theo 1 cấu trúc nhất định.
- Thông tin liên quan được lưu trữ cùng nhau để truy cập nhanh chóng thông qua truy vấn mongoDB

2. Ưu điểm

- dữ liệu lưu trữ phi cấu trúc(Schemaless) linh hoạt, phù hợp với nhiều loại ứng dụng hiện đại
- không có tính ràng buộc, toàn vẹn nên tính sẵn sàng cao, hiệu suất lớn và dễ dàng mở rộng lưu trữ.
- dữ liệu được caching(ghi đệm) lên RAM, hạn chế truy cập vào ổ cứng nên tốc độ đọc và ghi cao
- cung cấp nhiều tính năng nâng cao như Aggregation pipeline(chuỗi giai đoạn xử lý cho phép truy vấn phức tạp và tổng hợp dữ liệu), Full-text search(tìm kiếm toàn văn bản, gợi ý từ khóa, tìm từ dồng nghĩa), Geospatial Queries (lưu trữ và truy vấn dữ liệu không gian, như địa lý, bán kính)
- cho phép mô hình hóa dữ liệu theo cách hướng đối tượng, tương tự nhue các framework ORM truyền thống.

3. nhược điểm

- Không ứng dụng được cho các mô hình giao dịch nào có yêu cầu độ chính xác cao do không có ràng buộc
- không có cơ chế transaction(giao dịch) để phục vụ các ứng dụng ngân hàng.
- cơ chế transaction là ACID (Atomicity- tính nguyên tử, Consistency- tính nhất quán, Isolation- tính độc lập, Durability - tính bền vững) 
- dữ liệu lấy từ RAM làm trọng tâm hoạt động vì vậy khi hoạt động yêu cầu 1 bộ nhớ RAM lớn
- Mọi thay đổi về dữ liệu mặc địn đều chưa được ghi xuống ổ cứng ngay lập tức vì vậy khả năng bị mất dữ liệu từ nguyên nhân mất điện là rất cao.
- mặc dù dữ liệu lưu trữ phi cấu trúc, có thể dẫn đến sự lộn xộn và khó quản lý nếu k được thiết kế cẩn thận

4. Khi nào thì dùng mongoDB

- Quản lý và truyền tải content – Quản lý đa dạng nhiều product của content chỉ trong một kho lưu trữ data cho phép thay đổi và phản hồi nhanh chóng mà không chịu thêm phức tạp thêm từ hệ thống content.
- Cấu trúc Mobile và Social – MongoDB cung cấp một platform có sẵn, phản xạ nhanh, và dễ mở rộng cho phép rất nhiều khả năng đột phá, phân tích real-time, và hỗ trợ toàn cầu.
- Quản lý data khách hàng – Tận dụng khả năng query nhanh chóng cho phân tích real-time trên cơ sở dữ liệu người dùng cực lớn vớ các mô hình data phức tạp bằng các schema linh hoạt và tự động sharding cho mở rộng chiều ngang.
- phát triển ứng dụng nodejs, ứng dụng web, di động, phân tích dữ liệu lớn. quản lý nội dung, ứng dụng IOT,...

### Mongoose 

- là 1 thư viện Object Document Mapping (ODM) cho mongoDB, giúp dev tương tác với MongoDB 1 cách dễ dàng hơn bằng cách cung cấp 1 lớp trừu tượng hóa
- định nghĩa các schema để mô hình hóa dữ liệu trong mongoDB , giúp định nghĩa cấu trúc và validation
- MongoDB sử dụng ngôn ngữ truy vấn riêng gọi MongoDB Query Language (MQL). còn mongoose thì cung cấp 1 API dựa trên javascript để tương tác với mongoDB giúp dev viết code javascript thay vì phải học MQL

### Mô hình MVC

1. Mô hình MVC 
- MVC viết tắt của model , view , controller
- giúp phân chia ứng dụng thành 3 phần chính để quản lý mã nguồn 1 cách có cấu trúc
- Model: dùng  để cung cấp dữ liệu và logic, kết nối, chèn, chỉnh sửa dữ liệu trong datable tương tác với file system, network
- Controller: dùng để thực thi các yêu cầu từ client. controller thực hiện tiếp nhận tham số. xử lý các yêu cầu và tương tác giữa model và view
- View: giao diện được hiển thị. dữ liệu mà view hiển thị do controller cung cấp (controller lấy từ model để đưa cho view)

2. Routers
- là thư mục sẽ chứa tất cả các tuyến đường mà bạn đã tạo bằng cách sử dụng express router và kết hợp controllers. cách đặt tên xxx.router.ts

3. src/routers/v1 or src/routes/v2

- trong routers có các foler v1, v2 tương ứng là các phiên bản khác nhau của API.
- mục đích giúp cho việc quản lý các phiên bản. khi bạn cần cập nhật hay thay đổi api thì các phiên bản mới không ảnh hưởng đến phiên bản cũ.

4. controllers

- là thư mục sẽ chứa tát cả các chức năng, luồng xử lý để viết các API. cách đặt tên xxx.router.ts , trong đó xxx là 1 nhiệm vụ như login, categories,...

## Cài đặt MongoDB

1. cài đặt mongodb theo phiên bản phù hợp

<https://www.mongodb.com/try/download/community>

2. cài đặt Compass Tool: Công cụ để quản lý MoogoDB bằng giao diện đồ họa

<https://www.mongodb.com/products/compass>

3. Extension for VS Code:

<https://www.mongodb.com/products/vs-code>

## Hướng dẫn sử dụng MongoDB Compass và MongoDB for VsCode

1. MongoDB Compass

- Kết nối server
- Tạo mới một Databse
- Tạo Collection
- Thêm mới một document (record)
- Chỉnh sửa, xóa một document

2. MongoDB for VsCode

- Kết nối server
- Tạo mới một Databse
- Tạo Collection
- Thêm mới một document (record)
- Chỉnh sửa, xóa một document

## Tích hợp MongoDB vào NodeJs

1. install mongoose
Sử dụng MongoDB qua thư viện Mongoose (Database ORM) giúp thao tác dễ hơn về mặt cú pháp
<https://mongoosejs.com/docs/>
```bash
npm install mongoose --save
yarn add mongoose --save
```
2. Kết nối với Database

- doc <https://mongoosejs.com/docs/connections.html>

- tạo biến `MONGODB_URL` để lưu thông tin kết nối mongoose ở file /src/constants/configs.ts
```ts
export const globalConfig = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL
}
// process.env.MONGODB_URL từ file .env 
```
- tại file server.ts, ta đưa đoạn code kết nôi vào

```ts
import app from "./src/app";
import { globalConfig } from "./src/constants/configs"
const POST = globalConfig.PORT || 3000;
// import mongoose
import mongoose from "mongoose";

// kết nối mongoose
mongoose.connect(globalConfig.MONGODB_URL as string)
.then(() => {
    console.log('connected to mongodb');
    //should listen app here
    // Bạn có thể đưa đoạn code khởi tạo server của Express vào chổ `//should listen app here` để đảm bảo rằng. Phải kết nối server Mongoo thành công thì mới khởi tạo server NodeJs.

    // app.listen(POST, () => {
    //     console.log(`Example app listening on port http://localhost:${POST}`)
    // })
})
.catch((err) => {
    console.log('failded to connect to mongodb error');
})
app.listen(POST, () => {
    console.log(`Example app listening on port http://localhost:${POST}`)
})
```

## Mongoose SchemaTypes
- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- ObjectId
- Array
- Decimal128
- Map
- Schema


Chi tiết cách sử dụng các kiểu dữ liệu: <https://mongoosejs.com/docs/schematypes.html>

### Tạo một Model Schema với Mongoose
- doc <https://mongoosejs.com/docs/models.html>

- trong folder src/models tạo file xxx.model.ts
```ts
import { Schema, model } from "mongoose";

// khởi tạo 1 schema
// doc <https://mongoosejs.com/docs/schematypes.html>
const categorySchema = new Schema({
    category_name: {
        type: String,
        maxLength: 50,// DataSize- tối đa 50 ký tự
        unique: true // chống trùng lặp tên

    },
    description: {
        type: String,
        maxLength: 500,
        require: false // Allow null - mặc định là true- k cho phép rỗng ,
    },
    /**
   * Vì sao cần slug vì dùng để SEO
   * category_name: Điện thoại
   * slug: dien-thoai
   */
    slug: {
        type: String,
        maxLength: 50,
        require: true
    }
},{ 
    // khai báo timestamps để khi quản lý dữ liệu khi thay đổi , nó sẽ tự động sinh ra 2 biến createdAt(thời gian tạo request) và updatedAt(thời gian update request)
    timestamps: true 
    // collection: 'categories' ở đây trên database sẽ tạo name database theo tên mình đặt
})

// Export một Model, doc <https://mongoosejs.com/docs/models.html>, name Xxx = new model()
// Ở đây ta đặt tên theo name số ít 
const Category = model("Category", categorySchema);
export default Category
```

- trong src/services/xxx.server.ts
ta import file model vào ( chú ý nhớ sử dụng callback async await để xử lý bất đồng bộ )
và dùng các hàm trong mongoose để xử lý <https://mongoosejs.com/docs/queries.html>
```ts
// import schema model 
import categorySchema from '../models/categories.model';
const findAll = async () => {
    // lúc này sẽ k cần đọc file nữa mà nó trực tiếp liên kết với database trên mongodb
    /* 
    b1: đọc nội dung file, có chứa tiếng viết 
    const data = fs.readFileSync(fileName, { encoding: 'utf-8', flag: 'r' });
    convert qua objet
    const cates: typeCategories[] = JSON.parse(data);
    */
   // find() --> find all document
    const categories = await categorySchema.find();
    return categories;
}
```

- Tiếp tục qua src/controllers/xxx.controller.ts chỉnh sửa
(import services tạo trên vào)
```ts
const findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // lấy data từ services
        const cates = await categoriesService.findAll();
        // trả lại cho client
        // res.status(200).json({
        //     data: cates
        // });
        sendJsonSuccess(res,"success")(cates);
    }catch(error) {
        next(error)
    }
}
```

==> khi này trên mongodb đã có database và Collection với tên là categories lấy từ name `xxx` ở src/models/xxx.model. Chúng ta sẽ tạo 1 dữ liệu mẫu trên tool mongo compass. k cần tạo id vì id nó quy định sẵn rồi