import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { ProductDetail } from "@/components/xiinoon/product-detail";
import { SiteShell } from "@/components/xiinoon/site-shell";
import { notFound } from "next/navigation";

export const metadata = {
  title: "The Vajra Pen — XII NOON",
  description:
    "The thunderbolt of Indra, reimagined as an instrument of intent. 18K gold nib, hand-turned barrel, pavé diamond crown.",
};

export default function VajraPenPage() {
  const product = getProductBySlug("vajra-pen");
  if (!product) notFound();
  const related = getRelatedProducts(product.slug);
  return (
    <SiteShell>
      <ProductDetail product={product} related={related} />
    </SiteShell>
  );
}
