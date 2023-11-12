# Cách sử dụng Github cơ bản

Trong phần này chúng ta sẽ lần lượt tìm hiểu các vấn đề sau:

> 🔸 Giới thiệu

> 🔸 Cài đặt Git

> 🔸 Cấu hình Git

> 🔸 Tạo Repository

> 🔸 Các lệnh cơ bản của Git

***

## 🔶 Giới thiệu
- Git là 1 hệ thống quản lý phiên bản phân tán( distributed version control system) được sử dụng rộng rãi trong quản lý mã nguồn dự án phần mềm
- Git cho phép nhiều người làm việc trên cùng 1 dự án không gây xung đột và dễ dàng hợp nhất(merge) các thay đổi
- Git lưu trữ dữ liệu dự án trong các repository, mỗi người có thể sao chép(clone) 1 repository và làm việc độc lập

Ex: 1 dự án chia ra các member coding các section khác nhau(ông A thì coding header, footer, ông B thì coding content ) , khi đó để tránh xung đột giữa các section này thì Git ra đời để giải quyết vấn đề này! lúc đó khi ta merge code thì sẽ ra 1 website hoàn chỉnh.

***

## 🔶 Cài đặt Git

- Kiểm tra xem máy tính đã cài Git chưa.
search windown "Git" nếu có Git CMD và sau đó nhập lệnh sau vào cửa sổ Git CMD 

```bash
git --version
hoặc 
git --v
```
Nếu thấy có nội dung: git version 2.42.0.windowns.2 thì git đã cài rồi

- Nếu chưa thì cài đặt như sau
B1: truy cập trang chủ git (https://git-scm.com/download) và tải xuống phiên bản phù hợp với hệ điều hành của bạn
B2. Cài đặt Git theo hướng dẫn trên trang web

***

## 🔶 Cấu hình Git

sau khi cài git xong , chúng ta tiếp tục cấu hình git như sau:
- B1: truy cập trang Github (https://github.com) tạo 1 tài khoản ( nếu chưa có tài khoản)
- B2: mở cmd hoặc Git CMD, cấu hình theo lệnh sau và thay đổi username và email của bạn đã đăng ký tài khoản Github

```bash
git config --global user.name "User Name"
git config --global user.email "username@gmail.com"
```
sau khi cấu hình xong ta có thể kiểm tra lại xem cấu hình đúng chưa? nếu nó ra như những gì bạn cấu hình là ok
```bash
git config --global user.name
git config --global user.email
```
***

## 🔶 Tạo repository

- Đăng nhập Github => click nào nút "New repository" (kho chứa) => đặt tên cho repository => click vào nút "create repository"
- nên đặt name repository trùng với name dự án trên máy tính của bạn
- lúc đó Git sẽ sinh ra cho bạn 1 đoạn hướng dẫn "Quick setup", bạn khoan tắt mà hãy copy hoặc để nguyên trình duyệt, để chúng ta sử dụng lệnh cho dự án
- trên máy tình tạo folder trùng name với name repository, click chuột phải chọn Git base here
- đánh lệnh `git init`, khi đó sẽ tạo cho bạn 1 folder .git( ở dưới dạng ẩn), để show bạn chọn (view -> option -> view -> chọn show hidden files, folders, and drives)


## 🔶 Các lệnh cơ bản của Git

- `git init` : bạn đang tạo ra 1 repository local trên máy tính cá nhân! còn repository tạo trên github là repository đám mây
- `git add <file>`