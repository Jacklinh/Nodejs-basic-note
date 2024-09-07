import slugify from "slugify";
export const buildSlug= (str: string) => {
    return slugify(str,{
        replacement: '-',// thay thế nối chuỗi các ký tự bằng -
        remove: undefined, // Loại bỏ các ký tự phù hợp với regex, mặc định là `undefined`
        lower: true, // Chuyển đổi thành chữ thường, mặc định là `false`
        strict: false, // Loại bỏ các ký tự đặc biệt, ngoại trừ ký tự thay thế, mặc định là `false` 
        locale: 'en', // language chuyển đổi
        trim: true
    })
}