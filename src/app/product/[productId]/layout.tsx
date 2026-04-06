import type { Metadata } from "next";
import { getProductById } from "@/lib/actions/products";

export async function generateMetadata({
  params,
}: {
  params: { productId: string };
}): Promise<Metadata> {
  try {
    const product = await getProductById(parseInt(params.productId, 10));
    const imageUrl = product.images?.[0]?.url;

    return {
      title: `${product.name} | Yabuwat Atelier`,
      description:
        product.description ||
        "Discover premium Nigerian fashion from Yabuwat Atelier.",
      openGraph: {
        title: `${product.name} | Yabuwat Atelier`,
        description:
          product.description ||
          "Discover premium Nigerian fashion from Yabuwat Atelier.",
        type: "website",
        images: imageUrl
          ? [{ url: imageUrl, alt: product.images[0]?.alt || product.name }]
          : [],
      },
    };
  } catch {
    return {
      title: "Product | Yabuwat Atelier",
      description: "Discover premium Nigerian fashion from Yabuwat Atelier.",
    };
  }
}

export default function ProductDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
