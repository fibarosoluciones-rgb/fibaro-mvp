"use client";

import { useTuLineStore } from "@/lib/store";
import { CategoryCard } from "@/components/ui/CategoryCard";

export function Collections() {
  const categories = useTuLineStore((state) => state.categories);

  return (
    <section id="colecciones" className="container-max mt-24 space-y-6">
      <div>
        <p className="badge">Colecciones curadas</p>
        <h2 className="section-title">Tres universos para crear tu firma sensorial</h2>
        <p className="section-subtitle">
          Perfumes de autor, tratamientos clínicos y maquillaje profesional diseñados para convivir en tu ritual diario y en tus eventos más exigentes.
        </p>
      </div>
      <div className="grid-auto-fit">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
