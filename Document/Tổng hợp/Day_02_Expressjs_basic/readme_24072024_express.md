# ExpressJs Framwork

## 1.ExpressJs Framework

- ExpressJs là 1 framework ứng dụng web có mã nguồn mỡ và miễn phí được xây dựng dựa trên nền tảng Nodejs.
- ExpressJs được sử dụng để thiết kế và phát triển các ứng dụng web 1 cách nhanh chóng
- Framwork là nói đến nó có thể vừa đảm nhận vai trò làm client vừa làm server được.

### Cài đặt

#### B1 - khởi tạo dự án
```bash
npm init or yarn init -y 
```
để tạo file package.json

#### B2 - tích hợp ExpressJs
```bash
npm install expres --save or yarn add express
```
với typescipt thì cài thêm
```bash
npm i -D typescript  @types/express @types/node ts-node-dev
#or
yarn add -D typescript  @types/express @types/node ts-node-dev
```

#### Bước 3 - Cấu hình Typescript

Tạo file tsconfig.json

```bash
npx tsc --init
```
Sau đó mở file tsconfig.json và tìm sửa lại những thông tin sau:

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "outDir": "dist/",
    "strict": true,
    "sourceMap": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}

```
#### Bước 4 - Tạo ứng dụng
