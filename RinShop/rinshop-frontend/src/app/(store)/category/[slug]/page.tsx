
import ProductCategory from '@/components/ui/common/ProductCategory';
import ProductCategoryLoading from '@/components/ui/common/ProductCategory/ProductCategoryLoading';
import { Suspense } from 'react';
interface CategoryPageProps {
    params: {
        slug: string;
    };
    searchParams: {
        page?: string;
    };
}
export default function Page({ params, searchParams }: CategoryPageProps) {
    return (
        <>
            <Suspense fallback={<ProductCategoryLoading />}>
                <ProductCategory categorySlug={params.slug} searchParams={searchParams} />
            </Suspense>
        </>
    );
}
