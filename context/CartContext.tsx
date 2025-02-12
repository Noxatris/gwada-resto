"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";

// 🛒 Définition des types du panier
export interface CartOption {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  name: string;
  basePrice: number;
  quantity: number;
  options: CartOption[];
  totalPrice: number;
}

interface CartState {
  cart: CartItem[];
  totalPrice: number;
}

// 🔥 Actions disponibles pour le panier
type Action =
  | { type: "ADD_TO_CART"; item: CartItem }
  | { type: "REMOVE_FROM_CART"; id: string; options: CartOption[] }
  | { type: "CLEAR_CART" }
  | { type: "UPDATE_QUANTITY"; id: string; quantity: number };

// 🎯 Fonction `reducer` pour gérer les actions du panier
const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItemIndex = state.cart.findIndex(
        (item) =>
          item.id === action.item.id &&
          JSON.stringify(item.options) === JSON.stringify(action.item.options) // Vérifie que les options sont identiques
      );

      let updatedCart = [...state.cart];

      if (existingItemIndex !== -1) {
        // Mise à jour de la quantité et du prix si l'article est déjà dans le panier avec les mêmes options
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1,
          totalPrice: updatedCart[existingItemIndex].totalPrice + action.item.totalPrice,
        };
      } else {
        // Ajout d'un nouvel item si c'est un plat différent ou avec des options différentes
        updatedCart.push({ ...action.item, quantity: 1 });
      }

      return {
        cart: updatedCart,
        totalPrice: updatedCart.reduce((total, item) => total + item.totalPrice, 0),
      };
    }

    case "REMOVE_FROM_CART": {
      const updatedCart = state.cart.filter((item) => !(item.id === action.id && JSON.stringify(item.options) === JSON.stringify(action.options)));
      return {
        cart: updatedCart,
        totalPrice: updatedCart.reduce((total, item) => total + item.totalPrice, 0),
      };
    }

    case "UPDATE_QUANTITY": {
      const updatedCart = state.cart.map((item) =>
        item.id === action.id ? { ...item, quantity: action.quantity, totalPrice: item.basePrice * action.quantity } : item
      );
      return {
        cart: updatedCart,
        totalPrice: updatedCart.reduce((total, item) => total + item.totalPrice, 0),
      };
    }

    case "CLEAR_CART":
      return { cart: [], totalPrice: 0 };

    default:
      return state;
  }
};

// 🎯 Création du contexte du panier
const CartContext = createContext<{
  cart: CartItem[];
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, options: CartOption[]) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
} | null>(null);

// 🔥 Provider du panier (à inclure dans `_app.tsx` ou `layout.tsx`)
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: [], totalPrice: 0 });

  const addToCart = (item: CartItem) => dispatch({ type: "ADD_TO_CART", item });
  const removeFromCart = (id: string, options: CartOption[]) => dispatch({ type: "REMOVE_FROM_CART", id, options });
  const updateQuantity = (id: string, quantity: number) => dispatch({ type: "UPDATE_QUANTITY", id, quantity });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// 🎯 Hook personnalisé pour utiliser le contexte
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé à l'intérieur de CartProvider");
  }
  return context;
};
