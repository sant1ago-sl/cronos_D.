import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Progress } from '../../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Textarea } from '../../components/ui/textarea';
import { useAuth } from '../../context/AuthContext';
import { aiCharacters, mockAssignments, mockCourses, mockGrades, mockInstitutions, mockMessages, mockUsers } from '../../data/mockData';
import { UserRole } from '../../types';
import {
  Activity,
  AlertCircle,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  Brain,
  Building2,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Clock,
  CreditCard,
  Download,
  FileText,
  GraduationCap,
  KeyRound,
  Lock,
  Mail,
  MessageSquare,
  Plus,
  Save,
  Search,
  Send,
  Settings,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Target,
  TrendingUp,
  UserCog,
  Users
} from 'lucide-react';

interface GenericPageProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

const learnerRows = [
  { name: 'Ana García', course: 'Historia del Antiguo Perú', progress: 65, average: 90.5, risk: 'Bajo', lastSeen: 'Hoy' },
  { name: 'Pedro Sánchez', course: 'Segunda Guerra Mundial', progress: 48, average: 78.2, risk: 'Medio', lastSeen: 'Ayer' },
  { name: 'Valeria Rojas', course: 'Revoluciones del Siglo XIX', progress: 72, average: 86.4, risk: 'Bajo', lastSeen: 'Hace 2 h' },
  { name: 'Luis Vega', course: 'Historia del Antiguo Perú', progress: 31, average: 64.8, risk: 'Alto', lastSeen: 'Hace 4 días' }
];

const quizzes = [
  { title: 'Culturas Pre-Incaicas', course: 'Historia del Antiguo Perú', questions: 18, due: '27 Jun', average: 88, status: 'Publicado' },
  { title: 'Causas de las revoluciones', course: 'Revoluciones del Siglo XIX', questions: 12, due: '30 Jun', average: 90, status: 'Preparado' },
  { title: 'Frentes de la Segunda Guerra', course: 'Segunda Guerra Mundial', questions: 24, due: '03 Jul', average: 82, status: 'Publicado' }
];

const reports = [
  { name: 'Rendimiento por institución', owner: 'Dirección académica', cadence: 'Semanal', status: 'Listo' },
  { name: 'Uso del Tutor IA', owner: 'Producto', cadence: 'Diario', status: 'Listo' },
  { name: 'Ingresos y licencias', owner: 'Operaciones', cadence: 'Mensual', status: 'Programado' }
];

const roleLabels: Record<UserRole, string> = {
  student: 'Estudiante',
  teacher: 'Docente',
  admin: 'Administrador'
};

function StatCard({ label, value, detail, icon, tone = 'blue' }: {
  label: string;
  value: string | number;
  detail: string;
  icon: ReactNode;
  tone?: 'blue' | 'green' | 'cyan' | 'teal' | 'red' | 'slate';
}) {
  const tones = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-emerald-50 text-emerald-700',
    cyan: 'bg-cyan-50 text-cyan-700',
    teal: 'bg-teal-50 text-teal-700',
    red: 'bg-rose-50 text-rose-700',
    slate: 'bg-slate-100 text-slate-700'
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{label}</CardTitle>
        <div className={`rounded-md p-2 ${tones[tone]}`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500">{detail}</p>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ value }: { value: string }) {
  const className = value === 'Alto' || value === 'Bloqueado'
    ? 'bg-rose-50 text-rose-700 border-rose-200'
    : value === 'Medio' || value === 'Programado'
    ? 'bg-cyan-50 text-cyan-700 border-cyan-200'
    : 'bg-emerald-50 text-emerald-700 border-emerald-200';

  return <Badge variant="outline" className={className}>{value}</Badge>;
}

export default function GenericPage({ title, description, icon }: GenericPageProps) {
  const { user, switchRole, updateProfile } = useAuth();
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    institution: user?.institution || ''
  });

  useEffect(() => {
    setProfile({
      name: user?.name || '',
      email: user?.email || '',
      institution: user?.institution || ''
    });
    setSaved(false);
  }, [user?.id, user?.name, user?.email, user?.institution]);

  const filteredUsers = useMemo(() => {
    const cleanQuery = query.toLowerCase();
    return mockUsers.filter(account =>
      account.name.toLowerCase().includes(cleanQuery) ||
      account.email.toLowerCase().includes(cleanQuery) ||
      account.role.toLowerCase().includes(cleanQuery)
    );
  }, [query]);

  const pageContent = () => {
    switch (title) {
      case 'Crear Curso':
        return renderCourseCreator();
      case 'Evaluaciones':
        return renderQuizzes();
      case 'Mensajes':
        return renderMessages();
      case 'Mi Progreso':
        return renderProgress();
      case 'Configuración':
        return renderSettings();
      case 'Estudiantes':
        return renderStudents();
      case 'Analíticas':
        return renderAnalytics();
      case 'Personajes IA':
        return renderAICharacters();
      case 'Usuarios':
        return renderUsers();
      case 'Docentes':
        return renderTeachers();
      case 'Instituciones':
        return renderInstitutions();
      case 'Planes y Licencias':
        return renderPlans();
      case 'Reportes':
        return renderReports();
      case 'Configuración IA':
        return renderAIConfig();
      case 'Estadísticas Globales':
        return renderGlobalStats();
      default:
        return renderOperations();
    }
  };

  function renderCourseCreator() {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Diseñador de curso</CardTitle>
            <CardDescription>Prepara la estructura base antes de publicarla para estudiantes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nombre del curso</Label>
                <Input defaultValue="Historia del Perú Republicano" />
              </div>
              <div className="space-y-2">
                <Label>Periodo académico</Label>
                <Input defaultValue="Julio - Diciembre 2026" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Descripción</Label>
              <Textarea defaultValue="Curso orientado a comprender procesos políticos, sociales y económicos del Perú republicano mediante fuentes, debates y proyectos guiados por IA." />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {['Módulo 1: República temprana', 'Módulo 2: Reformas y conflictos', 'Módulo 3: Proyecto final'].map((moduleName, index) => (
                <div key={moduleName} className="rounded-lg border p-4">
                  <Badge variant="outline" className="mb-3">Semana {index * 3 + 1}</Badge>
                  <h3 className="font-semibold">{moduleName}</h3>
                  <p className="mt-2 text-sm text-gray-500">Lecturas, video breve, quiz y actividad aplicada.</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button className="bg-blue-700 hover:bg-blue-800">
                <Plus className="mr-2 h-4 w-4" />
                Agregar módulo
              </Button>
              <Button variant="outline">
                <Save className="mr-2 h-4 w-4" />
                Guardar borrador
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Checklist de publicación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              ['Sílabo completo', true],
              ['Primer módulo listo', true],
              ['Rúbricas cargadas', false],
              ['Tutor IA configurado', true],
              ['Calendario revisado', false]
            ].map(([label, done]) => (
              <div key={label as string} className="flex items-center gap-3">
                {done ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : <Clock className="h-5 w-5 text-cyan-700" />}
                <span className="text-sm">{label}</span>
              </div>
            ))}
            <Button className="w-full">Publicar cuando esté listo</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  function renderQuizzes() {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="Evaluaciones activas" value={quizzes.length} detail="2 publicadas, 1 borrador" icon={<ClipboardList className="h-4 w-4" />} />
          <StatCard label="Promedio general" value="86.7" detail="Últimos 30 días" icon={<Award className="h-4 w-4" />} tone="green" />
          <StatCard label="Banco de preguntas" value="214" detail="Historia, fuentes y mapas" icon={<FileText className="h-4 w-4" />} tone="cyan" />
        </div>
        <Card>
          <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Centro de evaluaciones</CardTitle>
              <CardDescription>Crea, publica y revisa quizzes por curso.</CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva evaluación
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {quizzes.map((quiz) => (
              <div key={quiz.title} className="grid grid-cols-1 gap-3 rounded-lg border p-4 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{quiz.title}</h3>
                    <StatusBadge value={quiz.status === 'Publicado' ? 'Bajo' : 'Programado'} />
                  </div>
                  <p className="text-sm text-gray-500">{quiz.course} · {quiz.questions} preguntas · vence {quiz.due}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={quiz.average} className="w-24" />
                  <span className="w-10 text-right font-semibold">{quiz.average}</span>
                  <Button variant="outline" size="sm">Revisar</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  function renderMessages() {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Bandeja de mensajes</CardTitle>
            <CardDescription>Comunicación académica entre estudiantes, docentes y administración.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockMessages.map((message) => (
              <div key={message.id} className="rounded-lg border p-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="font-semibold">{message.subject}</h3>
                    <p className="text-sm text-gray-500">De {message.from} para {message.to}</p>
                  </div>
                  <Badge variant={message.read ? 'outline' : 'default'}>{message.read ? 'Leído' : 'Nuevo'}</Badge>
                </div>
                <p className="mt-3 text-sm text-gray-600">{message.content}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Redactar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Destinatario" defaultValue={user?.role === 'student' ? 'Prof. Carlos Mendoza' : 'Ana García'} />
            <Input placeholder="Asunto" defaultValue="Seguimiento académico" />
            <Textarea placeholder="Mensaje" className="min-h-32" />
            <Button className="w-full">
              <Send className="mr-2 h-4 w-4" />
              Enviar mensaje
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  function renderProgress() {
    const average = Math.round(mockCourses.reduce((sum, course) => sum + (course.progress || 0), 0) / mockCourses.length);
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="Progreso promedio" value={`${average}%`} detail="Todos los cursos" icon={<TrendingUp className="h-4 w-4" />} />
          <StatCard label="Racha de estudio" value="12 días" detail="Meta: 20 minutos diarios" icon={<Activity className="h-4 w-4" />} tone="green" />
          <StatCard label="Logros" value="8" detail="3 desbloqueados este mes" icon={<Award className="h-4 w-4" />} tone="teal" />
          <StatCard label="Tareas al día" value="76%" detail="2 por entregar esta semana" icon={<CheckCircle2 className="h-4 w-4" />} tone="cyan" />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Mapa de avance</CardTitle>
            <CardDescription>Estado por curso y siguiente acción recomendada.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockCourses.map((course) => (
              <div key={course.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-sm text-gray-500">{course.instructor}</p>
                  </div>
                  <Badge variant="outline">{course.progress}%</Badge>
                </div>
                <Progress value={course.progress} className="mt-3" />
                <p className="mt-2 text-sm text-gray-600">Siguiente paso: repasar materiales y completar la actividad asignada.</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  function renderSettings() {
    const initials = profile.name.split(' ').filter(Boolean).map(part => part[0]).join('').slice(0, 2).toUpperCase();

    return (
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Perfil de cuenta</CardTitle>
            <CardDescription>Administra tus datos de cuenta y preferencias del panel.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-lg border bg-slate-50 p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-700 text-lg font-bold text-white ring-4 ring-cyan-200">
                    {initials || 'CD'}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{profile.name || 'Usuario Cronos'}</h3>
                    <p className="text-sm text-gray-500">{profile.email || 'correo@cronos.edu'}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="outline">{user ? roleLabels[user.role] : 'Cuenta'}</Badge>
                      <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">Activa</Badge>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm sm:text-right">
                  <div>
                    <p className="font-semibold text-gray-900">96%</p>
                    <p className="text-gray-500">Perfil completo</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">12</p>
                    <p className="text-gray-500">Días de actividad</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nombre completo</Label>
                <Input value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Correo</Label>
                <Input value={profile.email} onChange={(event) => setProfile({ ...profile, email: event.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Institución</Label>
              <Input value={profile.institution} onChange={(event) => setProfile({ ...profile, institution: event.target.value })} />
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold">Rol activo</h3>
              <p className="text-sm text-gray-500">Cambia rápidamente de vista para probar los paneles.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(['student', 'teacher', 'admin'] as UserRole[]).map((role) => (
                  <Button key={role} variant={user?.role === role ? 'default' : 'outline'} onClick={() => switchRole(role)}>
                    {roleLabels[role]}
                  </Button>
                ))}
              </div>
            </div>
            <Button
              onClick={() => {
                updateProfile(profile);
                setSaved(true);
              }}
              className="bg-blue-700 hover:bg-blue-800"
            >
              <Save className="mr-2 h-4 w-4" />
              Guardar perfil
            </Button>
            {saved && <p className="text-sm text-emerald-700">Perfil actualizado en esta sesión.</p>}
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Seguridad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                ['Contraseña', <Lock className="h-4 w-4" />],
                ['Acceso por roles', <Shield className="h-4 w-4" />],
                ['Claves API futuras', <KeyRound className="h-4 w-4" />]
              ].map(([label, itemIcon]) => (
                <div key={label as string} className="flex items-center justify-between rounded-lg border p-3">
                  <span className="text-sm">{label}</span>
                  <span className="text-gray-500">{itemIcon}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Notificaciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {['Tareas por vencer', 'Mensajes nuevos', 'Reportes semanales'].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-lg border p-3">
                  <span className="text-sm">{item}</span>
                  <Bell className="h-4 w-4 text-blue-600" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  function renderStudents() {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="Estudiantes" value={learnerRows.length} detail="En cursos activos" icon={<Users className="h-4 w-4" />} />
          <StatCard label="Promedio" value="80.0" detail="Cohorte actual" icon={<Award className="h-4 w-4" />} tone="green" />
          <StatCard label="Riesgo alto" value="1" detail="Requiere seguimiento" icon={<AlertCircle className="h-4 w-4" />} tone="red" />
          <StatCard label="Actividad" value="76%" detail="Últimos 7 días" icon={<Activity className="h-4 w-4" />} tone="cyan" />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Seguimiento de estudiantes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {learnerRows.map((student) => (
              <div key={student.name} className="grid grid-cols-1 gap-3 rounded-lg border p-4 lg:grid-cols-[1fr_160px_100px_100px_auto] lg:items-center">
                <div>
                  <h3 className="font-semibold">{student.name}</h3>
                  <p className="text-sm text-gray-500">{student.course}</p>
                </div>
                <Progress value={student.progress} />
                <span className="font-semibold">{student.average}</span>
                <StatusBadge value={student.risk} />
                <Button variant="outline" size="sm">Abrir ficha</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  function renderAnalytics() {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="Participación" value="81%" detail="+6% vs semana anterior" icon={<Activity className="h-4 w-4" />} />
          <StatCard label="Finalización" value="68%" detail="Promedio de módulos" icon={<Target className="h-4 w-4" />} tone="green" />
          <StatCard label="Uso Tutor IA" value="342" detail="Interacciones semanales" icon={<Brain className="h-4 w-4" />} tone="cyan" />
          <StatCard label="Alertas" value="7" detail="Necesitan revisión" icon={<AlertCircle className="h-4 w-4" />} tone="teal" />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Desempeño por curso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockCourses.map((course) => (
                <div key={course.id}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">{course.title}</span>
                    <span className="text-sm text-gray-500">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Acciones sugeridas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {['Enviar recordatorio a estudiantes inactivos', 'Reforzar contenidos de culturas preincaicas', 'Publicar rúbrica del proyecto final'].map((action) => (
                <div key={action} className="flex items-center gap-3 rounded-lg border p-3">
                  <Sparkles className="h-4 w-4 text-cyan-700" />
                  <span className="text-sm">{action}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  function renderAICharacters() {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Biblioteca de personajes</CardTitle>
            <CardDescription>Personajes listos para usar en conversaciones guiadas.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiCharacters.map((character) => (
              <div key={character.id} className="rounded-lg border p-4">
                <div className="flex gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-700 text-2xl ring-2 ring-cyan-300/70">
                    {character.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold">{character.name}</h3>
                    <p className="text-xs text-gray-500">{character.era}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600">{character.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Creador de personaje</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Nombre histórico" defaultValue="Micaela Bastidas" />
            <Input placeholder="Periodo" defaultValue="Rebelión de Túpac Amaru II" />
            <Textarea placeholder="Personalidad pedagógica" />
            <Button className="w-full">
              <Brain className="mr-2 h-4 w-4" />
              Preparar personaje
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  function renderUsers() {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="Usuarios" value="1,250" detail="Activos en plataforma" icon={<Users className="h-4 w-4" />} />
          <StatCard label="Estudiantes" value="1,118" detail="89% del total" icon={<GraduationCap className="h-4 w-4" />} tone="green" />
          <StatCard label="Docentes" value="96" detail="32 activos hoy" icon={<UserCog className="h-4 w-4" />} tone="cyan" />
          <StatCard label="Administradores" value="36" detail="Con permisos avanzados" icon={<Shield className="h-4 w-4" />} tone="teal" />
        </div>
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Directorio de cuentas</CardTitle>
                <CardDescription>Filtro rápido para revisar roles y acceso.</CardDescription>
              </div>
              <div className="relative md:w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input className="pl-10" placeholder="Buscar usuario..." value={query} onChange={(event) => setQuery(event.target.value)} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {filteredUsers.map((account) => (
              <div key={account.id} className="grid grid-cols-1 gap-3 rounded-lg border p-4 md:grid-cols-[1fr_auto_auto] md:items-center">
                <div>
                  <h3 className="font-semibold">{account.name}</h3>
                  <p className="text-sm text-gray-500">{account.email} · {account.institution}</p>
                </div>
                <Badge variant="outline">{roleLabels[account.role]}</Badge>
                <Button variant="outline" size="sm">Gestionar</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  function renderTeachers() {
    const teachers = mockUsers.filter(account => account.role === 'teacher');
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="Docentes activos" value={teachers.length} detail="Con cursos asignados" icon={<UserCog className="h-4 w-4" />} />
          <StatCard label="Cursos promedio" value="4.2" detail="Por docente" icon={<BookOpen className="h-4 w-4" />} tone="green" />
          <StatCard label="Satisfacción" value="94%" detail="Encuestas de estudiantes" icon={<Award className="h-4 w-4" />} tone="cyan" />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Gestión docente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {teachers.map((teacher, index) => (
              <div key={teacher.id} className="grid grid-cols-1 gap-3 rounded-lg border p-4 md:grid-cols-[1fr_160px_auto] md:items-center">
                <div>
                  <h3 className="font-semibold">{teacher.name}</h3>
                  <p className="text-sm text-gray-500">{teacher.email} · {teacher.institution}</p>
                </div>
                <span className="text-sm text-gray-600">{index + 3} cursos activos</span>
                <Button variant="outline" size="sm">Ver carga</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  function renderInstitutions() {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {mockInstitutions.map((institution) => (
          <Card key={institution.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{institution.name}</CardTitle>
                  <CardDescription>Creada el {new Date(institution.createdAt).toLocaleDateString('es-ES')}</CardDescription>
                </div>
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Badge variant="outline">{institution.plan}</Badge>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div><p className="font-bold">{institution.students}</p><p className="text-xs text-gray-500">Estudiantes</p></div>
                <div><p className="font-bold">{institution.teachers}</p><p className="text-xs text-gray-500">Docentes</p></div>
                <div><p className="font-bold">{institution.courses}</p><p className="text-xs text-gray-500">Cursos</p></div>
              </div>
              <Button variant="outline" className="w-full">Administrar</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  function renderPlans() {
    const plans = [
      { name: 'Gratis', price: 'S/ 0', users: '1 usuario', status: 'Activo' },
      { name: 'Premium', price: 'S/ 14.90', users: 'Individual', status: 'Disponible' },
      { name: 'Familiar', price: 'S/ 29.90', users: 'Hasta 5 usuarios', status: 'Disponible' },
      { name: 'Institucional', price: 'Desde S/ 399', users: 'Usuarios ilimitados', status: 'Comercial' }
    ];
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.name === 'Premium' ? 'border-cyan-300 shadow-md' : ''}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.users}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">{plan.price}</div>
              <Badge variant="outline">{plan.status}</Badge>
              <Button className="w-full" variant={plan.name === 'Premium' ? 'default' : 'outline'}>
                <CreditCard className="mr-2 h-4 w-4" />
                Gestionar plan
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  function renderReports() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Reportes ejecutivos</CardTitle>
          <CardDescription>Reportes listos para descarga o programación automática.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {reports.map((report) => (
            <div key={report.name} className="grid grid-cols-1 gap-3 rounded-lg border p-4 md:grid-cols-[1fr_140px_120px_auto] md:items-center">
              <div>
                <h3 className="font-semibold">{report.name}</h3>
                <p className="text-sm text-gray-500">{report.owner}</p>
              </div>
              <span className="text-sm text-gray-600">{report.cadence}</span>
              <StatusBadge value={report.status} />
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Descargar
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  function renderAIConfig() {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Parámetros del Tutor IA</CardTitle>
            <CardDescription>Configuración preparada para conectar OpenAI, Gemini u otro proveedor.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              ['Modelo base', 'GPT educativo con guardrails'],
              ['Tono pedagógico', 'Socrático, claro y cercano'],
              ['Fuentes permitidas', 'Materiales del curso y biblioteca curada'],
              ['Nivel de autonomía', 'Sugiere, no resuelve tareas completas']
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-1 gap-2 rounded-lg border p-4 md:grid-cols-[180px_1fr]">
                <span className="text-sm font-medium text-gray-600">{label}</span>
                <span className="text-sm">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Guardrails</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {['Citas y fuentes', 'Bloqueo de respuestas dañinas', 'Privacidad de menores', 'Registro de auditoría'].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg border p-3">
                <Shield className="h-4 w-4 text-emerald-600" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  function renderGlobalStats() {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="MRR" value="S/ 18.5k" detail="+8% mensual" icon={<CreditCard className="h-4 w-4" />} tone="green" />
          <StatCard label="Retención" value="91%" detail="Instituciones activas" icon={<Activity className="h-4 w-4" />} />
          <StatCard label="Chats IA" value="4,237" detail="Últimos 7 días" icon={<Brain className="h-4 w-4" />} tone="cyan" />
          <StatCard label="Tickets" value="12" detail="3 urgentes" icon={<AlertCircle className="h-4 w-4" />} tone="teal" />
        </div>
        <Tabs defaultValue="growth">
          <TabsList>
            <TabsTrigger value="growth">Crecimiento</TabsTrigger>
            <TabsTrigger value="quality">Calidad</TabsTrigger>
          </TabsList>
          <TabsContent value="growth">
            <Card>
              <CardHeader>
                <CardTitle>Crecimiento por institución</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockInstitutions.map((institution) => (
                  <div key={institution.id}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">{institution.name}</span>
                      <span className="text-sm text-gray-500">{institution.students} usuarios</span>
                    </div>
                    <Progress value={Math.min(100, institution.students / 7)} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="quality">
            <Card>
              <CardHeader>
                <CardTitle>Indicadores académicos</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard label="Promedio plataforma" value="86.4" detail="Cursos activos" icon={<Award className="h-4 w-4" />} tone="green" />
                <StatCard label="Finalización" value="73%" detail="Módulos completados" icon={<CheckCircle2 className="h-4 w-4" />} />
                <StatCard label="Uso semanal" value="5.8 h" detail="Por estudiante" icon={<Clock className="h-4 w-4" />} tone="cyan" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  function renderOperations() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Módulo operativo" value="Activo" detail="Disponible para el equipo" icon={<Settings className="h-4 w-4" />} />
        <StatCard label="Datos" value="Operativos" detail="Estructura lista para backend" icon={<SlidersHorizontal className="h-4 w-4" />} tone="cyan" />
        <StatCard label="Estado" value="Estable" detail="Sin pantalla vacía" icon={<CheckCircle2 className="h-4 w-4" />} tone="green" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          {icon && <div className="hidden rounded-xl bg-white p-3 shadow-sm ring-1 ring-gray-100 sm:block">{icon}</div>}
          <div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
        <Badge variant="outline" className="w-fit">
          <Sparkles className="mr-1 h-3 w-3" />
          Vista {user ? roleLabels[user.role] : 'Operativa'}
        </Badge>
      </div>

      {pageContent()}
    </div>
  );
}
