import { useParams, Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../components/ui/breadcrumb';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import {
  Home,
  BookOpen,
  FileText,
  MessageSquare,
  ClipboardList,
  Brain,
  Users,
  Award,
  Play,
  FileDown,
  ExternalLink,
  CheckCircle2,
  Circle,
  Clock,
  Calendar
} from 'lucide-react';
import { mockCourses } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

export default function CourseView() {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const course = mockCourses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Curso no encontrado</h2>
          <p className="text-gray-600 mb-4">El curso que buscas no existe</p>
          <Link to="/dashboard/courses">
            <Button>Volver a Cursos</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/dashboard"><Home className="w-4 h-4" /></Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/dashboard/courses">Cursos</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{course.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Course Header */}
      <div className="relative rounded-xl overflow-hidden">
        <div className="h-48 bg-blue-700 flex items-center justify-center border-b-4 border-cyan-400">
          <div className="text-white text-center px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{course.title}</h1>
            <p className="text-lg text-white/90">{course.instructor}</p>
          </div>
        </div>
      </div>

      {/* Course Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Estudiantes</p>
                <p className="text-lg font-bold">{course.students}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-cyan-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Módulos</p>
                <p className="text-lg font-bold">{course.modules.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tu Progreso</p>
                <p className="text-lg font-bold">{course.progress}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-cyan-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Finaliza</p>
                <p className="text-sm font-bold">
                  {new Date(course.endDate).toLocaleDateString('es-ES', { 
                    day: 'numeric', 
                    month: 'short' 
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9">
          <TabsTrigger value="overview">Inicio</TabsTrigger>
          <TabsTrigger value="modules">Módulos</TabsTrigger>
          <TabsTrigger value="materials">Material</TabsTrigger>
          <TabsTrigger value="forum">Foro</TabsTrigger>
          <TabsTrigger value="assignments">Tareas</TabsTrigger>
          <TabsTrigger value="quizzes">Quiz</TabsTrigger>
          <TabsTrigger value="ai-tutor">Tutor IA</TabsTrigger>
          <TabsTrigger value="participants">Participantes</TabsTrigger>
          <TabsTrigger value="grades">Notas</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Descripción del Curso</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Lo que aprenderás:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">Conocimiento profundo de los eventos históricos principales</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">Análisis crítico de fuentes históricas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">Conexiones entre pasado y presente</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">Habilidades de investigación histórica</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tu Progreso</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Completado</span>
                      <span className="text-sm font-bold">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-3" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">12</p>
                      <p className="text-xs text-gray-600">Lecciones completadas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-cyan-700">5</p>
                      <p className="text-xs text-gray-600">Tareas entregadas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">90</p>
                      <p className="text-xs text-gray-600">Promedio</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {course.announcements && course.announcements.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Anuncios</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {course.announcements.map((announcement) => (
                      <div key={announcement.id} className="border-l-4 border-blue-500 pl-4 py-2">
                        <h4 className="font-semibold">{announcement.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                          <span>{announcement.author}</span>
                          <span>•</span>
                          <span>{new Date(announcement.date).toLocaleDateString('es-ES')}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Próximas Actividades</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { title: 'Quiz: Imperio Inca', due: '2026-06-27', type: 'quiz' },
                    { title: 'Ensayo Tahuantinsuyo', due: '2026-06-28', type: 'assignment' },
                    { title: 'Foro: Culturas Pre-incas', due: '2026-06-30', type: 'forum' }
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {activity.type === 'quiz' ? <FileText className="w-4 h-4 text-cyan-700" /> :
                         activity.type === 'assignment' ? <ClipboardList className="w-4 h-4 text-cyan-700" /> :
                         <MessageSquare className="w-4 h-4 text-cyan-700" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{activity.title}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                          <Clock className="w-3 h-3" />
                          {new Date(activity.due).toLocaleDateString('es-ES', { 
                            day: 'numeric', 
                            month: 'short' 
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-blue-700 text-white border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Tutor IA del Curso
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/90 mb-4">
                    ¿Tienes dudas sobre este curso? El tutor IA puede ayudarte con explicaciones personalizadas.
                  </p>
                  <Link to="/dashboard/ai-tutor">
                    <Button variant="secondary" className="w-full">
                      Preguntar al Tutor IA
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="modules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contenido del Curso</CardTitle>
              <CardDescription>
                {course.modules.length} módulos • {course.modules.reduce((acc, m) => acc + m.materials.length, 0)} materiales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {course.modules.map((module, index) => (
                  <AccordionItem key={module.id} value={module.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3 text-left">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{module.title}</h3>
                          <p className="text-sm text-gray-600">{module.description}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-11 space-y-2">
                        {module.materials.map((material) => (
                          <div key={material.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                            <div className="flex items-center gap-3">
                              {material.type === 'video' ? <Play className="w-4 h-4 text-cyan-700" /> :
                               material.type === 'pdf' ? <FileDown className="w-4 h-4 text-red-600" /> :
                               <FileText className="w-4 h-4 text-blue-600" />}
                              <div>
                                <p className="font-medium text-sm">{material.title}</p>
                                <p className="text-xs text-gray-500">{material.type.toUpperCase()}</p>
                              </div>
                            </div>
                            <Button size="sm" variant="ghost">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        {module.assignments.map((assignment) => (
                          <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                            <div className="flex items-center gap-3">
                              <ClipboardList className="w-4 h-4 text-cyan-700" />
                              <div>
                                <p className="font-medium text-sm">{assignment.title}</p>
                                <p className="text-xs text-gray-500">Vence {new Date(assignment.dueDate).toLocaleDateString('es-ES')}</p>
                              </div>
                            </div>
                            <Badge variant={assignment.status === 'graded' ? 'default' : 'outline'}>
                              {assignment.status === 'graded' ? `${assignment.grade}%` : 'Por entregar'}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials">
          <Card>
            <CardHeader>
              <CardTitle>Material de Estudio</CardTitle>
              <CardDescription>Todos los recursos del curso en un solo lugar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {course.modules.flatMap(module => module.materials).map((material) => (
                  <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        material.type === 'video' ? 'bg-cyan-100' :
                        material.type === 'pdf' ? 'bg-red-100' : 'bg-blue-100'
                      }`}>
                        {material.type === 'video' ? <Play className="w-6 h-6 text-cyan-700" /> :
                         material.type === 'pdf' ? <FileDown className="w-6 h-6 text-red-600" /> :
                         <FileText className="w-6 h-6 text-blue-600" />}
                      </div>
                      <div>
                        <p className="font-medium">{material.title}</p>
                        <p className="text-sm text-gray-500">
                          {material.type.toUpperCase()} • Subido {new Date(material.uploadDate).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Abrir
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Los demás tabs tendrían contenido similar */}
        <TabsContent value="forum">
          <Card>
            <CardHeader>
              <CardTitle>Foro de Discusión</CardTitle>
              <CardDescription>Participa en conversaciones con tus compañeros</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Foro en construcción</h3>
                <p className="text-gray-600">Pronto podrás participar en discusiones con tus compañeros</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments">
          <Card>
            <CardHeader>
              <CardTitle>Tareas del Curso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {course.modules.flatMap(m => m.assignments).map((assignment) => (
                  <div key={assignment.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{assignment.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{assignment.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                          <span>Vence: {new Date(assignment.dueDate).toLocaleDateString('es-ES')}</span>
                          <span>•</span>
                          <span>{assignment.points} puntos</span>
                        </div>
                      </div>
                      <Badge variant={assignment.status === 'graded' ? 'default' : 'outline'}>
                        {assignment.status === 'graded' ? `${assignment.grade}/${assignment.points}` : 'Por entregar'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quizzes">
          <Card>
            <CardHeader>
              <CardTitle>Evaluaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {course.modules.flatMap(m => m.quizzes).map((quiz) => (
                  <div key={quiz.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{quiz.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{quiz.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                          <span>Vence: {new Date(quiz.dueDate).toLocaleDateString('es-ES')}</span>
                          <span>•</span>
                          <span>{quiz.duration} minutos</span>
                          <span>•</span>
                          <span>{quiz.attempts || 0}/{quiz.maxAttempts} intentos</span>
                        </div>
                      </div>
                      {quiz.grade ? (
                        <Badge>{quiz.grade}%</Badge>
                      ) : (
                        <Button size="sm">Iniciar</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-tutor">
          <Card className="bg-blue-50 border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-blue-600" />
                Tutor IA Especializado
              </CardTitle>
              <CardDescription>
                Un asistente de IA entrenado específicamente en el contenido de este curso
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <Link to="/dashboard/ai-tutor">
                  <Button size="lg" className="bg-blue-700 hover:bg-blue-800">
                    <Brain className="mr-2 w-5 h-5" />
                    Abrir Tutor IA
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center p-4 bg-white rounded-lg">
                  <p className="font-semibold mb-1">Preguntas ilimitadas</p>
                  <p className="text-gray-600">Disponible 24/7</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <p className="font-semibold mb-1">Explicaciones personalizadas</p>
                  <p className="text-gray-600">Adaptadas a tu nivel</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <p className="font-semibold mb-1">Práctica interactiva</p>
                  <p className="text-gray-600">Ejercicios y quizzes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="participants">
          <Card>
            <CardHeader>
              <CardTitle>Participantes ({course.students})</CardTitle>
              <CardDescription>Estudiantes inscritos en este curso</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white font-semibold ring-2 ring-cyan-300/70">
                      {String.fromCharCode(65 + i)}
                    </div>
                    <div>
                      <p className="font-medium">Estudiante {i + 1}</p>
                      <p className="text-sm text-gray-500">estudiante{i + 1}@example.com</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grades">
          <Card>
            <CardHeader>
              <CardTitle>Mis Calificaciones</CardTitle>
              <CardDescription>Historial de notas en este curso</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-6 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-600 mb-2">Promedio General</p>
                <p className="text-4xl font-bold text-blue-600">90.5</p>
                <Progress value={90.5} className="mt-3" />
              </div>
              <div className="space-y-3">
                {course.modules.flatMap(m => m.assignments.concat(m.quizzes as any)).filter(item => item.grade).map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(item.dueDate).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">{item.grade}</p>
                      <p className="text-sm text-gray-500">/{item.points || 100}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
