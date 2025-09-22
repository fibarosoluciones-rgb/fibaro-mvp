
import Link from 'next/link'

export default function Home() {
  return (
    <section className="container-narrow">
      <div className="card">
        <h1 className="text-3xl font-bold">Encuentra tu tarifa ideal</h1>
        <p className="mt-2">Servicio premium, precio competente. Compara entre MásMóvil, Pepephone, Simyo y Jazztel.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/comparador" className="btn btn-primary">Comparar ahora</Link>
          <Link href="/productos" className="btn border">Ver tienda</Link>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card"><b>Asesoramiento humano</b><p className="mt-2">Nos dejas tus datos y un comercial te llama para cerrar el alta con el operador.</p></div>
        <div className="card"><b>3 opciones claras</b><p className="mt-2">Ultrabarata, Equilibrio y Cumple/Mejora. Sin letra pequeña.</p></div>
        <div className="card"><b>Plan Amigo</b><p className="mt-2">Gana hasta 50€ en tu cartera para gastar en nuestra tienda al recomendar.</p></div>
      </div>
    </section>
  )
}
