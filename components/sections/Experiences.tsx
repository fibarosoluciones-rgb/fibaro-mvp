const experiences = [
  {
    title: "Concierge científico 24/7",
    description:
      "Tu consultor clínico diseña protocolos a medida, gestiona reposiciones automáticas y coordina experiencias privadas en boutique o a domicilio.",
  },
  {
    title: "Skin Lab híbrido",
    description:
      "Cabinas multisensoriales con diagnóstico facial 3D, blending de perfumes en vivo y seguimiento en tu panel digital.",
  },
  {
    title: "Logística couture",
    description:
      "Entregas same-day en capitales europeas, packaging térmico para activos fotosensibles y tracking premium en tiempo real.",
  },
];

export function Experiences() {
  return (
    <section id="experiencias" className="container-max mt-24 space-y-10">
      <div>
        <p className="badge">Experiencias signature</p>
        <h2 className="section-title">Servicios pensados para clientas de alto rendimiento</h2>
        <p className="section-subtitle">
          Desde la primera consulta hasta la reposición automática, cada interacción está diseñada para ser impecable.
        </p>
      </div>
      <div className="grid-auto-fit">
        {experiences.map((experience) => (
          <div key={experience.title} className="dashboard-card space-y-4 bg-white/85">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Programa Tu-Line</p>
            <h3 className="font-display text-2xl text-tuline-ink">{experience.title}</h3>
            <p className="text-sm leading-relaxed text-neutral-600">{experience.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
