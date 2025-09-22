
import './globals.css'
import Image from 'next/image'
import Link from 'next/link'
import { BRAND } from '@/lib/config'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="border-b sticky top-0 bg-white/80 backdrop-blur z-50">
          <div className="container flex items-center justify-between py-3">
            <Link href="/" className="flex items-center gap-2">
              <Image src={BRAND.logo} alt="Fíbaro" width={120} height={40} />
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/comparador">Comparador</Link>
              <Link href="/productos">Tienda</Link>
              <Link href="/cuenta" className="btn btn-primary">Mi cuenta</Link>
            </nav>
          </div>
        </header>
        <main className="container py-8">{children}</main>
        <footer className="border-t py-8 text-sm">
          <div className="container-narrow">
            <p>© {new Date().getFullYear()} Fíbaro · Mejias Business SL · CIF B75334714 · Calle Víctor Jara, 5</p>
            <p className="mt-2">Este sitio actúa como intermediario/asesor en contratación de tarifas de terceros.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
