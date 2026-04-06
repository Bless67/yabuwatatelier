export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
};


export function calculateDiscount(
  markupPrice: number,
  salePrice: number
): number {
  return Math.round(((markupPrice - salePrice) / markupPrice) * 100);
}
