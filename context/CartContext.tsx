"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";

// Définition du type des items du panier
type CartOption = {
  name: string;
  price: number;
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  options?: CartOption[]; // Ajout des options sélectionnées
};

type CartState = {
  items: CartItem[];
  totalPrice: number;
};

// État initial
const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

// Actions possibles
type Action =
  | { type: "ADD_TO_CART"; item: CartItem }
  | { type: "REMOVE_FROM_CART"; id: string }
  | { type: "CLEAR_CART" };

// Reducer qui met à jour le panier et recalcule le total
const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      const totalItemPrice =
        action.item.price + (action.item.options?.reduce((sum, option) => sum + option.price, 0) || 0);

      return {
        ...state,
        items: [...state.items, action.item],
        totalPrice: state.totalPrice + totalItemPrice,
      };

    case "REMOVE_FROM_CART":
      const itemToRemove = state.items.find(item => item.id === action.id);
      const itemPrice = itemToRemove
        ? itemToRemove.price + (itemToRemove.options?.reduce((sum, option) => sum + option.price, 0) || 0)
        : 0;

      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id),
        totalPrice: state.totalPrice - itemPrice,
      };

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
};

// Création du contexte
const CartContext = createContext<{
  cart: CartItem[];
  totalPrice: number;
  dispatch: React.Dispatch<Action>;
} | null>(null);

// Provider pour englober l'application
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cart: state.items, totalPrice: state.totalPrice, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
