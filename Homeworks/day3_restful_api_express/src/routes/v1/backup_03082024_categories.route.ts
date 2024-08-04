import express, {Request, Response, NextFunction} from 'express'
import createError from 'http-errors';
const router = express.Router();

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
// Get all categories
//GET localhost:8080/api/v1/categories
router.get('/categories', (req: Request, res: Response) => {
  res.status(200).json({
    data: cates
  });
});
// Get a single category
//GET localhost:8080/api/v1/categories/1
router.get('/categories/:id(\\d+)',(req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;
    const category = cates.find(c=> c.id === parseInt(id));
    if(!category) {
      throw createError(400,'categories not found')
    }
    res.status(200).json({
      data: category
    })
  }catch(error) {
    next(error)
  }
})
// post create-a-category
// POST localhost:8080/api/v1/categories/
router.post('/categories', (req: Request, res: Response)=>{
  res.status(201).json({
    data: req.body
  })
})
// Update a category
// PUT localhost:8080/api/v1/categories/2
router.put('/categories/:id(\\d+)',(req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;
    const payload = req.body;
    // kiểm tra sự tồn tại của danh mục
    const category = cates.find(c=> c.id === parseInt(id));
    if(!category) {
      throw createError(400,'categories not found')
    }
    // update 
    const newCategory = cates.map(c => {
      if(c.id === parseInt(id)){
        c.name = payload.name
      }
      return c;
    })
    res.status(200).json({
      data: newCategory
    })
  }catch(error) {
    next(error)
  }
})
// Delete a category
// DELETED localhost:8080/api/v1/categories/2
router.delete('/categories/:id(\\d+)',(req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params;
    // 1 kiểm tra id tồn tại
    const category = cates.find(c=> c.id === parseInt(id));
    if(!category) {
      throw createError(400,'categories not found')
    }
    // 2 nếu tồn tại xoá 
    const newCategory = cates.filter(c => c.id !== parseInt(id));
    console.log('category delete', newCategory)
    // return 
    res.status(200).json({
      data: cates
    })
  }catch(error) {
    next(error)
  }
})
export default router;