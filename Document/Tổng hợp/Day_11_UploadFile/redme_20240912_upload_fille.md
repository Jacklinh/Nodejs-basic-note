# Upload file & image

## Tài liệu 

- doc <https://expressjs.com/en/resources/middleware/multer.html>
- Git : <https://github.com/nhannn87dn/Learn-Backend-NodeJs/blob/main/01.Lessions/Day-15-Advanced/uploadMulter.md>

## cài đặt

```bash
yarn add multer
yarn add -D @types/multer
```

## các bước thực hiện

Cấu hình api 

- b1: common
trong file .env tạo biến đường dẫn ảnh tĩnh
```ts
UPLOAD_DIRECTORY = 'public/uploads/'
```
- tạo slug cho name image , trong src/helper/buildSlug.ts thêm `buildSlugImage`
```ts
const removeVietnameseTones = (str: string): string => {
    const tones: { [key: string]: string } = {
        'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
        'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
        'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
        'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
        'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
        'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
        'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
        'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
        'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
        'û': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
        'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
        'đ': 'd'
    };

    return str.split('').map(char => tones[char] || char).join('');
};
export const buildSlugImage = (str: string) => {
    const normalizedStr = removeVietnameseTones(str);
    return slugify(normalizedStr,{
        replacement: '-',
        remove: /[^\w\s-]|_/g, 
        lower: true,
        strict: true,
        locale: 'vi', 
        trim: true
    })
}
```
- b2: trong src/helper tạo file `multerUpload.ts` 
```ts

import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {globalConfig} from '../constants/configs';
import { buildSlugImage } from "./buildSlug";

const storageImage = multer.diskStorage({ // dùng diskStorage để xác định địa chỉ lưu trữ 
    //nơi thư mục sẽ được lưu
    destination: function (req, file, cb) {
        // nếu thư mục lưu nếu chưa tồn tạo sẽ tạo folder mới
        const PATH = `${globalConfig.UPLOAD_DIRECTORY}`;
        if(!fs.existsSync(PATH)){
            // tạo folder
            fs.mkdirSync(PATH, {recursive: true})
        }
        cb(null, PATH)
    },
    // rename image đúng dạng slug 
    filename: function (req, file, cb) {
        const fileInfo = path.parse(file.originalname);
        const newFileName = buildSlugImage(fileInfo.name);
        const newFileInfo = newFileName +'-'+ Date.now() + fileInfo.ext;
        cb(null,newFileInfo)
    }
    
})
const imageFilter = function(req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
    // Mot mang cac dinh dang tap tin cho phep duoc tai len
    const mimetypeAllow = ["image/png", "image/jpg", "image/gif", "image/jpeg", "image/webp"];
    if (!mimetypeAllow.includes(file.mimetype)) {
        //req.fileValidationError = 'Only .png, .gif, .jpg, webp, and .jpeg format allowed!';
        return cb(new Error('Only .png, .gif, .jpg, webp, and .jpeg format allowed!'));
    }
    cb(null, true);
};
  
const uploadImage = multer({ 
    storage: storageImage,
    fileFilter: imageFilter
}).single('file') // chỉ upload 1 image
const uploadImages = multer({ 
    storage: storageImage,
    fileFilter: imageFilter
}).array('files') // upload được nhiều image

export {
    uploadImage,
    uploadImages
}
```
- b3: khi thực hiện chức năng thêm mới. ta chỉ cần vào controller , chỉnh sửa phần create 
file src/services/products.service.ts thêm `createDocument`
```ts
const createDocument = async(body: any) => {
    const payloads = {
        product_name : body.product_name,
        price: body.price,
        discount: body.discount,
        category: body.category,
        brand: body.brand,
        description: body.description,
        model_year: body.model_year, 
        slug: body.slug,
        thumbnail: body.thumbnail, 
        stock: body.stock, 
        order: body.order, 
        isBest: body.isBest, 
        isNewProduct: body.isNewProduct, 
        isShowHome: body.isShowHome, 
        isDelete: body.isDelete 
    }
    const product = await Product.create(payloads);
    return product;
}
```
file src/controllers/products.controller.ts
```ts
const createDocument = async (req: Request, res: Response, next: NextFunction)=>{
    try {
      uploadImage(req, res, async function (error) {
        if (error instanceof multer.MulterError) {
           // 1 lỗi của Multer xảy ra khi upload.
           res.status(500).json({
              statusCode: 500,
              message: error.message,
              typeError: 'MulterError'
          })
        } else if (error) {
          // 1 lỗi không xác định xảy ra khi upload.
          res.status(500).json({
              statusCode: 500,
              message: error.message,
              typeError: 'UnKnownError'
          })
        }
        else{
        //Nếu upload hình thành công thì mới tạo sản phẩm
        const product = await productsService.createDocument({
            ...req.body,
            thumbnail: `uploads/${req.file?.filename}`, //cập nhật lại link sản phẩm
        })
        sendJsonSuccess(res)(product)
        }
      })
    } catch (error) {
      next(error)
    }
}
```

- b4. xử lý trên dashboard khi thực hiện add image

trong src/pages/products/index.tsx thêm xử lý phần add
```tsx
import { globalSetting } from '../../constants/configs';
import { axiosClient } from '../../library/axiosClient';
import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import type { UploadFile,UploadProps,GetProp } from 'antd';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

 //============== add product ============= //
const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [formAdd] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
     // end upload file image
    const fetchCreateProduct = async (payload: productDataType) => {
        const url = `${globalSetting.URL_API}/products`;
        const res = await axiosClient.post(url,payload,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data.data;
    }
    const createMutationProduct = useMutation({
        mutationFn: fetchCreateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products',page]
            })
            message.success('add product success');
            setIsModalAddOpen(false)
            formAdd.resetFields();
        },
        onError: () => {
            message.error('add product error')
        }
    })
    const showModalAdd = () => {
        setIsModalAddOpen(true);
    }
    const handleOkAdd = () => {
        formAdd.submit();
    }
    const handleCancelAdd = () => {
        setIsModalAddOpen(false);
    }
    const onFinishAdd: FormProps<productDataType>['onFinish'] = (values: productDataType) => {
        if (fileList.length === 0) {
            message.error('Vui lòng chọn file trước khi thêm product.');
            return;
        }
    
        const formData = new FormData();
        // Lặp qua tất cả các trường trong values và thêm chúng vào formData
        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
        });
    
        fileList.forEach((file) => {
            formData.append('file', file as FileType);
        });
       
        // Gọi hàm mutate
        createMutationProduct.mutate(formData);
    }
    const onFinishFailedAdd: FormProps<productDataType>['onFinishFailed'] = (errorInfo)=> {
        console.log('Failed:', errorInfo);
    }
    const propsUpload: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
          },
          beforeUpload: (file) => {
            setFileList([file]);  // Chỉ chọn một file, nếu cần nhiều file thì sử dụng `setFileList([...fileList, file])`
            return false;  // Tắt upload tự động
          },
          fileList,
      };

      {/* modal add  */}
            <Modal
            title="ADD PRODUCT"
            open={isModalAddOpen}
            onOk={handleOkAdd}
            onCancel={handleCancelAdd}
            className='box_modal'
            okText="Create"
            cancelText="Cancel"
            >
            <Form
            name="formAddProduct"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinishAdd}
            onFinishFailed={onFinishFailedAdd}
            autoComplete="off"
            form={formAdd}
        >
            <Form.Item<productDataType>
            label="Product Name"
            name="product_name"
            hasFeedback
            rules={[
                {required: true, message: "Please input your product name!" },
                ]}
            >
            <Input />
            </Form.Item>
            <Form.Item<productDataType>
            label="discount"
            name="discount"
            hasFeedback
            >
            <InputNumber 
            min={0} 
            max={100} 
            style={{ width: '100%' }} 
            />
            </Form.Item>
            <Form.Item<productDataType>
            label="price"
            name="price"
            hasFeedback
            >
            <InputNumber 
            min={0} 
            max={1000000} 
            style={{ width: '100%' }} 
            />
            </Form.Item>
            <Form.Item<productDataType>
            label="Description"
            name="description"
            hasFeedback
            >
            <TextArea rows={4} />
            </Form.Item>
            <Form.Item<productDataType>
            label="model_year"
            name="model_year"
            >
             <Input />
            </Form.Item>
            <Form.Item<productDataType>
            label="category"
            name="category"
            >
             <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                onChange={handleChangeCategory}
                options={
                    getCategoryProduct?.data &&
                    getCategoryProduct?.data.categories_list.map((c: TypeCategory) => {
                      return {
                        value: c._id,
                        label: c.category_name,
                      };
                    })
                  }
                />
            </Form.Item>
            <Form.Item<productDataType>
            label="brand"
            name="brand"
            >
             <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                onChange={handleChangeCategory}
                options={
                    getBrandProduct?.data &&
                    getBrandProduct?.data.brands_list.map((b: TypeBrand) => {
                      return {
                        value: b._id,
                        label: b.brand_name,
                      };
                    })
                  }
                />
            </Form.Item>
            <Form.Item<productDataType>
            label="stock"
            name="stock"
            >
            <InputNumber 
            min={0} 
            max={10000} 
            style={{ width: '100%' }} 
            />
            </Form.Item>
            <Form.Item<productDataType>
            label="order"
            name="order"
            >
            <InputNumber 
            min={0} 
            max={10000} 
            style={{ width: '100%' }} 
            />
            </Form.Item>
            <Form.Item<productDataType>
                label="Thumbnail"
                name="thumbnail"
            >
               <Upload {...propsUpload} 
                    >
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
            </Form.Item>
            <Form.Item<productDataType>
            label="isBest"
            name="isBest"
            valuePropName="checked"
            initialValue={false}
            >
            <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
                />
            </Form.Item>
            <Form.Item<productDataType>
            label="isNewProduct"
            name="isNewProduct"
            valuePropName="checked"
            initialValue={false}
            >
            <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
                />
            </Form.Item>
            <Form.Item<productDataType>
            label="isShowHome"
            name="isShowHome"
            valuePropName="checked"
            initialValue={false}
            >
            <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
                />
            </Form.Item>
            <Form.Item<productDataType>
            label="isDelete"
            name="isDelete"
            valuePropName="checked"
            initialValue={false}
            >
            <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
                />
            </Form.Item>
            </Form>
            </Modal>
```

- b5: nếu thực hiện chức năng edit thì ta tạo route post riêng
trong src/routes/v1/upload.route.ts
```ts
import express from "express";
import multer from 'multer';
import { uploadImage } from "../../helpers/multerUpload";
const router = express.Router();

// Cos handle loi response
router.post('/photo', (req, res, next)=>{
uploadImage(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log(err);
        res.status(500).json({
          statusCode: 500,
          message: err.message,
          typeError: 'MulterError'
      })
      } else if (err) {
        res.status(500).json({
          statusCode: 500,
          message: err.message,
          typeError: 'UnKnownError'
      })
      }
      res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: {
            link: `uploads/${req.file?.filename}`,
            payload: req.body
        }
    });
    })
})

export default router;

```

lúc này ra file app.ts gọi router cho upload 
```ts
import uploadRouter from './routes/v1/upload.route'
//Mã hóa url
app.use(express.urlencoded({ extended: true }));
// Khai báo thư mục chứa tài nguyên tĩnh */
app.use(express.static(path.join(__dirname, '../public')))
app.use('/api/v1/upload', uploadRouter)
```

- b7: trong dashboard tạo chức năng edit
trong src/pages/Products/index.tsx
```tsx
//============== update product ============= //
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [formUpdate] = Form.useForm();
    const fetchUpdateProduct = async (payload: productDataType) => {
        const {_id, ...params} = payload;
        const url = `${globalSetting.URL_API}/products/${_id}`;
        const res = await axiosClient.put(url,params);
        return res.data.data;
    }
    const updateMutationCategory = useMutation({
        mutationFn: fetchUpdateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products',page]
            })
            message.success('update product success!');
            setIsModalEditOpen(false);
            formUpdate.resetFields();
        },
        onError: () => {
            message.error('update products error!')
        }
    })
    const showModalEdit = () => {
         setIsModalEditOpen(true);
    };
    const handleOkEdit = () => {
        formUpdate.submit();
    };
    const handleCancelEdit = () => {
        setIsModalEditOpen(false);
    };
    
    const onFinishEdit: FormProps<productDataType>['onFinish'] = async (values) => {
        updateMutationCategory.mutate(values);
    };
    
    const onFinishFailedEdit: FormProps<productDataType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
{/* modal edit */}
            <Modal
                title="UPDATE PRODUCT"
                open={isModalEditOpen}
                onOk={handleOkEdit}
                onCancel={handleCancelEdit}
                className='box_modal'
                okText="Update"
                cancelText="Cancel"
                >
                <Form
                name="formEditProduct"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinishEdit}
                onFinishFailed={onFinishFailedEdit}
                autoComplete="off"
                form={formUpdate}
                >
                <Form.Item<productDataType>
                label="id"
                name="_id"
                hidden={true}
                >
                <Input type="hidden" />
                </Form.Item>
                <Form.Item<productDataType>
                label="Product Name"
                name="product_name"
                hasFeedback
                rules={[
                    {required: true, message: "Please input your product name!" },
                    ]}
                >
                <Input />
                </Form.Item>
                <Form.Item<productDataType>
                label="discount"
                name="discount"
                hasFeedback
                >
                <InputNumber 
                min={0} 
                max={100} 
                style={{ width: '100%' }} 
                />
                </Form.Item>
                <Form.Item<productDataType>
                label="price"
                name="price"
                hasFeedback
                >
                <InputNumber 
                min={0} 
                max={1000000} 
                style={{ width: '100%' }} 
                />
                </Form.Item>
                <Form.Item<productDataType>
                label="Description"
                name="description"
                hasFeedback
                >
                <TextArea rows={4} />
                </Form.Item>
                <Form.Item<productDataType>
                label="model_year"
                name="model_year"
                >
                <Input />
                </Form.Item>
                <Form.Item<productDataType>
                label="category"
                name="category"
                >
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    onChange={handleChangeCategory}
                    options={
                        getCategoryProduct?.data &&
                        getCategoryProduct?.data.categories_list.map((c: TypeCategory) => {
                        return {
                            value: c._id,
                            label: c.category_name,
                        };
                        })
                    }
                    />
                </Form.Item>
                <Form.Item<productDataType>
                label="brand"
                name="brand"
                >
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    onChange={handleChangeCategory}
                    options={
                        getBrandProduct?.data &&
                        getBrandProduct?.data.brands_list.map((b: TypeBrand) => {
                        return {
                            value: b._id,
                            label: b.brand_name,
                        };
                        })
                    }
                    />
                </Form.Item>
                <Form.Item<productDataType>
                label="stock"
                name="stock"
                >
                <InputNumber 
                min={0} 
                max={10000} 
                style={{ width: '100%' }} 
                />
                </Form.Item>
                <Form.Item<productDataType>
                label="order"
                name="order"
                >
                <InputNumber 
                min={0} 
                max={10000} 
                style={{ width: '100%' }} 
                />
                </Form.Item>
                <Form.Item label="Thumbnail" name="thumbnail">
                    <Input />
                </Form.Item>
                <Form.Item label="Upload" name="upload">
                    <Upload 
                        action= {`${globalSetting.URL_API}/upload/photo`} 
                        listType="picture"
                        maxCount={1}
                        onChange={(file)=>{
                            /** Upload thành công thì cập nhật lại giá trị input thumbnail */
                            if(file.file.status === 'done'){
                                formUpdate.setFieldValue('thumbnail',file.file.response.data.link)
                            }
                        }}
                        onRemove={()=>{
                            /** Khi xóa hình thì clear giá trị khỏi input */
                            formUpdate.setFieldValue('thumbnail',null);
                            /** Đồng thời gọi API xóa link hình trên server, dựa vào đường dẫn */
                        }}
                    >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item<productDataType>
                label="isBest"
                name="isBest"
                valuePropName="checked"
                initialValue={false}
                >
                <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    defaultChecked
                    />
                </Form.Item>
                <Form.Item<productDataType>
                label="isNewProduct"
                name="isNewProduct"
                valuePropName="checked"
                initialValue={false}
                >
                <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    defaultChecked
                    />
                </Form.Item>
                <Form.Item<productDataType>
                label="isShowHome"
                name="isShowHome"
                valuePropName="checked"
                initialValue={false}
                >
                <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    defaultChecked
                    />
                </Form.Item>
                <Form.Item<productDataType>
                label="isDelete"
                name="isDelete"
                valuePropName="checked"
                initialValue={false}
                >
                <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    defaultChecked
                    />
                </Form.Item>
                </Form>
            </Modal>
```