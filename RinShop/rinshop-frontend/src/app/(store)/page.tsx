import { Suspense } from 'react';
import CategoryList from "@/components/ui/common/CategoryList";
import ProductHomeByCate from "@/components/ui/common/ProductHomeByCate";
import LoadingSpinner from "@/components/ui/common/Loading";
import Cart from '@/components/ui/common/Cart';
export default function Home() {
    return (
        <>
            <Suspense fallback={<LoadingSpinner />}>
                <CategoryList />
                <ProductHomeByCate />
                <Cart />
            </Suspense>
            
        </>
    );
}
