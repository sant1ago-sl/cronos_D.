import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { BookOpen, GraduationCap, Shield, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAuth } from '../context/AuthContext';
import logoImg from '../logo/logo.jpeg';

const highlights = [
  {
    icon: BookOpen,
    title: 'Aprendizaje con contexto',
    description: 'Personajes, actividades y contenido historico conectados con la clase real.'
  },
  {
    icon: Users,
    title: 'Roles claros',
    description: 'Estudiantes, docentes e instituciones dentro de una misma experiencia ordenada.'
  },
  {
    icon: Shield,
    title: 'Acceso simple',
    description: 'Ingreso directo para revisar la demo sin pasos innecesarios ni ruido visual.'
  }
];

const demoRoles = [
  {
    role: 'student' as const,
    label: 'Estudiante',
    description: 'Explora cursos, tareas y tutor IA.',
    icon: BookOpen
  },
  {
    role: 'teacher' as const,
    label: 'Docente',
    description: 'Gestiona contenidos, sesiones y evaluaciones.',
    icon: GraduationCap
  },
  {
    role: 'admin' as const,
    label: 'Administrador',
    description: 'Revisa paneles, usuarios y operacion general.',
    icon: Shield
  }
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/dashboard');
    }
  };

  const quickLogin = (role: 'student' | 'teacher' | 'admin') => {
    const emails = {
      student: 'estudiante@cronos.edu',
      teacher: 'profesor@cronos.edu',
      admin: 'admin@cronos.edu'
    };

    if (login(emails[role], 'demo123')) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl grid-cols-1 overflow-hidden border border-slate-200 bg-white shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] lg:grid-cols-[1.05fr_0.95fr]">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col justify-between border-b border-slate-200 bg-slate-950 px-6 py-8 text-white lg:border-b-0 lg:border-r lg:px-10 lg:py-10"
        >
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-md bg-white p-1">
                <img src={logoImg} alt="Cronos Digital Logo" className="h-full w-full object-contain" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Cronos Digital</p>
                <h1 className="text-2xl font-semibold text-white">Acceso a la plataforma</h1>
              </div>
            </div>

            <div className="mt-10 max-w-xl space-y-4">
              <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
                Un ingreso mas sobrio para una plataforma educativa real.
              </h2>
              <p className="text-sm leading-7 text-slate-300 sm:text-base">
                Ajustamos esta vista para que se sienta mas institucional, clara y confiable. El objetivo es que el acceso acompañe la marca, no que compita con ella.
              </p>
            </div>

            <div className="mt-10 grid gap-4">
              {highlights.map((item) => (
                <div key={item.title} className="grid grid-cols-[44px_1fr] gap-4 border border-white/10 bg-white/5 p-4">
                  <div className="flex h-11 w-11 items-center justify-center bg-cyan-400/12 text-cyan-300">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-sm text-slate-400">
            Demo institucional para revision local y despliegue en Vercel.
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex items-center px-4 py-6 sm:px-6 lg:px-10"
        >
          <div className="w-full">
            <div className="mb-6 lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-white p-1">
                  <img src={logoImg} alt="Cronos Digital Logo" className="h-full w-full object-contain" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Cronos Digital</p>
                  <p className="text-sm text-slate-500">Aprendiendo Historia</p>
                </div>
              </div>
            </div>

            <Card className="border-slate-200 shadow-none">
              <CardHeader className="space-y-2 border-b border-slate-100 pb-6">
                <CardTitle className="text-2xl font-semibold text-slate-950">Iniciar sesion</CardTitle>
                <CardDescription className="text-sm leading-6 text-slate-500">
                  Ingresa con tus credenciales o revisa la plataforma desde uno de los accesos de prueba.
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-6">
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid h-auto w-full grid-cols-2 rounded-md border border-slate-200 bg-slate-50 p-1">
                    <TabsTrigger
                      value="login"
                      className="rounded-sm px-3 py-2 text-sm data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-sm"
                    >
                      Ingresar
                    </TabsTrigger>
                    <TabsTrigger
                      value="demo"
                      className="rounded-sm px-3 py-2 text-sm data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-sm"
                    >
                      Acceso rapido
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="mt-6">
                    <form onSubmit={handleLogin} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-slate-700">Correo electronico</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="tu@institucion.edu"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="h-11 border-slate-300 bg-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-slate-700">Contrasena</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Ingresa tu contrasena"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="h-11 border-slate-300 bg-white"
                        />
                      </div>

                      <div className="flex items-center justify-between gap-4 text-sm">
                        <label className="flex items-center gap-2 text-slate-600">
                          <input type="checkbox" className="h-4 w-4 border-slate-300 accent-cyan-700" />
                          Mantener sesion
                        </label>
                        <a href="#" className="text-cyan-800 hover:text-cyan-900">
                          Recuperar acceso
                        </a>
                      </div>

                      <Button type="submit" className="h-11 w-full rounded-md bg-slate-950 text-white hover:bg-slate-800">
                        Entrar a Cronos
                      </Button>

                      <p className="text-center text-sm text-slate-500">
                        Solicita tu acceso institucional si aun no tienes cuenta.
                      </p>
                    </form>
                  </TabsContent>

                  <TabsContent value="demo" className="mt-6 space-y-3">
                    <p className="text-sm leading-6 text-slate-500">
                      Revisa la experiencia segun el perfil que necesites evaluar.
                    </p>

                    {demoRoles.map((item) => (
                      <button
                        key={item.role}
                        type="button"
                        onClick={() => quickLogin(item.role)}
                        className="grid w-full grid-cols-[44px_1fr] gap-4 border border-slate-200 bg-white px-4 py-4 text-left transition hover:border-cyan-300 hover:bg-slate-50"
                      >
                        <div className="flex h-11 w-11 items-center justify-center bg-slate-100 text-slate-700">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-950">{item.label}</div>
                          <div className="mt-1 text-sm text-slate-500">{item.description}</div>
                        </div>
                      </button>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <p className="mt-6 text-center text-xs leading-6 text-slate-500">
              Al continuar, aceptas los terminos de servicio y la politica de privacidad.
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
