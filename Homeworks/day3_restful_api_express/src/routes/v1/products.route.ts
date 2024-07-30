import express, {Request, Response, NextFunction} from 'express'
import createError from 'http-errors';
const router = express.Router();

// dữ liệu đầu vào
const products = [
    {
        "id": 1,
        "title": "Updated Title",
        "price": 100,
        "description": "Stay cozy and stylish with our Classic Heather Gray Hoodie. Crafted from soft, durable fabric, it features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs. Perfect for a casual day out or a relaxing evening in, this hoodie is a versatile addition to any wardrobe.",
    },
    {
        "id": 2,
        "title": "Classic Grey Hooded Sweatshirt",
        "price": 90,
        "description": "Elevate your casual wear with our Classic Grey Hooded Sweatshirt. Made from a soft cotton blend, this hoodie features a front kangaroo pocket, an adjustable drawstring hood, and ribbed cuffs for a snug fit. Perfect for those chilly evenings or lazy weekends, it pairs effortlessly with your favorite jeans or joggers.",
    },
    {
        "id": 3,
        "title": "Classic Black Hooded Sweatshirt",
        "price": 79,
        "description": "Elevate your casual wardrobe with our Classic Black Hooded Sweatshirt. Made from high-quality, soft fabric that ensures comfort and durability, this hoodie features a spacious kangaroo pocket and an adjustable drawstring hood. Its versatile design makes it perfect for a relaxed day at home or a casual outing.",
    }
]
// Get all products
//GET localhost:8080/api/v1/products
router.get('/products', (req: Request, res: Response) => {
  res.status(200).json({
    data: products
  });
});
// Get a single products
//GET localhost:8080/api/v1/products/1
router.get('/products/:id(\\d+)',(req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;
    const product = products.find(p=> p.id === parseInt(id));
    if(!product) {
      throw createError(400,'products not found')
    }
    res.status(200).json({
      data: product
    })
  }catch(error) {
    next(error)
  }
})
// post create-a-products
// POST localhost:8080/api/v1/products/
router.post('/products', (req: Request, res: Response)=>{
  res.status(201).json({
    data: req.body
  })
})
// Update a products
// PUT localhost:8080/api/v1/products/2
router.put('/products/:id(\\d+)',(req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;
    const payload = req.body;
    // kiểm tra sự tồn tại 
    const product = products.find(c=> c.id === parseInt(id));
    if(!product) {
      throw createError(400,'products not found')
    }
    // update 
    const newProduct = products.map(p => {
      if(p.id === parseInt(id)){
        p.title = payload.title
      }
      return p;
    })
    res.status(200).json({
      data: newProduct
    })
  }catch(error) {
    next(error)
  }
})
// Delete a products
// DELETED localhost:8080/api/v1/products/2
router.delete('/products/:id(\\d+)',(req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;
    // 1 kiểm tra id tồn tại
    const product = products.find(p=> p.id === parseInt(id));
    if(!product) {
      throw createError(400,'product not found')
    }
    // 2 nếu tồn tại xoá 
    const newProduct = products.filter(p => p.id !== parseInt(id));
    console.log('products delete', newProduct)
    // return 
    res.status(200).json({
      data: products
    })
  }catch(error) {
    next(error)
  }
})
export default router;