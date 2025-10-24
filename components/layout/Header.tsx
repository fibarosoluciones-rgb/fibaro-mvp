"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { selectors, useTuLineStore } from "@/lib/store";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/#colecciones", label: "Colecciones" },
  { href: "/#experiencias", label: "Experiencias" },
  { href: "/catalog", label: "Catálogo" },
  { href: "/dashboard", label: "Mi universo" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const currentUser = useTuLineStore(selectors.currentUser);
  const isAdmin = useTuLineStore(selectors.isAdmin);
  const logout = useTuLineStore((state) => state.logout);

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/90 backdrop-blur">
      <div className="container-max flex items-center justify-between py-5">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-tuline-ink text-lg font-semibold tracking-[0.2em] text-white">
            TL
          </span>
          <div className="leading-tight">
            <p className="font-display text-lg tracking-[0.3em] text-tuline-ink">TU-LINE</p>
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">Maison Sensorielle</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-[0.3em] text-neutral-500 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-tuline-ink">
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link href="/admin" className="rounded-full border border-neutral-900/10 px-4 py-2 text-xs hover:border-tuline-ink hover:text-tuline-ink">
              Panel Admin
            </Link>
          )}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="text-right text-xs uppercase tracking-[0.3em] text-neutral-500">
                <p className="text-neutral-900">{currentUser.name}</p>
                <p>{currentUser.loyaltyTier} Member</p>
              </div>
              <Image
                src={currentUser.avatar}
                alt={currentUser.name}
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover"
              />
              <button
                className="btn-secondary hidden md:inline-flex"
                onClick={() => logout()}
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/auth" className="btn-secondary">
                Acceso Tu-Line
              </Link>
            </div>
          )}
        </div>

        <button
          className="lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Abrir menú"
        >
          <span className="block h-0.5 w-6 bg-neutral-900"></span>
          <span className="mt-1 block h-0.5 w-6 bg-neutral-900"></span>
          <span className="mt-1 block h-0.5 w-6 bg-neutral-900"></span>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/60 bg-white/95 px-6 py-6 text-sm uppercase tracking-[0.3em] text-neutral-500 lg:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link href="/admin" onClick={() => setOpen(false)} className="font-semibold text-tuline-ink">
                Panel Admin
              </Link>
            )}
            {currentUser ? (
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="text-left font-semibold text-tuline-ink"
              >
                Cerrar sesión
              </button>
            ) : (
              <Link href="/auth" onClick={() => setOpen(false)} className="font-semibold text-tuline-ink">
                Acceso Tu-Line
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
