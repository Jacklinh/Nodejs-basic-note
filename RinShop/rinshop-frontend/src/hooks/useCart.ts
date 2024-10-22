
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { TProductCart } from "@/types/type";
const localName = 'cart-store'

interface TCart {
  products: TProductCart[],
  getTotalNumber: () => number,
  addToCart: (item: TProductCart) => void,
  removeFromCart: (id: string | undefined) => void,
  increase: (id: string | undefined) => void,
  decrement: (id: string | undefined) => void,
  totalAmount: number,
  calculateTotalAmount: () => void
}
export const useCart = create(
    persist<TCart>(
        (set, get) => ({
          products: [],
          totalAmount: 0,
          // tính tổng số tiền các sản phẩm trong giỏ hàng
          calculateTotalAmount: () => {
            const products = get().products;
            const total = products.reduce((sum, product) => sum + product.quantity * product.price, 0);
            set({totalAmount: total})
          },
          // tính tổng số sản phầm trong giỏ hàng
          getTotalNumber: () => {
            return get().products.length;
          },
          // thêm sản phẩm vào giỏ hàng
          addToCart: (item: TProductCart) => {
            // lấy mảng product cũ
            const products = get().products;
            // kiểm tra sản phẩm đang thêm có tồn tại hay chưa
            const existingProduct = products.find((product) => product._id === item._id);
            if(existingProduct) {
              // nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên 1
              const updateProducts = products.map((product) => product._id === item._id ? {...product, quantity: product.quantity + 1} : product);
              set({products: updateProducts})
            }else {
              // nếu sản phẩm chưa có trong giỏ hàng, giảm số lượng xuống 1
              set({products: [...products, {...item, quantity: 1}]})
            }
            // cập nhật lại totalAmount
            get().calculateTotalAmount();
          },
          // remove sản phẩm vào giỏ hàng
          removeFromCart: (id: string | undefined) => {
            const updateProducts = get().products.filter((product) => product._id !== id);
            set({products: updateProducts})
            // cập nhật lại totalAmount
            get().calculateTotalAmount();
          },
          // tăng số lượng sản phẩm
          increase: (id: string | undefined) => {
            const updateProducts = get().products.map((product) => product._id === id ? {...product, quantity: product.quantity + 1} : product);
            set({products : updateProducts})
            // cập nhật lại totalAmount
            get().calculateTotalAmount();
          },
          // giảm số lượng sản phẩm
          decrement: (id: string | undefined) => {
            const updateProducts = get().products.map((product) => product._id === id && product.quantity > 1 ? {...product, quantity: product.quantity - 1} : product);
            set({products : updateProducts})
            // cập nhật lại totalAmount
            get().calculateTotalAmount();
          }
        }),
        {
          name: localName, 
          storage: createJSONStorage(() => localStorage), 
        }
      )
)