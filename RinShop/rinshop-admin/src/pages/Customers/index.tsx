import { useState } from 'react';
import { Table, Pagination, Input, Button, Space,message, Popconfirm, Modal, Form, Switch} from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { globalSetting } from '../../constants/configs';
import { axiosClient } from '../../library/axiosClient';
import { useNavigate,useSearchParams  } from 'react-router-dom';
import { AiOutlinePlus,AiOutlineEdit,AiOutlineDelete  } from "react-icons/ai";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type {TableProps,FormProps } from 'antd';
import { TypeCustomer } from '../../types/type';
const {TextArea} = Input;
interface ErrorResponse {
	response?: {
	  data?: {
		message?: string;
		statusCode?: number;
	  };
	};
}
const Customers = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const limit = 5;
  const page_str = params.get('page');
  const page = page_str ? parseInt(page_str) : 1;
  // search keyword
  const keyword_str = params.get('keyword');
  const keyword = keyword_str ? keyword_str : null;
  //============== all customer ============= //
  const fetchCustomer = async() => {
	let url= `${globalSetting.URL_API}/customers?`;
	if(keyword) {
		url+= `keyword=${keyword}&`;
	}
	url+= `page=${page_str}&limit=${limit}`;
	const res = await axiosClient.get(url)
	return res.data.data
  }
  const getCustomer = useQuery({
	queryKey: ['customers', page,keyword],
	queryFn: fetchCustomer
  });
  //============== delete find id ============= //
  const queryClient = useQueryClient();
  const fetchDeleteCustomer = async(id: string) => {
	const url = `${globalSetting.URL_API}/customers/${id}`;
	const res = await axiosClient.delete(url);
	return res.data.data;
  }
  const deleteCustormer = useMutation({
	mutationFn: fetchDeleteCustomer,
	onSuccess: () => {
	  queryClient.invalidateQueries({
		queryKey: ['customers',page]
	  });
	  message.success('Xoá thành công!');
	},
	onError: (error: ErrorResponse) => {
	  // Hiển thị thông báo lỗi cụ thể từ server
	  message.error(error?.response?.data?.message || 'Xoá khách hàng thất bại!');
	},
  })
  //============== add custormer ============= //
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [formAdd] = Form.useForm();
  const fetchCreateCustomer = async(payload:TypeCustomer) => {
	const url = `${globalSetting.URL_API}/customers`;
	const res = await axiosClient.post(url,payload);
	return res.data.data;
  }
  const createMutationCustomer = useMutation({
	mutationFn: fetchCreateCustomer,
	onSuccess: () => {
		queryClient.invalidateQueries({
			queryKey: ['customers',page]
		})
		message.success('Thêm thành công !');
		// close modal
		setIsModalAddOpen(false);
		// clear data tu form
		formAdd.resetFields();
	},
	onError: () => {
		message.error('Thêm lỗi !');
	}
  })
  const showModalAdd = () => {
	setIsModalAddOpen(true);
  };
  const handleOkAdd = () => {
    formAdd.submit();
  };
  const handleCancelAdd = () => {
	setIsModalAddOpen(false);
  };
  
  const onFinishAdd: FormProps<TypeCustomer>['onFinish'] = (values) => {
	// goi ham api de xu ly add 
	// khi dung mutate nó sẽ ánh xạ lại hàm trên
	createMutationCustomer.mutate(values)
  };
  
  const onFinishFailedAdd: FormProps<TypeCustomer>['onFinishFailed'] = (errorInfo) => {
	console.log('Failed:', errorInfo);
  };
  //============== update customer ============= //
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [formUpdate] = Form.useForm();
  const fetchUpdateCustomer = async(payload: TypeCustomer) => {
	const {_id, ...params} = payload;
	const url = `${globalSetting.URL_API}/customers/${_id}`;
	const res = await axiosClient.put(url,params);
	return res.data.data;
  }
  const updateMutationStaff = useMutation({
	mutationFn: fetchUpdateCustomer,
	onSuccess:() => {
		queryClient.invalidateQueries({
			queryKey: ['customers',page]
		});
		message.success('Cập nhật thành công !');
		// đóng modal
		setIsModalEditOpen(false);
		// clear data từ form
		formUpdate.resetFields();
	},
	onError: () => {
		message.error('Cập nhật lỗi!')
	}
  })
  const showModalEdit = () => {
	setIsModalEditOpen(true);
  };
  const handleOkEdit = () => {
	//submit === ok modal
	formUpdate.submit();
  };
  const handleCancelEdit = () => {
	setIsModalEditOpen(false);
  };
  
  const onFinishEdit: FormProps<TypeCustomer>['onFinish'] = async (values) => {
	// gọi api để cập nhật staff
	updateMutationStaff.mutate(values);
  };
  
  const onFinishFailedEdit: FormProps<TypeCustomer>['onFinishFailed'] = (errorInfo) => {
	console.log('Failed:', errorInfo);
  };
  //============== search customer ============= //
  const [formSearch] = Form.useForm();
  const [clientReadySearch, setClientReadySearch] = useState(false);
  const onFinishSearch: FormProps<TypeCustomer>['onFinish'] = (values) => {
	// cập nhập lại url
	const params = new URLSearchParams();
	// duyệt qua từng cặp key -value trong object
	for(const[key,value] of Object.entries(values)) {
		if(value !== undefined && value !== '') {
			params.append(key,String(value));
		}
	}
	const searchString = params.toString();
	navigate(`/customers?${searchString}`);
  }
  const onFinishFailedSearch:FormProps<TypeCustomer>['onFinishFailed'] = (errorInfo) => {
	console.log('Failed:', errorInfo);
  }
  const handleInputChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
	setClientReadySearch(value.length > 0); // Hiện nút khi có giá trị
    // Điều hướng đến /staffs nếu input rỗng
    if (value.length === 0) {
      navigate(`/customers`);
    }
  };

  // columns
  const columns :TableProps<TypeCustomer>['columns'] = [
	{
	  title: 'Tên Khách Hàng',
	  dataIndex: 'fullName',
	  key: 'fullName',
	},
	{
	  title: 'Số Điện Thoại',
	  dataIndex: 'phone',
	  key: 'phone',
	},
	{
	  title: 'Email',
	  key: 'email',
	  dataIndex: 'email',
	},
	{
		title: 'Địa Chỉ',
		key: 'address',
		dataIndex: 'address',
	},
	{
		title: 'Trạng Thái Hoạt Động',
		key: 'active',
		dataIndex: 'active',
		render: (active: boolean) => (
			<Switch size="small" checked={active} />
		),
	},
	{
		title: 'Hành động',
		key: 'action',
		render: (_, record) => (
			<Space size="middle">
			<Button 
			type="primary" 
			shape="circle" 
			className='common_button'
			icon={<AiOutlineEdit />}
			onClick={()=>{
				// hiện modal 
				showModalEdit();
				// lấy thông tin của record đổ vào form
				formUpdate.setFieldsValue(record)
			}}
			></Button>
			<Popconfirm
				title="Xoá Khách hàng"
				description="Bạn có muốn xoá Khách hàng này đúng không?"
				onConfirm={()=> {
				deleteCustormer.mutate(record._id);
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
		),
	}
];
  return (
	<>
		<div className="box_heading">
			<h2>DANH SÁCH KHÁCH HÀNG</h2>
			<Form
				form={formSearch}
				name="search form"
				onFinish={onFinishSearch}
				onFinishFailed={onFinishFailedSearch}
				autoComplete="on"
				layout="inline"
				className='form_search'
			>
				<Form.Item
				label=""
				name="keyword"
				>
				<Input onChange={handleInputChangeSearch} placeholder="Tìm kiếm theo name hoặc email" />
				</Form.Item>
				<Form.Item shouldUpdate labelCol={{offset: 2}}>
                        <Space>
                            <Button type="primary" htmlType="submit"
							disabled = {
								!clientReadySearch ||
								!formSearch.isFieldsTouched(true) ||
								!formSearch.getFieldValue('keyword')
							}
							>
                            	Tìm kiếm
                            </Button>
                            <Button type="default" htmlType="reset"
							onClick={()=>{
                                formSearch.resetFields();
								navigate(`/customers`)
                            }}
							disabled = {
								!clientReadySearch ||
								!formSearch.isFieldsTouched(true) ||
								!formSearch.getFieldValue('keyword')
							}
							>
                            	Reset
                            </Button>
                        </Space>
                </Form.Item>
			</Form>
			<Button type="primary" icon={<AiOutlinePlus />} onClick={()=>{showModalAdd()}} className='common_button'>Thêm khách hàng</Button>
		</div>
		<Table 
		columns={columns} 
		dataSource={getCustomer?.data?.customers_list || [] } 
		rowKey={(record) => record._id} // Chỉ định _id làm row key
		pagination={false } />
		<Pagination 
			className='pagination_page'
			defaultCurrent={1} 
			current={page} 
			pageSize={getCustomer?.data?.pagination.limit || 5}
			total={getCustomer?.data?.pagination.totalRecords || 0}
			onChange={(page) => {
				// thay đổi url
				if(page !== 1) {
				navigate(`/customers?page=${page}`)
				}else {
				navigate(`/customers`)
				}
			}} 
		/>;
		{/* modal edit */}
		<Modal
		title="CẬP NHẬT KHÁCH HÀNG"
		open={isModalEditOpen}
		onOk={handleOkEdit}
		onCancel={handleCancelEdit}
		className='box_modal'
		okText="CẬP NHẬT"
        cancelText="HUỶ"
		>
		<Form
		name="formEditCustomer"
		labelCol={{ span: 8 }}
		wrapperCol={{ span: 16 }}
		style={{ maxWidth: 600 }}
		onFinish={onFinishEdit}
		onFinishFailed={onFinishFailedEdit}
		autoComplete="off"
		form={formUpdate}
	  >
		<Form.Item<TypeCustomer>
		  label="id"
		  name="_id"
		  hidden={true}
		>
		  <Input type="hidden" />
		</Form.Item>
		<Form.Item<TypeCustomer>
		  label="Tên Khách Hàng"
		  name="fullName"
		  hasFeedback
		  rules={[
			{required: true, message: "Vui lòng nhập họ và tên" },
			{min: 5, message: "Tối thiểu 5 ký tự!" }
			]}
		>
		  <Input />
		</Form.Item>
		<Form.Item<TypeCustomer>
		  label="Số Điện Thoại"
		  name="phone"
		  hasFeedback
		  rules={[
			{pattern: /^[0-9]{10}$/, required: true, message: "Số điện thoại phải 10 số!" },
			]}
		>
		  <Input />
		</Form.Item>
		<Form.Item<TypeCustomer>
		  label="Email"
		  name="email"
		  hasFeedback
		  rules={[
			{type: 'email', required: true, message: "Email phải đúng định dạng @" },
			]}
		>
		  <Input />
		</Form.Item>
		<Form.Item<TypeCustomer>
		  label="Mật khẩu"
		  name="password"
		  hasFeedback
		  rules={[
			{required: true,message: 'Vui lòng nhập password!'},
			{min: 8,message: 'mật khẩu tối thiểu phải 8 ký tự',},
			]}
		>
		  <Input />
		</Form.Item>
		<Form.Item<TypeCustomer>
		  label="Địa Chỉ"
		  name="address"
		>
		  <TextArea rows={4} />
		</Form.Item>
		<Form.Item<TypeCustomer>
		  label="Trạng Thái Hoạt Động"
		  name="active"
		>
		<Switch
			checkedChildren={<CheckOutlined />}
			unCheckedChildren={<CloseOutlined />}
		/>
		</Form.Item>
		</Form>
	  </Modal>
		{/* modal add  */}
		<Modal
		title="THÊM KHÁCH HÀNG"
		open={isModalAddOpen}
		onOk={handleOkAdd}
		onCancel={handleCancelAdd}
		className='box_modal'
		okText="Thêm mới"
        cancelText="Huỷ"
		>
		<Form
		name="formAddCustomer"
		labelCol={{ span: 8 }}
		wrapperCol={{ span: 16 }}
		style={{ maxWidth: 600 }}
		onFinish={onFinishAdd}
		onFinishFailed={onFinishFailedAdd}
		autoComplete="off"
		form={formAdd}
	  >
		<Form.Item<TypeCustomer>
		  label="Tên Khách Hàng"
		  name="fullName"
		  hasFeedback
		  rules={[
			{required: true, message: "Vui lòng nhập họ và tên" },
			{min: 5, message: "Tối thiểu 5 ký tự!" }
			]}
		>
		  <Input />
		</Form.Item>
		<Form.Item<TypeCustomer>
		  label="Mật khẩu"
		  name="password"
		  hasFeedback
		  rules={[
			{required: true,message: 'Vui lòng nhập password!'},
			{min: 8,message: 'mật khẩu tối thiểu phải 8 ký tự',},
			]}
			
		>
		  <Input.Password />
		</Form.Item>
		<Form.Item<TypeCustomer>
		  label="Số Điện Thoại"
		  name="phone"
		  hasFeedback
		  rules={[
			{pattern: /^[0-9]{10}$/, required: true, message: "Số điện thoại phải 10 số!" },
			]}
		>
		  <Input />
		</Form.Item>
		<Form.Item<TypeCustomer>
		  label="Email"
		  name="email"
		  hasFeedback
		  rules={[
			{type: 'email', required: true, message: "Email phải đúng định dạng @" },
			]}
		>
		  <Input />
		</Form.Item>
		<Form.Item<TypeCustomer>
		  label="Địa Chỉ"
		  name="address"
		>
		  <TextArea rows={4} />
		</Form.Item>
		<Form.Item<TypeCustomer>
		  label="Trạng Thái Hoạt Động"
		  name="active"
		>
		<Switch
			checkedChildren={<CheckOutlined />}
			unCheckedChildren={<CloseOutlined />}
		/>
		</Form.Item>
		</Form>
	  </Modal>
	</>
  )
}

export default Customers