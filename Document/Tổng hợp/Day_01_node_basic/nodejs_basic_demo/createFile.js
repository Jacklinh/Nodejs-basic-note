const fs = require('fs');
// cách 1 dùng fs.appendFile: tạo mới nếu chưa tồn tại . còn nếu tồn tại thì được nối nội dung vào cuối file
// cấu trúc: fs.appendFile(file, data, [options], callback)
/*
file: đường dẫn đến file cần thêm nội dung or file mới cần tạo
data: dữ liệu cần thêm vào file
options(tuỳ chọn): các tuỳ chọn như encoding, model, flag
callback: hàm callback nhận đối số err(đối tượng lỗi nếu có)
*/
fs.appendFile('clearFile.txt','xin chào', function(err){
    if(err) throw err;
    console.log('Saved!');
})
// cách 2- 
// b1: dùng open: mở file đó ra, nếu chưa có thì nó tạo ra 1 file rỗng 
/*
fs.open(path, flags[,mode], callback)
*/
fs.open('create')