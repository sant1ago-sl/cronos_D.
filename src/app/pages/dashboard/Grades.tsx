import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import { Award, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { mockGrades } from '../../data/mockData';

export default function Grades() {
  const overallAverage = mockGrades.reduce((acc, g) => acc + (g.finalGrade || 0), 0) / mockGrades.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Calificaciones</h1>
        <p className="text-gray-600">Revisa tu desempeño académico</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Promedio General</CardTitle>
            <CardDescription>Todas tus calificaciones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-4 mb-4">
              <div className="text-6xl font-bold text-blue-600">
                {overallAverage.toFixed(1)}
              </div>
              <div className="pb-2">
                <Badge className="bg-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +2.5
                </Badge>
              </div>
            </div>
            <Progress value={overallAverage} className="h-3" />
            <p className="text-sm text-gray-600 mt-2">
              Excelente rendimiento. Sigue así!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Estadísticas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Cursos Activos</p>
              <p className="text-2xl font-bold">{mockGrades.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Promedio más alto</p>
              <p className="text-2xl font-bold text-green-600">
                {Math.max(...mockGrades.map(g => g.finalGrade || 0)).toFixed(1)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tareas completadas</p>
              <p className="text-2xl font-bold">
                {mockGrades.reduce((acc, g) => acc + g.assignments.length, 0)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Grades */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Calificaciones por Curso</h2>
        
        {mockGrades.map((grade) => (
          <Card key={grade.courseId}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{grade.courseName}</CardTitle>
                  <CardDescription className="mt-1">
                    {grade.assignments.length} tareas • {grade.quizzes.length} evaluaciones
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">
                    {grade.finalGrade?.toFixed(1)}
                  </div>
                  <Badge 
                    variant="outline" 
                    className={
                      (grade.finalGrade || 0) >= 90 ? 'bg-green-50 text-green-700' :
                      (grade.finalGrade || 0) >= 80 ? 'bg-blue-50 text-blue-700' :
                      (grade.finalGrade || 0) >= 70 ? 'bg-yellow-50 text-yellow-700' :
                      'bg-red-50 text-red-700'
                    }
                  >
                    {(grade.finalGrade || 0) >= 90 ? 'Excelente' :
                     (grade.finalGrade || 0) >= 80 ? 'Muy Bueno' :
                     (grade.finalGrade || 0) >= 70 ? 'Bueno' :
                     'Necesita Mejora'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Progress value={grade.finalGrade} className="h-2" />
              
              {/* Assignments */}
              {grade.assignments.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-orange-600" />
                    Tareas ({grade.assignments.length})
                  </h4>
                  <div className="space-y-2">
                    {grade.assignments.map((assignment, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{assignment.name}</p>
                          <p className="text-xs text-gray-500">Peso: {(assignment.weight * 100).toFixed(0)}%</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress 
                            value={(assignment.grade / assignment.maxGrade) * 100} 
                            className="w-24 h-2"
                          />
                          <div className="text-right min-w-[60px]">
                            <p className="font-bold">{assignment.grade}/{assignment.maxGrade}</p>
                          </div>
                          {assignment.grade / assignment.maxGrade >= 0.9 ? (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          ) : assignment.grade / assignment.maxGrade >= 0.7 ? (
                            <Minus className="w-4 h-4 text-yellow-600" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quizzes */}
              {grade.quizzes.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-700" />
                    Evaluaciones ({grade.quizzes.length})
                  </h4>
                  <div className="space-y-2">
                    {grade.quizzes.map((quiz, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{quiz.name}</p>
                          <p className="text-xs text-gray-500">Peso: {(quiz.weight * 100).toFixed(0)}%</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress 
                            value={(quiz.grade / quiz.maxGrade) * 100} 
                            className="w-24 h-2"
                          />
                          <div className="text-right min-w-[60px]">
                            <p className="font-bold">{quiz.grade}/{quiz.maxGrade}</p>
                          </div>
                          {quiz.grade / quiz.maxGrade >= 0.9 ? (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          ) : quiz.grade / quiz.maxGrade >= 0.7 ? (
                            <Minus className="w-4 h-4 text-yellow-600" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            Consejos para Mejorar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-700">
          <p>• Revisa los comentarios del profesor en cada tarea para identificar áreas de mejora</p>
          <p>• Utiliza el Tutor IA para reforzar temas donde tengas calificaciones más bajas</p>
          <p>• Mantén una rutina de estudio constante para mejorar tu promedio gradualmente</p>
          <p>• Participa activamente en los foros y discusiones de clase</p>
        </CardContent>
      </Card>
    </div>
  );
}
