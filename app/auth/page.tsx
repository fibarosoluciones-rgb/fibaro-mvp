"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useTuLineStore } from "@/lib/store";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [message, setMessage] = useState<string | null>(null);
  const login = useTuLineStore((state) => state.login);
  const register = useTuLineStore((state) => state.register);
  const router = useRouter();

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const result = login(email, password);
    if (!result.success) {
      setMessage(result.message);
      return;
    }
    router.push("/dashboard");
  };

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const phone = data.get("phone") as string;
    const address = data.get("address") as string;
    const avatar = data.get("avatar") as string;
    const result = register({ name, email, password, phone, address, avatar });
    if (!result.success) {
      setMessage(result.message);
      return;
    }
    router.push("/dashboard");
  };

  return (
    <div className="container-max">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="text-center space-y-4">
          <p className="badge">Acceso Tu-Line</p>
          <h1 className="font-display text-4xl text-tuline-ink">
            Gestiona diagnósticos, envíos y experiencias desde tu panel exclusivo
          </h1>
          <p className="text-sm text-neutral-600">
            Accede con tu correo registrado o crea una cuenta para disfrutar de seguimiento concierge, recomendaciones personalizadas y reposiciones inteligentes.
          </p>
          <div className="rounded-full border border-neutral-900/10 bg-white/80 px-6 py-3 text-xs uppercase tracking-[0.3em] text-neutral-500">
            Credenciales demo: admin@tu-line.com / admin123
          </div>
        </div>

        <div className="dashboard-card bg-white/90">
          <div className="flex gap-4 rounded-full border border-neutral-900/10 bg-white/70 p-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 rounded-full py-3 ${mode === "login" ? "bg-tuline-ink text-white" : "hover:bg-neutral-100"}`}
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 rounded-full py-3 ${mode === "register" ? "bg-tuline-ink text-white" : "hover:bg-neutral-100"}`}
            >
              Crear cuenta
            </button>
          </div>

          {message && (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs uppercase tracking-[0.3em] text-red-500">
              {message}
            </p>
          )}

          {mode === "login" ? (
            <form onSubmit={handleLogin} className="mt-6">
              <div>
                <label>Email</label>
                <input type="email" name="email" required placeholder="tuline@ejemplo.com" />
              </div>
              <div>
                <label>Contraseña</label>
                <input type="password" name="password" required placeholder="••••••" />
              </div>
              <button type="submit" className="btn-primary w-full">
                Entrar a mi universo
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label>Nombre completo</label>
                  <input type="text" name="name" required placeholder="Tu nombre" />
                </div>
                <div>
                  <label>Correo electrónico</label>
                  <input type="email" name="email" required placeholder="tu@correo.com" />
                </div>
                <div>
                  <label>Teléfono</label>
                  <input type="tel" name="phone" required placeholder="+34 600 000 000" />
                </div>
                <div>
                  <label>Avatar (URL opcional)</label>
                  <input type="url" name="avatar" placeholder="https://" />
                </div>
              </div>
              <div>
                <label>Dirección logística</label>
                <input type="text" name="address" required placeholder="Calle, ciudad, país" />
              </div>
              <div>
                <label>Contraseña</label>
                <input type="password" name="password" required placeholder="Crea una contraseña" />
              </div>
              <button type="submit" className="btn-primary w-full">
                Crear acceso Tu-Line
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
