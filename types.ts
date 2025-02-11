export interface Menu {
    id: string;
    name: string;
    restaurantId: string;
  }
  
  export interface MenuItem {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    options: CartOption[];
    menuId: string; // 🔥 Relation One-to-Many : un plat appartient à un seul menu
  }
  
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
  
  export interface CartState {
    items: CartItem[];
  }
  
  export type Action =
    | { type: "ADD_TO_CART"; item: CartItem }
    | { type: "REMOVE_FROM_CART"; id: string }
    | { type: "CLEAR_CART" };