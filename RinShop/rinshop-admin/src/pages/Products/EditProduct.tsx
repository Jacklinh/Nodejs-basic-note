
import { globalSetting } from '../../constants/configs';
import { axiosClient } from '../../library/axiosClient';
import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import { useNavigate,useParams} from 'react-router-dom';
import {Form,InputNumber,Input,Switch,message,Button, Select,Upload} from 'antd';
import { CheckOutlined, CloseOutlined,UploadOutlined } from '@ant-design/icons';
import type { FormProps,UploadProps} from 'antd';
import { TypeProduct, TypeCategory } from '../../types/type';
const EditProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { id } = params;
    const queryClient = useQueryClient();
    const [formUpdate] = Form.useForm();
    // b1: render dữ liệu lấy theo id ở params
    const getProduct = async () => {
        const url = `${globalSetting.URL_API}/products/${id}`;
        const res = await axiosClient.get(url);
        return res.data.data;
    };
    //Lấy danh sách product về theo id
    const queryProduct = useQuery({
        queryKey: ["products-detail"],
        queryFn: getProduct,
    });
    let productData = {};
    if (queryProduct.isSuccess) {
        // mặc định axio khi return về res.data.data => data cuối cùng chính là data của chính dự án mình
        productData = queryProduct.data.data.data;
    }
    // render dữ liệu vào form (chú ý name trong form item === name item)
    formUpdate.setFieldsValue(productData);
    // b2: thực hiện update khi có sự thay đổi
    const fetchUpdateProduct = async (formData: TypeProduct) => {
        const url = `${globalSetting.URL_API}/products/${id}`;
        const res = await axiosClient.put(url,formData);
        return res.data.data;
    };
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
    //============== end get category ============= //
    //============== edit upload image ============= //
    const propsUploadSingle: UploadProps = {
        action: `${globalSetting.URL_API}/upload/photo`,
        listType: 'picture',
        maxCount: 1,
        onChange: (file) => {
          // Kiểm tra xem việc upload có thành công không
          if (file.file.status === 'done') {
            const imageUrl = file.file.response.data.link;
            formUpdate.setFieldValue('thumbnail', imageUrl); // Cập nhật giá trị của input thumbnail
          }
        },
        onRemove: () => {
          formUpdate.setFieldValue('thumbnail', null); // Clear giá trị khỏi input thumbnail
          // Gọi API xóa hình ảnh trên server (cần thêm API thực hiện việc này)
        },
      };
    //============== end edit upload image ============= //
    const updateMutationCategory = useMutation({
        mutationFn: fetchUpdateProduct,
        onSuccess: () => {
            // reset lại dữ liệu
            queryClient.invalidateQueries({
                queryKey: ['products']
            })
            message.success('update product success!');
            formUpdate.resetFields();
        },
        onError: () => {
            message.error('update products error!')
        }
    })
    
    const onFinishEdit: FormProps<TypeProduct>['onFinish'] = async (values) => {
        updateMutationCategory.mutate(values);
    };
    
    const onFinishFailedEdit: FormProps<TypeProduct>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleOkEdit = () => {
        formUpdate.submit();
        navigate('/products')
    };
    return (
        <div className='sec_edit'>
            <h2>Edit</h2>
            <Form
                name="formEdit"
                onFinish={onFinishEdit}
                onFinishFailed={onFinishFailedEdit}
                autoComplete="off"
                form={formUpdate}
                className='form_edit'
                layout="vertical"
                >
                <Form.Item
                label="id"
                name="_id"
                hidden={true}
                >
                <Input type="hidden" />
                </Form.Item>
                <div className="form_edit_item">
                    <div className="form_edit_ttl">
                        <h3>Upload image single</h3>
                    </div>
                    <div className="form_edit_content">
                        <Form.Item label="Thumbnail" name="thumbnail">
                            <Input />
                        </Form.Item>
                        <Form.Item<TypeProduct>
                            label="Thumbnail"
                            name="thumbnail"
                        >
                        <Upload {...propsUploadSingle} >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                        </Form.Item>
                    </div>
                </div>
                <div className="form_edit_item">
                    <div className="form_edit_ttl">
                        <h3>Gallery</h3>
                    </div>
                    <div className="form_edit_content">
                        <p>upload Gallery</p>
                    </div>
                </div>
                <div className="form_edit_item">
                    <div className="form_edit_ttl">
                        <h3>Thông tin sản phẩm</h3>
                    </div>
                    <div className="form_edit_content">
                        <Form.Item
                            label="Tên sản phẩm"
                            name="product_name"
                            hasFeedback
                            rules={[
                                {required: true, message: "Vui lòng nhập tên sản phẩm!" },
                                ]}
                            >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Giá"
                            name="price"
                            >
                            <InputNumber 
                            min={0} 
                            style={{ width: '100%' }} 
                            />
                        </Form.Item>
                        <Form.Item
                            label="Khuyến mãi"
                            name="discount"
                            hasFeedback
                            >
                            <InputNumber 
                            min={0} 
                            max={100} 
                            style={{ width: '100%' }} 
                            />
                        </Form.Item>
                        <Form.Item
                            label="Số lượng sản phẩm trong kho"
                            name="stock"
                            >
                            <InputNumber 
                            min={0} 
                            style={{ width: '100%' }} 
                            />
                        </Form.Item>
                        <Form.Item
                            label="Nơi xuất xứ sản phẩm"
                            name="origin"
                            >
                            <Input 
                            />
                        </Form.Item>
                        <Form.Item
                            label="Mô tả"
                            name="description"
                            >
                            <Input />
                        </Form.Item>

                    </div>
                </div>
                <div className="form_edit_item">
                    <div className="form_edit_ttl">
                        <h3>Danh mục sản phẩm</h3>
                    </div>
                    <div className="form_edit_content">
                    <Form.Item<TypeProduct>
                    label="danh mục sản phẩm"
                    name="category"
                    >
                    <Select
                        style={{ width: '100%' }}
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
                    </div>
                </div>
                <div className="form_edit_item">
                    <div className="form_edit_ttl">
                        <h3>Tuỳ chọn</h3>
                    </div>
                    <div className="form_edit_content">
                        <Form.Item
                        label="Trạng thái hoạt động"
                        name="isActive"
                        valuePropName="checked"
                        initialValue={false}
                        >
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            defaultChecked
                            />
                        </Form.Item>
                        <Form.Item
                        label="Sản phẩm nổi bật"
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
                        <Form.Item
                        label="Sản phẩm mới"
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
                        <Form.Item
                        label="Hiển thị trang chủ"
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
                    </div>
                </div>
                <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick= {handleOkEdit}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditProduct