const features = [
  {
    title: "Panel unificado",
    description: "Gestiona pedidos, reposiciones, diagnósticos y citas privadas en un dashboard minimalista con analíticas en tiempo real.",
    metric: "+38% fidelización",
  },
  {
    title: "Catálogo inteligente",
    description: "Filtra por familia olfativa, activos dermatológicos, certificaciones y disponibilidad inmediata con un solo clic.",
    metric: "120 referencias",
  },
  {
    title: "Suite colaborativa",
    description: "Comparte moodboards, playlists olfativas y protocolos clínicos con tu equipo creativo o médico de forma segura.",
    metric: "Modo multiusuario",
  },
];

export function ProfessionalSuite() {
  return (
    <section className="container-max mt-24 space-y-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="badge">Suite profesional</p>
          <h2 className="section-title">Tecnología discreta para perfiles creativos y clínicos</h2>
          <p className="section-subtitle">
            Controla cada detalle desde un espacio diseñado con la estética y la eficiencia que exige el lujo contemporáneo.
          </p>
        </div>
        <div className="rounded-3xl border border-white/80 bg-white/70 p-6 text-sm text-neutral-600 shadow-soft">
          <p>
            «Tu-Line transformó nuestra operativa. El seguimiento en vivo y los diagnósticos conectados con el laboratorio han duplicado la retención.» — Studio Mirage
          </p>
        </div>
      </div>
      <div className="grid-auto-fit">
        {features.map((feature) => (
          <div key={feature.title} className="dashboard-card space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">{feature.metric}</p>
            <h3 className="font-display text-2xl text-tuline-ink">{feature.title}</h3>
            <p className="text-sm leading-relaxed text-neutral-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
