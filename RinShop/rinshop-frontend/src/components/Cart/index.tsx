'use client';
import { useCart } from '@/hooks/useCart';
import Link from 'next/link';
const Cart = () => {
    const {getTotalNumber} = useCart();
    return (
        <Link href='/cart/'>
            <div className="product_cart">
                    <span>{getTotalNumber()} Item </span>
                    <span>0đ</span>
            </div>
        </Link>
    )
}

export default Cart