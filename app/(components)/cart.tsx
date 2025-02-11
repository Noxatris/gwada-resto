"use client";

import { useCart } from "@/context/CartContext"; // Import du contexte du panier

const Cart = () => {
    const { cart, totalPrice, removeFromCart, clearCart } = useCart();

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">🛒 Votre Panier</h2>

            {cart.length === 0 ? (
                <p className="text-gray-500">Votre panier est vide.</p>
            ) : (
                <div className="space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="p-4 flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="font-semibold">{item.name}</span>
                                <span className="text-gray-600">Qté: {item.quantity}</span>
                                {item.options.length > 0 && (
                                    <ul className="text-sm text-gray-500 mt-1">
                                        {item.options.map((opt) => (
                                            <li key={opt.id}>+ {opt.name} ({opt.price}€)</li>
                                        ))}
                                    </ul>
                                )}
                                <span className="font-semibold mt-2">{item.totalPrice}€</span>
                            </div>
                            <button onClick={() => removeFromCart(item.id)}>
                                Retirer
                            </button>
                        </div>
                    ))}

                    <div className="mt-4 p-4 border-t flex justify-between items-center">
                        <span className="text-xl font-bold">Total : {totalPrice}€</span>
                        <button onClick={clearCart}>Vider le panier</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
