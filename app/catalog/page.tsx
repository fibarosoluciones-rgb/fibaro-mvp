"use client";

import { useMemo, useState } from "react";
import { useTuLineStore } from "@/lib/store";
import { ProductCard } from "@/components/ui/ProductCard";

const priceRanges = [
  { label: "Todos", value: "all" },
  { label: "Hasta 100€", value: "0-100" },
  { label: "100€ - 200€", value: "100-200" },
  { label: "Más de 200€", value: "200+" },
];

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState("all");
  const categories = useTuLineStore((state) => state.categories);
  const products = useTuLineStore((state) => state.products);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = category === "all" || product.categoryId === category;
      const matchesPrice = (() => {
        if (price === "all") return true;
        if (price === "0-100") return product.price <= 100;
        if (price === "100-200") return product.price > 100 && product.price <= 200;
        if (price === "200+") return product.price > 200;
        return true;
      })();
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, search, category, price]);

  return (
    <div className="container-max space-y-10">
      <header className="space-y-6">
        <p className="badge">Catálogo inteligente</p>
        <h1 className="section-title">Gestiona tus compras con filtros clínicos y olfativos</h1>
        <p className="section-subtitle">
          Busca por notas, activos, familia olfativa o rango de inversión. Cada ficha incluye recomendaciones de uso y disponibilidad en tiempo real.
        </p>
      </header>

      <div className="dashboard-card grid gap-6 bg-white/90">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <label>Buscar</label>
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Fragancia, activo, etiqueta..."
            />
          </div>
          <div>
            <label>Colección</label>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="all">Todas</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Inversión</label>
            <select value={price} onChange={(event) => setPrice(event.target.value)}>
              {priceRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-neutral-500">
          <span>{filtered.length} resultados</span>
          <span className="hidden sm:inline">•</span>
          <span>Optimizado para envíos 24h</span>
        </div>
      </div>

      <div className="grid-auto-fit">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {filtered.length === 0 && (
          <p className="rounded-3xl border border-dashed border-neutral-300 bg-white/70 p-12 text-center text-sm text-neutral-500">
            No encontramos productos con estos filtros. Ajusta la búsqueda o contacta con nuestro concierge.
          </p>
        )}
      </div>
    </div>
  );
}
