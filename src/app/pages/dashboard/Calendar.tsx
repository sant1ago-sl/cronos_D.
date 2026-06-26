import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { mockCalendarEvents } from '../../data/mockData';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 1)); // June 2026

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getEventsForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return mockCalendarEvents.filter(event => event.date === dateStr);
  };

  const typeColors = {
    assignment: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    quiz: 'bg-blue-100 text-blue-800 border-blue-300',
    class: 'bg-blue-100 text-blue-700 border-blue-300',
    event: 'bg-green-100 text-green-700 border-green-300'
  };

  const upcomingEvents = mockCalendarEvents.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Calendario Académico</h1>
        <p className="text-gray-600">Organiza tus clases, tareas y evaluaciones</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={previousMonth}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                  Hoy
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {dayNames.map(day => (
                <div key={day} className="text-center text-sm font-semibold text-gray-600 pb-2">
                  {day}
                </div>
              ))}
              
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const events = getEventsForDay(day);
                const isToday = day === 25 && currentDate.getMonth() === 5; // June 25, 2026
                
                return (
                  <div
                    key={day}
                    className={`aspect-square border rounded-lg p-1 hover:bg-gray-50 transition-colors ${
                      isToday ? 'bg-blue-50 border-blue-500' : ''
                    }`}
                  >
                    <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-blue-600' : ''}`}>
                      {day}
                    </div>
                    <div className="space-y-1">
                      {events.slice(0, 2).map((event, idx) => (
                        <div
                          key={idx}
                          className={`text-xs px-1 rounded truncate ${
                            event.type === 'assignment' ? 'bg-cyan-200' :
                            event.type === 'quiz' ? 'bg-blue-200' :
                            event.type === 'class' ? 'bg-blue-200' : 'bg-green-200'
                          }`}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                      {events.length > 2 && (
                        <div className="text-xs text-gray-500">+{events.length - 2}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Próximos Eventos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className="text-center flex-shrink-0">
                      <div className="text-2xl font-bold">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(event.date).toLocaleDateString('es-ES', { month: 'short' })}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{event.course}</p>
                      <Badge variant="outline" className={`text-xs mt-2 ${typeColors[event.type]}`}>
                        {event.type === 'assignment' ? 'Tarea' :
                         event.type === 'quiz' ? 'Evaluación' :
                         event.type === 'class' ? 'Clase' : 'Evento'}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Leyenda</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-cyan-200 rounded" />
                <span className="text-sm">Tareas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-200 rounded" />
                <span className="text-sm">Evaluaciones</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-200 rounded" />
                <span className="text-sm">Clases</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-200 rounded" />
                <span className="text-sm">Eventos</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
