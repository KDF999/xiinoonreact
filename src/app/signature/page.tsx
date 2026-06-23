import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { ProductDetail } from "@/components/xiinoon/product-detail";
import { SiteShell } from "@/components/xiinoon/site-shell";
import { notFound } from "next/navigation";

export const metadata = {
  title: "The Signature — XII NOON",
  description:
    "Crafted for the woman who defines her own legacy. An oval emerald dial, pavé diamond bezel, and a sculpted gold bracelet.",
};

export default function SignaturePage() {
  const product = getProductBySlug("signature");
  if (!product) notFound();
  const related = getRelatedProducts(product.slug);
  return (
    <SiteShell>
      <ProductDetail product={product} related={related} />
    </SiteShell>
  );
}
