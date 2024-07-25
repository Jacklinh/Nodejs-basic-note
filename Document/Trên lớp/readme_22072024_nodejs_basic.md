# Note nodejs basic 22/07/2024

## nguồn gốc ra đời nodejs
- khi trình duyệt chrome ra đời, thì 
- Node k phải là ngôn ngữ mới . nó là môi trường thực thi mã javasript trên môi trường server
- nó xử lý đồng thời các request khi thực hiện. chứ k phải đợi như php thường
- đặc biết nó xây dựng các cảm biến phản hồi tức thời

## event loop 
- nó còn gọi là trung tâm xử lý của nodejs

## các ngôn ngữ có thể phát triển tương tư như nodejs
php, net, java, python, ruby

## ôn tập lại kiến thức
1. Typescript
- b1: chạy lệnh yarn  init -y ( nó sẽ tạo 1 file packge.json)
- b2: yarn add typescript --D or yarn add typescript --save-dev
- b3: npx tsc --init ( sẽ tạo ra file tsconfig.json )

* khi chạy thì phải biên dịch từ typescipt sang javascript
- chạy lệnh: npx tsc ( để biên dịch)
- xong chạy file như javascript: node index.ts
2. Javascript
- chạy file javascript trong nodejs: node index.js
## node module thường dùng

1. event

2. file
- đặc điểm của writeFile là ghi đè nội dung cũ.
- làm sao để bổ sung mà k phải ghi đề thì ta sử dụng append để nối vào
- extname: trả về phần mở rộng của tập tin (vd .js)4

3. url
- basename: trả về tên và đuôi của tập tin. nhằm mục đích update tên tập tin đã có
4. path

ngoài những module nodejs cho phép tạo ra các module riêng , có 2 loại
1: common js module
2. ecmascript module
## Thuật ngữ
-createServer: tạo ra 1 server ảo ở local
- fs: viết tắt của File System trong module của nodejs 
- w: write
- \n: xuống dòng mới

