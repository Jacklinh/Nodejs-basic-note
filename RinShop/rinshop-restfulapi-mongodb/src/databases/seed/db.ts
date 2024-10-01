//File này dùng để tạo dữ liệu cho database
import mongoose from 'mongoose'
import {globalConfig} from '../../constants/configs'
import { faker } from '@faker-js/faker';
import Staff from '../../models/staffs.model';
import Category from '../../models/categories.model';
import Product from '../../models/products.model';

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

// thêm data cứng
const staffs = [
    {
        fullName: "rin shop",
        email: "rinshop@gmail.com",
        password: "rinshop@2024",
        phone: '0975224579',
        active: true,
        role: "admin",
    },
    {
        fullName: "Nguyễn Văn An",
        email: "an.nguyen@example.com",
        password: "password123",
        phone: '0975224571',
        active: true,
        role: "subAdmin",
    },
    {
        fullName: "Lê Thị Hoa",
        email: "hoa.le@example.com",
        password: "password123",
        phone: '0975224572',
        active: true,
        role: "user",
    },
    {
        fullName: "Phạm Quang Huy",
        email: "huy.pham@example.com",
        password: "password123",
        phone: '0975224573',
        active: true,
        role: "user",
    },
    {
        fullName: "Trần Minh Tâm",
        email: "tam.tran@example.com",
        password: "password123",
        phone: '0975224574',
        active: true,
        role: "user",
    },
    {
        fullName: "Đặng Thuý Vy",
        email: "vy.dang@example.com",
        password: "password123",
        phone: '0975224575',
        active: true,
        role: "user",
    },
    {
        fullName: "Hoàng Nam Phong",
        email: "phong.hoang@example.com",
        password: "password123",
        phone: '0975224576',
        active: true,
        role: "user",
    },
    {
        fullName: "Bùi Thị Lan",
        email: "lan.bui@example.com",
        password: "password123",
        phone: '0975224577',
        active: true,
        role: "user",
    },
    {
        fullName: "Trịnh Văn Khải",
        email: "khai.trinh@example.com",
        password: "password123",
        phone: '0975224578',
        active: true,
        role: "user",
    },
    {
        fullName: "Ngô Nhật Minh",
        email: "minh.ngo@example.com",
        password: "password123",
        phone: '0975224510',
        active: true,
        role: "user",
    },
    {
        fullName: "Vũ Hồng Nhung",
        email: "nhung.vu@example.com",
        password: "password123",
        phone: '0975224511',
        active: true,
        role: "user",
    }
];
const categories = [
    {
        category_name: "vegetables",
        description: "những loại rau, củ"
    },
    {
        category_name: "fruits",
        description: "Quả trái cây"
    },
    {
        category_name: "meat",
        description: "Thịt"
    },
    {
        category_name: "fish",
        description: "cá"
    }
];

const runDB = async ()=>{
    //============ staff =========== //
    //tạo mới 5 item ngẫu nhiên
    // for (let index = 1; index < 5; index++) {
    //     const staff = new Staff({
    //         first_name: faker.name.firstName(),
    //         last_name: faker.name.lastName(),
    //         phone: faker.phone.number(),
    //         email: faker.internet.email(),
    //         active: faker.datatype.boolean(),
    //         password: faker.internet.password(8, true, /[A-Z]/, 'Aa1!')
    //     });
    //     //Đến bước nó mới chính thức ghi xuống DB
    //     await staff.save();
    // }
    //============ category =========== //
    //  for (let index = 0; index < 10; index++) {
    //     const category = new Category({
    //         category_name: faker.commerce.department(),
    //         description: faker.lorem.sentence(),
    //         slug: faker.helpers.slugify(faker.commerce.department()),
    //     });
    //     await category.save();
    // }
    //============ brand =========== //
    // for (let index = 0; index < 10; index++) {
    //     const brand = new Brand({
    //         brand_name: faker.commerce.department(),
    //         description: faker.lorem.sentence(),
    //         slug: faker.helpers.slugify(faker.commerce.department()),
    //     });
    //     await brand.save();
    // }
    //============ product =========== //
    // for (let index = 0; index < 5; index++) {
    //     const product = new Product({
    //         product_name: faker.commerce.productName()+index,
    //         price: Math.floor(Math.random() * 1000), // Giá ngẫu nhiên từ 0 đến 999
    //         discount: Math.floor(Math.random() * 101), // Giảm giá ngẫu nhiên từ 0 đến 100
    //         category: '66dc4673a2cda03f0fff3867', 
    //         brand: '66dee67ae554e0673fac7628',
    //         description: faker.commerce.productDescription(),
    //         model_year: 2020 + (index % 5), // Năm mẫu từ 2020 đến 2022
    //         thumbnail: `http://example.com/image${index + 1}.jpg`,
    //         stock: Math.floor(Math.random() * 100), // Số lượng ngẫu nhiên từ 0 đến 99
    //         order: 50 + index, // Giá trị order tăng dần
    //         isBest: Math.random() < 0.5, // Ngẫu nhiên true hoặc false
    //         isNewProduct: Math.random() < 0.5,
    //         isShowHome: Math.random() < 0.5,
    //         isDelete: false // Ban đầu chưa xóa
    //     });
    //     await product.save();
    // }

    await Staff.insertMany(staffs);
    await Category.insertMany(categories);
}

  

try {
  runDB()
} catch (error) {
  console.log(error);
}