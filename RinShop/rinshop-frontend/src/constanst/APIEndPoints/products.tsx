import fetchApi from "@/utils/fetchClientInstance";
import { TypeProduct } from "@/types/type";
export const productsEndPoints = {
  products: '/products/client',
  productDetail: '/products/client/detail/:slug'
};
interface ProductsParams {
  category_slug?: string;
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  price_min?: string | null;
  price_max?: string | null;
  keyword?: string | null;
}
interface ProductsResponse {
  data: {
    products_list: TypeProduct[];
    sorts: string[];
    filters: ProductsParams;
    pagination: {
        page: number;
        limit: number;
        totalPage: number;
        totalRecords: number;
    };
};
message: string;
status: number;
}
interface ProductDetailResponse {
  data: {
    product_detail: TypeProduct;
    related_products: TypeProduct[];
  };
  message: string;
  status: number;
}
const getAllProducts = async (): Promise<ProductsResponse> => {
    try {
      const response = await fetchApi.get<ProductsResponse>(
        productsEndPoints.products,{
            next: { revalidate: 5 } // revalidate lại dữ liệu sau 5 giây
        }
      );
      return response;
    } catch (error) {
      // Xử lý lỗi cụ thể
      if (error instanceof Error) {
        throw new Error(`Failed to fetch products: ${error.message}`);
      }
      // Xử lý các lỗi không xác định
      throw new Error('Lỗi khi lấy tất cả sản phẩm');
    }
  };
  // lấy sản phẩm theo danh mục
  const getProductsCategory = async (params: ProductsParams): Promise<ProductsResponse> => {
    try {
      // Xây dựng query string từ params
      const queryParams = new URLSearchParams();
      
      if (params.category_slug) queryParams.append('category_slug', params.category_slug);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.sort) queryParams.append('sort', params.sort);
      if (params.order) queryParams.append('order', params.order);
      if (params.price_min) queryParams.append('price_min', params.price_min);
      if (params.price_max) queryParams.append('price_max', params.price_max);
      if (params.keyword) queryParams.append('keyword', params.keyword);
      const queryString = queryParams.toString();
      const url = `${productsEndPoints.products}${queryString ? `?${queryString}` : ''}`;

      const response = await fetchApi.get<ProductsResponse>(url,{
        next: { revalidate: 5 } // revalidate lại dữ liệu sau 5 giây
      });
      return response;
  } catch (error) {
      if (error instanceof Error) {
          throw new Error(`Failed to fetch category products: ${error.message}`);
      }
      throw new Error('Lỗi khi lấy sản phẩm theo danh mục');
  }
  };
  // lấy 5 sản phẩm theo danh mục hiện ngoài trang chủ
  const getProductsCategoryHome = async (category_slug: string): Promise<ProductsResponse> => {
    try {
      const queryParams = new URLSearchParams({
        category_slug,
        limit: '5',
        page: '1',
        sort: 'created_at', // sắp xếp theo ngày tạo
        order: 'DESC', // sản phẩm mới nhất
      });
      const url = `${productsEndPoints.products}?${queryParams.toString()}`;
      const response = await fetchApi.get<ProductsResponse>(url,{
        next: { revalidate: 5 } // revalidate lại dữ liệu sau 5 giây
      });
      return response;
    } catch (error) {
      // Xử lý lỗi cụ thể
      if (error instanceof Error) {
        throw new Error(`Failed to fetch products: ${error.message}`);
      }
      // Xử lý các lỗi không xác định
      throw new Error('Lỗi khi hiển thị sản phẩm theo danh mục');
    }
  };
  // lấy sản phẩm theo slug
  const getProductDetail = async (slug: string): Promise<ProductDetailResponse> => {
    try {
      const url = `${productsEndPoints.productDetail.replace(':slug', slug)}`;
      const response = await fetchApi.get<ProductDetailResponse>(url);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch product detail: ${error.message}`);
      }
      throw new Error('Lỗi khi lấy sản phẩm theo slug');
    }
  };
  // Tạo object chứa tất cả các API methods liên quan đến categories
  const productsApi = {
    getAllProducts,
    getProductsCategory,
    getProductsCategoryHome,
    getProductDetail
  };
  
export default productsApi;
