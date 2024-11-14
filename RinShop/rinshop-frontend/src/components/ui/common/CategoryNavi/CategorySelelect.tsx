
  import { TypeCategory } from '@/types/type';
  import { CategoryNaviClient } from './CategoryNaviClient';
  interface CategorySelectProps {
    categories: TypeCategory[];
  }

  export default function CategorySelect({ categories }: CategorySelectProps) {
    return (
        <CategoryNaviClient>
            <select className="select_navi" defaultValue="">
                <option value="">Danh mục sản phẩm</option>
                {categories.map((category) => (
                    <option 
                        key={category._id} 
                        value={category.slug || ''}
                    >
                        {category.category_name}
                    </option>
                ))}
            </select>
        </CategoryNaviClient>
    )
  }
