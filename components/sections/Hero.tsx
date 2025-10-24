"use client";

import Link from "next/link";
import Image from "next/image";
import { useTuLineStore } from "@/lib/store";

export function Hero() {
  const highlight = useTuLineStore((state) => state.products.find((product) => product.bestseller));

  return (
    <section className="container-max grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
      <div className="space-y-7">
        <span className="badge">Maison sensorielle digital</span>
        <h1 className="font-display text-5xl leading-tight text-tuline-ink md:text-6xl">
          Perfumería de autor y dermocosmética clínica en un ecosistema ultra personalizado.
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-neutral-600">
          Tu-Line reúne fragancias firmadas por narices internacionales y tratamientos formulados con activos médicos en un panel donde controlas tus diagnósticos, entregas concierge y experiencias privadas.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/catalog" className="btn-primary">
            Explorar catálogo exclusivo
          </Link>
          <Link href="/auth" className="btn-secondary">
            Accede a tu universo
          </Link>
        </div>
        {highlight && (
          <div className="dashboard-card mt-8 flex flex-col gap-4 bg-white/80">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Destacado Maison</p>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Rating {highlight.rating}★</p>
            </div>
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="relative h-32 w-full overflow-hidden rounded-3xl bg-tuline-blush/60 md:w-40">
                <Image src={highlight.image} alt={highlight.name} fill className="object-cover" />
              </div>
              <div className="space-y-3">
                <h3 className="font-display text-2xl text-tuline-ink">{highlight.name}</h3>
                <p className="text-sm leading-relaxed text-neutral-600">{highlight.description}</p>
                <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-neutral-500">
                  {highlight.highlights.slice(0, 2).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <div className="card-glass relative overflow-hidden bg-white/60">
          <Image
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80"
            alt="Colección Tu-Line"
            width={700}
            height={860}
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8 text-white">
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-100">Cabina Signature</p>
            <p className="mt-3 text-lg font-semibold">
              Diagnóstico olfativo y tratamiento facial simultáneo con asesoría de nuestro concierge científico.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
