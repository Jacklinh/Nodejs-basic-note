# các câu hỏi phỏng vấn

 1. trình bày convert psd sang html,css


b1. cắt giao diện từ psd
- từ file thiết kế xác định các thành phần: header, footer, navbar, banner, content,..
- export hình ảnh như logo, icon, image liên quan cần thiết
- lấy thông tin về width content, font family, font size, line-heght, letter-spacing, color, background..
b2. tạo cấu trúc html
- sử dụng các thẻ header, footer, section, nav, div, p, a, image... tạo cấu trúc html tương ứng với design
b3. tạo file css liên kết với html 
- kết hợp với design với html,  định dạng style header , footer, content... phù hợp với design và responsive trên destop, mobile, tablet
- sử dụng flexbox, css Grid,  boostrap dàn layout dễ hơn
b4. thêm hoạt động, hiệu ứng nếu cần như dropdown menu, slider, accordion ...
b5. kiểm tra và tối ưu hoá
- test trên nhiều trình duyệt như chrom, firefox, safari, edge
- test trên các thiết bị thực smartphone  , tablet để đảm bảo responsive
- dùng công cụ lighthouse trên chrome để tối ưu hoá image, css
- trên trên w3c kiểm tra html validater có đúng định dạng chuẩn hay không

b6. deploy lên website

2. có những css selector nào?

- simple selector như id, class, element(div, p)
- css attribute selector như attribute lang, href..

3. css flexbox và css girld

4. Event Loop trong JavaScript hoạt động thế nào?
- nó là 1 cơ chế cho phép xử lý các tác vụ bất đồng bộ trong javascript, sử dụng 1 vòng lặp vô tận để kiểm tra và quản lý các tác vụ.
- cơ chế hoạt động:
1. Requests (Yêu cầu): các yêu cầu người dùng được đưa vào hàng đợi sự kiện(event Queue), đây là nơi lưu trữ các sự kiện cần được xử lý
2. Event Loop: event loop liên tục kiêm tra hàng đợi sự kiện xem có sự kiện nào cần được xử lý không. nếu có nó sẽ lấy sự kiện khỏi hàng đợi và chuyển nó tới nhóm luồng - thread pool.
có 2 luồng - 1 là các tác vụ bất đồng bộ (no-blocking) như đọc ghi file, truy vấn dữ liệu, call api, set timeout. 2 là các tác vụ đồng bô (bloking) như readfileSystem. 
các hoạt động no-blocking sẽ được xử lý trực tiếp, chương trình không chờ nó hoàn thành mà ngay lập tức xử lý các tác vụ khác, sau khi xong nó sẽ được call back để hiển thị kết quả. 
trong khi các hoạt động chặn blocking sẽ được gửi tới tài nguyên bên ngoài như cơ sở dũ liệu, tệp/ lúc này chương trình sẽ chờ tác vụ hoàn thành trước khi khi xử lý các tác vụ khác.
như vậy nó sẽ xử lý nhiều yêu cầu hiệu quả , đồng thời duy trì tính không chặn của ứng dụng

5. sự khác nhau giữa var, let, const? ví dụ cụ thể
var , let, const đều để khai báo biến nhưng chúng có sự khác nhau về phạm vi(scope), khả năng gán lại giá trị (reassignment) và khai báo lại

- var: có phạm vi trong function chứa nó (function scope), có thể khai báo lại cùng 1 tên biến trong cùng 1 phạm vi và có thể thay đổi giá trị sau khi khai báo lại.
(giá trị chưa được gán nhưng console.log trên thì sẽ nhận underfile)

- let: có phạm vi trong block {} chứa nó (block scope), gây lỗi nếu khai báo lại trong cùng 1 phạm vi, có thể thay đổi giá trị sau khi khai báo 

- const : giống let, có phạm vi trong block {} chứa nó (block scope), không thể truy cập trước khi khai báo, gây lỗi nếu khai báo lại trong 1 phạm vi, không thể thay đổi giá trị sau khi khai báo.
Tuy nhiên với object, array thì vẫn có thể thay đổi thuộc tính bên trong nó.


6. forEach trong javascript

7. Virtual DOM trong reactjs
- Virtual DOM là một bản sao nhẹ của DOM thật (Real DOM). Khi trạng thái (state) của component thay đổi, React sẽ:

Tạo một bản sao Virtual DOM mới.
So sánh (diffing) với Virtual DOM cũ.
Xác định sự khác biệt (reconciliation).
Chỉ cập nhật những phần cần thiết trên Real DOM.

=> giảm số lần re-render trong dom.

9. useMemo, useCallback, react.memo
để giúp tối ưu hoá hiệu suất re-render trong react ta sử dụng kết hơp useMemo, useCallback và react.memo 

- useMemo: ghi nhớ kết quả tính toán để tránh tính lại điều này giúp Tránh tính toán lại nếu dependencies không thay đổi  và Giúp tối ưu hiệu suất khi có tác vụ tốn tài nguyên.
 - useCallback: ghi nhớ tham chiếu hàm để tránh tạo mới 
 useCallback sử dụng khi
 + Khi truyền hàm xuống component con, giúp tránh tạo lại hàm mới gây re-render không cần thiết.
 + Khi dùng React.memo để tối ưu component con.
- React.memo() - Ghi nhớ component con không cần re-render nếu props không đổi

10. catch dữ liệu trong react và nextjs

- trong react có thể dùng usestate, useEffect để catch dữ liệu , tránh thay đổi . hoặc dừng thư viện useQuery 

- trong next js dùng getStaticProps(ssg- static site generation) để fetch , kết hợp revalidate(cập nhật dữ liệu sau bao nhiêu time)

11. async/await
 
- async là một function trả về một Promise.
- await chờ Promise hoàn thành và trả về kết quả mà không cần .then().
=> sử dụng để fetch data

- sử dụng try catch để xử lý lỗi 
