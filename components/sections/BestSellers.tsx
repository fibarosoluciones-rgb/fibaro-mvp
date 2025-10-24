"use client";

import { useTuLineStore } from "@/lib/store";
import { ProductCard } from "@/components/ui/ProductCard";

export function BestSellers() {
  const products = useTuLineStore((state) => state.products.filter((product) => product.bestseller));

  return (
    <section className="container-max mt-24 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="badge">Top ventas</p>
          <h2 className="section-title">Los iconos preferidos por la comunidad Tu-Line</h2>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-neutral-600">
          Cada pieza está validada por más de 300 clientas VIP y cuenta con reabastecimiento garantizado. Descubre sus fijaciones prolongadas, texturas clínicas y packaging recargable.
        </p>
      </div>
      <div className="grid-auto-fit">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
