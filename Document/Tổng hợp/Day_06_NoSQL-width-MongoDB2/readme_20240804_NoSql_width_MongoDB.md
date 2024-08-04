# NoSQL width MongoDB- kết nối database với mongodb

## Các bước thực hiện
1. trong folder src/database/seed/db.ts ( tạo file db.ts)
copy phần kết nối mongoose từ server.ts qua db.ts
```ts
import { globalConfig } from "../../constants/configs"
// import mongoose
import mongoose from "mongoose";
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
```
2. thêm script trong package.json
```json
"seed": "ts-node-dev src/databases/seed/db.ts"
```
chạy lệnh `yarn seed` để thực hiện

2. thực hiện thêm dữ liệu từ code lên mongodb
doc Constructing Documents <https://mongoosejs.com/docs/models.html>

- tạo mới document
```ts
const tank = new Tank({ size: 'small' });
await tank.save();
// or

await Tank.create({ size: 'small' });

// or, for inserting large batches of documents
await Tank.insertMany([{ size: 'small' }]);
```

Tạo 1 document file db.ts
```ts
// tạo mới 1 document
    const category = new Category({
        category_name: "Road",
        description: "Bicycles designed for paved roads",
        slug: "road"
    })
    // đến bước này nó mới lưu vào database có sẵn trên mongodb
    await category.save();
```

Tạo nhiều document cùng 1 lúc 
```ts
await Category.insertMany(categories)
```