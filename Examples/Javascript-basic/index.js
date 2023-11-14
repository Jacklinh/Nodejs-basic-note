//1. Khai báo biến dùng let
let myName = 'linh';
let myAge = 30;
// 2. khai báo biến dùng const
const user = {id: 1, name: 'linh'};
// đặc điểm 2 kiểu khai báo biến này ở ngoài khối thì trong khối chúng ta sử dụng nó
{
    console.log(myName)
}
/**
 * Quy tắc đặt tên biến và hàm theo camel Case

 */
function myHello() {
    console.log('my hello');
}
myHello();
// function có tham số
function myHelloName(name) {
    console.log('my name is:' + name);
}
myHelloName('long');
// chuyển function sang arrow function
// hàm k có return
const myHello = () => {
    console.log('my hello arrow');
}
// hàm có return trả về kết quả
const sum = (a,b) => {
    return (a + b);
}
// với arrow function trả về có 1 return duy nhất 1 dòng thì chúng ta có thể rút gọn như sau
/**
 const sum = (a + b) => a + b; // short hand
 */

 /**
  * hàm map
  */