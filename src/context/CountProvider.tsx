import { createContext, ReactNode, useState } from "react";

export const CartContext = createContext<CartContextType>({
  items: [],
  productCount: 0,
  totalPrice: 0,
  addProduct: () => {},
  removeProduct: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
});

interface Products {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
interface CartContextType {
  items: Products[];
  productCount: number;
  totalPrice: number;
  addProduct: (product: Products) => void;
  removeProduct: (id: string) => void;
  increaseQuantity: (product: Products) => void;
  decreaseQuantity: (product: Products) => void;
}
interface CountProviderType{
  children:ReactNode;
}

export const CountProvider = ({ children }: CountProviderType) => {
  const [items, setItems] = useState<Products[]>([]);
  const [productCount, setProductCount] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Add product or increase quantity if already in cart
  const addProduct = (product: Products) => {
    const itemInCart = items.find((item) => item.id === product.id);
    if (itemInCart) return;
    // console.log(product, "product");

    if (itemInCart) {
      increaseQuantity(product);
    } else {
      setItems([...items, { ...product, quantity: 1 }]);
      setProductCount(productCount + 1);
      setTotalPrice(totalPrice + product.price);
    }
  };

  // Remove product completely from cart
  // This will fild(true/false) and filter
  const removeProduct = (id:string) => {
    const itemToRemove = items.find((item) => item.id === id);
    if (!itemToRemove) return;

    setItems(items.filter((item) => item.id !== id));
    setProductCount(productCount - itemToRemove.quantity);
    setTotalPrice(totalPrice - itemToRemove.price * itemToRemove.quantity); // Example 100 * 3 = 300
  };

  const increaseQuantity = (product:Products) => {
    // console.log(items);

    setItems(
      items.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

    // console.log(productCount, 'increase');
    // console.log(product.id);

    setProductCount(productCount + 1);
    setTotalPrice(totalPrice + product.price);
  };

  const decreaseQuantity = (product:Products) => {
    const item = items.find((item) => item.id === product.id);
    if (!item) return;

    // console.log(productCount,'decrease');

    if (item.quantity === 1) {
      removeProduct(product.id);
    } else {
      setItems(
        items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
      setProductCount(productCount - 1);
      setTotalPrice(totalPrice - product.price);
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        productCount,
        totalPrice,
        addProduct,
        removeProduct,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
