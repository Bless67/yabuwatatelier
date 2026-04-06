"use client";

import { useState } from "react";
import { useCart } from "@/context/CartProvider";
import { FaShoppingCart, FaCheck } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AddToCartButtonProps {
  productId: number;
  variant?: "default" | "compact";
}

export default function AddToCartButton({
  productId,
  variant = "default",
}: AddToCartButtonProps) {
  const { addItem, isLoading, isProductInCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const isInCart = isProductInCart(productId);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInCart) {
      toast.info("Item is already in your cart");
      return;
    }

    const toastId = toast.loading("Adding to cart...");
    try {
      await addItem(productId, 1);
      toast.success("Added to cart!", { id: toastId });
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart", { id: toastId });
    }
  };

  if (variant === "compact") {
    return (
      <button
        onClick={handleAddToCart}
        disabled={isLoading || isInCart}
        className={`px-3 py-2 rounded-lg text-white disabled:opacity-50 transition-all text-sm font-medium ${
          isInCart
            ? "bg-green-500 hover:bg-green-500"
            : "bg-[#b8a876] hover:bg-[#1a4d3e]"
        }`}
        aria-label={isInCart ? "Item in cart" : "Add to cart"}
        title={isInCart ? "Item already in cart" : "Add to cart"}
      >
        {isInCart ? "In Cart" : <FaShoppingCart size={20} />}
      </button>
    );
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isLoading || isInCart}
      className={`w-full text-white font-semibold transition-all py-4 ${
        isInCart
          ? "bg-green-500 hover:bg-green-500"
          : isAdded
            ? "bg-green-500 hover:bg-green-500"
            : "bg-[#b8a876] hover:bg-[#1a4d3e]"
      }`}
    >
      {isInCart ? (
        "In Cart"
      ) : isAdded ? (
        <>
          <FaCheck className="mr-2" size={18} />
          Added to Cart!
        </>
      ) : (
        <>
          <FaShoppingCart className="mr-2" size={18} />
          Add to Cart
        </>
      )}
    </Button>
  );
}
