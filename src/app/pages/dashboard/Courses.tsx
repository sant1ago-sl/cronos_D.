import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Input } from '../../components/ui/input';
import {
  BookOpen,
  Users,
  Calendar,
  Plus,
  Search,
  Filter,
  Grid3x3,
  List,
  Clock
} from 'lucide-react';
import { mockCourses } from '../../data/mockData';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Courses() {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = mockCourses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {user?.role === 'teacher' ? 'Gestionar Cursos' : 'Mis Cursos'}
          </h1>
          <p className="text-gray-600">
            {user?.role === 'teacher' 
              ? 'Crea y administra tus cursos'
              : 'Continúa tu aprendizaje donde lo dejaste'
            }
          </p>
        </div>
        {user?.role === 'teacher' && (
          <Link to="/dashboard/courses/create">
            <Button className="bg-blue-700 hover:bg-blue-800">
              <Plus className="mr-2 w-4 h-4" />
              Crear Curso
            </Button>
          </Link>
        )}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar cursos..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      {user?.role === 'student' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Cursos Activos</CardTitle>
              <BookOpen className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockCourses.length}</div>
              <p className="text-xs text-gray-500">En progreso</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Progreso Promedio</CardTitle>
              <Clock className="w-4 h-4 text-amber-700" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(mockCourses.reduce((acc, c) => acc + (c.progress || 0), 0) / mockCourses.length)}%
              </div>
              <p className="text-xs text-gray-500">De todos tus cursos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Próximo a Completar</CardTitle>
              <Calendar className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold truncate">Segunda Guerra Mundial</div>
              <p className="text-xs text-gray-500">78% completado</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Courses Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow group">
              <div className="h-40 bg-blue-700 rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 h-2 bg-amber-300" />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_0%,transparent_45%)] group-hover:bg-black/10 transition-colors" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-gray-900">
                    {course.progress || 0}% completo
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={course.progress} />
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.modules.length} módulos</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{course.instructor}</p>
                <Link to={`/dashboard/courses/${course.id}`}>
                  <Button className="w-full" variant="outline">
                    {user?.role === 'teacher' ? 'Gestionar' : 'Continuar'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-48 h-32 bg-blue-700 rounded-lg flex-shrink-0 border-b-4 border-amber-300" />
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold">{course.title}</h3>
                        <p className="text-gray-600 mt-1">{course.description}</p>
                      </div>
                      <Badge variant="outline">{course.progress}%</Badge>
                    </div>
                    <Progress value={course.progress} className="max-w-md" />
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students} estudiantes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.modules.length} módulos</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Finaliza {new Date(course.endDate).toLocaleDateString('es-ES')}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">{course.instructor}</p>
                      <Link to={`/dashboard/courses/${course.id}`}>
                        <Button variant="outline">
                          {user?.role === 'teacher' ? 'Gestionar' : 'Continuar'}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredCourses.length === 0 && (
        <Card className="p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-gray-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">No se encontraron cursos</h3>
              <p className="text-gray-600">
                {searchQuery
                  ? 'Intenta con otra búsqueda'
                  : user?.role === 'teacher'
                  ? 'Comienza creando tu primer curso'
                  : 'Inscríbete en un curso para comenzar'
                }
              </p>
            </div>
            {user?.role === 'teacher' && (
              <Link to="/dashboard/courses/create">
                <Button className="bg-blue-700 hover:bg-blue-800">
                  <Plus className="mr-2 w-4 h-4" />
                  Crear Curso
                </Button>
              </Link>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
