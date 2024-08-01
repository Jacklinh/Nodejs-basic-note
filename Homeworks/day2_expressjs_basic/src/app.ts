// const express = repuire('express')
// do ts đã dùng es6 nên sẽ dùng import thay repuire
import express, {Express, NextFunction, Request, Response} from 'express';
import path from 'path';
// Express, repuest, Response là kiểu typescript tương ứng với express, rep, res
const app: Express = express()
const port = 3000

// cấu hình kiểu tập tin template
app.engine('.html', require('ejs').__express);
// Cấu hình thư mục template views
app.set('views', path.join(__dirname, 'views'));
// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');


app.get('/', (req: Request, res: Response) => {
//   res.send('trang chủ')
  res.render('index') //Đang nhắm đến file views/index.html
})
// route get khớp với /users/1, /users/2, /users/1323, /users/17854
// :id chính là route prameter
// \d+: chứa 1 hoặc nhiều chữ số
app.get('/users/:id(\\d+)', (req: Request, res: Response)=>{
    // id = rep.params.id
    const {id} = req.params;
    res.send('user id is'+ id);
})
// route get khớp với /users/tuanhung1234, /users/124thienthan, /users/saytinh
// [a-zA-Z0-9]+:  chỉ chấp nhận 1 or nhiều chữ cái hoặc chữ số 
app.get('/users/:username([a-zA-Z0-9]+)', (req: Request, res: Response)=>{
    // id = rep.params.id
    const {username} = req.params;
    res.send('username page is '+ username);
})
// route get khớp với /article/iphone-15-pro-max-gia-re.html , /article/5-cong-thuc-thanh-cong-tu-chuyen-gia.html
// [a-zA-Z0-9-]+\.html$: chấp nhận 1 hoặc nhiều chữ cái , chữ số và kết thúc .html
app.get('/article/:slug([a-zA-Z0-9-]+\.html$)', (req: Request, res: Response)=>{
    // id = rep.params.id
    const {slug} = req.params;
    res.send('article detail page is '+ slug);
})

// page html about
app.get('/about', (req: Request, res: Response) => {
    res.render('about') 
})
// page html products
const listProduct = [
    {
        id: 1,
        name: 'Apple MacBook Pro 17',
        color: 'Silver',
        category: 'Laptop',
        price: '5.900.00đ'
    },
    {
        id: 2,
        name: 'Microsoft Surface Pro',
        color: 'White',
        category: 'Laptop PC',
        price: '7.900.00đ'
    },
    {
        id: 3,
        name: 'Magic Mouse 2',
        color: 'Silver',
        category: 'Accessories',
        price: '10.900.00đ'
    }
] 
app.get('/products', (req: Request, res: Response) => {   
    // res.status(200).json({
    //     data: listProduct
    // })
    res.render('products',{
        listProduct
    }) 
})
// page products detail với thông tin id tương ứng
app.get('/products/:id(\\d+)', (req: Request, res: Response) => {
    const {id} = req.params;  
    const product = listProduct.find(p => p.id === parseInt(id));
    if(!product){
        throw Error('product not found')
    }
    res.render('products_detail',{
        id,
        product
    }) 
})
// thêm sản phẩm mới
app.post('/products', (req: Request, res: Response) => {
    res.status(201).json({
        data: req.body
    })
})
// edit products
app.put('/products/:id(\\d+)', (req: Request, res: Response) => {
    try {
        const {id} = rep.params;
        const payload = rep.body;  
        const product = listProduct.find(p => p.id === parseInt(id));
        if(!product){
            throw Error('product not found')
        }
        const updateProduct = listProduct.map((p) => {
            if(p.id === parseInt(id)) {
                p.name = payload;
            }
            return p;
        })
        res.status(200).json({
            data: updateProduct
        })
    }catch(error){
        console.log(error)
    }
     
})
// xoá product
app.delete('/products/:id(\\d+)', (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const product = listProduct.find(p => p.id === parseInt(id));
        if(!product){
            throw Error('product not found')
        }
        const deleteProduct = listProduct.filter(p => p.id !== parseInt(id));
        console.log('deleteProduct',deleteProduct)
        res.status(200).json({
            data: deleteProduct
        })
    }catch(error){
        console.log(error)
    }
     
})
// truy cập image tĩnh 
// truy cập http://localhost:3000/images/images1.jpg
app.use(express.static(path.join(__dirname,'../public')));
// or thêm tiền tố ảo vào url
// truy cập http://localhost:3000/static/images/images1.jpg
app.use('/static',express.static(path.join(__dirname,'../public')));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})