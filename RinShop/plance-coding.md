# Công việc cần thực hiện

## Kết hợp làm API + Admin + Front end

### B1: làm trang login để đăng nhập vào dashboard

1. (đã làm) tạo api schema staffs (api)
2. (đã làm) tạo page login (thêm xóa sửa)

### B2: làm trang quản lý sản phẩm - products

1. (đã làm) tạo api schema products & category 
2. (đã làm và nên bổ sung) tạo page product & category trong dashboard để quản lý sản phẩm (thêm, xóa, edit sản phẩm) 
gồm
- category: gồm Vegetables(rau, củ) 66f2c40f02f6991e2b9ca04c, fruits(quả, trái cây) 66f2c46302f6991e2b9ca064, Meat(thịt) 66f2c48002f6991e2b9ca074, Fish (cá) 66f2c49202f6991e2b9ca07c
- danh sách phân trang
- có bộ lọc: lọc theo category, tìm theo tên sản phẩm
- có bộ lọc theo sản phẩm bán chạy : ta thêm trường `isBest`

3. (chưa làm) tạo component render product ra ngoài trang chủ 
- gồm Khoảng 5 - 10 sản phẩm cho từng category mà bạn muốn đưa ra trang chủ- muốn biết sản phẩm đó đưa ra cho trang chủ thì ta thêm `isHome` -> để đưa ra trang chủ  
- có button xem thêm để đến page danh sách sản phẩm của 1 danh mục(page ở b3)
- có add to card

==> làm trước phần cơ bản - thời gian start tối 24/09 -> end tối 25/09

### B3: (chưa làm ) làm trang danh sách sản phẩm của 1 danh mục- page shop 
- banner riêng cho từng danh mục( làm sau)
- danh sách sản phẩm thuộc 1 danh mục theo `slug`
- sắp xếp sản phẩm: giá tăng dần, giảm dần
- phần trang
- bộ lọc cho các option như product theo category, filetr by pricem ( làm sau)
- bài viết mô tả cho từng danh mục( làm sau)

==> làm trước phần cơ bản - thời gian start tối 25/09 -> end tối 27/09

### B4: (chưa làm) page chi tiết sản phẩm

- chi tiết 1 sản phẩm ( các images, sản phẩm, giá, detail)
- có thể thêm review (làm sau)
- Các sản phẩm liên quan theo category( 5 hoặc 10 sản phẩm)

==> làm trước phần cơ bản - thời gian start sáng 28/09 -> end tối 29/09

### B5: (chưa làm) page giỏ hàng

- hiển thị danh sách sản phẩm đã thêm vào giỏ hàng

### B6: (chưa làm) page checkout
- hiển thị form để điền thông tin người mua
- hiển thị danh sách sản phẩm đã thêm vào giỏ hàng
- phương thức thanh toán
- đặt hàng (đơn sẽ vào orders)

### B7: (chưa làm) checkout thành công
- hiển thị thông tin khi đặt hàng thành công - có thể gửi thông báo hoặc vào mail

==> b5,b6,b7 sẽ làm cùng lúc, khá khó và phải đẩy nhanh tiến độ.
### B8: (Làm sau) làm chart dashboard

### B9: (Làm sau) làm schema về quản lý banner, tin tức

### B10: deploy 
==> fix và deploy tầm 1 ngày. dự tính là hoàn thiện phần cơ bản trước ngày 5/10. để tạo cv
