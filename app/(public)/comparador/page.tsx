
'use client'
import { useState, useMemo } from 'react'
import tarifas from '@/data/tarifas.sample.json'
import { recommend, type Need, type Tarifa } from '@/lib/recommender'

export default function Comparador() {
  const [type, setType] = useState<Need['type']>('fibra')
  const [down, setDown] = useState(300)
  const [up, setUp] = useState(300)
  const [datos, setDatos] = useState(20)
  const [minutos, setMinutos] = useState(1000)
  const [maxPrice, setMaxPrice] = useState<number|undefined>(30)

  const need: Need = { type, down, up, datos, minutos, maxPrice }
  const opciones = useMemo(()=>recommend(need, tarifas as unknown as Tarifa[]), [need])

  return (
    <div className="container-narrow">
      <h1 className="text-2xl font-bold mb-4">Comparador</h1>
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">Tipo
            <select className="mt-1 border rounded-lg w-full p-2" value={type} onChange={e=>setType(e.target.value as any)}>
              <option value="fibra">Fibra</option>
              <option value="movil">Móvil</option>
              <option value="pack">Pack</option>
            </select>
          </label>
          <label className="block">Precio máximo (€ / mes)
            <input className="mt-1 border rounded-lg w-full p-2" type="number" value={maxPrice??''} onChange={e=>setMaxPrice(e.target.value? Number(e.target.value): undefined)} />
          </label>
          {type!=="movil" && <label className="block">Velocidad de bajada (Mb)
            <input className="mt-1 border rounded-lg w-full p-2" type="number" value={down} onChange={e=>setDown(Number(e.target.value))} />
          </label>}
          {type!=="movil" && <label className="block">Velocidad de subida (Mb)
            <input className="mt-1 border rounded-lg w-full p-2" type="number" value={up} onChange={e=>setUp(Number(e.target.value))} />
          </label>}
          {type!=="fibra" && <label className="block">Datos (GB)
            <input className="mt-1 border rounded-lg w-full p-2" type="number" value={datos} onChange={e=>setDatos(Number(e.target.value))} />
          </label>}
          {type!=="fibra" && <label className="block">Minutos
            <input className="mt-1 border rounded-lg w-full p-2" type="number" value={minutos} onChange={e=>setMinutos(Number(e.target.value))} />
          </label>}
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-3">Tus 3 opciones</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {opciones.map(opt => (
          <div key={opt.tipo} className="card">
            <div className="badge border-neutral-300 mb-2">Opción {opt.tipo}</div>
            <h3 className="text-lg font-bold">{opt.tarifa.plan}</h3>
            <p className="text-sm text-neutral-600 capitalize">{opt.tarifa.operador}</p>
            <p className="text-3xl font-extrabold mt-2">{opt.tarifa.precio.toFixed(2)}€<span className="text-base font-medium text-neutral-500">/mes</span></p>
            <ul className="mt-2 text-sm text-neutral-700">
              {opt.tarifa.velocidadDown && <li>Fibra: {opt.tarifa.velocidadDown}/{opt.tarifa.velocidadUp} Mb</li>}
              {opt.tarifa.datos && <li>Datos: {opt.tarifa.datos} GB</li>}
              {opt.tarifa.minutos && <li>Minutos: {opt.tarifa.minutos === 9999 ? "Ilimitados" : opt.tarifa.minutos}</li>}
              {opt.tarifa.permanenciaMeses!=null && <li>Permanencia: {opt.tarifa.permanenciaMeses} meses</li>}
            </ul>
            <p className="mt-2 text-xs text-neutral-600">{opt.motivo}</p>
            <button className="btn btn-primary mt-4 w-full">Precontratar</button>
          </div>
        ))}
      </div>
    </div>
  )
}
