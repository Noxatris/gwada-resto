"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext"; // Ton contexte panier
import { CartItem, CartOption } from "@/types"; // Tes types

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  options: CartOption[];
}

export default function MenuItem({ id, name, description, basePrice, options }: MenuItemProps) {
  const { addToCart } = useCart(); // Accès au panier
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<CartOption[]>([]);

  // Ajout / Suppression d’une option
  const toggleOption = (option: CartOption) => {
    setSelectedOptions((prev) =>
      prev.some((o) => o.id === option.id)
        ? prev.filter((o) => o.id !== option.id)
        : [...prev, option]
    );
  };

  // Ajout du plat au panier
  const handleAddToCart = () => {
    const totalPrice = basePrice + selectedOptions.reduce((acc, opt) => acc + opt.price, 0);

    const cartItem: CartItem = {
      id,
      name,
      basePrice,
      options: selectedOptions,
      totalPrice,
      quantity: 1,
    };

    addToCart(cartItem);
    setIsOpen(false); // Ferme le menu après ajout
    setSelectedOptions([]); // Réinitialise les options
  };

  return (
    <div className="p-4 border-b border-gray-300">
      {/* Infos du plat */}
      <div
        className="cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        <span className="text-cyan-500 font-semibold">{basePrice} €</span>
      </div>

      {/* Options (affichées uniquement si isOpen) */}
      {isOpen && (
        <div className="mt-3 p-3 bg-gray-100 rounded-md">
          <h4 className="font-semibold mb-2">Options :</h4>
          {options.map((option) => (
            <label key={option.id} className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-cyan-500"
                checked={selectedOptions.some((o) => o.id === option.id)}
                onChange={() => toggleOption(option)}
              />
              {option.name} (+{option.price} €)
            </label>
          ))}

          {/* Bouton d’ajout au panier */}
          <button
            onClick={handleAddToCart}
            className="mt-3 w-full bg-cyan-500 text-white py-2 rounded-lg hover:bg-cyan-600"
          >
            Ajouter au panier ({basePrice + selectedOptions.reduce((acc, opt) => acc + opt.price, 0)} €)
          </button>
        </div>
      )}
    </div>
  );
}