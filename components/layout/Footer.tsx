export function Footer() {
  return (
    <footer className="border-t border-white/60 bg-white/80 py-14 text-sm text-neutral-600">
      <div className="container-max grid gap-10 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl tracking-[0.3em] text-tuline-ink">TU-LINE</p>
          <p className="mt-4 max-w-xs text-neutral-500">
            Alta perfumería y dermocosmética clínica con asesoría 360º, cabinas signature y entregas concierge.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">Maison</p>
          <p>Sobre Tu-Line</p>
          <p>Skin Lab</p>
          <p>Club Iconique</p>
        </div>
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">Atención</p>
          <p>Concierge +34 910 000 100</p>
          <p>Atención WhatsApp 24/7</p>
          <p>Envíos internacionales</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">Newsletter sensorial</p>
          <form className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input type="email" placeholder="Tu email" className="flex-1" />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Suscribirme
            </button>
          </form>
          <p className="mt-3 text-xs text-neutral-400">
            Experiencias privadas, colecciones cápsula y pre-lanzamientos directamente en tu bandeja.
          </p>
        </div>
      </div>
      <div className="container-max mt-10 flex flex-col gap-3 border-t border-white/60 pt-6 text-xs uppercase tracking-[0.3em] text-neutral-400 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Tu-Line Maison Sensorielle</p>
        <div className="flex gap-4">
          <p>Privacidad</p>
          <p>Términos</p>
          <p>Cookies</p>
        </div>
      </div>
    </footer>
  );
}
