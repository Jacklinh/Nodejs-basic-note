
import { Suspense } from 'react';
import CategoryNaviLoading from './CategoryNaviLoading';
import CategorySelect from './CategorySelelect';
import categoryApi from '@/constanst/APIEndPoints/categories';
const CategoryNavi = async () => {
    const response = await categoryApi.getAllCategories();
    const categories = response.data.categories_list;
  return (
    <Suspense fallback={<CategoryNaviLoading />}>
        <CategorySelect categories={categories} />
    </Suspense>
  )
}

export default CategoryNavi;