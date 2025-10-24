"use client";

import Image from "next/image";
import clsx from "clsx";
import { Product, selectors, useTuLineStore } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const toggleWishlist = useTuLineStore((state) => state.toggleWishlist);
  const wishlist = useTuLineStore((state) => selectors.currentUser(state)?.wishlist ?? []);
  const isFavourite = wishlist.includes(product.id);

  return (
    <article className="card-glass relative flex h-full flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          {product.bestseller && <span className="badge">Más vendido</span>}
          {product.newArrival && <span className="badge ml-2 bg-tuline-blush/60 text-tuline-ink">Nuevo</span>}
          <h3 className="mt-4 font-display text-2xl text-tuline-ink">{product.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">{product.description}</p>
        </div>
        <button
          onClick={() => toggleWishlist(product.id)}
          className={clsx(
            "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] transition",
            isFavourite
              ? "border-tuline-ink bg-tuline-ink text-white"
              : "border-neutral-900/10 bg-white text-neutral-500 hover:border-tuline-ink hover:text-tuline-ink"
          )}
        >
          {isFavourite ? "En wishlist" : "Guardar"}
        </button>
      </div>

      <div className="relative h-56 w-full overflow-hidden rounded-3xl bg-tuline-blush/60">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between text-neutral-600">
          <p>
            <span className="text-2xl font-semibold text-tuline-ink">{product.price}€</span>
            <span className="ml-2 text-xs uppercase tracking-[0.3em]">IVA incl.</span>
          </p>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            Stock: {product.stock}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span key={tag} className="badge bg-white/80">
              {tag}
            </span>
          ))}
        </div>
        <div className="grid gap-2">
          {product.highlights.map((highlight) => (
            <p key={highlight} className="flex items-center gap-2 text-sm text-neutral-600">
              <span className="h-1.5 w-1.5 rounded-full bg-tuline-ink" />
              {highlight}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
