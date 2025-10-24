"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { selectors, useTuLineStore } from "@/lib/store";

const emptyCategory = { name: "", slug: "", description: "", heroImage: "" };

const emptyProduct = {
  id: "",
  categoryId: "",
  name: "",
  description: "",
  highlights: "",
  notes: "",
  price: "",
  stock: "",
  rating: "4.5",
  reviews: "0",
  tags: "",
  bestseller: false,
  newArrival: false,
  image: "",
};

export default function AdminPage() {
  const isAdmin = useTuLineStore(selectors.isAdmin);
  const categories = useTuLineStore((state) => state.categories);
  const products = useTuLineStore((state) => state.products);
  const addCategory = useTuLineStore((state) => state.addCategory);
  const updateCategory = useTuLineStore((state) => state.updateCategory);
  const deleteCategory = useTuLineStore((state) => state.deleteCategory);
  const addProduct = useTuLineStore((state) => state.addProduct);
  const updateProduct = useTuLineStore((state) => state.updateProduct);
  const deleteProduct = useTuLineStore((state) => state.deleteProduct);

  const [categoryForm, setCategoryForm] = useState(emptyCategory);
  const [categoryEditing, setCategoryEditing] = useState<string | null>(null);

  const [productForm, setProductForm] = useState(emptyProduct);
  const [productEditing, setProductEditing] = useState<string | null>(null);

  const totalInventory = useMemo(
    () => products.reduce((sum, product) => sum + product.stock, 0),
    [products]
  );

  useEffect(() => {
    if (!productForm.categoryId && categories.length) {
      setProductForm((state) => ({ ...state, categoryId: categories[0].id }));
    }
  }, [categories, productForm.categoryId]);

  if (!isAdmin) {
    return (
      <div className="container-max">
        <div className="dashboard-card bg-white/90 text-center">
          <p className="badge">Acceso restringido</p>
          <h1 className="section-title">Solo el equipo Tu-Line puede acceder al panel profesional</h1>
          <Link href="/auth" className="btn-primary mt-6">
            Iniciar sesión como admin
          </Link>
        </div>
      </div>
    );
  }

  const resetCategory = () => {
    setCategoryForm(emptyCategory);
    setCategoryEditing(null);
  };

  const resetProduct = () => {
    setProductForm(emptyProduct);
    setProductEditing(null);
  };

  const handleCategorySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (categoryEditing) {
      updateCategory(categoryEditing, categoryForm);
    } else {
      addCategory(categoryForm);
    }
    resetCategory();
  };

  const handleProductSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      categoryId: productForm.categoryId || categories[0]?.id || "",
      name: productForm.name,
      description: productForm.description,
      highlights: productForm.highlights
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      notes: productForm.notes
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      price: Number(productForm.price),
      stock: Number(productForm.stock),
      rating: Number(productForm.rating),
      reviews: Number(productForm.reviews),
      tags: productForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      bestseller: productForm.bestseller,
      newArrival: productForm.newArrival,
      image: productForm.image || "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=900&q=80",
    };

    if (productEditing) {
      updateProduct(productEditing, payload);
    } else {
      addProduct(payload);
    }
    resetProduct();
  };

  return (
    <div className="container-max space-y-12">
      <header className="space-y-4">
        <p className="badge">Panel profesional Tu-Line</p>
        <h1 className="font-display text-4xl text-tuline-ink">Orquestación de catálogo y colecciones</h1>
        <p className="section-subtitle">
          Controla en un vistazo el rendimiento de tus líneas, lanza nuevas referencias y garantiza una experiencia impecable para clientas y equipo concierge.
        </p>
        <div className="grid-auto-fit">
          <div className="dashboard-card bg-white/90">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Referencias activas</p>
            <p className="mt-3 text-3xl font-semibold text-tuline-ink">{products.length}</p>
          </div>
          <div className="dashboard-card bg-white/90">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Colecciones</p>
            <p className="mt-3 text-3xl font-semibold text-tuline-ink">{categories.length}</p>
          </div>
          <div className="dashboard-card bg-white/90">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Inventario disponible</p>
            <p className="mt-3 text-3xl font-semibold text-tuline-ink">{totalInventory}</p>
          </div>
        </div>
      </header>

      <section className="dashboard-card bg-white/95 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="badge">Colecciones</p>
            <h2 className="text-xl font-semibold text-tuline-ink">Gestiona categorías</h2>
          </div>
          {categoryEditing && (
            <button className="btn-secondary" onClick={resetCategory}>
              Crear nueva
            </button>
          )}
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <form onSubmit={handleCategorySubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label>Nombre</label>
                <input
                  value={categoryForm.name}
                  onChange={(event) => setCategoryForm((state) => ({ ...state, name: event.target.value }))}
                  required
                />
              </div>
              <div>
                <label>Slug</label>
                <input
                  value={categoryForm.slug}
                  onChange={(event) => setCategoryForm((state) => ({ ...state, slug: event.target.value }))}
                  placeholder="perfumes"
                  required
                />
              </div>
            </div>
            <div>
              <label>Descripción</label>
              <textarea
                rows={3}
                value={categoryForm.description}
                onChange={(event) => setCategoryForm((state) => ({ ...state, description: event.target.value }))}
                required
              />
            </div>
            <div>
              <label>Imagen destacada (URL)</label>
              <input
                value={categoryForm.heroImage}
                onChange={(event) => setCategoryForm((state) => ({ ...state, heroImage: event.target.value }))}
                placeholder="https://"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              {categoryEditing ? "Actualizar categoría" : "Crear categoría"}
            </button>
          </form>
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.id} className="rounded-3xl border border-neutral-900/10 bg-white/70 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">{category.slug}</p>
                    <h3 className="font-display text-xl text-tuline-ink">{category.name}</h3>
                  </div>
                  <div className="flex gap-3">
                    <button
                      className="btn-secondary"
                      onClick={() => {
                        setCategoryEditing(category.id);
                        setCategoryForm({
                          name: category.name,
                          slug: category.slug,
                          description: category.description,
                          heroImage: category.heroImage,
                        });
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-secondary"
                      onClick={() => deleteCategory(category.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-sm text-neutral-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dashboard-card bg-white/95 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="badge">Productos</p>
            <h2 className="text-xl font-semibold text-tuline-ink">Añade, edita o retira referencias</h2>
          </div>
          {productEditing && (
            <button className="btn-secondary" onClick={resetProduct}>
              Crear nuevo
            </button>
          )}
        </div>
        <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
          <form onSubmit={handleProductSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label>Nombre</label>
                <input
                  value={productForm.name}
                  onChange={(event) => setProductForm((state) => ({ ...state, name: event.target.value }))}
                  required
                />
              </div>
              <div>
                <label>Categoría</label>
                <select
                  value={productForm.categoryId}
                  onChange={(event) => setProductForm((state) => ({ ...state, categoryId: event.target.value }))}
                  required
                >
                  <option value="">Selecciona</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label>Descripción</label>
              <textarea
                rows={3}
                value={productForm.description}
                onChange={(event) => setProductForm((state) => ({ ...state, description: event.target.value }))}
                required
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label>Precio (€)</label>
                <input
                  type="number"
                  value={productForm.price}
                  onChange={(event) => setProductForm((state) => ({ ...state, price: event.target.value }))}
                  required
                  min="0"
                  step="0.5"
                />
              </div>
              <div>
                <label>Stock</label>
                <input
                  type="number"
                  value={productForm.stock}
                  onChange={(event) => setProductForm((state) => ({ ...state, stock: event.target.value }))}
                  required
                  min="0"
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label>Rating</label>
                <input
                  type="number"
                  value={productForm.rating}
                  onChange={(event) => setProductForm((state) => ({ ...state, rating: event.target.value }))}
                  min="0"
                  max="5"
                  step="0.1"
                />
              </div>
              <div>
                <label>Reseñas</label>
                <input
                  type="number"
                  value={productForm.reviews}
                  onChange={(event) => setProductForm((state) => ({ ...state, reviews: event.target.value }))}
                  min="0"
                />
              </div>
              <div>
                <label>Imagen (URL)</label>
                <input
                  value={productForm.image}
                  onChange={(event) => setProductForm((state) => ({ ...state, image: event.target.value }))}
                  placeholder="https://"
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label>Highlights (uno por línea)</label>
                <textarea
                  rows={3}
                  value={productForm.highlights}
                  onChange={(event) => setProductForm((state) => ({ ...state, highlights: event.target.value }))}
                />
              </div>
              <div>
                <label>Notas / Uso (uno por línea)</label>
                <textarea
                  rows={3}
                  value={productForm.notes}
                  onChange={(event) => setProductForm((state) => ({ ...state, notes: event.target.value }))}
                />
              </div>
            </div>
            <div>
              <label>Etiquetas (separadas por coma)</label>
              <input
                value={productForm.tags}
                onChange={(event) => setProductForm((state) => ({ ...state, tags: event.target.value }))}
                placeholder="iconique, recargable"
              />
            </div>
            <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-neutral-500">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={productForm.bestseller}
                  onChange={(event) => setProductForm((state) => ({ ...state, bestseller: event.target.checked }))}
                />
                Más vendido
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={productForm.newArrival}
                  onChange={(event) => setProductForm((state) => ({ ...state, newArrival: event.target.checked }))}
                />
                Nuevo
              </label>
            </div>
            <button type="submit" className="btn-primary w-full">
              {productEditing ? "Actualizar producto" : "Crear producto"}
            </button>
          </form>
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="rounded-3xl border border-neutral-900/10 bg-white/70 p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                      {categories.find((category) => category.id === product.categoryId)?.name || "Sin categoría"}
                    </p>
                    <h3 className="font-display text-xl text-tuline-ink">{product.name}</h3>
                    <p className="text-sm text-neutral-600">Stock {product.stock} · {product.price}€</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      className="btn-secondary"
                      onClick={() => {
                        setProductEditing(product.id);
                        setProductForm({
                          id: product.id,
                          categoryId: product.categoryId,
                          name: product.name,
                          description: product.description,
                          highlights: product.highlights.join("\n"),
                          notes: product.notes.join("\n"),
                          price: String(product.price),
                          stock: String(product.stock),
                          rating: String(product.rating),
                          reviews: String(product.reviews),
                          tags: product.tags.join(", "),
                          bestseller: Boolean(product.bestseller),
                          newArrival: Boolean(product.newArrival),
                          image: product.image,
                        });
                      }}
                    >
                      Editar
                    </button>
                    <button className="btn-secondary" onClick={() => deleteProduct(product.id)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
