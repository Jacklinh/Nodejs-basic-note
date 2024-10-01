# Hướng dẫn Làm Website bán hàng

## Giao diện EndUser (cho khách dùng)

Nhìn chung các website bán hàng thì cần có những pages sau:

### 1 - Trang chủ

Thông thường trên trang này hay để:

1. Banner carousel

```js
//Model Ads/banners
{
    _id: '',
    title: 'tên chiến dịch quảng cáo',
    link: 'link khi bạn click vào hình',
    image: 'link hình ảnh quảng cáo',
    isActive: true, //ẩn và hiện banner
    startDate: '', //ngày bắt đầu chiến dịch,
    endDate: '', //ngày kết thúc chiến dịch.
}
```

1. Danh sách sản phẩm khuyến mãi (nếu có)

- Nó phải có giá KM
- Phát sinh các trường: gifts (quà tặng), startDate, endDate

1. Danh sách sản phẩm bán chạy (nếu có)

- Tạo cho product 1 trường: `isBest`, khi `isBest = true` ==> bán chạy

1. Khoảng 5 - 10 sản phẩm cho từng danh mục mà bạn muốn đưa ra trang chủ.

- Thêm trường `isHome` --> để đưa ra trang chủ.

1. 5 tin tức mới nỗi bật (nếu có): Tạo thêm collection `posts`

```js
{
_id:1,
title: 'ten bai viet',
slug: 'url-bai-viet',
shortDest: 'mô tả ngắn nội dung tin',
content: 'Bài viết đầy đủ nội dung tin',
thumbnail: 'link hình đại diện bài viết',
createdAt: 'ngày tạo',
updatedAt: 'ngày sửa',
isPublish: true, //false, chế độ công khai hoặc ẩn
isDelete: false, //soft delete
isHot: true, // Đánh dấu bài viết nổi bật
}
```

### 2 - Danh sách sản phẩm của một danh mục

- Danh sách sản phẩm thuộc 1 danh mục theo `slug` hoặc `id`
- Bộ lọc các options (nếu làm được)
- Sắp xếp: giá tằng dầm, giảm dần
- Phân trang
- Banner riêng cho từng danh mục (nếu có)
- Bài viết mô tả cho từng danh mục (nếu có)

### 3 - Chi tiết sản phẩm

- Gallery hình sản phẩm theo màu, góc độ: Thêm trường:

```js
photos: [
  {
    _id: "",
    title: "nội dung cho alt",
    link: "link hình",
    sort: 1, //số thự sắp xếp
  },
];
```

- Thêm trường thông số sản phẩm:

```js
params: [
  {
    id: "",
    label: "Loại bìa",
    value: "Bìa mềm",
  },
  {
    id: "",
    label: "RAM",
    value: "16GB",
  },
];
```

- Các options (biến thể): Ví dụ: Iphone 16 có 1 tùy chọn: bộ nhớ 128GB và 320GB. Nếu làm được. (Tham khảo: https://github.com/nhannn87dn/Learning-Build-Project-Softech/tree/main/2.Templates/Product-Model)

- Sản phẩm liên quan (nếu có)
- Phụ kiện liên quan (nếu có)
- Tin tức liên quan (nếu có)

### 4 - Giỏ hàng

- Hiển thị danh sách sản đã thêm vào giỏ hàng

### 5 - Checkout

- Hiển thị danh sách sản đã thêm vào giỏ hàng
- Form để điền thông tin người mua
- Phương thức thanh toán
- Có nút Đặt hàng (đơn sẽ vào orders)

### 6 - Checkout Success

- Hiển thị thông tin khi đặt hàng thành công

### 7 - Liên hệ (Tùy chọn)

Form liên hệ

### 8 - Danh mục tin (Tùy chọn)

Danh sách tin tức theo danh mục

### 9 - Chi tiết tin (Tùy chọn)

- Chi tiết 1 tin tức

### 10 - Các trang hay để dưới chân trang

- Chính sách bảo hành, đổi trả
- Điều khoản người dùng
- ...

## Giao diện Admin

Giao để quản trị.

Ứng với từng phần tính năng bên EndUser thì cần trang quản trị tương ứng

https://techzaa.getappui.com/larkon/admin/orders-list.html

### 1 - Quản lý sản phẩm

- Danh sách phân trang
- Có bộ lọc: lọc theo danh mục, thương hiệu, bán chạy, hết hàng, tìm theo tên sản phẩm...
- Phần thêm SP: Có tính ăng Upload hình

### 2 - Quản lý danh mục sản phẩm

- Danh sách phân trang

### 3 - Quản lý khách hàng (Customers)

- Danh sách phân trang
- Có bộ lọc: tìm theo tên, số ĐT, email...

### 4 - Quản lý Đơn hàng

- Danh sách phân trang. Sắp xếp đơn theo ngày tạo (createdAt) giảm dần.
- Có bộ lọc: tìm theo tên, số ĐT, email, trạng thái thanh toán, trạng thái giao hàng, phương thanh toán...

### 5 - Quản lý Banner

- Danh sách phân trang
- Bộ lọc: Tìm theo tên chiến dịch

### 6 - Quản lý Tin tức (Danh mục + Bài viết)

- Danh sách phân trang
- Bộ lọc: Tìm theo tên tin tức, danh mục tin

### 7 - Quản lý Thành viên (Staff)

- Danh sách phân trang
- Có bộ lọc: tìm theo tên, số ĐT, email...
- Có phần quyền thì càng tốt.

---

## RestFul API

Hệ thống Backend API