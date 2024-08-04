import express, {Request, Response, NextFunction} from 'express'
import createError from 'http-errors';
const router = express.Router();

const brands = [
    {
      "id": 1,
      "name": "Apple",
      "category": "Technology",
      "founded": 1976,
      "headquarters": "Cupertino, California, USA"
    },
    {
      "id": 2,
      "name": "Nike",
      "category": "Apparel",
      "founded": 1964,
      "headquarters": "Beaverton, Oregon, USA"
    },
    {
      "id": 3,
      "name": "Coca-Cola",
      "category": "Beverage",
      "founded": 1892,
      "headquarters": "Atlanta, Georgia, USA"
    },
    {
      "id": 4,
      "name": "Samsung",
      "category": "Technology",
      "founded": 1938,
      "headquarters": "Suwon, South Korea"
    },
    {
      "id": 5,
      "name": "Gucci",
      "category": "Luxury",
      "founded": 1921,
      "headquarters": "Florence, Italy"
    },
    {
      "id": 6,
      "name": "Starbucks",
      "category": "Food & Beverage",
      "founded": 1971,
      "headquarters": "Seattle, Washington, USA"
    },
    {
      "id": 7,
      "name": "Adidas",
      "category": "Apparel",
      "founded": 1949,
      "headquarters": "Herzogenaurach, Germany"
    },
    {
      "id": 8,
      "name": "Amazon",
      "category": "E-commerce",
      "founded": 1994,
      "headquarters": "Seattle, Washington, USA"
    },
    {
      "id": 9,
      "name": "Rolex",
      "category": "Luxury",
      "founded": 1905,
      "headquarters": "Geneva, Switzerland"
    },
    {
      "id": 10,
      "name": "Pepsi",
      "category": "Beverage",
      "founded": 1898,
      "headquarters": "Purchase, New York, USA"
    }
]

// Get all categories
//GET localhost:8080/api/v1/brands
router.get('/brands', (req: Request, res: Response) => {
    res.status(200).json({
        data: brands
    });
});
// Get a single brand
//GET localhost:8080/api/v1/brands/1
router.get('/brands/:id(\\d+)',(req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      const brand = brands.find(b=> b.id === parseInt(id));
      if(!brand) {
        throw createError(400,'categories not found')
      }
      res.status(200).json({
        data: brand
      })
    }catch(error) {
      next(error)
    }
})
// post create-a-brand
// POST localhost:8080/api/v1/brands/
router.post('/brands', (req: Request, res: Response)=>{
    res.status(201).json({
        data: req.body
    })
})
// Update a brand
// PUT localhost:8080/api/v1/categories/2
router.put('/brands/:id(\\d+)',(req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params;
      const payload = req.body;
      // kiểm tra sự tồn tại 
      const brand = brands.find(b=> b.id === parseInt(id));
      if(!brand) {
        throw createError(400,'brands not found')
      }
      // update 
      const newBrand = brands.map(b => {
        if(b.id === parseInt(id)){
            b.name = payload.name
        }
        return b;
      })
      res.status(200).json({
        data: newBrand
      })
    }catch(error) {
      next(error)
    }
})
// Delete a brand
// DELETED localhost:8080/api/v1/brands/2
router.delete('/brands/:id(\\d+)',(req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        // 1 kiểm tra id tồn tại
        const brand = brands.find(b=> b.id === parseInt(id));
        if(!brand) {
        throw createError(400,'brands not found')
        }
        // 2 nếu tồn tại xoá 
        const newBrand = brands.filter(b => b.id !== parseInt(id));
        console.log('brand delete', newBrand)
        // return 
        res.status(200).json({
            data: brands
        })
    }catch(error) {
        next(error)
    }
})
export default router