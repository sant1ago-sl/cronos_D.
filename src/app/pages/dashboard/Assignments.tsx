import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Calendar, Clock, FileText, AlertCircle, CheckCircle2, Upload } from 'lucide-react';
import { mockAssignments } from '../../data/mockData';

export default function Assignments() {
  const pendingAssignments = mockAssignments.filter(a => a.status === 'pending');
  const submittedAssignments = mockAssignments.filter(a => a.status === 'submitted');
  const gradedAssignments = mockAssignments.filter(a => a.status === 'graded');

  const renderAssignment = (assignment: typeof mockAssignments[0]) => (
    <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{assignment.title}</CardTitle>
            <CardDescription className="mt-2">{assignment.description}</CardDescription>
          </div>
          {assignment.status === 'graded' && assignment.grade && (
            <Badge className="bg-green-600 text-white">
              {assignment.grade}/{assignment.points}
            </Badge>
          )}
          {assignment.status === 'submitted' && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              Entregada
            </Badge>
          )}
          {assignment.status === 'pending' && (
            <Badge variant="outline" className="bg-orange-50 text-orange-700">
              Por entregar
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              Vence: {new Date(assignment.dueDate).toLocaleDateString('es-ES', { 
                day: 'numeric', 
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>{assignment.points} puntos</span>
          </div>
        </div>

        {assignment.status === 'graded' && assignment.feedback && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-semibold text-blue-900 mb-1">Retroalimentación del profesor:</p>
            <p className="text-sm text-blue-800">{assignment.feedback}</p>
          </div>
        )}

        <div className="flex gap-2">
          {assignment.status === 'pending' && (
            <Button className="flex-1">
              <Upload className="mr-2 w-4 h-4" />
              Entregar Tarea
            </Button>
          )}
          {assignment.status === 'submitted' && (
            <Button variant="outline" className="flex-1">
              Ver Entrega
            </Button>
          )}
          {assignment.status === 'graded' && (
            <Button variant="outline" className="flex-1">
              Ver Detalles
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Tareas</h1>
        <p className="text-gray-600">Gestiona tus entregas y revisa retroalimentación</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total de Tareas</CardTitle>
            <FileText className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAssignments.length}</div>
            <p className="text-xs text-gray-500">Todos los cursos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Por entregar</CardTitle>
            <AlertCircle className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingAssignments.length}</div>
            <p className="text-xs text-gray-500">Por entregar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Entregadas</CardTitle>
            <Clock className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{submittedAssignments.length}</div>
            <p className="text-xs text-gray-500">En revisión</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Calificadas</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gradedAssignments.length}</div>
            <p className="text-xs text-gray-500">Completadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">
            Por entregar ({pendingAssignments.length})
          </TabsTrigger>
          <TabsTrigger value="submitted">
            Entregadas ({submittedAssignments.length})
          </TabsTrigger>
          <TabsTrigger value="graded">
            Calificadas ({gradedAssignments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingAssignments.length > 0 ? (
            pendingAssignments.map(renderAssignment)
          ) : (
            <Card className="p-12 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">¡Todo al día!</h3>
              <p className="text-gray-600">No tienes tareas por entregar en este momento</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="submitted" className="space-y-4">
          {submittedAssignments.length > 0 ? (
            submittedAssignments.map(renderAssignment)
          ) : (
            <Card className="p-12 text-center">
              <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No hay entregas en revisión</h3>
              <p className="text-gray-600">Las tareas que entregues aparecerán aquí</p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="graded" className="space-y-4">
          {gradedAssignments.length > 0 ? (
            gradedAssignments.map(renderAssignment)
          ) : (
            <Card className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Aún no hay calificaciones</h3>
              <p className="text-gray-600">Tus tareas calificadas aparecerán aquí</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
