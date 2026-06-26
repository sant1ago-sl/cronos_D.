import { Link } from 'react-router';
import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  Check,
  CheckCircle2,
  GraduationCap,
  Landmark,
  Layers3,
  MapPin,
  Menu,
  MessageSquare,
  PlayCircle,
  ShieldCheck,
  Smartphone,
  Users,
  X
} from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import logoImg from '../logo/logo.jpeg';

const heroImage = 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1800&q=80';

const metrics = [
  {
    icon: Users,
    label: 'Comunidad educativa',
    value: 'Estudiantes y docentes',
    detail: 'Pensado para instituciones que buscan una experiencia moderna, participativa y fácil de adoptar.'
  },
  {
    icon: MapPin,
    label: 'Mercado inicial',
    value: 'Lima Metropolitana',
    detail: 'Primera etapa enfocada en colegios urbanos con acceso a internet y dispositivos.'
  },
  {
    icon: Smartphone,
    label: 'Acceso multiplataforma',
    value: 'Web y móvil',
    detail: 'Disponible para clases, refuerzo académico, tareas y aprendizaje autónomo.'
  }
];

const modules = [
  {
    icon: Bot,
    title: 'Chat y voz con IA',
    description: 'Los estudiantes conversan en tiempo real con personajes históricos por texto y voz simulada.',
    tone: 'text-blue-700 bg-blue-50'
  },
  {
    icon: Landmark,
    title: 'Personajes históricos',
    description: 'Conversaciones con figuras como Pachacútec, Bolívar o Cleopatra para aprender desde distintas perspectivas.',
    tone: 'text-amber-700 bg-amber-50'
  },
  {
    icon: Layers3,
    title: 'LMS completo',
    description: 'Cursos, módulos, tareas, evaluaciones, calificaciones, calendario y mensajería en una misma experiencia.',
    tone: 'text-emerald-700 bg-emerald-50'
  },
  {
    icon: BarChart3,
    title: 'Panel institucional',
    description: 'Docentes e instituciones gestionan contenidos, personajes, actividades y rendimiento académico.',
    tone: 'text-purple-700 bg-purple-50'
  }
];

const roleFlows = [
  {
    role: 'Estudiante Digital',
    summary: 'Pensado para estudiantes de secundaria que prefieren experiencias visuales, dinámicas e interactivas.',
    items: ['Hablar con personajes', 'Aprender con recursos visuales', 'Preparar evaluaciones', 'Estudiar a su ritmo']
  },
  {
    role: 'Docente Innovador',
    summary: 'Diseñado para docentes que buscan captar la atención y mejorar la participación en clase.',
    items: ['Crear contenidos', 'Revisar participación', 'Usar IA en aula', 'Gestionar actividades']
  },
  {
    role: 'Instituciones',
    summary: 'Colegio o academia puede administrar usuarios, licencias, reportes y adopción tecnológica.',
    items: ['Pilotos institucionales', 'Panel administrativo', 'Soporte docente', 'Reportes ejecutivos']
  }
];

const plans = [
  {
    name: 'Gratis',
    price: 'S/ 0',
    period: 'para empezar',
    features: ['1 curso activo', 'Tutor IA básico', 'Materiales demo', 'Acceso estudiante']
  },
  {
    name: 'Premium',
    price: 'S/ 14.90',
    period: 'por mes',
    featured: true,
    features: ['Cursos ilimitados', 'Personajes históricos', 'Calificaciones', 'Certificados']
  },
  {
    name: 'Familiar',
    price: 'S/ 29.90',
    period: 'por mes',
    features: ['Hasta 5 perfiles', 'Panel familiar', 'Reportes de avance', 'Soporte prioritario']
  },
  {
    name: 'Institucional',
    price: 'Desde S/ 399',
    period: 'por mes',
    features: ['Usuarios ilimitados', 'Gestión docente', 'Analíticas globales', 'Onboarding dedicado']
  },
  {
    name: 'Institucional Premium',
    price: 'Desde S/ 799',
    period: 'por mes',
    features: ['Integración completa', 'Capacitaciones', 'Soporte prioritario', 'Acompañamiento piloto']
  }
];

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <nav className="fixed top-0 z-50 w-full border-b border-white/15 bg-slate-950/75 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white overflow-hidden p-0.5">
              <img src={logoImg} alt="Cronos Digital Logo" className="h-full w-full object-contain" />
            </div>
            <span className="text-xl font-bold text-white">Cronos Digital</span>
          </a>

          <div className="hidden items-center gap-6 md:flex">
            <a href="#platform" className="text-sm text-white/80 hover:text-white">Plataforma</a>
            <a href="#roles" className="text-sm text-white/80 hover:text-white">Roles</a>
            <a href="#pricing" className="text-sm text-white/80 hover:text-white">Planes</a>
            <Link to="/login">
              <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">Iniciar sesión</Button>
            </Link>
            <Link to="/login">
              <Button className="bg-white text-slate-950 hover:bg-blue-50">Probar demo</Button>
            </Link>
          </div>

          <button className="text-white md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Abrir menú">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-slate-950 px-4 py-4 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-3">
              <a href="#platform" className="text-white/80">Plataforma</a>
              <a href="#roles" className="text-white/80">Roles</a>
              <a href="#pricing" className="text-white/80">Planes</a>
              <Link to="/login"><Button variant="outline" className="w-full border-white/30 bg-transparent text-white">Iniciar sesión</Button></Link>
              <Link to="/login"><Button className="w-full bg-white text-slate-950">Probar demo</Button></Link>
            </div>
          </div>
        )}
      </nav>

      <header id="top" className="relative min-h-[92vh] overflow-hidden">
        <img src={heroImage} alt="Machu Picchu al amanecer" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(14,165,233,0.22),transparent_34%),radial-gradient(circle_at_20%_80%,rgba(245,158,11,0.2),transparent_28%)]" />

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <h1 className="max-w-4xl text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
              Cronos Digital - Aprendiendo Historia
            </h1>
            <p className="mt-5 max-w-3xl text-xl font-medium text-blue-50 sm:text-2xl">
              Vive la historia, no solo la estudies.
            </p>
            <p className="mt-5 max-w-2xl text-lg text-slate-200">
              Plataforma web y móvil para estudiantes de secundaria, docentes e instituciones. Convierte la enseñanza tradicional en una experiencia inmersiva con personajes históricos, chat, voz, actividades y gestión académica.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/login">
                <Button size="lg" className="bg-amber-300 text-slate-950 hover:bg-amber-200">
                  Entrar a la demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#platform">
                <Button size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Ver módulos
                </Button>
              </a>
            </div>
          </motion.div>

          <div className="mt-14 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="border border-white/15 bg-slate-950/35 p-4 shadow-lg backdrop-blur-md">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-amber-300 text-slate-950">
                  <metric.icon className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold uppercase tracking-wide text-amber-200">{metric.label}</div>
                <div className="mt-1 text-2xl font-bold text-white">{metric.value}</div>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">{metric.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section id="platform" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-4">Plataforma</Badge>
            <h2 className="text-4xl font-bold">Historia interactiva con gestión académica real</h2>
            <p className="mt-4 text-lg text-slate-600">
              La propuesta une educación, tecnología y entretenimiento para incrementar interés, participación y retención del conocimiento histórico.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {modules.map((module) => (
              <Card key={module.title} className="h-full border-0 shadow-sm">
                <CardHeader>
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${module.tone}`}>
                    <module.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{module.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">{module.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="roles" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <Badge variant="outline" className="mb-4">Roles</Badge>
              <h2 className="text-4xl font-bold">Segmentación clara desde el producto</h2>
              <p className="mt-4 text-lg text-slate-600">
                El informe define un mercado inicial en Perú, con foco en Lima Metropolitana, estudiantes de secundaria y colegios con apertura a herramientas digitales.
              </p>
              <Link to="/login">
                <Button className="mt-6 bg-slate-950 hover:bg-slate-800">
                  Probar roles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {roleFlows.map((flow) => (
                <Card key={flow.role}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {flow.role === 'Estudiante Digital' ? <BookOpen className="h-5 w-5 text-blue-600" /> : flow.role === 'Docente Innovador' ? <Users className="h-5 w-5 text-emerald-600" /> : <ShieldCheck className="h-5 w-5 text-purple-600" />}
                      {flow.role}
                    </CardTitle>
                    <CardDescription>{flow.summary}</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {flow.items.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        {item}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">Misión y valores</Badge>
            <h2 className="text-4xl font-bold">Tecnología educativa con propósito</h2>
            <p className="mt-4 text-lg text-slate-300">
              Cronos Digital busca brindar soluciones educativas innovadoras mediante inteligencia artificial y herramientas interactivas, fortaleciendo pensamiento crítico, accesibilidad digital y aprendizaje significativo.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {['Innovación tecnológica', 'Compromiso educativo', 'Accesibilidad digital', 'Ética en el uso de IA', 'Creatividad e interacción', 'Calidad y mejora continua'].map((item) => (
              <div key={item} className="flex items-center gap-3 border border-white/10 bg-white/5 p-4">
                <Check className="h-5 w-5 text-amber-300" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <Badge variant="outline" className="mb-4">Planes</Badge>
            <h2 className="text-4xl font-bold">Precios de penetración para adopción rápida</h2>
            <p className="mt-4 text-lg text-slate-600">Planes accesibles para estudiantes y colegios, alineados a la estrategia inicial de entrada al mercado.</p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
            {plans.map((plan) => (
              <Card key={plan.name} className={plan.featured ? 'border-amber-300 shadow-lg' : ''}>
                <CardHeader>
                  {plan.featured && <Badge className="mb-2 w-fit bg-amber-300 text-slate-950 hover:bg-amber-300">Más elegido</Badge>}
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>
                    <span className="mt-3 block text-3xl font-bold text-slate-950">{plan.price}</span>
                    <span>{plan.period}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="mt-0.5 h-4 w-4 text-emerald-600" />
                      {feature}
                    </div>
                  ))}
                  <Link to="/login" className="block">
                    <Button className="w-full" variant={plan.featured ? 'default' : 'outline'}>
                      Empezar
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t bg-slate-50 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white overflow-hidden p-0.5 border border-slate-200">
              <img src={logoImg} alt="Cronos Digital Logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <p className="font-semibold">Cronos Digital</p>
              <p className="text-sm text-slate-500">Transformando la educación histórica con IA.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-500">
            <a href="#platform">Plataforma</a>
            <a href="#roles">Roles</a>
            <a href="#pricing">Planes</a>
            <Link to="/login">Demo</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
