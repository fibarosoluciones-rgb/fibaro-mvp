"use client";

import { FormEvent, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { selectors, useTuLineStore } from "@/lib/store";

export default function DashboardPage() {
  const currentUser = useTuLineStore(selectors.currentUser);
  const orders = useTuLineStore(selectors.ordersForCurrentUser);
  const products = useTuLineStore((state) => state.products);
  const updateProfile = useTuLineStore((state) => state.updateProfile);

  const wishlistProducts = useMemo(() => {
    if (!currentUser) return [];
    return products.filter((product) => currentUser.wishlist.includes(product.id));
  }, [currentUser, products]);

  if (!currentUser) {
    return (
      <div className="container-max">
        <div className="dashboard-card bg-white/90 text-center">
          <p className="badge">Acceso restringido</p>
          <h1 className="section-title">Inicia sesión para entrar en tu universo Tu-Line</h1>
          <Link href="/auth" className="btn-primary mt-6">
            Acceder ahora
          </Link>
        </div>
      </div>
    );
  }

  const handleProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    updateProfile({
      phone: data.get("phone") as string,
      address: data.get("address") as string,
      fragranceFamily: data.get("fragranceFamily") as string,
      skincareFocus: data.get("skincareFocus") as string,
    });
  };

  return (
    <div className="container-max space-y-10">
      <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-6">
          <Image src={currentUser.avatar} alt={currentUser.name} width={96} height={96} className="h-24 w-24 rounded-full object-cover" />
          <div className="space-y-2">
            <p className="badge">Mi universo</p>
            <h1 className="font-display text-4xl text-tuline-ink">Hola, {currentUser.name}</h1>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              {currentUser.loyaltyTier} Member · {currentUser.email}
            </p>
          </div>
        </div>
        <div className="rounded-3xl border border-white/80 bg-white/80 p-6 text-sm text-neutral-600 shadow-soft">
          <p className="uppercase tracking-[0.3em] text-xs text-neutral-500">Siguientes hitos</p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed">
            <li>• Evento privé en Madrid · 12 octubre</li>
            <li>• Cabina Skin Lab: sesión Glow Clínico</li>
            <li>• Lanzamiento Celestia Brume (preventa)</li>
          </ul>
        </div>
      </header>

      <section className="dashboard-grid two">
        <div className="dashboard-card bg-white/90">
          <p className="badge">Datos personales</p>
          <form onSubmit={handleProfile} className="mt-4">
            <div>
              <label>Teléfono principal</label>
              <input name="phone" defaultValue={currentUser.phone} />
            </div>
            <div>
              <label>Dirección logística</label>
              <textarea name="address" rows={3} defaultValue={currentUser.address} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label>Familia olfativa favorita</label>
                <input name="fragranceFamily" defaultValue={currentUser.fragranceFamily} />
              </div>
              <div>
                <label>Enfoque skincare</label>
                <input name="skincareFocus" defaultValue={currentUser.skincareFocus} />
              </div>
            </div>
            <button type="submit" className="btn-primary mt-4 w-full">
              Guardar ajustes
            </button>
          </form>
        </div>

        <div className="dashboard-card bg-white/90">
          <p className="badge">Notificaciones</p>
          <div className="mt-4 space-y-4">
            {currentUser.notifications.map((notification) => (
              <div key={notification.id} className="rounded-2xl border border-neutral-900/10 bg-white/70 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">{notification.date}</p>
                <p className="mt-2 text-sm text-neutral-700">{notification.message}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dashboard-card bg-white/90">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="badge">Pedidos activos</p>
            <h2 className="text-xl font-semibold text-tuline-ink">Tracking en tiempo real</h2>
          </div>
          <Link href="/catalog" className="btn-secondary">
            Añadir producto
          </Link>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Tracking</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.code}</td>
                  <td className="text-neutral-600">{order.status}</td>
                  <td>{order.date}</td>
                  <td>{order.total}€</td>
                  <td>{order.trackingNumber}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-sm text-neutral-500">
                    Aún no tienes pedidos. Explora el catálogo o pide asesoría a tu concierge.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="badge">Wishlist</p>
          <Link href="/catalog" className="text-xs uppercase tracking-[0.3em] text-tuline-ink">
            Ver catálogo ↗
          </Link>
        </div>
        <div className="grid-auto-fit">
          {wishlistProducts.map((product) => (
            <div key={product.id} className="dashboard-card bg-white/85">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">{product.categoryId}</p>
              <h3 className="font-display text-2xl text-tuline-ink">{product.name}</h3>
              <p className="text-sm text-neutral-600">{product.description}</p>
              <div className="mt-3 text-xs uppercase tracking-[0.3em] text-neutral-500">
                {product.price}€ · {product.rating}★ ({product.reviews} reseñas)
              </div>
            </div>
          ))}
          {wishlistProducts.length === 0 && (
            <p className="rounded-3xl border border-dashed border-neutral-300 bg-white/70 p-10 text-center text-sm text-neutral-500">
              Aún no tienes productos guardados. Añade tus favoritos desde el catálogo para recibir alertas de reposición.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
