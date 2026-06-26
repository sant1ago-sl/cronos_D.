import { createBrowserRouter, Navigate, Outlet } from 'react-router';
import Landing from './pages/Landing';
import Login from './pages/Login';
import LMSLayout from './components/LMSLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import Courses from './pages/dashboard/Courses';
import CourseView from './pages/dashboard/CourseView';
import AITutor from './pages/dashboard/AITutor';
import Calendar from './pages/dashboard/Calendar';
import Assignments from './pages/dashboard/Assignments';
import Grades from './pages/dashboard/Grades';
import GenericPage from './pages/dashboard/GenericPage';
import { Users, FileText, Brain, MessageSquare, TrendingUp, Settings, BarChart3, GraduationCap, Shield, BookMarked } from 'lucide-react';

// Wrapper component
function DashboardLayoutWrapper() {
  return (
    <LMSLayout>
      <div className="animate-in fade-in duration-300">
        <Outlet />
      </div>
    </LMSLayout>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayoutWrapper />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: 'courses',
        element: <Courses />,
      },
      {
        path: 'courses/:courseId',
        element: <CourseView />,
      },
      {
        path: 'courses/create',
        element: <GenericPage 
          title="Crear Curso" 
          description="Crea un nuevo curso con módulos y contenido" 
          icon={<GraduationCap className="w-20 h-20 text-blue-600 mb-4" />}
        />,
      },
      {
        path: 'calendar',
        element: <Calendar />,
      },
      {
        path: 'assignments',
        element: <Assignments />,
      },
      {
        path: 'quizzes',
        element: <GenericPage 
          title="Evaluaciones" 
          description="Tus quizzes y exámenes" 
          icon={<FileText className="w-20 h-20 text-cyan-700 mb-4" />}
        />,
      },
      {
        path: 'ai-tutor',
        element: <AITutor />,
      },
      {
        path: 'messages',
        element: <GenericPage 
          title="Mensajes" 
          description="Comunícate con profesores y compañeros" 
          icon={<MessageSquare className="w-20 h-20 text-blue-600 mb-4" />}
        />,
      },
      {
        path: 'grades',
        element: <Grades />,
      },
      {
        path: 'progress',
        element: <GenericPage 
          title="Mi Progreso" 
          description="Visualiza tu progreso de aprendizaje" 
          icon={<TrendingUp className="w-20 h-20 text-green-600 mb-4" />}
        />,
      },
      {
        path: 'settings',
        element: <GenericPage 
          title="Configuración" 
          description="Personaliza tu experiencia" 
          icon={<Settings className="w-20 h-20 text-gray-600 mb-4" />}
        />,
      },
      // Teacher routes
      {
        path: 'students',
        element: <GenericPage 
          title="Estudiantes" 
          description="Gestiona tus estudiantes" 
          icon={<Users className="w-20 h-20 text-cyan-700 mb-4" />}
        />,
      },
      {
        path: 'analytics',
        element: <GenericPage 
          title="Analíticas" 
          description="Analiza el desempeño de tus estudiantes" 
          icon={<BarChart3 className="w-20 h-20 text-blue-600 mb-4" />}
        />,
      },
      {
        path: 'ai-characters',
        element: <GenericPage 
          title="Personajes IA" 
          description="Crea y gestiona personajes históricos" 
          icon={<Brain className="w-20 h-20 text-cyan-700 mb-4" />}
        />,
      },
      // Admin routes
      {
        path: 'users',
        element: <GenericPage 
          title="Usuarios" 
          description="Gestiona todos los usuarios del sistema" 
          icon={<Users className="w-20 h-20 text-blue-600 mb-4" />}
        />,
      },
      {
        path: 'teachers',
        element: <GenericPage 
          title="Docentes" 
          description="Administra profesores y permisos" 
          icon={<GraduationCap className="w-20 h-20 text-cyan-700 mb-4" />}
        />,
      },
      {
        path: 'institutions',
        element: <GenericPage 
          title="Instituciones" 
          description="Gestiona instituciones educativas" 
          icon={<Shield className="w-20 h-20 text-green-600 mb-4" />}
        />,
      },
      {
        path: 'plans',
        element: <GenericPage 
          title="Planes y Licencias" 
          description="Administra suscripciones y licencias" 
          icon={<BookMarked className="w-20 h-20 text-cyan-700 mb-4" />}
        />,
      },
      {
        path: 'reports',
        element: <GenericPage 
          title="Reportes" 
          description="Reportes administrativos y estadísticas" 
          icon={<BarChart3 className="w-20 h-20 text-blue-600 mb-4" />}
        />,
      },
      {
        path: 'ai-config',
        element: <GenericPage 
          title="Configuración IA" 
          description="Configura parámetros de inteligencia artificial" 
          icon={<Brain className="w-20 h-20 text-cyan-700 mb-4" />}
        />,
      },
      {
        path: 'stats',
        element: <GenericPage 
          title="Estadísticas Globales" 
          description="Vista general de métricas del sistema" 
          icon={<TrendingUp className="w-20 h-20 text-green-600 mb-4" />}
        />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
