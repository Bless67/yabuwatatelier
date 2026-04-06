"use server";

import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

async function getOrCreateCart() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value as string;

  let cart = await prisma.cart.findUnique({
    where: { sessionId },
    include: { items: { include: { product: { include: { images: true } } } } },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { sessionId },
      include: {
        items: { include: { product: { include: { images: true } } } },
      },
    });
  }

  return cart;
}

export async function addToCart(productId: number, quantity: number = 1) {
  try {
    const cart = await getOrCreateCart();

    // Check if product already in cart
    const existingItem = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId },
    });

    if (existingItem) {
      // Update quantity
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      // Add new item
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw new Error("Failed to add item to cart");
  }
}

export async function removeFromCart(cartItemId: string) {
  try {
    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });
    return { success: true };
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw new Error("Failed to remove item from cart");
  }
}

export async function updateCartItemQuantity(
  cartItemId: string,
  quantity: number,
) {
  try {
    if (quantity <= 0) {
      await removeFromCart(cartItemId);
      return { success: true };
    }

    await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw new Error("Failed to update cart item");
  }
}

export async function getCart() {
  try {
    const cart = await getOrCreateCart();
    return cart;
  } catch (error) {
    console.error("Error getting cart:", error);
    throw new Error("Failed to fetch cart");
  }
}

export async function clearCart() {
  try {
    const cart = await getOrCreateCart();
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });
    return { success: true };
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw new Error("Failed to clear cart");
  }
}
