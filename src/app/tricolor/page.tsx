import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { ProductDetail } from "@/components/xiinoon/product-detail";
import { SiteShell } from "@/components/xiinoon/site-shell";
import { notFound } from "next/navigation";

export const metadata = {
  title: "The Tricolor Edition — XII NOON",
  description:
    "India's sovereignty, crystallised in horology. Saffron sapphires, white diamonds, green emeralds. The Ashoka Chakra in platinum filigree.",
};

export default function TricolorPage() {
  const product = getProductBySlug("tricolor");
  if (!product) notFound();
  const related = getRelatedProducts(product.slug);
  return (
    <SiteShell>
      <ProductDetail product={product} related={related} />
    </SiteShell>
  );
}
