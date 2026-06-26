import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import {
  Brain,
  Send,
  Mic,
  Volume2,
  History,
  Sparkles,
  BookOpen,
  MessageSquare,
  User
} from 'lucide-react';
import { aiCharacters } from '../../data/mockData';
import { ChatMessage } from '../../types';
import { motion } from 'motion/react';

export default function AITutor() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const tutorResponses = {
    general: [
      "Excelente pregunta. Basándome en registros históricos, puedo ayudarte con eso...",
      "Déjame explicarte esto de manera clara y concisa...",
      "Es un tema fascinante. Veamos los aspectos más importantes...",
      "Para entender esto mejor, debemos considerar el contexto histórico...",
      "Permíteme ofrecerte una perspectiva detallada sobre este tema..."
    ],
    pachacutec: [
      "Como noveno Inca del Tahuantinsuyo, transformé Cusco en el corazón de un imperio. ¿Qué te gustaría saber sobre mi gobierno?",
      "La organización de nuestro imperio se basaba en el sistema de ayllus y la mita. Era crucial para mantener la cohesión social.",
      "Machu Picchu fue construida durante mi reinado como refugio real. La ingeniería inca era extraordinaria.",
      "El Tahuantinsuyo se dividía en cuatro suyos, cada uno administrado eficientemente desde Cusco."
    ],
    bolivar: [
      "La independencia de América requirió no solo valentía militar, sino también visión política. Soñaba con una América unida.",
      "Cruzamos los Andes con nuestro ejército enfrentando condiciones extremas. La libertad lo vale todo.",
      "Mi mayor sueño era ver a todas las naciones americanas libres y unidas. La división fue mi mayor pesar.",
      "La Carta de Jamaica expone mi visión para el futuro de América Latina. ¿Conoces sus principios?"
    ]
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString(),
      characterId: selectedCharacter || undefined
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simular respuesta de IA
    setTimeout(() => {
      let response: string;
      
      if (selectedCharacter === 'char1') {
        response = tutorResponses.pachacutec[Math.floor(Math.random() * tutorResponses.pachacutec.length)];
      } else if (selectedCharacter === 'char2') {
        response = tutorResponses.bolivar[Math.floor(Math.random() * tutorResponses.bolivar.length)];
      } else {
        response = tutorResponses.general[Math.floor(Math.random() * tutorResponses.general.length)];
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
        characterId: selectedCharacter || undefined
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const startNewChat = () => {
    setMessages([]);
    setSelectedCharacter(null);
  };

  const selectCharacter = (characterId: string) => {
    setSelectedCharacter(characterId);
    const character = aiCharacters.find(c => c.id === characterId);
    
    if (character) {
      const greeting: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `¡Saludos! Soy ${character.name}, ${character.description}. Estoy aquí para compartir mi conocimiento y experiencias contigo. ¿Qué te gustaría aprender?`,
        timestamp: new Date().toISOString(),
        characterId: characterId
      };
      setMessages([greeting]);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Tutor IA Personalizado</h1>
        <p className="text-gray-600">Aprende con inteligencia artificial o conversa con personajes históricos</p>
      </div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat">
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="characters">
            <User className="w-4 h-4 mr-2" />
            Personajes Históricos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Chat Area */}
            <Card className="lg:col-span-3 flex flex-col h-[600px]">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {selectedCharacter ? (
                      <>
                        <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-2xl ring-2 ring-cyan-300/70">
                          {aiCharacters.find(c => c.id === selectedCharacter)?.avatar}
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {aiCharacters.find(c => c.id === selectedCharacter)?.name}
                          </CardTitle>
                          <CardDescription className="text-xs">
                            {aiCharacters.find(c => c.id === selectedCharacter)?.era}
                          </CardDescription>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center ring-2 ring-cyan-300/70">
                          <Brain className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Tutor IA</CardTitle>
                          <CardDescription className="text-xs">
                            Asistente de aprendizaje personalizado
                          </CardDescription>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={startNewChat}>
                      <History className="w-4 h-4 mr-2" />
                      Nueva conversación
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
                {/* Messages */}
                <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                      <div className="w-20 h-20 bg-cyan-50 rounded-full flex items-center justify-center mb-4 ring-4 ring-cyan-100">
                        <Sparkles className="w-10 h-10 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">¡Hola! Soy tu Tutor IA</h3>
                      <p className="text-gray-600 max-w-md">
                        Puedo ayudarte con preguntas sobre historia, explicar conceptos, 
                        repasar temas o simplemente conversar sobre eventos históricos.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6 w-full max-w-2xl">
                        <Button
                          variant="outline"
                          className="justify-start text-left h-auto p-4"
                          onClick={() => setInputMessage('¿Puedes explicarme sobre la cultura Chavín?')}
                        >
                          <BookOpen className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span className="text-sm">¿Puedes explicarme sobre la cultura Chavín?</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="justify-start text-left h-auto p-4"
                          onClick={() => setInputMessage('¿Cuáles fueron las causas de la Revolución Francesa?')}
                        >
                          <BookOpen className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span className="text-sm">¿Causas de la Revolución Francesa?</span>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                        >
                          <Avatar className="w-8 h-8 flex-shrink-0">
                            <AvatarFallback className={
                              message.role === 'user' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-blue-700 text-white text-xl'
                            }>
                              {message.role === 'user' ? 'Tú' : message.characterId ? aiCharacters.find(c => c.id === message.characterId)?.avatar : '🤖'}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`flex-1 ${message.role === 'user' ? 'flex justify-end' : ''}`}>
                            <div className={`inline-block max-w-[80%] rounded-lg p-3 ${
                              message.role === 'user' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-100 text-gray-900'
                            }`}>
                              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                              <p className={`text-xs mt-1 ${
                                message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                              }`}>
                                {new Date(message.timestamp).toLocaleTimeString('es-ES', { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex gap-3"
                        >
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-blue-700 text-white">
                              🤖
                            </AvatarFallback>
                          </Avatar>
                          <div className="bg-gray-100 rounded-lg p-3">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}
                </ScrollArea>

                {/* Input Area */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="flex-shrink-0">
                      <Mic className="w-4 h-4" />
                    </Button>
                    <Input
                      placeholder="Escribe tu pregunta..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1"
                    />
                    <Button 
                      onClick={sendMessage}
                      disabled={!inputMessage.trim()}
                      className="flex-shrink-0 bg-blue-700 hover:bg-blue-800"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Presiona Enter para enviar. Revisa fuentes importantes antes de entregar una actividad.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Sidebar */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Sugerencias</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    'Explica este tema',
                    'Dame ejemplos',
                    'Crea un resumen',
                    'Haz un quiz',
                    'Compara conceptos'
                  ].map((suggestion, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-xs"
                      onClick={() => setInputMessage(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Funciones de Voz</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Mic className="w-4 h-4 mr-2" />
                    Hablar
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Volume2 className="w-4 h-4 mr-2" />
                    Escuchar respuesta
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    Controles preparados para sesiones de práctica oral y lectura guiada.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="characters" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiCharacters.map((character) => (
              <motion.div
                key={character.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => {
                    selectCharacter(character.id);
                    // Switch to chat tab
                    const chatTab = document.querySelector('[value="chat"]') as HTMLElement;
                    chatTab?.click();
                  }}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center text-4xl flex-shrink-0 ring-4 ring-cyan-100">
                        {character.avatar}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{character.name}</CardTitle>
                        <CardDescription className="text-xs mt-1">
                          {character.era}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">{character.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {character.personality.split('.')[0]}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Biblioteca en expansión
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Los docentes pueden preparar nuevos personajes para sus unidades: Miguel Grau,
                Micaela Bastidas, José de San Martín y otros referentes del plan curricular.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
