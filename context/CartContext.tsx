"use client";

import { createContext, useReducer, useContext, ReactNode } from "react";

export interface CartOption {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  name: string;
  basePrice: number;
  options: CartOption[];
  totalPrice: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type Action =
  | { type: "ADD_TO_CART"; item: CartItem }
  | { type: "REMOVE_FROM_CART"; id: string }
  | { type: "CLEAR_CART" };

const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { items: [...state.items, action.item] };

    case "REMOVE_FROM_CART":
      return { items: state.items.filter((item) => item.id !== action.id) };

    case "CLEAR_CART":
      return { items: [] };

    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
} | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = (item: CartItem) => {
    dispatch({ type: "ADD_TO_CART", item });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider value={{ state, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé dans un CartProvider");
  }
  return context;
}