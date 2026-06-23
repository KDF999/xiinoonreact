import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { ProductDetail } from "@/components/xiinoon/product-detail";
import { SiteShell } from "@/components/xiinoon/site-shell";
import { notFound } from "next/navigation";

export const metadata = {
  title: "The Emirati Edition — XII NOON",
  description:
    "A tribute to the union of two sovereign cultures. Full pavé diamond case, Arabic geometric motifs cast in 18K gold.",
};

export default function EmiratiPage() {
  const product = getProductBySlug("emirati-edition");
  if (!product) notFound();
  const related = getRelatedProducts(product.slug);
  return (
    <SiteShell>
      <ProductDetail product={product} related={related} />
    </SiteShell>
  );
}
