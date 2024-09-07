//File này dùng để tạo dữ liệu cho database
import mongoose from 'mongoose'
import {globalConfig} from '../../constants/configs'
import { faker } from '@faker-js/faker';
import Staff from '../../models/staffs.model';
import Category from '../../models/categories.model';

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
     for (let index = 0; index < 10; index++) {
        const category = new Category({
            category_name: faker.commerce.department(),
            description: faker.lorem.sentence(),
            slug: faker.helpers.slugify(faker.commerce.department()),
        });
        await category.save();
    }
}

  

try {
  runDB()
} catch (error) {
  console.log(error);
}