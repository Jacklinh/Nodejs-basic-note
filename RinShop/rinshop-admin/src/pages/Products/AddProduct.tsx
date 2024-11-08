import {useState,useEffect, useRef} from "react";
import { globalSetting } from '../../constants/configs';
import { axiosClient } from '../../library/axiosClient';
import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import { useNavigate,useSearchParams} from 'react-router-dom';
import {Form,InputNumber,Input,Switch,message,Button, Select,Upload} from 'antd';
import { CheckOutlined, CloseOutlined,UploadOutlined } from '@ant-design/icons';
import type { FormProps,UploadProps,UploadFile,GetProp} from 'antd';
import { TypeCategory } from '../../types/type';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
// ckeditor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import {
	ClassicEditor,
	AccessibilityHelp,
	Alignment,
	Autoformat,
	AutoImage,
	Autosave,
	Bold,
	Essentials,
	FindAndReplace,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	GeneralHtmlSupport,
	Heading,
	Highlight,
	HtmlComment,
	HtmlEmbed,
	Italic,
	Link,
	List,
	ListProperties,
	Paragraph,
	RemoveFormat,
	SelectAll,
	ShowBlocks,
	SimpleUploadAdapter,
	SourceEditing,
	SpecialCharacters,
	SpecialCharactersArrows,
	SpecialCharactersCurrency,
	SpecialCharactersEssentials,
	SpecialCharactersLatin,
	SpecialCharactersMathematical,
	SpecialCharactersText,
	Strikethrough,
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar,
	TextTransformation,
	Underline,
	Undo
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
const AddProduct = () => {
	// start ckeditor
	const editorRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);
    const [textEditor, setTextEditor] = useState("");
    
    const editorConfig: EditorConfig = {
        simpleUpload: {
            uploadUrl: '',
        },
            toolbar: {
                items: [
                    'undo',
                    'redo',
                    '|',
                    'sourceEditing',
                    'showBlocks',
                    'findAndReplace',
                    'selectAll',
                    '|',
                    'heading',
                    '|',
                    'fontSize',
                    'fontFamily',
                    'fontColor',
                    'fontBackgroundColor',
                    '|',
                    'bold',
                    'italic',
                    'underline',
                    'strikethrough',
                    'removeFormat',
                    '|',
                    'specialCharacters',
                    'link',
                    'insertImage',
                    'insertTable',
                    'highlight',
                    'htmlEmbed',
                    '|',
                    'alignment',
                    '|',
                    'bulletedList',
                    'numberedList',
                    '|',
                    'accessibilityHelp'
                ],
                shouldNotGroupWhenFull: false
            },
            plugins: [
                AccessibilityHelp,
                Alignment,
                Autoformat,
                AutoImage,
                Autosave,
                Bold,
                Essentials,
                FindAndReplace,
                FontBackgroundColor,
                FontColor,
                FontFamily,
                FontSize,
                GeneralHtmlSupport,
                Heading,
                Highlight,
                HtmlComment,
                HtmlEmbed,
                Italic,
                Link,
                List,
                ListProperties,
                Paragraph,
                RemoveFormat,
                SelectAll,
                ShowBlocks,
                SimpleUploadAdapter,
                SourceEditing,
                SpecialCharacters,
                SpecialCharactersArrows,
                SpecialCharactersCurrency,
                SpecialCharactersEssentials,
                SpecialCharactersLatin,
                SpecialCharactersMathematical,
                SpecialCharactersText,
                Strikethrough,
                Table,
                TableCaption,
                TableCellProperties,
                TableColumnResize,
                TableProperties,
                TableToolbar,
                TextTransformation,
                Underline,
                Undo
            ],
            fontFamily: {
                supportAllValues: true
            },
            fontSize: {
                options: [10, 12, 14, 'default', 18, 20, 22],
                supportAllValues: true
            },
            heading: {
                options: [
                    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                    { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                    { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                    { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                    { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
                ]
            },
            htmlSupport: {
                allow: [
                    {
                        name: /^.*$/,
                        styles: true,
                        attributes: true,
                        classes: true
                    }
                ]
            },
            link: {
                addTargetToExternalLinks: true,
                defaultProtocol: 'https://',
                decorators: {
                    toggleDownloadable: {
                        mode: 'manual',
                        label: 'Downloadable',
                        attributes: {
                            download: 'file'
                        }
                    }
                }
            },
            list: {
                properties: {
                    styles: true,
                    startIndex: true,
                    reversed: true
                }
            },
            placeholder: 'Type or paste your content here!',
            table: {
                contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
            }
    };
    useEffect(() => {
        setIsLayoutReady(true);

        return () => setIsLayoutReady(false);
    }, []);
    // end ckeditor
	// khai bao type
    interface productDataType {
        _id: string,
        product_name: string,
        price: number,
        discount?: number,
        category: TypeCategory,
        description?: string,
        origin?: string, 
        slug?: string,
        thumbnail?: string, 
        stock?: number, 
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
        });
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
	// xử lý dữ liệu khi dùng ckeditor
    useEffect(() => {
        if (createMutationProduct.isSuccess) {
            setTextEditor(createMutationProduct.data.description);
        }
    }, [createMutationProduct.isSuccess, createMutationProduct.data, formAdd]);
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
						<h3>Hình ảnh nổi bật</h3>
					</div>
					<div className="form_edit_content">
						<Form.Item<productDataType>
							label="Hình ảnh"
							name="thumbnail"
						>
						<Upload {...propsUploadAdd} >
                        <Button icon={<UploadOutlined />}>Tải hình ảnh</Button>
                        </Upload>
						</Form.Item>
					</div>
				</div>
				{/* <div className="form_edit_item">
					<div className="form_edit_ttl">
						<h3>Hình ảnh khác(nếu có)</h3>
					</div>
					<div className="form_edit_content">
						<p>upload Gallery</p>
					</div>
				</div> */}
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
							label="Giá/Kg(VNĐ)"
							name="price"
							>
							<InputNumber 
							min={0} 
							style={{ width: '100%' }} 
							/>
						</Form.Item>
						<Form.Item
							label="Khuyến mãi(%)"
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
							label="Số lượng sản phẩm tồn kho"
							name="stock"
							>
							<InputNumber 
							min={0} 
							style={{ width: '100%' }} 
							/>
						</Form.Item>
						<Form.Item
							label="Xuất xứ sản phẩm"
							name="origin"
							>
							<Input defaultValue='Đà Nẵng'
							/>
						</Form.Item>
					</div>
				</div>
				<div className="form_edit_item">
                    <div className="form_edit_ttl">
                        <h3>Mô tả chi tiết sản phẩm</h3>
                    </div>
                    <div className="form_edit_content">
                        <Form.Item
                            label=""
                            name="description"
                            className='ckeditor_content'
                            >
                            <div ref={editorRef}>
                                {isLayoutReady && <CKEditor 
                                editor={ClassicEditor} 
                                config={editorConfig}
                                data={textEditor}
                                onChange={(_, editor) => {
                                    const data = editor.getData();
                                    formAdd.setFieldValue('description',data);
                                }}
                                />}
                            </div>
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
								label: c.category_name
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
						label="Trạng thái"
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
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className='common_button'
						onClick= {handleOkAdd}
					>
						Thêm mới
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default AddProduct