'use client';
import {useEffect,useState} from "react";
import { FaCartPlus } from "react-icons/fa6";
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
const IconCart = () => {
    const {getTotalNumber,products} = useCart();
    const [totalNumber, setTotalNumber] = useState(0);
    // cập nhật khi product thay đổi
    useEffect(() => {
        setTotalNumber(getTotalNumber());
    }, [products]); 
    return (
        <p className="header_icon_cart">
            <Link href='/checkout'>
                <FaCartPlus />
                <span>{totalNumber}</span>
            </Link>
        </p>
    )
}

export default IconCart