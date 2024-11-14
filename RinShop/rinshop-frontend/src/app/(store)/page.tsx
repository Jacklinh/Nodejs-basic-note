import { Suspense } from 'react';
import CategoryList from "@/components/ui/common/CategoryList";
import Cart from '@/components/ui/common/Cart';
import CategoryListLoading from '@/components/ui/common/CategoryList/CategoryListLoading';
export default function Home() {
    return (
        <>
            <Suspense fallback={<CategoryListLoading />}>
                <CategoryList />
                <Cart />
            </Suspense>
        </>
    );
}
