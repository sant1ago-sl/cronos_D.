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

const historyJourneys = [
  {
    period: 'Mundo andino',
    title: 'Del ayllu al Tahuantinsuyo',
    description: 'Secuencias para entender territorio, organización, cultura material y legado desde una narrativa situada.'
  },
  {
    period: 'República y cambio',
    title: 'Decisiones que transforman una nación',
    description: 'Procesos políticos, tensiones sociales y hechos que ayudan a leer el presente desde el pasado.'
  },
  {
    period: 'Historia global',
    title: 'Ideas, revoluciones y conflictos',
    description: 'Un recorrido que conecta personajes, fuentes y consecuencias para debatir más allá de las fechas.'
  }
];

const classMoments = [
  {
    step: '01',
    title: 'Abrimos una escena',
    description: 'La clase parte de una voz, un documento o una pregunta para activar curiosidad y contexto.'
  },
  {
    step: '02',
    title: 'Conversamos con el periodo',
    description: 'El estudiante dialoga con personajes y conceptos para contrastar versiones e interpretar hechos.'
  },
  {
    step: '03',
    title: 'Cerramos con evidencia',
    description: 'La plataforma traduce la experiencia en actividades, seguimiento y evaluación útil para el docente.'
  }
];

const historicalFigures = [
  {
    name: 'Pachacutec',
    era: 'Mundo andino',
    highlight: 'Territorio, organizacion, vision politica y legado del Tahuantinsuyo.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pachacutec.jpg'
  },
  {
    name: 'Simon Bolivar',
    era: 'Independencia',
    highlight: 'Debates sobre libertad, poder, republica y construccion de identidad en America Latina.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Simon%20Bolivar.jpg'
  },
  {
    name: 'Cleopatra',
    era: 'Antiguedad',
    highlight: 'Estrategia, diplomacia y decisiones de poder en el Mediterraneo antiguo.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/The%20death%20of%20cleopatra.jpg'
  },
  {
    name: 'Leonardo da Vinci',
    era: 'Renacimiento',
    highlight: 'Arte, ciencia e invencion como puerta para leer una epoca en transformacion.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Leonardo%20self.jpg'
  }
];

const immersiveMoments = [
  {
    title: 'Escenas que ponen a la historia en movimiento',
    description: 'Paisajes, mapas, retratos y fuentes visuales ayudan a que la clase se sienta mas cercana, concreta y memorable.',
    image: 'https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=1400&q=80'
  },
  {
    title: 'Narrativas para discutir procesos y decisiones',
    description: 'Cada recurso visual se convierte en una pregunta, una conversacion y una oportunidad para interpretar hechos.',
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1400&q=80'
  },
  {
    title: 'Recorridos visuales entre pasado y presente',
    description: 'La plataforma mezcla contenido academico con recursos visuales para dar atmosfera, contexto y claridad a cada modulo.',
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1400&q=80'
  }
];

const modules = [
  {
    icon: Bot,
    title: 'Chat y voz con IA',
    description: 'Los estudiantes conversan en tiempo real con personajes históricos por texto y voz simulada.',
    tone: 'text-blue-700 bg-blue-50',
    accent: 'Diálogo guiado'
  },
  {
    icon: Landmark,
    title: 'Personajes históricos',
    description: 'Conversaciones con figuras como Pachacútec, Bolívar o Cleopatra para aprender desde distintas perspectivas.',
    tone: 'text-cyan-700 bg-cyan-50',
    accent: 'Voces del pasado'
  },
  {
    icon: Layers3,
    title: 'LMS completo',
    description: 'Cursos, módulos, tareas, evaluaciones, calificaciones, calendario y mensajería en una misma experiencia.',
    tone: 'text-emerald-700 bg-emerald-50',
    accent: 'Ruta académica'
  },
  {
    icon: BarChart3,
    title: 'Panel institucional',
    description: 'Docentes e instituciones gestionan contenidos, personajes, actividades y rendimiento académico.',
    tone: 'text-sky-700 bg-sky-50',
    accent: 'Lectura estratégica'
  }
];

const roleFlows = [
  {
    role: 'Estudiante Digital',
    summary: 'Pensado para estudiantes que recuerdan mejor cuando la historia se cuenta con escenas, voces y contexto.',
    items: ['Hablar con personajes', 'Aprender con recursos visuales', 'Preparar evaluaciones', 'Estudiar a su ritmo']
  },
  {
    role: 'Docente Innovador',
    summary: 'Diseñado para docentes que quieren pasar de la clase expositiva a una experiencia más viva y participativa.',
    items: ['Crear contenidos', 'Revisar participación', 'Usar IA en aula', 'Gestionar actividades']
  },
  {
    role: 'Instituciones',
    summary: 'Colegio o academia puede ordenar la operación y dar a Historia una propuesta diferenciadora dentro de su oferta educativa.',
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
            <h1 className="max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-7xl">
              Cronos Digital - Aprendiendo Historia
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium text-blue-50 sm:text-2xl">
              Vive la historia, no solo la estudies.
            </p>
            <p className="mt-5 max-w-2xl text-base text-slate-200 sm:text-lg">
              Plataforma web y móvil para estudiantes de secundaria, docentes e instituciones. Convierte la enseñanza tradicional en una experiencia inmersiva con personajes históricos, chat, voz, actividades y gestión académica.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/login">
                <Button size="lg" className="bg-cyan-400 text-slate-950 hover:bg-cyan-300">
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
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-400 text-slate-950">
                  <metric.icon className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold uppercase tracking-wide text-cyan-200">{metric.label}</div>
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
            <h2 className="text-3xl font-bold sm:text-4xl">Historia interactiva con gestión académica real</h2>
            <p className="mt-4 text-lg text-slate-600">
              La propuesta une educación, tecnología y entretenimiento para incrementar interés, participación y retención del conocimiento histórico.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">
              Desde culturas andinas y procesos republicanos hasta grandes transformaciones del mundo moderno, cada módulo busca que el estudiante entienda el contexto y no solo memorice fechas.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {modules.map((module) => (
              <Card key={module.title} className="h-full border-0 shadow-sm ring-1 ring-slate-100">
                <CardHeader>
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${module.tone}`}>
                    <module.icon className="h-6 w-6" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{module.accent}</p>
                  <CardTitle>{module.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">{module.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 xl:grid-cols-3">
            {historyJourneys.map((journey) => (
              <div key={journey.title} className="border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">{journey.period}</p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-950">{journey.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{journey.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
            <div className="max-w-xl">
              <Badge variant="outline" className="mb-4">Experiencia visual</Badge>
              <h2 className="text-3xl font-bold text-slate-950 sm:text-4xl">Personajes y referencias que vuelven mas viva la historia</h2>
              <p className="mt-4 text-lg text-slate-600">
                Cronos puede mostrar mejor el tipo de experiencia que promete: una plataforma donde las figuras historicas, sus decisiones y sus contextos se vuelven parte del recorrido.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  'Personajes reconocibles para conectar mas rapido con cada tema.',
                  'Imagenes que le dan presencia visual a periodos, culturas y procesos.',
                  'Un tono mas narrativo para que el producto se vea educativo, pero tambien memorable.'
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 border border-slate-200 bg-slate-50 p-4">
                    <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">
                      <Landmark className="h-4 w-4" />
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {historicalFigures.map((figure) => (
                <article key={figure.name} className="overflow-hidden border border-slate-200 bg-slate-950 text-white shadow-sm">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={figure.image} alt={figure.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    <div className="absolute left-4 top-4">
                      <span className="inline-flex items-center rounded-full bg-cyan-400 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-950">
                        {figure.era}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3 p-5">
                    <h3 className="text-2xl font-semibold">{figure.name}</h3>
                    <p className="text-sm leading-relaxed text-slate-300">{figure.highlight}</p>
                    <div className="flex items-center gap-2 text-sm text-cyan-300">
                      <MessageSquare className="h-4 w-4" />
                      Conversacion guiada, contexto y preguntas activas
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="roles" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <Badge variant="outline" className="mb-4">Roles</Badge>
              <h2 className="text-3xl font-bold sm:text-4xl">Segmentación clara desde el producto</h2>
              <p className="mt-4 text-lg text-slate-600">
                El informe define un mercado inicial en Perú, con foco en Lima Metropolitana, estudiantes de secundaria y colegios con apertura a herramientas digitales.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                La experiencia se siente cercana al aula, pero con una capa extra de narrativa: preguntas que abren debate, personajes que responden con voz propia y recorridos que conectan pasado, presente y territorio.
              </p>
              <Link to="/login">
                <Button className="mt-6 bg-slate-950 hover:bg-slate-800">
                  Probar roles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <div className="mt-10 border-l-2 border-cyan-300 pl-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Cómo se vive una clase</p>
                <div className="mt-4 space-y-4">
                  {classMoments.map((moment) => (
                    <div key={moment.step} className="grid grid-cols-[44px_1fr] gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-50 text-sm font-bold text-cyan-700 ring-1 ring-cyan-200">
                        {moment.step}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-950">{moment.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">{moment.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {roleFlows.map((flow) => (
                <Card key={flow.role} className="border-slate-200 shadow-sm">
                  <CardHeader>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {flow.role === 'Estudiante Digital' ? 'Experiencia de aprendizaje' : flow.role === 'Docente Innovador' ? 'Experiencia pedagógica' : 'Experiencia institucional'}
                    </p>
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
            <h2 className="text-3xl font-bold sm:text-4xl">Tecnología educativa con propósito</h2>
            <p className="mt-4 text-lg text-slate-300">
              Cronos Digital busca brindar soluciones educativas innovadoras mediante inteligencia artificial y herramientas interactivas, fortaleciendo pensamiento crítico, accesibilidad digital y aprendizaje significativo.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              La idea no es adornar la historia, sino devolverle densidad humana: decisiones, conflictos, voces y consecuencias que el estudiante pueda explorar de forma activa.
            </p>

            <div className="mt-8 border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Enfoque pedagógico</p>
              <p className="mt-3 text-base leading-relaxed text-slate-200">
                Cronos no presenta la historia como un bloque estático. La organiza como una secuencia de preguntas, perspectivas y evidencias para que el aula sienta el peso de los procesos humanos sin perder claridad académica.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {['Innovación tecnológica', 'Compromiso educativo', 'Accesibilidad digital', 'Ética en el uso de IA', 'Creatividad e interacción', 'Calidad y mejora continua'].map((item) => (
              <div key={item} className="flex items-center gap-3 border border-white/10 bg-white/5 p-4">
                <Check className="h-5 w-5 text-cyan-300" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <Badge variant="outline" className="mb-4">Recorrido visual</Badge>
            <h2 className="text-3xl font-bold text-slate-950 sm:text-4xl">La historia tambien entra por la escena, el gesto y el paisaje</h2>
            <p className="mt-4 text-lg text-slate-600">
              Debajo del hero, la landing necesitaba respirar mejor. Por eso sumamos imagenes que hacen mas evidente la promesa del producto: aprender historia con ambiente, personajes y contexto.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            {immersiveMoments.map((moment) => (
              <article key={moment.title} className="overflow-hidden border border-slate-200 bg-white shadow-sm">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={moment.image} alt={moment.title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Experiencia inmersiva</p>
                  <h3 className="mt-3 text-2xl font-semibold text-slate-950">{moment.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{moment.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <Badge variant="outline" className="mb-4">Planes</Badge>
            <h2 className="text-3xl font-bold sm:text-4xl">Precios de penetración para adopción rápida</h2>
            <p className="mt-4 text-lg text-slate-600">Planes accesibles para estudiantes y colegios, alineados a la estrategia inicial de entrada al mercado.</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              La propuesta parte con una base accesible, pero está pensada para crecer hacia programas institucionales donde Historia pueda convertirse en una experiencia distintiva dentro del colegio.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
            {plans.map((plan) => (
              <Card key={plan.name} className={plan.featured ? 'border-cyan-300 shadow-lg' : ''}>
                <CardHeader>
                  {plan.featured && <Badge className="mb-2 w-fit bg-cyan-400 text-slate-950 hover:bg-cyan-400">Más elegido</Badge>}
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
