import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import {
  Home,
  BookOpen,
  Calendar,
  ClipboardList,
  FileText,
  Brain,
  MessageSquare,
  Award,
  TrendingUp,
  Settings,
  Users,
  BarChart3,
  GraduationCap,
  Menu,
  X,
  Bell,
  Search,
  LogOut,
  User,
  Shield,
  BookMarked
} from 'lucide-react';
import { Input } from './ui/input';
import logoImg from '../logo/logo.jpeg';

interface LMSLayoutProps {
  children: ReactNode;
}

export default function LMSLayout({ children }: LMSLayoutProps) {
  const { user, logout, switchRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Proteger ruta - redirigir si no hay usuario
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Menú según rol
  const studentMenu = [
    { icon: Home, label: 'Inicio', path: '/dashboard' },
    { icon: BookOpen, label: 'Mis Cursos', path: '/dashboard/courses' },
    { icon: Calendar, label: 'Calendario', path: '/dashboard/calendar' },
    { icon: ClipboardList, label: 'Tareas', path: '/dashboard/assignments' },
    { icon: FileText, label: 'Evaluaciones', path: '/dashboard/quizzes' },
    { icon: Brain, label: 'Tutor IA', path: '/dashboard/ai-tutor' },
    { icon: MessageSquare, label: 'Mensajes', path: '/dashboard/messages' },
    { icon: Award, label: 'Calificaciones', path: '/dashboard/grades' },
    { icon: TrendingUp, label: 'Mi Progreso', path: '/dashboard/progress' },
    { icon: Settings, label: 'Configuración', path: '/dashboard/settings' }
  ];

  const teacherMenu = [
    { icon: Home, label: 'Inicio', path: '/dashboard' },
    { icon: BookOpen, label: 'Mis Cursos', path: '/dashboard/courses' },
    { icon: Users, label: 'Estudiantes', path: '/dashboard/students' },
    { icon: Calendar, label: 'Calendario', path: '/dashboard/calendar' },
    { icon: ClipboardList, label: 'Tareas', path: '/dashboard/assignments' },
    { icon: FileText, label: 'Evaluaciones', path: '/dashboard/quizzes' },
    { icon: BarChart3, label: 'Analíticas', path: '/dashboard/analytics' },
    { icon: Brain, label: 'Personajes IA', path: '/dashboard/ai-characters' },
    { icon: MessageSquare, label: 'Mensajes', path: '/dashboard/messages' },
    { icon: Settings, label: 'Configuración', path: '/dashboard/settings' }
  ];

  const adminMenu = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Usuarios', path: '/dashboard/users' },
    { icon: GraduationCap, label: 'Docentes', path: '/dashboard/teachers' },
    { icon: BookOpen, label: 'Cursos', path: '/dashboard/courses' },
    { icon: Shield, label: 'Instituciones', path: '/dashboard/institutions' },
    { icon: BookMarked, label: 'Planes', path: '/dashboard/plans' },
    { icon: BarChart3, label: 'Reportes', path: '/dashboard/reports' },
    { icon: Brain, label: 'Config. IA', path: '/dashboard/ai-config' },
    { icon: TrendingUp, label: 'Estadísticas', path: '/dashboard/stats' },
    { icon: Settings, label: 'Configuración', path: '/dashboard/settings' }
  ];

  const menu = user?.role === 'student' 
    ? studentMenu 
    : user?.role === 'teacher' 
    ? teacherMenu 
    : adminMenu;

  const roleColors = {
    student: 'bg-blue-100 text-blue-700',
    teacher: 'bg-amber-100 text-amber-800',
    admin: 'bg-slate-100 text-slate-700'
  };

  const roleLabels = {
    student: 'Estudiante',
    teacher: 'Docente',
    admin: 'Administrador'
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X /> : <Menu />}
            </Button>
            
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center ring-2 ring-amber-300/70 overflow-hidden p-0.5">
                <img src={logoImg} alt="Cronos Digital Logo" className="w-full h-full object-contain" />
              </div>
              <span className="hidden sm:block text-lg font-bold text-blue-800">
                Cronos Digital
              </span>
            </Link>
          </div>

          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Buscar cursos, tareas, materiales..." 
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-blue-700 text-white text-sm ring-2 ring-amber-300/70">
                      {user?.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block">{user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                    <Badge className={`w-fit text-xs ${roleColors[user?.role || 'student']}`}>
                      {roleLabels[user?.role || 'student']}
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Mi Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs text-gray-500">
                  Cambiar vista
                </DropdownMenuLabel>
                {(['student', 'teacher', 'admin'] as const).map((role) => (
                  <DropdownMenuItem
                    key={role}
                    onClick={() => {
                      switchRole(role);
                      navigate('/dashboard');
                    }}
                    className={user.role === role ? 'bg-gray-50 font-medium' : ''}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    <span>{roleLabels[role]}</span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-16 bottom-0 w-64 bg-white border-r overflow-y-auto transition-transform lg:translate-x-0 z-40 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <nav className="p-4 space-y-1">
            {menu.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-700 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-800'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Overlay para móvil */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
