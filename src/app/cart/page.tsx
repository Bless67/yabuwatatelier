"use client";

import type { Metadata } from "next";
import { getCart } from "@/lib/actions/cart";
import { useCart } from "@/context/CartProvider";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import CheckoutDialog from "@/components/CheckoutDialog";
import CartSkeleton from "@/components/CartSkeleton";

export const metadata: Metadata = {
  title: "Your Cart | Yabuwat Atelier",
  description:
    "Review your selected Yabuwat Atelier items, adjust quantities, and proceed with ease.",
  openGraph: {
    title: "Your Cart | Yabuwat Atelier",
    description:
      "Review your selected Yabuwat Atelier items, adjust quantities, and proceed with ease.",
    type: "website",
  },
};

interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
  productId: number;
  createdAt: Date;
}

interface Product {
  id: number;
  name: string;
  description: string | null;
  images: ProductImage[];
  createdAt: Date;
}

interface CartItem {
  id: string;
  quantity: number;
  cartId: string;
  productId: number;
  product: Product;
  createdAt: Date;
}

interface Cart {
  id: string;
  sessionId: string;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

export default function CartPage() {
  const { removeItem, updateQuantity, isLoading } = useCart();
  const [cartData, setCartData] = useState<Cart | null>(null);
  const [quantityInputs, setQuantityInputs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [isCheckoutDialogOpen, setIsCheckoutDialogOpen] = useState(false);
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState<{
    open: boolean;
    itemId: string | null;
  }>({ open: false, itemId: null });
  const [clearAllDialog, setClearAllDialog] = useState(false);

  const initializeQuantityInputs = (items: CartItem[]) => {
    return items.reduce<Record<string, string>>((acc, item) => {
      acc[item.id] = String(item.quantity);
      return acc;
    }, {});
  };

  const handleQuantityInputChange = (itemId: string, value: string) => {
    if (/^\d*$/.test(value)) {
      setQuantityInputs((prev) => ({ ...prev, [itemId]: value }));
    }
  };

  const handleQuantityInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    itemId: string,
    currentQuantity: number,
  ) => {
    if (e.key !== "Enter") return;

    const rawValue = quantityInputs[itemId] ?? String(currentQuantity);
    const newQuantity = parseInt(rawValue, 10);

    if (Number.isNaN(newQuantity) || newQuantity <= 0) {
      setQuantityInputs((prev) => ({
        ...prev,
        [itemId]: String(currentQuantity),
      }));
      return;
    }

    if (newQuantity !== currentQuantity) {
      void handleQuantityChange(itemId, newQuantity);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setCartData(data);
        setQuantityInputs(initializeQuantityInputs(data.items));
      } catch {
        console.error("Error fetching cart:");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemove = async (itemId: string) => {
    const toastId = toast.loading("Removing item...");
    try {
      await removeItem(itemId);
      setCartData((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          items: prev.items.filter((item) => item.id !== itemId),
        };
      });
      setQuantityInputs((prev) =>
        Object.fromEntries(
          Object.entries(prev).filter(([key]) => key !== itemId),
        ),
      );
      toast.success("Item removed from cart", { id: toastId });
    } catch {
      toast.error("Failed to remove item", { id: toastId });
    }
  };

  const handleClearAll = async () => {
    const toastId = toast.loading("Clearing cart...");
    try {
      const itemsToRemove = cartData?.items || [];
      await Promise.all(itemsToRemove.map((item) => removeItem(item.id)));
      setCartData((prev) => (prev ? { ...prev, items: [] } : null));
      setQuantityInputs({});
      toast.success("Cart cleared", { id: toastId });
      setClearAllDialog(false);
    } catch {
      toast.error("Failed to clear cart", { id: toastId });
    }
  };

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await handleRemove(itemId);
    } else {
      const toastId = toast.loading("Updating quantity...");
      try {
        await updateQuantity(itemId, newQuantity);
        setCartData((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            items: prev.items.map((item) =>
              item.id === itemId ? { ...item, quantity: newQuantity } : item,
            ),
          };
        });
        toast.success("Quantity updated", { id: toastId });
      } catch {
        toast.error("Failed to update quantity", { id: toastId });
      }
    }
  };

  if (loading) return <CartSkeleton />;

  const cartItems = cartData?.items || [];

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1a4d3e] mb-2">
              Your Selection
            </h1>
            <p className="text-gray-600">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </p>
          </div>
          {cartItems.length > 0 && (
            <Button
              onClick={() => setClearAllDialog(true)}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-50"
            >
              Clear All
            </Button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">Your selection is empty</p>
            <Link href="/catalog">
              <Button className="bg-[#b8a876] hover:bg-[#1a4d3e]">
                Browse Catalog
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 relative">
                      {item.product.images.length > 0 ? (
                        <Image
                          src={item.product.images[0].url}
                          alt={item.product.images[0].alt || item.product.name}
                          fill
                          className="object-cover rounded"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-[10px] text-gray-400">No Image</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#1a4d3e] text-sm sm:text-base truncate">
                        <Link href={`/product/${item.product.id}`} className="hover:text-[#b8a876]">
                          {item.product.name}
                        </Link>
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-1 mt-1">
                        {item.product.description}
                      </p>

                                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => {
                            setQuantityInputs((prev) => ({
                              ...prev,
                              [item.id]: String(Math.max(item.quantity - 1, 1)),
                            }));
                            void handleQuantityChange(item.id, item.quantity - 1);
                          }}
                          disabled={isLoading}
                          className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                        >
                          <FiMinus size={18} />
                        </button>
                        <input
                          type="number"
                          value={quantityInputs[item.id] ?? String(item.quantity)}
                          onChange={(e) => handleQuantityInputChange(item.id, e.target.value)}
                          onKeyDown={(e) => handleQuantityInputKeyDown(e, item.id, item.quantity)}
                          disabled={isLoading}
                          className="w-16 text-center border border-gray-300 rounded py-1"
                          min="1"
                        />
                        <button
                          onClick={() => {
                            setQuantityInputs((prev) => ({
                              ...prev,
                              [item.id]: String(item.quantity + 1),
                            }));
                            void handleQuantityChange(item.id, item.quantity + 1);
                          }}
                          disabled={isLoading}
                          className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                        >
                          <FiPlus size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-center">
                      <button
                        onClick={() => setDeleteConfirmDialog({ open: true, itemId: item.id })}
                        disabled={isLoading}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Panel */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-[#1a4d3e] mb-4">Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Unique items</span>
                    <span className="font-medium">{cartItems.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total units</span>
                    <span className="font-medium">
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => setIsCheckoutDialogOpen(true)}
                  className="w-full bg-[#1a4d3e] hover:bg-[#b8a876] text-white font-bold py-2 rounded-lg mb-3"
                >
                  Proceed to Checkout
                </Button>

                <Link href="/catalog">
                  <Button variant="outline" className="w-full py-2">
                    Add More Items
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <CheckoutDialog
        isOpen={isCheckoutDialogOpen}
        onOpenChange={setIsCheckoutDialogOpen}
        checkoutItems={cartItems.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
        }))}
      />

      {/* Delete Item Confirmation Dialog */}
      <Dialog
        open={deleteConfirmDialog.open}
        onOpenChange={(open) => setDeleteConfirmDialog({ open, itemId: deleteConfirmDialog.itemId })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Item</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this item from your selection?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmDialog({ open: false, itemId: null })}>
              Cancel
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600"
              onClick={() => {
                if (deleteConfirmDialog.itemId) {
                  handleRemove(deleteConfirmDialog.itemId);
                  setDeleteConfirmDialog({ open: false, itemId: null });
                }
              }}
            >
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Clear All Confirmation Dialog */}
      <Dialog open={clearAllDialog} onOpenChange={setClearAllDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clear Selection</DialogTitle>
            <DialogDescription>
              This will remove all items. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setClearAllDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-500 hover:bg-red-600" onClick={handleClearAll}>
              Clear All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}