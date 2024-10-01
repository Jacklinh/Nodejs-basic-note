import { useState } from 'react';
import {Table,Pagination,Input,Button,Space,message, Popconfirm, Modal, Form,Select } from 'antd'
import type { TableProps, FormProps } from 'antd'
import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import { globalSetting } from '../../constants/configs';
import { axiosClient } from '../../library/axiosClient';
import { useNavigate,useSearchParams  } from 'react-router-dom';
import { AiOutlinePlus,AiOutlineEdit,AiOutlineDelete  } from "react-icons/ai";
const { TextArea } = Input;
const Categories = () => {
    // khai báo type
    interface categoryDataType {
        _id: string,
        category_name: string,
        description: string,
        slug: string
    }
    // pagination
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const limit = 5;
    const page_str = params.get('page');
    const page = page_str ? page_str : 1;
    // filter category name
    const categoryName_str = params.get('categoryName');
    const categoryName = categoryName_str  ? categoryName_str : '';
    //============== get all category ============= //
    const fetchCategory = async() => {
        let url= `${globalSetting.URL_API}/categories?`;
        if(categoryName) {
            url += `categoryName=${categoryName}&`;
        }
        url += `page=${page_str}&limit=${limit}`;
        const res = await axiosClient.get(url);
        return res.data.data;
    }
    const getCategory = useQuery({
        queryKey: ['categories',page,categoryName],
        queryFn: fetchCategory
    })
    //============== delete find id ============= //
    const fetchDeleteCategory = async (id: string) => {
        const url = `${globalSetting.URL_API}/categories/${id}`;
        const res = await axiosClient.delete(url);
        return res.data.data;
    }
    const queryClient = useQueryClient();
    const deleteCategory = useMutation({ // sử dụng hook useMutation để biến đổi dữ liệu như thêm , sửa , xoá dữ liệu
        mutationFn: fetchDeleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ // làm mới dữ liệu
                queryKey: ['categories',page]
            })
            message.success('Delete success');
        },
        onError: () => {
            message.error('Delete error');
        },
    })
    //============== add category ============= //
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [formAdd] = Form.useForm();
    const fetchCreateCategory = async (payload: categoryDataType) => {
        const url = `${globalSetting.URL_API}/categories`;
        const res = await axiosClient.post(url,payload);
        return res.data.data;
    }
    const createMutationCategory = useMutation({
        mutationFn: fetchCreateCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['categories',page]
            })
            message.success('add category success');
            setIsModalAddOpen(false)
            formAdd.resetFields();
        },
        onError: () => {
            message.error('add category error')
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
    const onFinishAdd: FormProps<categoryDataType>['onFinish'] = (values) => {
        createMutationCategory.mutate(values)
    }
    const onFinishFailedAdd: FormProps<categoryDataType>['onFinishFailed'] = (errorInfo)=> {
        console.log('Failed:', errorInfo);
    }
    //============== update category ============= //
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [formUpdate] = Form.useForm();
    const fetchUpdateCategory = async (payload: categoryDataType) => {
        const {_id, ...params} = payload;
        const url = `${globalSetting.URL_API}/categories/${_id}`;
        const res = await axiosClient.put(url,params);
        return res.data.data;
    }
    const updateMutationCategory = useMutation({
        mutationFn: fetchUpdateCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['categories',page]
            })
            message.success('update category success!');
            setIsModalEditOpen(false);
            formUpdate.resetFields();
        },
        onError: () => {
            message.error('update category error!')
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
      
      const onFinishEdit: FormProps<categoryDataType>['onFinish'] = async (values) => {
        updateMutationCategory.mutate(values);
      };
      
      const onFinishFailedEdit: FormProps<categoryDataType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    //============== filter categry name  ============= //
    const fetchFilterCategory = async () => {
        const url = `${globalSetting.URL_API}/categories`;
        const res = await axiosClient.get(url);
        return res.data.data;
    }
    const filterCategory = useQuery({
        queryFn: fetchFilterCategory,
        queryKey: ['categories']
    })
    const onChangeFilter = (value: string) => {
        if(value !== '') {
            navigate(`/categories?categoryName=${value}`)
        }else {
            navigate(`/categories`)
        }
    };
    
    // khai bao columns
    const categoryColumns: TableProps<categoryDataType>["columns"] = [
        {
            title: 'Category Name',
            dataIndex: 'category_name',
            key: 'category_name'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug'
        },
        {
            title: 'Action',
            key: 'action',
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
                            deleteCategory.mutate(record._id)
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
                <h2>DANH MỤC SẢN PHẨM</h2>
                <Select
                    showSearch
                    placeholder="Select a category name"
                    optionFilterProp="label"
                    onChange={onChangeFilter}
                    options={[
                    {
                        value: '',
                        label: 'All Category',
                    },
                    ...(filterCategory?.data
                        ? filterCategory.data.categories_list.map((c:categoryDataType) => ({
                            value: c.category_name,
                            label: c.category_name,
                          }))
                        : []),
                    ]}
                />
                <Button type="primary" icon={<AiOutlinePlus />} onClick={()=>{showModalAdd()}} className='common_button'>Thêm danh mục</Button>
            </div>
            <Table
            columns={categoryColumns} 
            dataSource={getCategory?.data?.categories_list || [] } 
            rowKey={(record) => record._id}
            pagination={false } />
            <Pagination 
                className='pagination_page'
                defaultCurrent={1} 
                pageSize={getCategory?.data?.pagination.limit || 5}
                total={getCategory?.data?.pagination.totalRecords || 0}
                onChange={(page) => {
                    // thay đổi url
                    if(page !== 1) {
                        navigate(`/categories?page=${page}`)
                    }else {
                        navigate(`/categories`)
                    }
                }} 
		    />;
            {/* modal edit */}
            <Modal
                title="CẬP NHẬT DANH MỤC"
                open={isModalEditOpen}
                onOk={handleOkEdit}
                onCancel={handleCancelEdit}
                className='box_modal'
                okText="Cập nhật"
                cancelText="Huỷ"
                >
                <Form
                name="formEditCategory"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinishEdit}
                onFinishFailed={onFinishFailedEdit}
                autoComplete="off"
                form={formUpdate}
                >
                <Form.Item<categoryDataType>
                label="id"
                name="_id"
                hidden={true}
                >
                <Input type="hidden" />
                </Form.Item>
                <Form.Item<categoryDataType>
                label="Tên Danh Mục"
                name="category_name"
                hasFeedback
                rules={[
                    {required: true, message: "Vui lòng nhập tên danh mục!" },
                    ]}
                >
                <Input />
                </Form.Item>
                <Form.Item<categoryDataType>
                label="Chi tiết danh mục"
                name="description"
                hasFeedback
                >
                <TextArea rows={4} />
                </Form.Item>
                </Form>
            </Modal>
            {/* modal add  */}
            <Modal
            title="THÊM DANH MỤC"
            open={isModalAddOpen}
            onOk={handleOkAdd}
            onCancel={handleCancelAdd}
            className='box_modal'
            okText="Thêm mới"
            cancelText="Huỷ"
            >
            <Form
            name="formAddCategory"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinishAdd}
            onFinishFailed={onFinishFailedAdd}
            autoComplete="off"
            form={formAdd}
        >
            <Form.Item<categoryDataType>
            label="Tên Danh Mục"
            name="category_name"
            hasFeedback
            rules={[
                {required: true, message: "Vui lòng nhập tên danh mục!" },
                ]}
            >
            <Input />
            </Form.Item>
            <Form.Item<categoryDataType>
            label="Chi tiết danh mục"
            name="description"
            hasFeedback
            >
            <TextArea rows={4} />
            </Form.Item>
            </Form>
            </Modal>
        </>
    )
}

export default Categories