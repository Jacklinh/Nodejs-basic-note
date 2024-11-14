import fetchApi from "@/utils/fetchClientInstance";
import { TypeCategory } from "@/types/type";
export const categoriesEndPoints = {
    categories: '/categories/client'
};
interface CategoryResponse {
    data: {
        categories_list: TypeCategory[];
    };
    message: string;
    status: number;
}
const getAllCategories = async (): Promise<CategoryResponse> => {
    try {
      const response = await fetchApi.get<CategoryResponse>(
        categoriesEndPoints.categories,{
            next: { revalidate: 5 } // revalidate lại dữ liệu sau 5 giây
        }
      );
      return response;
    } catch (error) {
      // Xử lý lỗi cụ thể
      if (error instanceof Error) {
        throw new Error(`Failed to fetch categories: ${error.message}`);
      }
      // Xử lý các lỗi không xác định
      throw new Error('An unknown error occurred while fetching categories');
    }
  };
  
  // Tạo object chứa tất cả các API methods liên quan đến categories
  const categoryApi = {
    getAllCategories,
  };
  
export default categoryApi;
