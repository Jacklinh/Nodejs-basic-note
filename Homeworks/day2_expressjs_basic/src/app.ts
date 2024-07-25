// const express = require('express')
// do ts đã dùng es6 nên sẽ dùng import thay require
import express, {Express, Request, Response} from 'express';
import path from 'path';
// Express, Request, Response là kiểu typescript tương ứng với express, req, res
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
    // id = req.params.id
    const {id} = req.params;
    res.send('user id is'+ id);
})
// route get khớp với /users/tuanhung1234, /users/124thienthan, /users/saytinh
// [a-zA-Z0-9]+:  chỉ chấp nhận 1 or nhiều chữ cái hoặc chữ số 
app.get('/users/:username([a-zA-Z0-9]+)', (req: Request, res: Response)=>{
    // id = req.params.id
    const {username} = req.params;
    res.send('username page is '+ username);
})
// route get khớp với /article/iphone-15-pro-max-gia-re.html , /article/5-cong-thuc-thanh-cong-tu-chuyen-gia.html
// [a-zA-Z0-9-]+\.html$: chấp nhận 1 hoặc nhiều chữ cái , chữ số và kết thúc .html
app.get('/article/:slug([a-zA-Z0-9-]+\.html$)', (req: Request, res: Response)=>{
    // id = req.params.id
    const {slug} = req.params;
    res.send('article detail page is '+ slug);
})

// page html about
app.get('/about', (req: Request, res: Response) => {
    res.render('about') 
})
// page html products
app.get('/products', (req: Request, res: Response) => {
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
        
    res.render('products',{
        listProduct
    }) 
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})