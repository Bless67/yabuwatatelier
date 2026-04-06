"use server";

import prisma from "@/lib/prisma";

export async function getProducts() {
  try {
    return await prisma.product.findMany({
      include: {
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Unable to load products. Please try again later.");
  }
}

export async function getProductById(id: number) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
      },
    });

    if (!product) {
      throw new Error("Product not found.");
    }

    return product;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw new Error("Unable to load product details. Please try again later.");
  }
}

export async function getFeaturedProducts(){
  try { 
  const product = await prisma.product.findMany({
    where: {featured: true},  
    include: {
      images: true,
    },
  });
  return product;

  }
  catch (error) {
    console.error(`Error fetching featured products:`, error);
    throw new Error("Unable to load featured products. Please try again later.");           
  }

}

export async function searchProducts(query: string) {
  try {
    return await prisma.product.findMany({
      where: {
        OR: [{ name: { contains: query } }, { description: { contains: query } }],
      },
      include: {
        images: true,
      },
    });
  } catch (error) {
    console.error("Error searching products:", error);
    throw new Error("Unable to search products. Please try again later.");
  }
}

export async function createProduct(
  data: {
    name: string;
    description: string;
    markupPrice: number;
    salePrice: number;
  },
  images: Array<{ url: string; alt: string }>
) {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        markupPrice: data.markupPrice,
        salePrice: data.salePrice,

        images: {
          create: images,
        },
      },
      include: {
        images: true,
      },
    });

    return { success: true, product };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: "Failed to create product" };
  }
}
