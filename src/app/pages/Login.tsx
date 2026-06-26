import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { GraduationCap, BookOpen, Users, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import logoImg from '../logo/logo.jpeg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/dashboard');
    }
  };

  const quickLogin = (role: 'student' | 'teacher' | 'admin') => {
    const emails = {
      student: 'estudiante@cronos.edu',
      teacher: 'profesor@cronos.edu',
      admin: 'admin@cronos.edu'
    };
    
    if (login(emails[role], 'demo123')) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center ring-4 ring-amber-300/60 overflow-hidden p-1">
                <img src={logoImg} alt="Cronos Digital Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-blue-800">
                  Cronos Digital
                </h1>
                <p className="text-gray-600">Aprendiendo Historia</p>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900">
              Vive la historia, no solo la estudies
            </h2>
            
            <p className="text-lg text-gray-600">
              Plataforma educativa con IA para aprender mediante chat, voz, ejercicios, 
              simulaciones y personajes históricos.
            </p>

            <div className="space-y-4 pt-8">
              {[
                { icon: BookOpen, text: 'Aprende con IA personalizada' },
                { icon: Users, text: 'Conversa con personajes históricos' },
                { icon: Shield, text: 'Seguro y fácil de usar' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="shadow-2xl">
            <CardHeader className="space-y-1">
              <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center ring-4 ring-amber-300/60 overflow-hidden p-0.5">
                  <img src={logoImg} alt="Cronos Digital Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-2xl font-bold text-blue-800">
                  Cronos Digital
                </span>
              </div>
              <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
              <CardDescription>
                Ingresa tus credenciales o prueba con acceso rápido
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Ingresar</TabsTrigger>
                  <TabsTrigger value="demo">Acceso Rápido</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Contraseña</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <span className="text-gray-600">Recordarme</span>
                      </label>
                      <a href="#" className="text-blue-600 hover:underline">
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>
                    <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800">
                      Iniciar Sesión
                    </Button>
                    <p className="text-center text-sm text-gray-600">
                      ¿No tienes cuenta?{' '}
                      <a href="#" className="text-blue-600 hover:underline font-semibold">
                        Regístrate gratis
                      </a>
                    </p>
                  </form>
                </TabsContent>
                
                <TabsContent value="demo" className="space-y-3">
                  <p className="text-sm text-gray-600 mb-4">
                    Prueba la plataforma con diferentes roles:
                  </p>
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start gap-3 h-auto p-4"
                    onClick={() => quickLogin('student')}
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">Estudiante</div>
                      <div className="text-xs text-gray-500">Ver cursos, tareas y tutor IA</div>
                    </div>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start gap-3 h-auto p-4"
                    onClick={() => quickLogin('teacher')}
                  >
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-amber-700" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">Docente</div>
                      <div className="text-xs text-gray-500">Crear cursos y calificar</div>
                    </div>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start gap-3 h-auto p-4"
                    onClick={() => quickLogin('admin')}
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">Administrador</div>
                      <div className="text-xs text-gray-500">Gestionar plataforma completa</div>
                    </div>
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-gray-500 mt-6">
            Al continuar, aceptas nuestros{' '}
            <a href="#" className="text-blue-600 hover:underline">Términos de Servicio</a>
            {' '}y{' '}
            <a href="#" className="text-blue-600 hover:underline">Política de Privacidad</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
