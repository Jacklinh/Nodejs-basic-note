import { globalConfig } from "../../constants/configs"
// import mongoose
import mongoose from "mongoose";
// import  model
import Category from "../../models/categories.model";
import Brand from "../../models/brands.model";
import Customer from "../../models/customers.model";
import Staff from "../../models/staffs.model";
import Product from "../../models/products.model";
import Order from "../../models/orders.model";
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
// tạo nhiều document 
const categories = [
    {
      "category_name": "Road",
      "description": "Bicycles designed for paved roads",
      "slug": "road"
    },
    {
      "category_name": "Mountain",
      "description": "Off-road and trail bicycles",
      "slug": "mountain"
    },
    {
      "category_name": "Hybrid",
      "description": "Versatile bikes for various terrains",
      "slug": "hybrid"
    },
    {
      "category_name": "Cruiser",
      "description": "Comfortable and stylish bikes for leisurely rides",
      "slug": "cruiser"
    },
    {
      "category_name": "Electric",
      "description": "Bicycles powered by electric motors",
      "slug": "electric"
    }
]
const brands = [
  {
    "brand_name": "Trek",
    "description": "High-quality bikes for all terrains",
    "slug": "trek"
  },
  {
    "brand_name": "Giant",
    "description": "Specializing in road and mountain bikes",
    "slug": "giant"
  },
  {
    "brand_name": "Specialized",
    "description": "Innovative designs for cycling enthusiasts",
    "slug": "specialized"
  },
  {
    "brand_name": "Cannondale",
    "description": "Known for its performance-oriented bicycles",
    "slug": "cannondale"
  },
  {
    "brand_name": "Scott",
    "description": "Offers a wide range of bicycles for various purposes",
    "slug": "scott"
  }
]
const customers = [
  {
    "first_name": "John",
    "last_name": "Doe",
    "phone": "123-456-7890",
    "email": "john.doe@example.com",
    "birthday": "1990-05-15",
    "street": "123 Main St",
    "city": "Anytown",
    "state": "CA",
    "zip_code": "12345"
  },
  {
    "first_name": "Jane",
    "last_name": "Smith",
    "phone": "456-189-0123",
    "email": "jane.smith@example.com",
    "birthday": "1985-08-20",
    "street": "456 Elm St",
    "city": "Othertown",
    "state": "NY",
    "zip_code": "67890"
  },
  {
    "first_name": "Michael",
    "last_name": "Johnson",
    "phone": "789-112-3456",
    "email": "michael.johnson@example.com",
    "birthday": "1978-12-25",
    "street": "789 Oak St",
    "city": "Anycity",
    "state": "TX",
    "zip_code": "23456"
  },
  {
    "first_name": "Emily",
    "last_name": "Brown",
    "phone": "012-345-6789",
    "email": "emily.brown@example.com",
    "birthday": "1995-03-10",
    "street": "901 Pine St",
    "city": "Sometown",
    "state": "FL",
    "zip_code": "78901"
  },
  {
    "first_name": "William",
    "last_name": "Martinez",
    "phone": "234-567-8901",
    "email": "william.martinez@example.com",
    "birthday": "1980-11-05",
    "street": "345 Cedar St",
    "city": "Othertown",
    "state": "CA",
    "zip_code": "56789"
  },
  {
    "first_name": "Olivia",
    "last_name": "Garcia",
    "phone": "667-890-1234",
    "email": "olivia.garcia@example.com",
    "birthday": "1992-07-30",
    "street": "678 Maple St",
    "city": "Anycity",
    "state": "NY",
    "zip_code": "01234"
  },
  {
    "first_name": "James",
    "last_name": "Lopez",
    "phone": "890-123-4567",
    "email": "james.lopez@example.com",
    "birthday": "1987-09-18",
    "street": "890 Birch St",
    "city": "Sometown",
    "state": "TX",
    "zip_code": "34567"
  },
  {
    "first_name": "Sophia",
    "last_name": "Lee",
    "phone": "123-456-7880",
    "email": "sophia.lee@example.com",
    "birthday": "1983-04-22",
    "street": "234 Oak St",
    "city": "Othertown",
    "state": "FL",
    "zip_code": "89012"
  },
  {
    "first_name": "Benjamin",
    "last_name": "Wang",
    "phone": "456-289-0123",
    "email": "benjamin.wang@example.com",
    "birthday": "1975-01-12",
    "street": "567 Pine St",
    "city": "Anycity",
    "state": "CA",
    "zip_code": "23456"
  },
  {
    "first_name": "Mia",
    "last_name": "Kim",
    "phone": "789-212-3456",
    "email": "mia.kim@example.com",
    "birthday": "1998-06-28",
    "street": "890 Elm St",
    "city": "Sometown",
    "state": "NY",
    "zip_code": "56789"
  },
  {
    "first_name": "Ethan",
    "last_name": "Nguyen",
    "phone": "112-345-6789",
    "email": "ethan.nguyen@example.com",
    "birthday": "1989-02-14",
    "street": "901 Maple St",
    "city": "Othertown",
    "state": "TX",
    "zip_code": "78901"
  },
  {
    "first_name": "Isabella",
    "last_name": "Patel",
    "phone": "234-567-8902",
    "email": "isabella.patel@example.com",
    "birthday": "1993-10-08",
    "street": "123 Cedar St",
    "city": "Anycity",
    "state": "FL",
    "zip_code": "01234"
  },
  {
    "first_name": "Aiden",
    "last_name": "Gonzalez",
    "phone": "567-890-1234",
    "email": "aiden.gonzalez@example.com",
    "birthday": "1982-12-03",
    "street": "456 Oak St",
    "city": "Sometown",
    "state": "CA",
    "zip_code": "34567"
  },
  {
    "first_name": "Amelia",
    "last_name": "Chen",
    "phone": "990-123-4567",
    "email": "amelia.chen@example.com",
    "birthday": "1996-04-16",
    "street": "789 Pine St",
    "city": "Othertown",
    "state": "NY",
    "zip_code": "89012"
  },
  {
    "first_name": "Oliver",
    "last_name": "Santos",
    "phone": "123-456-7790",
    "email": "oliver.santos@example.com",
    "birthday": "1979-08-25",
    "street": "234 Elm St",
    "city": "Anycity",
    "state": "TX",
    "zip_code": "23456"
  },
  {
    "first_name": "Charlotte",
    "last_name": "Reyes",
    "phone": "456-389-0123",
    "email": "charlotte.reyes@example.com",
    "birthday": "1991-05-19",
    "street": "567 Maple St",
    "city": "Sometown",
    "state": "FL",
    "zip_code": "56789"
  },
  {
    "first_name": "Elijah",
    "last_name": "Wong",
    "phone": "789-312-3456",
    "email": "elijah.wong@example.com",
    "birthday": "1986-02-09",
    "street": "890 Cedar St",
    "city": "Othertown",
    "state": "CA",
    "zip_code": "01234"
  }
]
const staffs = [
  {
    "first_name": "John",
    "last_name": "Doe",
    "phone": "123-456-7690",
    "email": "john.doe@example.com",
    "active": false
  },
  {
    "first_name": "Jane",
    "last_name": "Smith",
    "phone": "456-489-0123",
    "email": "jane.smith@example.com",
    "active": false
  },
  {
    "first_name": "Michael",
    "last_name": "Johnson",
    "phone": "789-412-3456",
    "email": "michael.johnson@example.com",
    "active": true
  },
  {
    "first_name": "Emily",
    "last_name": "Brown",
    "phone": "212-345-6789",
    "email": "emily.brown@example.com",
    "active": false
  },
  {
    "first_name": "William",
    "last_name": "Martinez",
    "phone": "334-567-8901",
    "email": "william.martinez@example.com",
    "active": false
  }
]
const runDB = async ()=>{
    // // tạo mới 1 document
    // const category = new Category({
    //     category_name: "Road",
    //     description: "Bicycles designed for paved roads",
    //     slug: "road"
    // })
    // // đến bước này nó mới lưu vào database có sẵn trên mongodb
    // await category.save();
    // tạo nhiều document 
    const savedCategories = await Category.insertMany(categories);
    const randomIdCategory = await savedCategories[Math.floor(Math.random() * savedCategories.length)];
    const savedBrands = await Brand.insertMany(brands);
    const randomIdBrand = await savedBrands[Math.floor(Math.random() * savedBrands.length)];
    const savedCustomers =  await Customer.insertMany(customers);
    const randomIdCustomer = await savedCustomers[Math.floor(Math.random() * savedCustomers.length)];
    const savedStaffs = await Staff.insertMany(staffs);
    const randomIdStaff = await savedStaffs[Math.floor(Math.random() * savedStaffs.length)]
    const products = [
      {
        "product_name": "Road Bike",
        "price": 500,
        "discount": 0,
        "description": "Road bike for paved roads",
        "model_year": 2022,
        "category": randomIdCategory._id,
        "brand": randomIdBrand._id,
        "isBest": false,
        "isNewProduct": false,
        "isShowHome": false,
        "isDelete": false,
      },
      {
        "product_name": "Mountain Bike",
        "price": 600,
        "discount": 0,
        "description": "Off-road and trail bike",
        "model_year": 2022,
        "category": randomIdCategory._id,
        "brand": randomIdBrand._id,
        "isBest": false,
        "isNewProduct": false,
        "isShowHome": false,
        "isDelete": false
      },
      {
        "product_name": "Hybrid Bike",
        "price": 450,
        "discount": 0,
        "description": "Versatile bike for various terrains",
        "model_year": 2022,
        "category": randomIdCategory._id,
        "brand": randomIdBrand._id,
        "isBest": false,
        "isNewProduct": false,
        "isShowHome": false,
        "isDelete": false
      },
      {
        "product_name": "Cruiser Bike",
        "price": 400,
        "discount": 0,
        "description": "Comfortable and stylish bike for leisurely rides",
        "model_year": 2022,
        "category": randomIdCategory._id,
        "brand": randomIdBrand._id,
        "isBest": false,
        "isNewProduct": false,
        "isShowHome": false,
        "isDelete": false
      },
      {
        "product_name": "Electric Bike",
        "price": 800,
        "discount": 0,
        "description": "Electric bike powered by electric motor",
        "model_year": 2022,
        "category": randomIdCategory._id,
        "brand": randomIdBrand._id,
        "isBest": false,
        "isNewProduct": false,
        "isShowHome": false,
        "isDelete": false
      },
      {
        "product_name": "Road Bike Pro",
        "price": 1200,
        "discount": 50,
        "description": "Professional road bike for paved roads",
        "model_year": 2022,
        "category": randomIdCategory._id,
        "brand": randomIdBrand._id,
        "isBest": false,
        "isNewProduct": false,
        "isShowHome": false,
        "isDelete": false
      },
      {
        "product_name": "Mountain Bike Pro",
        "price": 1500,
        "discount": 50,
        "description": "Professional off-road and trail bike",
        "model_year": 2022,
        "category": randomIdCategory._id,
        "brand": randomIdBrand._id,
        "isBest": false,
        "isNewProduct": false,
        "isShowHome": false,
        "isDelete": false
      },
      {
        "product_name": "Hybrid Bike Pro",
        "price": 1000,
        "discount": 50,
        "description": "Professional versatile bike for various terrains",
        "model_year": 2022,
        "category": randomIdCategory._id,
        "brand": randomIdBrand._id,
        "isBest": false,
        "isNewProduct": false,
        "isShowHome": false,
        "isDelete": false
      },
      {
        "product_name": "Cruiser Bike Pro",
        "price": 900,
        "discount": 70,
        "description": "Professional comfortable and stylish bike",
        "model_year": 2022,
        "category": randomIdCategory._id,
        "brand": randomIdBrand._id,
        "isBest": false,
        "isNewProduct": false,
        "isShowHome": false,
        "isDelete": false
      },
      {
        "product_name": "Electric Bike Pro",
        "price": 1800,
        "discount": 50,
        "description": "Professional electric bike powered by electric motor",
        "model_year": 2022,
        "category": randomIdCategory._id,
        "brand": randomIdBrand._id
      },
      {
        "product_name": "Road Bike XL",
        "price": 700,
        "discount": 0,
        "description": "Extra large road bike for paved roads",
        "model_year": 2022,
        "category": randomIdCategory._id,
        "brand": randomIdBrand._id,
        "isBest": false,
        "isNewProduct": false,
        "isShowHome": false,
        "isDelete": false
      },
      {
        "product_name": "Mountain Bike XL",
        "price": 800,
        "discount": 0,
        "description": "Extra large off-road and trail bike",
        "model_year": 2022,
        "category": randomIdCategory._id,
        "brand": randomIdBrand._id,
        "isBest": false,
        "isNewProduct": false,
        "isShowHome": false,
        "isDelete": false
      },
      {
        "product_name": "Hybrid Bike XL",
        "price": 600,
        "discount": 0,
        "description": "Extra large versatile bike for various terrains",
        "model_year": 2022,
        "category": randomIdCategory._id,
        "brand": randomIdBrand._id,
        "isBest": false,
        "isNewProduct": false,
        "isShowHome": false,
        "isDelete": false
      },
      {
        "product_name": "Cruiser Bike XL",
        "price": 550,
        "discount": 0,
        "description": "Extra large comfortable and stylish bike",
        "model_year": 2022,
        "category": randomIdCategory._id,
        "brand": randomIdBrand._id,
        "isBest": false,
        "isNewProduct": false,
        "isShowHome": false,
        "isDelete": false
      },
      {
        "product_name": "Electric Bike XL",
        "price": 1000,
        "discount": 0,
        "description": "Extra large electric bike powered by electric motor",
        "model_year": 2022,
        "category": randomIdCategory._id,
        "brand": randomIdBrand._id,
        "isBest": false,
        "isNewProduct": false,
        "isShowHome": false,
        "isDelete": false
      }
    ]
    const savedProducts = await Product.insertMany(products);
    const randomIdProduct = await savedProducts[Math.floor(Math.random() * savedProducts.length)]
    const orders = [
      {
        "customer": randomIdCustomer._id,
        "staff": randomIdStaff._id,
        "order_item": randomIdProduct._id,
        "order_status": 2,
        "order_date": "2023-06-15T12:34:56.789Z",
        "require_date": "2023-06-20T00:00:00.000Z",
        "shipping_date": "2023-06-18T00:00:00.000Z",
        "order_note": "Giao hàng cẩn thận",
        "street": "123 Đường Abc",
        "city": "Hà Nội",
        "state": "Hà Nội",
        "payment_type": 2,
      },
      {
        "customer": randomIdCustomer._id,
        "staff": randomIdStaff._id,
        "order_item": randomIdProduct._id,
        "order_status": 1,
        "order_date": "2023-07-20T09:12:34.567Z",
        "require_date": null,
        "shipping_date": null,
        "order_note": "Giao hàng trước 5pm",
        "street": "456 Đường Xyz",
        "city": "Hồ Chí Minh",
        "state": "Hồ Chí Minh",
        "payment_type": 1
      },
      {
        "customer": randomIdCustomer._id,
        "staff": randomIdStaff._id,
        "order_item": randomIdProduct._id,
        "order_status": 3,
        "order_date": "2023-08-01T15:45:23.901Z",
        "require_date": "2023-08-05T00:00:00.000Z",
        "shipping_date": null,
        "order_note": "Giao hàng vào cuối tuần",
        "street": "789 Đường Pqr",
        "city": "Đà Nẵng",
        "state": "Đà Nẵng",
        "payment_type": 3
      },
      {
        "customer": randomIdCustomer._id,
        "staff": randomIdStaff._id,
        "order_item": randomIdProduct._id,
        "order_status": 4,
        "order_date": "2023-07-10T18:22:44.678Z",
        "require_date": "2023-07-15T00:00:00.000Z",
        "shipping_date": "2023-07-12T00:00:00.000Z",
        "order_note": "Giao hàng cẩn thận, không để vỡ",
        "street": "987 Đường Stu",
        "city": "Cần Thơ",
        "state": "Cần Thơ",
        "payment_type": 4
      },
      {
        "customer": randomIdCustomer._id,
        "staff": randomIdStaff._id,
        "order_item": randomIdProduct._id,
        "order_status": 2,
        "order_date": "2023-09-01T11:00:00.000Z",
        "require_date": "2023-09-05T00:00:00.000Z",
        "shipping_date": "2023-09-03T00:00:00.000Z",
        "order_note": "Giao hàng trước 3pm",
        "street": "654 Đường Vwx",
        "city": "Đà Lạt",
        "state": "Lâm Đồng",
        "payment_type": 2
      }
    ];
    await Order.insertMany(orders);
}

try {
    runDB()
}catch(error) {
    console.log(error);
}