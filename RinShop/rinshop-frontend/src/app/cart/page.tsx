'use client';
import React from 'react'
import { useCart } from '@/hooks/useCart';
const CartPage = () => {
		const {products, increase, decrement, removeFromCart,totalAmount} = useCart();
        if(!products.length) {
            return (
                <>
                    <p>giỏ hàng rỗng</p>
                </>
            )
        }else {
            return (
                <div>
                    <h1>page cart</h1> 
                    <ul>
                        {products.map((p) => {
                            return <li key={`cart_${p._id}`} className='py-2'>
                                <div className='cart_item flex gap-x-5'>
                                    <p>{p.product_name}</p>
                                    <p>{p.price}</p>
                                    <p>{p.discount }</p>
                                    <p>
                                        <button type='button' className="bg-blue-500 text-white py-2 px-4" onClick={()=> decrement(p._id)}>-</button>
                                        <input className='w-[40px]' type='text' value={p.quantity} />
                                        <button type='button' className="bg-blue-500 text-white py-2 px-4" onClick={()=> increase(p._id)}>+</button>
                                    </p>
                                    <p>
                                        <button className='bg-red-500 text-white py-2 px-4' onClick={() => removeFromCart(p._id)}>xoá</button>
                                    </p>
                                </div>
                            </li>
                        })}
                    </ul>
                    <p>
                        Tổng  tiền {totalAmount}
                    </p>
                </div>
            )
        }
		
}

export default CartPage