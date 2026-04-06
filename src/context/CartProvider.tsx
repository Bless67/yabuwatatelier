"use client"

import { createContext, useContext, ReactNode, useEffect, useState, useCallback } from "react";
import { getCart, addToCart, removeFromCart, updateCartItemQuantity } from "@/lib/actions/cart";

interface CartItem {
  id: string;
  quantity: number;
  productId: number;
}

export interface CartContextType {
  cartQuantity: number;
  cartItems: CartItem[];
  isLoading: boolean;
  isProductInCart: (productId: number) => boolean;
  refetchCart: () => Promise<void>;
  addItem: (productId: number, quantity?: number) => Promise<void>;
  removeItem: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refetchCart = useCallback(async () => {
    try {
      const data = await getCart();
      let total = 0;
      const items: CartItem[] = [];
      data.items.forEach((i) => {
        total += i.quantity;
        items.push({
          id: i.id,
          quantity: i.quantity,
          productId: i.productId,
        });
      });
      setCartQuantity(total);
      setCartItems(items);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }, []);

  const isProductInCart = useCallback((productId: number) => {
    return cartItems.some((item) => item.productId === productId);
  }, [cartItems]);

  const addItem = useCallback(async (productId: number, quantity: number = 1) => {
    setIsLoading(true);
    try {
      await addToCart(productId, quantity);
      await refetchCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsLoading(false);
    }
  }, [refetchCart]);

  const removeItem = useCallback(async (cartItemId: string) => {
    setIsLoading(true);
    try {
      await removeFromCart(cartItemId);
      await refetchCart();
    } catch (error) {
      console.error("Error removing from cart:", error);
    } finally {
      setIsLoading(false);
    }
  }, [refetchCart]);

  const updateQuantity = useCallback(async (cartItemId: string, quantity: number) => {
    setIsLoading(true);
    try {
      await updateCartItemQuantity(cartItemId, quantity);
      await refetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setIsLoading(false);
    }
  }, [refetchCart]);

  useEffect(() => {
    refetchCart();
  }, [refetchCart]);

  const value: CartContextType = {
    cartQuantity,
    cartItems,
    isLoading,
    isProductInCart,
    refetchCart,
    addItem,
    removeItem,
    updateQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
