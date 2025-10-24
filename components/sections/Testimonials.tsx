const testimonials = [
  {
    name: "María Lledó",
    role: "Directora Creativa, Barcelona",
    quote:
      "El panel de Tu-Line me permite aprobar campañas, recibir moodboards olfativos y coordinar envíos express en menos de dos horas.",
  },
  {
    name: "Anaïs Dupont",
    role: "Fotógrafa beauty, París",
    quote:
      "El maquillaje HD velvet aguanta sesiones de 14 horas. Tener reposición automática y seguimiento por WhatsApp ha cambiado mis producciones.",
  },
  {
    name: "Lucía Cortés",
    role: "Dermatóloga estética, Madrid",
    quote:
      "Integramos Tu-Line Skin Lab en la clínica. El diagnóstico facial remoto y la perfumería personalizada fidelizan al paciente de inmediato.",
  },
];

export function Testimonials() {
  return (
    <section className="container-max mt-24 space-y-6">
      <div>
        <p className="badge">Voces del club</p>
        <h2 className="section-title">Referentes creativas y clínicas confían en Tu-Line</h2>
      </div>
      <div className="grid-auto-fit">
        {testimonials.map((testimonial) => (
          <div key={testimonial.name} className="dashboard-card space-y-4 bg-white/90">
            <p className="text-lg leading-relaxed text-neutral-700">“{testimonial.quote}”</p>
            <div className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              <p className="text-neutral-900">{testimonial.name}</p>
              <p>{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
