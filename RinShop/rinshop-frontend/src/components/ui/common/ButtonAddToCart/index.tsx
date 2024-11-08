"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import { FaCartPlus } from "react-icons/fa6";
import { TProductCart } from "@/types/type";
type ButtonAddToCartProps = {
    data: TProductCart;
};
const ButtonAddToCart = ({ data }: ButtonAddToCartProps) => {
    const {addToCart,decrement,increase,removeFromCart,products} = useCart();
    // Kiểm tra sản phẩm có trong giỏ hàng hay chưa
    const productInCart = products.find((product) => product._id === data._id);
    const [quantity, setQuantity] = useState(productInCart ? productInCart.quantity : 0);
    useEffect(() => {
        if (productInCart) {
            setQuantity(productInCart.quantity);
        } else {
            setQuantity(0);
        }
    }, [productInCart]);
    const handleAddToCart = () => {
        if(data?._id && data?.product_name) {
            const product: TProductCart = {
                _id: data?._id,
                product_name: data?.product_name,
                price: data?.price || 0,
                discount: data?.discount,
                thumbnail: data?.thumbnail || '',
                quantity: 1 // thêm 1 sản phẩm vào giỏ hàng
            }
            addToCart(product);
            setQuantity(1)
        }else{
            console.log('lỗi khi thêm sản phẩm vào giỏ hàng')
        }
        
    }
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value);
        if (!isNaN(newQuantity) && newQuantity >= 0) {
            setQuantity(newQuantity);

            if (newQuantity === 0) {
                removeFromCart(data._id); // Xóa sản phẩm khỏi giỏ hàng khi số lượng là 0
            }
        }
    };
    const handleIncrement = () => {
        increase(data._id);
        setQuantity((prev) => prev + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            decrement(data._id);
            setQuantity((prev) => prev - 1);
        } else {
            removeFromCart(data._id); // Xóa sản phẩm khỏi giỏ hàng khi số lượng giảm về 0
            setQuantity(0);
        }
    };
    return (
        <>  
            {!productInCart ? (
                // Hiển thị nút "Mua Ngay" nếu sản phẩm chưa có trong giỏ hàng
                <p className='addtocart_btn'>
                    <button type="button" onClick={handleAddToCart}>
                        <FaCartPlus /> Mua Ngay
                    </button>
                </p>
            ) : (
                // Hiển thị nút tăng/giảm số lượng nếu sản phẩm đã có trong giỏ hàng
                <p className="cart_button_quantity">
                    <button type="button" onClick={handleDecrement}>-</button>
                    <input
                        type="text"
                        value={quantity}
                        min={0}
                        onChange={handleQuantityChange}
                        className="quantity_input"
                    />
                    <button type="button" onClick={handleIncrement}>+</button>
                </p>
            )}
        </>
       

    )
}

export default ButtonAddToCart