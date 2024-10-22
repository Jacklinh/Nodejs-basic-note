
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
    const limit = limit_str ? parseInt(limit_str) : 5;
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
            title: 'Product Name',
            dataIndex: 'product_name',
            key: 'product_name',
            width: 150,
            fixed: 'left',
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            width: 150,
            render: (text: string) => {
                const urlImage = text ? `${globalSetting.UPLOAD_DIRECTORY}`+text : null;
                return (
                    urlImage ? (
                        <Image
                        width={100}
                        src= {urlImage}
                        alt=""
                        />
                    ) : (
                        <Image
                        width={100}
                        src={noImage}
                        alt="No Image"
                        />
                    )
                )
                
            },
        },
        {
            title: 'Category',
            dataIndex: 'category',
            width: 120,
            key: 'category',
            render: (_, record)=> {
                return <span>{record.category?.category_name || null}</span>
            }
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text: number) => `${text} VNĐ`,
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            render: (text: number) => `${text} %`,
        },
        {
            title: 'stock',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Origin',
            dataIndex: 'origin',
            key: 'origin'
        },
        {
            title: 'Best',
            dataIndex: 'isBest',
            key: 'isBest',
            render: (active: boolean) => (
                <Switch size="small" checked={active} />
            ),
        },
        {
            title: 'NewProduct',
            dataIndex: 'isNewProduct',
            key: 'isNewProduct',
            render: (active: boolean) => (
                <Switch size="small" checked={active} />
            ),
        },
        {
            title: 'ShowHome',
            dataIndex: 'isShowHome',
            key: 'isShowHome',
            render: (active: boolean) => (
                <Switch size="small" checked={active} />
            ),
        },
        {
            title: 'Active',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (active: boolean) => (
                <Switch size="small" checked={active} />
            ),
        },
        {
            title: 'Action',
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
                <h2>SẢN PHẨM</h2>
                
                <Button type="primary" icon={<AiOutlinePlus />} onClick={()=>navigate(`/products/add`)} className='common_button'>Add Product</Button>
            </div>
            <Table 
            columns={productColumns} 
            rowKey={(record) => record._id}
            dataSource={getProduct?.data?.products_list || [] } scroll={{ x: 1500 }} 
            pagination={false } 
            />
            <Pagination 
            className='pagination_page'
            defaultCurrent={1} 
            pageSize={getProduct?.data?.pagination.limit || 5}
            total={getProduct?.data?.pagination.totalRecords || 0}
            onChange={onChangePagination} 
		    />;
        </>
    )
}

export default Products