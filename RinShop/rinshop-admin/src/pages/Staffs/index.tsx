import { useState } from 'react';
import { Table, Pagination, Input, Button, Space,message, Popconfirm, Modal, Form} from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { globalSetting } from '../../constants/configs';
import { axiosClient } from '../../library/axiosClient';
import { useNavigate,useSearchParams  } from 'react-router-dom';
import { AiOutlinePlus,AiOutlineEdit,AiOutlineDelete  } from "react-icons/ai";
import type {TableProps,FormProps } from 'antd';
// end form search
const Staffs = () => {
  // start type
  interface staffDataType {
	_id: string,
	first_name: string,
	last_name: string,
	phone: number,
	email: string,
	password: string
  }
  // end type
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
	  message.success('Delete success');
	},
	onError: () => {
	  message.error('Delete error');
	},
  })
  //============== add staff ============= //
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [formAdd] = Form.useForm();
  const fetchCreateStaff = async(payload:staffDataType) => {
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
		message.success('add staff success');
		// close modal
		setIsModalAddOpen(false);
		// clear data tu form
		formAdd.resetFields();
	},
	onError: () => {
		message.error('add staff error');
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
  
  const onFinishAdd: FormProps<staffDataType>['onFinish'] = (values) => {
	// goi ham api de xu ly add 
	// khi dung mutate nó sẽ ánh xạ lại hàm trên
	createMutationStaff.mutate(values)
  };
  
  const onFinishFailedAdd: FormProps<staffDataType>['onFinishFailed'] = (errorInfo) => {
	console.log('Failed:', errorInfo);
  };
  //============== update staff ============= //
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [formUpdate] = Form.useForm();
  const fetchUpdateStaff = async(payload: staffDataType) => {
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
		message.success('update staff success!');
		// đóng modal
		setIsModalEditOpen(false);
		// clear data từ form
		formUpdate.resetFields();
	},
	onError: () => {
		message.error('update staff error!')
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
  
  const onFinishEdit: FormProps<staffDataType>['onFinish'] = async (values) => {
	// gọi api để cập nhật staff
	updateMutationStaff.mutate(values);
  };
  
  const onFinishFailedEdit: FormProps<staffDataType>['onFinishFailed'] = (errorInfo) => {
	console.log('Failed:', errorInfo);
  };
  //============== search staff ============= //
  const [formSearch] = Form.useForm();
  const [clientReadySearch, setClientReadySearch] = useState(false);
  const onFinishSearch: FormProps<staffDataType>['onFinish'] = (values) => {
	// cập nhập lại url
	const params = new URLSearchParams();
	// duyệt qua từng cặp key -value trong object
	for(const[key,value] of Object.entries(values)) {
		if(value !== undefined && value !== '') {
			params.append(key,value);
		}
	}
	const searchString = params.toString();
	navigate(`/staffs?${searchString}`);
  }
  const onFinishFailedSearch:FormProps<staffDataType>['onFinishFailed'] = (errorInfo) => {
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
  const columns :TableProps<staffDataType>['columns'] = [
	{
	  title: 'First Name',
	  dataIndex: 'first_name',
	  key: 'first_name',
	},
	{
	  title: 'Last Name',
	  dataIndex: 'last_name',
	  key: 'last_name',
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
			description="Are you sure to delete this staff?"
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
	},
];
  return (
	<>
		<div className="box_heading">
			<h2>Staffs</h2>
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
				<Input onChange={handleInputChangeSearch} placeholder="Search FirstName or LastName or Email" />
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
                            	Search
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
			<Button type="primary" icon={<AiOutlinePlus />} onClick={()=>{showModalAdd()}} className='common_button'>Add Staff</Button>
		</div>
		<Table columns={columns} dataSource={getStaff?.data?.staffs_list || [] } pagination={false } />
		<Pagination 
		  defaultCurrent={1} 
		  pageSize={getStaff?.data?.pagination.limit}
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
		title="UPDATE STAFF"
		open={isModalEditOpen}
		onOk={handleOkEdit}
		onCancel={handleCancelEdit}
		className='box_modal'
		okText="Update"
        cancelText="Cancel"
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
		<Form.Item<staffDataType>
		  label="id"
		  name="_id"
		  hidden={true}
		>
		  <Input type="hidden" />
		</Form.Item>
		<Form.Item<staffDataType>
		  label="First Name"
		  name="first_name"
		  hasFeedback
		  rules={[
			{required: true, message: "Please input your first name!" },
			{min: 5, message: "First name must be at least 5 characters!" }
			]}
		>
		  <Input />
		</Form.Item>
		<Form.Item<staffDataType>
		  label="Last Name"
		  name="last_name"
		  hasFeedback
		  rules={[
			{required: true, message: "Please input your last name!" },
			{min: 5, message: "Last name must be at least 5 characters!" }
			]}
		>
		  <Input />
		</Form.Item>
		<Form.Item<staffDataType>
		  label="Phone"
		  name="phone"
		  hasFeedback
		  rules={[
			{pattern: /^[0-9]{10}$/, message: "Phone number must be 10 digits!" },
			]}
		>
		  <Input />
		</Form.Item>
		<Form.Item<staffDataType>
		  label="Email"
		  name="email"
		  hasFeedback
		  rules={[
			{type: 'email', message: "The input is not valid E-mail!" },
			]}
		>
		  <Input />
		</Form.Item>
		</Form>
	  </Modal>
		{/* modal add  */}
		<Modal
		title="ADD STAFF"
		open={isModalAddOpen}
		onOk={handleOkAdd}
		onCancel={handleCancelAdd}
		className='box_modal'
		okText="Create"
        cancelText="Cancel"
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
		<Form.Item<staffDataType>
		  label="First Name"
		  name="first_name"
		  hasFeedback
		  rules={[
			{required: true, message: "Please input your first name!" },
			{min: 5, message: "First name must be at least 5 characters!" }
			]}
		>
		  <Input />
		</Form.Item>
		<Form.Item<staffDataType>
		  label="Last Name"
		  name="last_name"
		  hasFeedback
		  rules={[
			{required: true, message: "Please input your last name!" },
			{min: 5, message: "Last name must be at least 5 characters!" }
			]}
		>
		  <Input />
		</Form.Item>
		<Form.Item<staffDataType>
		  label="Password"
		  name="password"
		  hasFeedback
		  rules={[
			{required: true,message: 'Please input your password!'},
			{min: 8,message: 'Password must be at least 8 characters!',},
			]}
			
		>
		  <Input.Password />
		</Form.Item>
		<Form.Item<staffDataType>
		  label="Phone"
		  name="phone"
		  hasFeedback
		  rules={[
			{pattern: /^[0-9]{10}$/, message: "Phone number must be 10 digits!" },
			]}
		>
		  <Input />
		</Form.Item>
		<Form.Item<staffDataType>
		  label="Email"
		  name="email"
		  hasFeedback
		  rules={[
			{type: 'email', message: "The input is not valid E-mail!" },
			]}
		>
		  <Input />
		</Form.Item>
		</Form>
	  </Modal>
	</>
  )
}

export default Staffs