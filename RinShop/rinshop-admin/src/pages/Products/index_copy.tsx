
import { useState } from 'react';
import { globalSetting } from '../../constants/configs';
import { axiosClient } from '../../library/axiosClient';
import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import { useNavigate,useSearchParams  } from 'react-router-dom';
import type { TableProps, FormProps,UploadFile,UploadProps,GetProp} from 'antd';
import {Table,Pagination,Input,Button,Space,message, Popconfirm, Modal, Form,Select, Image,Typography,Switch,InputNumber,Upload,Checkbox } from 'antd'
import { AiOutlinePlus,AiOutlineEdit,AiOutlineDelete } from "react-icons/ai";
import { CheckOutlined, CloseOutlined,UploadOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const { Text } = Typography;
import { TypeCategory } from '../../types/type';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const Products = () => {
    // khai bao type
    interface productDataType {
        _id: string,
        product_name: string,
        price: number,
        discount: number,
        category: TypeCategory,
        description?: string,
        origin?: string, 
        slug?: string,
        thumbnail?: string, 
        stock: number, 
        isBest: boolean, 
        isNewProduct: boolean, 
        isShowHome: boolean,
        isActive: boolean ,
        file?: UploadFile
    }
    // pagination
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const limit = 5;
    const page_str = params.get('page');
    const page = page_str ? page_str : 1;
    //============== get all product ============= //
    const fetchProduct = async() => {
        let url = `${globalSetting.URL_API}/products?`;
        url += `page=${page_str}&limit=${limit}`;
        const res = await axiosClient.get(url);
        return res.data.data;
    }
    const getProduct = useQuery({
        queryKey: ['products',page],
        queryFn: fetchProduct
    })
    //============== delete find id ============= //
    const fetchDeleteProduct = async (id: string) => {
        const url = `${globalSetting.URL_API}/products/${id}`;
        const res = await axiosClient.delete(url);
        return res.data.data;
    }
    const queryClient = useQueryClient();
    const deleteProduct = useMutation({ // sử dụng hook useMutation để biến đổi dữ liệu như thêm , sửa , xoá dữ liệu
        mutationFn: fetchDeleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ // làm mới dữ liệu
                queryKey: ['products',page]
            })
            message.success('Delete success');
        },
        onError: () => {
            message.error('Delete error');
        },
    })
    //============== get category ============= //
    const fetchCategoryProduct = async() => {
        const url = `${globalSetting.URL_API}/categories`;
        const res = await axiosClient.get(url);
        return res.data.data;
    }
    const getCategoryProduct = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategoryProduct
    })
    const handleChangeCategory = (value: string[]) => {
        console.log(`selected ${value}`);
    };
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
    // khai bao columns
    const productColumns: TableProps<productDataType>["columns"] = [
        {
            title: 'Product Name',
            dataIndex: 'product_name',
            key: 'product_name',
            width: 150,
            fixed: 'left',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            width: 120,
            key: 'category',
            render: (_, record)=> {
                return <span>{record.category.category_name}</span>
            }
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 250,
            render: (text: string) => (
                <Text ellipsis style={{ maxWidth: 200 }}>
                  {text}
                </Text>
            ),
        },
        {
            title: 'Origin',
            dataIndex: 'origin',
            key: 'origin'
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            width: 150,
            render: (text: string) => (
                <Image
                  width={100}
                  src={`${globalSetting.UPLOAD_DIRECTORY}`+text} // Sử dụng URL hình ảnh từ dữ liệu
                  alt="thumbnail"
                />
            ),
        },
        {
            title: 'stock',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'isBest',
            dataIndex: 'isBest',
            key: 'isBest',
            render: (active: boolean) => (
                <Switch size="small" checked={active} />
            ),
        },
        {
            title: 'isNewProduct',
            dataIndex: 'isNewProduct',
            key: 'isNewProduct',
            render: (active: boolean) => (
                <Switch size="small" checked={active} />
            ),
        },
        {
            title: 'isShowHome',
            dataIndex: 'isShowHome',
            key: 'isShowHome',
            render: (active: boolean) => (
                <Switch size="small" checked={active} />
            ),
        },
        {
            title: 'Action',
            key: 'action',
            width: 150,
            fixed: 'right',
            render: (_,record) => (
                <Space size="middle">
                    <Button 
                    type="primary" 
                    shape="circle" 
                    className='common_button'
                    icon={<AiOutlineEdit />}
                    onClick={()=>{
                        showModalEdit();
                        formUpdate.setFieldsValue(record)
                      }}
                    ></Button>
                    <Popconfirm
                        title="Delete category"
                        description="Are you sure to delete this category?"
                        onConfirm={()=> {
                            // gọi xử lý xoá bằng cách mutate ánh xạ
                            deleteProduct.mutate(record._id)
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button 
                        type="primary" 
                        shape="circle" 
                        icon={<AiOutlineDelete  /> } 
                        danger
                        >
                        </Button>
                    </Popconfirm>
                </Space>
            )
        }
    ]
    return (
        <>
            <div className="box_heading">
                <h2>Product</h2>
                
                <Button type="primary" icon={<AiOutlinePlus />} onClick={()=>{showModalAdd()}} className='common_button'>Add Product</Button>
            </div>
            <Table columns={productColumns} dataSource={getProduct?.data?.products_list || [] } scroll={{ x: 1500 }} pagination={false } />
            <Pagination 
            defaultCurrent={1} 
            pageSize={getProduct?.data?.pagination.limit}
            total={getProduct?.data?.pagination.totalRecords || 0}
            onChange={(page) => {
                // thay đổi url
                if(page !== 1) {
                    navigate(`/products?page=${page}`)
                }else {
                    navigate(`/products`)
                }
            }} 
		    />;
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
                        key: c._id,
                        value: c._id,
                        label: c.category_name,
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
                            key: c._id,
                            value: c._id,
                            label: c.category_name,
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
        </>
    )
}

export default Products