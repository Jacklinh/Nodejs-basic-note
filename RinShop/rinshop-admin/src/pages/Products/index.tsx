
import { globalSetting } from '../../constants/configs';
import { axiosClient } from '../../library/axiosClient';
import { useQuery,useQueryClient,useMutation} from '@tanstack/react-query';
import { useNavigate,useSearchParams  } from 'react-router-dom';
import type { TableProps,PaginationProps} from 'antd';
import {Table,Pagination,Button,Space,Popconfirm, Image,Switch,message} from 'antd'
import { AiOutlinePlus,AiOutlineEdit,AiOutlineDelete } from "react-icons/ai";
import { TypeProduct } from '../../types/type';
import noImage from '../../assets/noImage.jpg'
const Products = () => {
    // pagination
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const limit_str = params.get("limit");
    const page_str = params.get('page');
    const page = page_str ? parseInt(page_str) : 1;
    const limit = limit_str ? parseInt(limit_str) : 7;
    const onChangePagination: PaginationProps["onChange"] = (page) => {
        if(page !== 1) {
            navigate(`/products?page=${page}`)
        }else {
            navigate(`/products`)
        }
      };
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
            message.success('Xoá thành công!');
        },
        onError: () => {
            message.error('Xoá lỗi!');
        },
    })
    // khai bao columns
    const productColumns: TableProps<TypeProduct>["columns"] = [
        {
            title: 'Tên SP',
            dataIndex: 'product_name',
            key: 'product_name',
            width: 100,
            fixed: 'left',
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            width: 150,
            render: (text: string) => {
                const urlImage = text ? `${globalSetting.UPLOAD_DIRECTORY}`+text : null;
                return (
                    urlImage ? (
                        <Image
                        width={100}
                        height={100}
                        src= {urlImage}
                        alt=""
                        />
                    ) : (
                        <Image
                        width={100}
                        src={noImage}
                        height={100}
                        alt="No Image"
                        />
                    )
                )
                
            },
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            width: 120,
            key: 'category',
            render: (_, record)=> {
                return <span>{record.category?.category_name || null}</span>
            }
        },
        {
            title: 'Giá/KG',
            dataIndex: 'price',
            key: 'price',
            width: 150,
            render: (text: number) => `${text.toLocaleString('vi-VN')} VNĐ`,
        },
        {
            title: 'Số lượng tồn kho',
            dataIndex: 'stock',
            key: 'stock',
            width: 100,
        },
        {
            title: 'SP nổi bật',
            dataIndex: 'isBest',
            key: 'isBest',
            width: 70,
            render: (active: boolean) => (
                <Switch size="small" checked={active} />
            ),
        },
        {
            title: 'SP mới về',
            dataIndex: 'isNewProduct',
            key: 'isNewProduct',
            width: 70,
            render: (active: boolean) => (
                <Switch size="small" checked={active} />
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isActive',
            key: 'isActive',
            width: 70,
            render: (active: boolean) => (
                <Switch size="small" checked={active} />
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            width: 150,
            fixed: 'right',
            render: (_, record) => (
                
                <Space size="middle">
                    <Button 
                    type="primary" 
                    shape="circle" 
                    className='common_button'
                    icon={<AiOutlineEdit />}
                    onClick={()=>{
                        navigate(`/products/${record._id}`)
                    }}
                    ></Button>
                    <Popconfirm
                        title="Xoá sản phẩm"
                        description="Bạn có muốn xoá sản phẩm này?"
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
                <h2>DANH SÁCH SẢN PHẨM</h2>
                
                <Button type="primary" icon={<AiOutlinePlus />} onClick={()=>navigate(`/products/add`)} className='common_button btn_add'>Thêm sản phẩm mới</Button>
            </div>
            <div className="data_table">
                <Table 
                columns={productColumns} 
                rowKey={(record) => record._id}
                dataSource={getProduct?.data?.products_list || [] } scroll={{ x: 1500 }} 
                pagination={false } 
                />
                <Pagination 
                className='pagination_page'
                defaultCurrent={1} 
                current={page} 
                align='center'
                pageSize={getProduct?.data?.pagination.limit || 5}
                total={getProduct?.data?.pagination.totalRecords || 0}
                onChange={onChangePagination} 
                />;
            </div>
        </>
    )
}

export default Products