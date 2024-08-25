# ORM 

## ORM là gì

- ORM viết tắt của `object relational mapping" là 1 mô hình lập trình được sử dụng để ánh xạ dữ liệu giữa hệ quản trị cơ sở dữ liệu (relational database management system - RDBMS) với các đối tượng trong ngôn ngữ lập trình hướng đối tượng (như java, Python, c#, typescript và nhiều ngôn ngữ khác).
- Mục tiêu chính của ORM: giúp đơn giản hóa làm việc với cơ sở dữ liệu bằng cách biến đổi dữ liệu được lưu trữ trong bảng cơ sở dữ liệu thành các đối tượng có thể truy cập và quản lý bằng mã lập trình (Code first).
- ORM giúp lập trình viên không cần phải viết câu lệnh SQL phức tạp mà thay vào đó sử dụng các đối tượng và phương thức trong ngôn ngữ lập trình
- Tự động hóa việc thực hiện các thao tác CRUD(create, read, update, delete) mà k cần thao tác trực tiếp với SQL.

## 1 số thư viện ORM 

- TypeORM, Prisma: dành cho Node.js và Typescript (https://typeorm.io/)
- Sequelize: 1 ORM cho Node.js với hỗ trợ nhiều loại cơ sở dữ liệu
- Hibernate: phổ biến trong môi trường java
- Entity Framework: ORM cho các ứng dụng .NET

## TypeORM

### TypeORM là gì

- là 1 ORM cho typescript và javascript(ES5,ES6,ES7).
- Nó giúp bạn tạo ra các đối tượng và cơ sở dữ liệu chung, tạo và thực thi truy vấn, bằng cách dịch các thực thể (entities)


### MSSQL là gì

- MSSQL(Microsoft SQL Server) là 1 hệ thống quản trị cơ sở dữ liệu quan hệ (RDBMS) do Microsoft phát triển.
- nó được sử dụng để lưu trữ và quản lý dữ liệu trong các ứng dụng khác nhau, từ ứng dụng nhỏ đến hệ thống doanh nghiệp phức tạp

### cài đặt

cài đặt typeORM vào ứng dụng ( có thể cài kết hợp mssql reflect-metadata)

```bash
yarn add typeorm mssql reflect-metadata
```

- reflect-metadata là 1 thứ viện javascript(or typescript) cho việc thêm và xử lý metadata(siêu dữ liệu) trong ứng dụng.
- Thường được sử dụng trong các ứng dụng sử dụng decorators(trang trí) như typeORM, NestJS. nơi mà decorators được sử dụng để cấu trình các thực thể (entities), controller, và nhiều yếu tố khác.

### Cấu hình DataSoure

#### 1. DataSoure(nguồn dữ liệu) là gì

- là thành phần quan trọng để cấu hình và kết nối đến cơ sở dữ liệu.
- Nó chứa thông tin cần thiết giúp TypeORM tương tác với cơ sở dũ liệu
- giúp bạn dễ dàng thực hiện các thao tác CRUD(create, read, update, delete) và quản lý dữ liệu trong ứng dụng

#### 2. tạo 1 datasource

- tạo 1 datasource file `data-source.ts`

```ts
// khai báo
import { DataSource } from "typeorm"
import "reflect-metadata";
const myDataSource  = new DataSource({
    type: "mssql", // loại cơ sở dữ liệu như postgres,mysql, mssql,..
    host: "localhost", // địa chỉ máy chủ nơi cơ sở dữ liệu đang chạy, name computer
    port: 1433, // cổng kết nối đến csdl 
    username: "test", // tên người dùng để truy cập csdl
    password: "test", //mật khẩu tương ứng với username
    database: "test", // tên csdl mà bạn muốn kết nối
    entities: ['entities/*.entity{.ts,.js}'] // chỉ rõ thư mục entities mà bạn kết nối
    synchronize: true, // true - typeORM sẽ tự động đồng bộ với database
    logging: false, //ghi log
    options: {
        encrypt: false, //True khi chạy trên production
    },
})
// kết nối 
myDataSource.initialize()
.then(() => {
    console.log("Data Source has been initialized!")
})
.catch((err) => {
    console.error("Error during Data Source initialization", err)
})
```

- tạo nhiều datasource
datasource chấp nhập datasourceOptions với loại data khác nhau.

```ts
import { DataSource } from "typeorm"
import "reflect-metadata";
const mssqlDataSource  = new DataSource({
    type: "mssql", 
    host: "localhost", 
    port: 1433, 
    username: "test", 
    password: "test", 
    database: "test", 
    entities: ['entities/*.entity{.ts,.js}'] 
    synchronize: true, 
    logging: false, 
    options: {
        encrypt: false,
    },
})

const mysqlDataSource  = new DataSource({
    type: "mysql", 
    host: "localhost", 
    port: 1433, 
    username: "test", 
    password: "test", 
    database: "test", 
    entities: [] 
    synchronize: true, 
    logging: false, 
    options: {
        encrypt: false,
    },
})
```

#### 3. sử dụng datasoure 

ta có thể sử dụng datasoure để thực hiện các thao tác truy vấn, cập nhật hoặc xóa dữ liệu trong controller

- sử dụng repositoty 
```ts
import { DataSource } from "typeorm"
import { User } from "./entity/User"

const myDataSource = new DataSource(/*...*/)
const user = await myDataSource.manager.findOneBy(User, {
    id: 1,
})
user.name = "Umed"
await myDataSource.manager.save(user)
```
- thực hiện các thao tác như truy vấn, cập nhật hoặc xóa dữ liệu
```ts
async function getUsers() {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    console.log('All users:', users);
}

async function updateUser(userId: number, newEmail: string) {
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.update(userId, { email: newEmail });
}

async function deleteUser(userId: number) {
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.delete(userId);
}
```

### Entities

#### entities là gì

- Entities(thực thể) là các lớp đại diện cho 1 đối tượng trong csdl. 
- mỗi entities tương ứng với 1 table(bảng) trong csdl
- các trường của entities tương ứng với các cột trong bảng đó.
- mỗi entities bao gồm các thuộc tính và kiểu dữ liệu tương ứng.
- TypeORM sử dụng các đối tượng entities để thực hiện các thao tác thêm, sửa, xóa và truy vấn dữ liệu.
==> ta thực hiện theo mô hình `code-first` thì cần tạo 1 entities để tạo được 1 table


