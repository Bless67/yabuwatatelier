"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { FaWhatsapp } from "react-icons/fa";

interface CheckoutDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  checkoutItems: {
    name: string;
    quantity: number;
  }[];
}

export default function CheckoutDialog({
  isOpen,
  onOpenChange,
  checkoutItems,
}: CheckoutDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleWhatsAppCheckout = () => {
    setIsLoading(true);

    const itemLines = checkoutItems
      .map((item) => `${item.quantity} x ${item.name}`)
      .join("\n");

    const message = encodeURIComponent(
      `Hi! I'd like to inquire about the following items:\n${itemLines}\n\nPlease confirm availability and next steps.`
    );


    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");

    setIsLoading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#1a4d3e]">
            Confirm Inquiry
          </DialogTitle>
          <DialogDescription>
            You will be redirected to WhatsApp
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Info Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              Click the button below to send your list to us via WhatsApp.
              Our team will check availability and provide further details.
            </p>
          </div>

          {/* Selection Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600 font-medium">Items Selected:</span>
              <span className="text-2xl font-bold text-[#1a4d3e]">
                {checkoutItems.length}
              </span>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              {checkoutItems.map((item, index) => (
                <li key={`${item.name}-${index}`}>
                  <span className="font-medium">{item.quantity}x</span> {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="w-full sm:w-auto sm:mr-3"
          >
            Cancel
          </Button>
          <Button
            onClick={handleWhatsAppCheckout}
            disabled={isLoading}
            className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2"
          >
            <FaWhatsapp size={18} />
            {isLoading ? "Redirecting..." : "Checkout via WhatsApp"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}