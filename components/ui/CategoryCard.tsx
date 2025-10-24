"use client";

import Image from "next/image";
import Link from "next/link";
import { Category, selectors, useTuLineStore } from "@/lib/store";

export function CategoryCard({ category }: { category: Category }) {
  const products = useTuLineStore(selectors.productsByCategory(category.id));
  return (
    <div className="card-glass flex flex-col gap-6" id={category.slug}>
      <div className="relative h-48 w-full overflow-hidden rounded-3xl">
        <Image src={category.heroImage} alt={category.name} fill className="object-cover" />
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Colección</p>
          <h3 className="font-display text-2xl text-tuline-ink">{category.name}</h3>
        </div>
        <p className="text-sm leading-relaxed text-neutral-600">{category.description}</p>
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-neutral-500">
          <span>{products.length} referencias</span>
          <Link href={`/catalog#${category.slug}`} className="text-tuline-ink">
            Ver catálogo ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
