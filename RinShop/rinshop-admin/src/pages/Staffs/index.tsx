import { useState } from 'react';
import { Table, Pagination, Input, Button, Space,message, Popconfirm, Modal, Form, Switch} from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { globalSetting } from '../../constants/configs';
import { axiosClient } from '../../library/axiosClient';
import { useNavigate,useSearchParams  } from 'react-router-dom';
import { AiOutlinePlus,AiOutlineEdit,AiOutlineDelete  } from "react-icons/ai";
import type {TableProps,FormProps } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { TypeStaff } from '../../types/type';
const Staffs = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const limit = 5;
  const page_str = params.get('page');
  const page = page_str ? page_str : 1;
  // search keyword
  const keyword_str = params.get('keyword');
  const keyword = keyword_str ? keyword_str : null;
  //============== all staff ============= //
  const fetchStafff = async() => {
	let url= `${globalSetting.URL_API}/staffs?`;
	if(keyword) {
		url+= `keyword=${keyword}&`;
	}
	url+= `page=${page_str}&limit=${limit}`;
	const res = await axiosClient.get(url)
	return res.data.data
  }
  const getStaff = useQuery({
	queryKey: ['staffs', page,keyword],
	queryFn: fetchStafff
  });
  //============== delete find id ============= //
  const queryClient = useQueryClient();
  const fetchDeleteStaff = async(id: string) => {
	const url = `${globalSetting.URL_API}/staffs/${id}`;
	const res = await axiosClient.delete(url);
	return res.data.data;
  }
  const deleteStaff = useMutation({
	mutationFn: fetchDeleteStaff,
	onSuccess: () => {
	  queryClient.invalidateQueries({
		queryKey: ['staffs',page]
	  });
	  message.success('Xoá thành công!');
	},
	onError: () => {
	  message.error('Xoá lỗi !');
	},
  })
  //============== add staff ============= //
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [formAdd] = Form.useForm();
  const fetchCreateStaff = async(payload:TypeStaff) => {
	const url = `${globalSetting.URL_API}/staffs`;
	const res = await axiosClient.post(url,payload);
	return res.data.data;
  }
  const createMutationStaff = useMutation({
	mutationFn: fetchCreateStaff,
	onSuccess: () => {
		queryClient.invalidateQueries({
			queryKey: ['staffs',page]
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
  
  const onFinishAdd: FormProps<TypeStaff>['onFinish'] = (values) => {
	// goi ham api de xu ly add 
	// khi dung mutate nó sẽ ánh xạ lại hàm trên
	createMutationStaff.mutate(values)
  };
  
  const onFinishFailedAdd: FormProps<TypeStaff>['onFinishFailed'] = (errorInfo) => {
	console.log('Failed:', errorInfo);
  };
  //============== update staff ============= //
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [formUpdate] = Form.useForm();
  const fetchUpdateStaff = async(payload: TypeStaff) => {
	const {_id, ...params} = payload;
	const url = `${globalSetting.URL_API}/staffs/${_id}`;
	const res = await axiosClient.put(url,params);
	return res.data.data;
  }
  const updateMutationStaff = useMutation({
	mutationFn: fetchUpdateStaff,
	onSuccess:() => {
		queryClient.invalidateQueries({
			queryKey: ['staffs',page]
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
  
  const onFinishEdit: FormProps<TypeStaff>['onFinish'] = async (values) => {
	// gọi api để cập nhật staff
	updateMutationStaff.mutate(values);
  };
  
  const onFinishFailedEdit: FormProps<TypeStaff>['onFinishFailed'] = (errorInfo) => {
	console.log('Failed:', errorInfo);
  };
  //============== search staff ============= //
  const [formSearch] = Form.useForm();
  const [clientReadySearch, setClientReadySearch] = useState(false);
  const onFinishSearch: FormProps<TypeStaff>['onFinish'] = (values) => {
	// cập nhập lại url
	const params = new URLSearchParams();
	// duyệt qua từng cặp key -value trong object
	for(const[key,value] of Object.entries(values)) {
		if(value !== undefined && value !== '') {
			params.append(key,String(value));
		}
	}
	const searchString = params.toString();
	navigate(`/staffs?${searchString}`);
  }
  const onFinishFailedSearch:FormProps<TypeStaff>['onFinishFailed'] = (errorInfo) => {
	console.log('Failed:', errorInfo);
  }
  const handleInputChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
	setClientReadySearch(value.length > 0); // Hiện nút khi có giá trị
    // Điều hướng đến /staffs nếu input rỗng
    if (value.length === 0) {
      navigate(`/staffs`);
    }
  };

  // columns
  const columns :TableProps<TypeStaff>['columns'] = [
	{
	  title: 'Full Name',
	  dataIndex: 'fullName',
	  key: 'fullName',
	},
	{
	  title: 'Phone',
	  dataIndex: 'phone',
	  key: 'phone',
	},
	{
	  title: 'Email',
	  key: 'email',
	  dataIndex: 'email',
	},
	{
		title: 'Status',
		key: 'active',
		dataIndex: 'active',
		render: (active: boolean) => (
			<Switch size="small" checked={active} />
		),
	},
	{
		title: 'Action',
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
				title="Delete staff"
				description="Bạn có muốn xoá nhân viên này đúng không?"
				onConfirm={()=> {
				deleteStaff.mutate(record._id);
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
// phân quyền
// if(user?.role === 'admin' || user?.role === 'subAdmin') {
// 	columns.push({
// 		title: 'Action',
// 		key: 'action',
// 		render: (_, record) => (
// 			<Space size="middle">
// 			<Button 
// 			type="primary" 
// 			shape="circle" 
// 			className='common_button'
// 			icon={<AiOutlineEdit />}
// 			onClick={()=>{
// 				// hiện modal 
// 				showModalEdit();
// 				// lấy thông tin của record đổ vào form
// 				formUpdate.setFieldsValue(record)
// 			}}
// 			></Button>
// 			<Popconfirm
// 				title="Delete staff"
// 				description="Bạn có muốn xoá staff này đúng không?"
// 				onConfirm={()=> {
// 				deleteStaff.mutate(record._id);
// 				}}
// 				okText="Yes"
// 				cancelText="No"
// 			>
// 				<Button 
// 				type="primary" 
// 				shape="circle" 
// 				icon={<AiOutlineDelete  /> } 
// 				danger
// 				>
// 				</Button>
// 			</Popconfirm>
// 			</Space>
// 		),
// 	})
// }
  return (
	<>
		<div className="box_heading">
			<h2>DANH SÁCH NHÂN VIÊN</h2>
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
								navigate(`/staffs`)
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
			<Button type="primary" icon={<AiOutlinePlus />} onClick={()=>{showModalAdd()}} className='common_button'>Thêm nhân viên</Button>
		</div>
		<Table 
		columns={columns} 
		dataSource={getStaff?.data?.staffs_list || [] } 
		rowKey={(record) => record._id} // Chỉ định _id làm row key
		pagination={false } />
		<Pagination 
			className='pagination_page'
			defaultCurrent={1} 
			pageSize={getStaff?.data?.pagination.limit || 5}
			total={getStaff?.data?.pagination.totalRecords || 0}
			onChange={(page) => {
				// thay đổi url
				if(page !== 1) {
				navigate(`/staffs?page=${page}`)
				}else {
				navigate(`/staffs`)
				}
			}} 
		/>;
		{/* modal edit */}
		<Modal
		title="CẬP NHẬT NHÂN VIÊN"
		open={isModalEditOpen}
		onOk={handleOkEdit}
		onCancel={handleCancelEdit}
		className='box_modal'
		okText="CẬP NHẬT"
        cancelText="HUỶ"
		>
		<Form
		name="formEditStaff"
		labelCol={{ span: 8 }}
		wrapperCol={{ span: 16 }}
		style={{ maxWidth: 600 }}
		onFinish={onFinishEdit}
		onFinishFailed={onFinishFailedEdit}
		autoComplete="off"
		form={formUpdate}
	  >
		<Form.Item<TypeStaff>
		  label="id"
		  name="_id"
		  hidden={true}
		>
		  <Input type="hidden" />
		</Form.Item>
		<Form.Item<TypeStaff>
		  label="Full Name"
		  name="fullName"
		  hasFeedback
		  rules={[
			{required: true, message: "Vui lòng nhập họ và tên" },
			{min: 5, message: "Tối thiểu 5 ký tự!" }
			]}
		>
		  <Input />
		</Form.Item>
		<Form.Item<TypeStaff>
		  label="Phone"
		  name="phone"
		  hasFeedback
		  rules={[
			{pattern: /^[0-9]{10}$/, message: "Số điện thoại phải 10 số!" },
			]}
		>
		  <Input />
		</Form.Item>
		<Form.Item<TypeStaff>
		  label="Email"
		  name="email"
		  hasFeedback
		  rules={[
			{type: 'email', message: "Email phải đúng định dạng @" },
			]}
		>
		  <Input />
		</Form.Item>
		<Form.Item<TypeStaff>
		  label="Status"
		  name="active"
		>
		<Switch
			checkedChildren={<CheckOutlined />}
			unCheckedChildren={<CloseOutlined />}
			defaultChecked
		/>
		</Form.Item>
		</Form>
	  </Modal>
		{/* modal add  */}
		<Modal
		title="THÊM NHÂN VIÊN"
		open={isModalAddOpen}
		onOk={handleOkAdd}
		onCancel={handleCancelAdd}
		className='box_modal'
		okText="Thêm mới"
        cancelText="Huỷ"
		>
		<Form
		name="formAddStaff"
		labelCol={{ span: 8 }}
		wrapperCol={{ span: 16 }}
		style={{ maxWidth: 600 }}
		onFinish={onFinishAdd}
		onFinishFailed={onFinishFailedAdd}
		autoComplete="off"
		form={formAdd}
	  >
		<Form.Item<TypeStaff>
		  label="Full Name"
		  name="fullName"
		  hasFeedback
		  rules={[
			{required: true, message: "Vui lòng nhập họ và tên" },
			{min: 5, message: "Tối thiểu 5 ký tự!" }
			]}
		>
		  <Input />
		</Form.Item>
		<Form.Item<TypeStaff>
		  label="Password"
		  name="password"
		  hasFeedback
		  rules={[
			{required: true,message: 'Vui lòng nhập password!'},
			{min: 8,message: 'mật khẩu tối thiểu phải 8 ký tự',},
			]}
			
		>
		  <Input.Password />
		</Form.Item>
		<Form.Item<TypeStaff>
		  label="Phone"
		  name="phone"
		  hasFeedback
		  rules={[
			{pattern: /^[0-9]{10}$/, message: "Số điện thoại phải 10 số!" },
			]}
		>
		  <Input />
		</Form.Item>
		<Form.Item<TypeStaff>
		  label="Email"
		  name="email"
		  hasFeedback
		  rules={[
			{type: 'email', message: "Email phải đúng định dạng @" },
			]}
		>
		  <Input />
		</Form.Item>
		<Form.Item<TypeStaff>
		  label="Status"
		  name="active"
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

export default Staffs