import {useState} from "react";
import { globalSetting } from '../../constants/configs';
import { axiosClient } from '../../library/axiosClient';
import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import { useNavigate,useSearchParams} from 'react-router-dom';
import {Form,InputNumber,Input,Switch,message,Button, Select,Upload} from 'antd';
import { CheckOutlined, CloseOutlined,UploadOutlined } from '@ant-design/icons';
import type { FormProps,UploadProps,UploadFile,GetProp} from 'antd';
import { TypeCategory } from '../../types/type';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const AddProduct = () => {
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
    const page_str = params.get('page');
    const page = page_str ? page_str : 1;
	const queryClient = useQueryClient();
	const [formAdd] = Form.useForm();
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const fetchCreateProduct = async (payload: FormData) => {
		const url = `${globalSetting.URL_API}/products`;
		const res = await axiosClient.post(url,payload,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });;
		return res.data.data;
	}
	const createMutationProduct = useMutation({
		mutationFn: fetchCreateProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['products', page]
			})
			message.success('Thêm sản phẩm thành công');
			formAdd.resetFields();
		},
		onError: () => {
			message.error('thêm sản phẩm lỗi!')
		}
	})
	const onFinishAdd: FormProps<productDataType>['onFinish'] = (values: productDataType) => {
		if (fileList.length === 0) {
            message.error('Vui lòng chọn file trước khi thêm product.');
            return;
        }
		const formData = new FormData();
		// Lặp qua tất cả các trường trong values và thêm chúng vào formData
		Object.entries(values).forEach(([key, value]) => {
			formData.append(key,value);
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
	const propsUploadAdd: UploadProps = {
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
	const handleOkAdd = () => {
        formAdd.submit();
        navigate('/products')
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
	return (
		<div className='sec_edit'>
			<h2>Thêm sản phẩm</h2>
			<Form
				name="formAdd"
				onFinish={onFinishAdd}
				onFinishFailed={onFinishFailedAdd}
				autoComplete="off"
				form={formAdd}
				className='form_edit'
				layout="vertical"
				>
				<div className="form_edit_item">
					<div className="form_edit_ttl">
						<h3>Upload image single</h3>
					</div>
					<div className="form_edit_content">
						<Form.Item<productDataType>
							label="Thumbnail"
							name="thumbnail"
						>
						<Upload {...propsUploadAdd} >
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
							<Input defaultValue='Đà Nẵng'
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
					<Form.Item<productDataType>
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
						initialValue={true}
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
						onClick= {handleOkAdd}
					>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default AddProduct