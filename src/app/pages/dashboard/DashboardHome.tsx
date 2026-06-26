import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import {
  BookOpen,
  Calendar,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Users,
  BarChart3,
  Award,
  Brain,
  Plus,
  ArrowRight
} from 'lucide-react';
import { mockCourses, mockAssignments, mockCalendarEvents } from '../../data/mockData';

export default function DashboardHome() {
  const { user } = useAuth();

  if (user?.role === 'student') {
    return <StudentDashboard />;
  } else if (user?.role === 'teacher') {
    return <TeacherDashboard />;
  } else {
    return <AdminDashboard />;
  }
}

function StudentDashboard() {
  const upcomingAssignments = mockAssignments.filter(a => a.status === 'pending').slice(0, 3);
  const upcomingEvents = mockCalendarEvents.slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Bienvenido de nuevo</h1>
        <p className="text-gray-600">Aquí está tu resumen de aprendizaje</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Cursos Activos</CardTitle>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-500">En progreso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Tareas por entregar</CardTitle>
            <AlertCircle className="w-4 h-4 text-cyan-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-gray-500">2 vencen esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Promedio General</CardTitle>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88.5</div>
            <p className="text-xs text-green-600">+2.5 vs mes anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Horas Estudiadas</CardTitle>
            <Clock className="w-4 h-4 text-cyan-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24h</div>
            <p className="text-xs text-gray-500">Esta semana</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mis Cursos */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Mis Cursos</h2>
            <Link to="/dashboard/courses">
              <Button variant="ghost" size="sm">
                Ver todos <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {mockCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription className="mt-1">{course.instructor}</CardDescription>
                    </div>
                    <Badge variant="outline">{course.progress}% completo</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={course.progress} className="mb-3" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{course.students} estudiantes</span>
                    <Link to={`/dashboard/courses/${course.id}`}>
                      <Button size="sm" variant="outline">Continuar</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Access to AI Tutor */}
          <Card className="bg-blue-700 text-white border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-white">Tutor IA Personalizado</CardTitle>
                  <CardDescription className="text-white/80">
                    Haz preguntas o chatea con personajes históricos
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link to="/dashboard/ai-tutor">
                <Button variant="secondary" className="w-full">
                  Abrir Tutor IA
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Próximas Tareas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-cyan-700" />
                Próximas Tareas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingAssignments.map((assignment) => (
                <div key={assignment.id} className="border-l-4 border-cyan-500 pl-3 py-2">
                  <p className="font-medium text-sm">{assignment.title}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(assignment.dueDate).toLocaleDateString('es-ES', { 
                      day: 'numeric', 
                      month: 'short' 
                    })}
                  </div>
                </div>
              ))}
              <Link to="/dashboard/assignments">
                <Button variant="outline" size="sm" className="w-full">
                  Ver todas las tareas
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Calendario */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Próximos Eventos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-3">
                  <div className="w-12 text-center">
                    <div className="text-2xl font-bold">
                      {new Date(event.date).getDate()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(event.date).toLocaleDateString('es-ES', { month: 'short' })}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.course}</p>
                  </div>
                </div>
              ))}
              <Link to="/dashboard/calendar">
                <Button variant="outline" size="sm" className="w-full">
                  Ver calendario completo
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Logros Recientes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-700" />
                Logros Recientes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                  🏆
                </div>
                <div>
                  <p className="font-medium text-sm">Primera Tarea Perfecta</p>
                  <p className="text-xs text-gray-500">Hace 2 días</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  ⭐
                </div>
                <div>
                  <p className="font-medium text-sm">7 Días Consecutivos</p>
                  <p className="text-xs text-gray-500">Hace 5 días</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Panel del Docente</h1>
          <p className="text-gray-600">Gestiona tus cursos y estudiantes</p>
        </div>
        <Link to="/dashboard/courses/create">
          <Button className="bg-blue-700 hover:bg-blue-800">
            <Plus className="mr-2 w-4 h-4" />
            Crear Curso
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Cursos Activos</CardTitle>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-gray-500">85 estudiantes totales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Tareas por Revisar</CardTitle>
            <AlertCircle className="w-4 h-4 text-cyan-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-500">3 vencen hoy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Promedio Curso</CardTitle>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86.2</div>
            <p className="text-xs text-green-600">+3.1 vs periodo anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Tasa de Aprobación</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-gray-500">De estudiantes activos</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mis Cursos */}
        <Card>
          <CardHeader>
            <CardTitle>Mis Cursos</CardTitle>
            <CardDescription>Cursos que estás impartiendo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockCourses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div>
                  <p className="font-medium">{course.title}</p>
                  <p className="text-sm text-gray-500">{course.students} estudiantes</p>
                </div>
                <Link to={`/dashboard/courses/${course.id}`}>
                  <Button size="sm" variant="outline">Gestionar</Button>
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Actividad Reciente */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas entregas y actividades</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { student: 'Ana García', action: 'Entregó tarea', course: 'Historia del Antiguo Perú', time: 'Hace 15 min' },
              { student: 'Pedro Sánchez', action: 'Completó quiz', course: 'Segunda Guerra Mundial', time: 'Hace 1 hora' },
              { student: 'María López', action: 'Comentó en foro', course: 'Revoluciones del Siglo XIX', time: 'Hace 2 horas' }
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                  {activity.student.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <p className="text-sm"><span className="font-medium">{activity.student}</span> {activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.course}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Panel Administrativo</h1>
        <p className="text-gray-600">Vista general de la plataforma</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Usuarios Activos</CardTitle>
            <Users className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-green-600">+12% vs mes anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Cursos Totales</CardTitle>
            <BookOpen className="w-4 h-4 text-cyan-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">132</div>
            <p className="text-xs text-gray-500">85 activos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Instituciones</CardTitle>
            <Users className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-gray-500">3 nuevas este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Ingresos MRR</CardTitle>
            <BarChart3 className="w-4 h-4 text-cyan-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">S/ 18.5k</div>
            <p className="text-xs text-green-600">+8% vs mes anterior</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Instituciones */}
        <Card>
          <CardHeader>
            <CardTitle>Instituciones Principales</CardTitle>
            <CardDescription>Por número de usuarios</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: 'Colegio San Martín', users: 450, plan: 'Institucional', growth: '+15%' },
              { name: 'Colegio Libertad', users: 680, plan: 'Institucional', growth: '+8%' },
              { name: 'Academia Pre-U', users: 120, plan: 'Premium', growth: '+22%' }
            ].map((inst, i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{inst.name}</p>
                  <p className="text-sm text-gray-500">{inst.users} usuarios • {inst.plan}</p>
                </div>
                <Badge variant="outline" className="text-green-600">
                  {inst.growth}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Actividad de IA */}
        <Card>
          <CardHeader>
            <CardTitle>Uso de IA</CardTitle>
            <CardDescription>Interacciones esta semana</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Tutor IA</span>
                <span className="text-sm font-medium">2,345 chats</span>
              </div>
              <Progress value={85} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Personajes Históricos</span>
                <span className="text-sm font-medium">1,892 chats</span>
              </div>
              <Progress value={68} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Corrección Automática</span>
                <span className="text-sm font-medium">567 tareas</span>
              </div>
              <Progress value={42} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
