
export default function Admin(){
  return (
    <div className="container-narrow">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      <ul className="grid gap-3">
        <li className="card"><b>Branding</b>: logos/colores/tipografías</li>
        <li className="card"><b>Tarifas de operadores</b>: CRUD y vigencias</li>
        <li className="card"><b>Productos propios</b>: catálogo, stock, ofertas</li>
        <li className="card"><b>Leads y precontratos</b>: estados y asignación</li>
        <li className="card"><b>Distribuidores y comisiones</b></li>
        <li className="card"><b>Objetivos comerciales</b> y recompensas</li>
        <li className="card"><b>Plan Amigo</b>: saldo y reglas</li>
        <li className="card"><b>Notificaciones</b>: plantillas e idioma</li>
      </ul>
      <p className="mt-4 text-sm text-neutral-600">El acceso estará protegido por roles (Supabase Auth + RLS). Este esqueleto es la base para conectar cada módulo.</p>
    </div>
  )
}
