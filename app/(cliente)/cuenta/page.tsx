
export default function Cuenta(){
  return (
    <div className="container-narrow">
      <h1 className="text-2xl font-bold mb-4">Mi cuenta</h1>
      <ul className="list-disc pl-6">
        <li>Datos personales y KYC</li>
        <li>Mis pedidos y facturas</li>
        <li>Mis contratos y permanencia</li>
        <li>Plan Amigo (saldo y enlace)</li>
        <li>Soporte/Tickets</li>
      </ul>
      <p className="mt-4 text-sm text-neutral-600">Estas secciones se conectan a la base de datos de Supabase en cuanto configures las variables.</p>
    </div>
  )
}
