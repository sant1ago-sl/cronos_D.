import { 
  User, 
  Course, 
  Assignment, 
  AICharacter, 
  CalendarEvent, 
  Grade,
  Message,
  Announcement,
  Institution
} from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ana García',
    email: 'ana.garcia@cronos.edu',
    role: 'student',
    institution: 'Colegio San Martín'
  },
  {
    id: '2',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@cronos.edu',
    role: 'teacher',
    institution: 'Colegio San Martín'
  },
  {
    id: '3',
    name: 'María López',
    email: 'maria.lopez@cronos.edu',
    role: 'admin',
    institution: 'Cronos Digital'
  },
  {
    id: '4',
    name: 'Pedro Sánchez',
    email: 'pedro.sanchez@cronos.edu',
    role: 'student',
    institution: 'Colegio Libertad'
  },
  {
    id: '5',
    name: 'Laura Torres',
    email: 'laura.torres@cronos.edu',
    role: 'teacher',
    institution: 'Colegio Libertad'
  },
  {
    id: '6',
    name: 'Valeria Rojas',
    email: 'valeria.rojas@cronos.edu',
    role: 'student',
    institution: 'Academia Pre-U'
  }
];

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Historia del Antiguo Perú',
    description: 'Explora las civilizaciones preincaicas e incaicas del Perú antiguo',
    instructor: 'Prof. Carlos Mendoza',
    progress: 65,
    students: 28,
    startDate: '2026-03-01',
    endDate: '2026-07-15',
    modules: [
      {
        id: 'm1',
        courseId: '1',
        title: 'Culturas Pre-Incaicas',
        description: 'Chavín, Paracas, Nazca, Moche y más',
        order: 1,
        materials: [
          {
            id: 'mat1',
            moduleId: 'm1',
            title: 'Introducción a las culturas pre-incaicas',
            type: 'pdf',
            url: '/materials/pre-incas.pdf',
            uploadDate: '2026-03-02'
          },
          {
            id: 'mat2',
            moduleId: 'm1',
            title: 'Video: La cultura Chavín',
            type: 'video',
            url: '/materials/chavin.mp4',
            uploadDate: '2026-03-02'
          }
        ],
        assignments: [
          {
            id: 'a1',
            moduleId: 'm1',
            courseId: '1',
            title: 'Análisis de la cultura Chavín',
            description: 'Investiga y presenta las principales características de la cultura Chavín',
            dueDate: '2026-03-15',
            points: 100,
            submitted: true,
            grade: 92,
            status: 'graded'
          }
        ],
        quizzes: [
          {
            id: 'q1',
            moduleId: 'm1',
            courseId: '1',
            title: 'Quiz: Culturas Pre-Incaicas',
            description: 'Evaluación sobre las principales culturas pre-incaicas',
            dueDate: '2026-03-20',
            duration: 30,
            questions: [],
            maxAttempts: 2,
            grade: 88
          }
        ]
      },
      {
        id: 'm2',
        courseId: '1',
        title: 'El Imperio Inca',
        description: 'El Tahuantinsuyo y su organización',
        order: 2,
        materials: [],
        assignments: [],
        quizzes: []
      }
    ],
    announcements: [
      {
        id: 'ann1',
        courseId: '1',
        title: 'Bienvenidos al curso',
        content: 'Estoy muy emocionado de comenzar este viaje por la historia del Perú con ustedes.',
        author: 'Prof. Carlos Mendoza',
        date: '2026-03-01'
      }
    ]
  },
  {
    id: '2',
    title: 'Revoluciones del Siglo XIX',
    description: 'Las grandes revoluciones que transformaron el mundo moderno',
    instructor: 'Prof. Laura Torres',
    progress: 42,
    students: 32,
    startDate: '2026-03-01',
    endDate: '2026-07-15',
    modules: [],
    announcements: []
  },
  {
    id: '3',
    title: 'Segunda Guerra Mundial',
    description: 'El conflicto más grande de la historia de la humanidad',
    instructor: 'Prof. Roberto Silva',
    progress: 78,
    students: 25,
    startDate: '2026-02-15',
    endDate: '2026-06-30',
    modules: [],
    announcements: []
  }
];

export const mockAssignments: Assignment[] = [
  {
    id: 'a1',
    moduleId: 'm1',
    courseId: '1',
    title: 'Análisis de la cultura Chavín',
    description: 'Investiga y presenta las principales características de la cultura Chavín',
    dueDate: '2026-03-15',
    points: 100,
    submitted: true,
    grade: 92,
    feedback: 'Excelente análisis de fuentes. Para el próximo trabajo, agrega una comparación breve con otra cultura preincaica.',
    status: 'graded'
  },
  {
    id: 'a2',
    moduleId: 'm2',
    courseId: '1',
    title: 'Ensayo sobre el Tahuantinsuyo',
    description: 'Escribe un ensayo de 1000 palabras sobre la organización del Imperio Inca',
    dueDate: '2026-06-28',
    points: 150,
    status: 'pending'
  },
  {
    id: 'a3',
    moduleId: 'm3',
    courseId: '2',
    title: 'Causas de la Revolución Francesa',
    description: 'Analiza las causas económicas, sociales y políticas',
    dueDate: '2026-06-30',
    points: 100,
    status: 'pending'
  },
  {
    id: 'a4',
    moduleId: 'm4',
    courseId: '3',
    title: 'Mapa causal de la Segunda Guerra Mundial',
    description: 'Organiza causas políticas, económicas y territoriales en una línea de tiempo argumentada',
    dueDate: '2026-06-24',
    points: 120,
    submitted: true,
    status: 'submitted'
  }
];

export const aiCharacters: AICharacter[] = [
  {
    id: 'char1',
    name: 'Pachacútec',
    era: 'Imperio Inca (1438-1471)',
    avatar: '👑',
    description: 'Noveno gobernante del Imperio Inca, transformó el reino de Cusco en el Tahuantinsuyo',
    personality: 'Sabio, estratega y visionario. Habla con autoridad pero también con paciencia pedagógica.'
  },
  {
    id: 'char2',
    name: 'Simón Bolívar',
    era: 'Independencia de América (1783-1830)',
    avatar: '⚔️',
    description: 'El Libertador de América, líder de la independencia de varios países sudamericanos',
    personality: 'Apasionado, idealista y elocuente. Inspira con sus palabras sobre libertad y unión.'
  },
  {
    id: 'char3',
    name: 'Cleopatra VII',
    era: 'Egipto Ptolemaico (69-30 a.C.)',
    avatar: '👸',
    description: 'Última faraona del antiguo Egipto, conocida por su inteligencia y habilidad política',
    personality: 'Inteligente, carismática y astuta. Comparte conocimientos sobre diplomacia y cultura.'
  },
  {
    id: 'char4',
    name: 'Leonardo da Vinci',
    era: 'Renacimiento (1452-1519)',
    avatar: '🎨',
    description: 'Polímata del Renacimiento italiano: artista, científico, inventor',
    personality: 'Curioso, creativo y metódico. Conecta arte, ciencia y naturaleza.'
  },
  {
    id: 'char5',
    name: 'Juana de Arco',
    era: 'Guerra de los Cien Años (1412-1431)',
    avatar: '🛡️',
    description: 'Heroína francesa que lideró al ejército francés en la Guerra de los Cien Años',
    personality: 'Valiente, devota y determinada. Habla de fe, coraje y convicción.'
  }
];

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: 'e1',
    title: 'Ensayo sobre el Tahuantinsuyo',
    type: 'assignment',
    date: '2026-06-28',
    course: 'Historia del Antiguo Perú',
    courseId: '1'
  },
  {
    id: 'e2',
    title: 'Quiz: Culturas Pre-Incaicas',
    type: 'quiz',
    date: '2026-06-27',
    course: 'Historia del Antiguo Perú',
    courseId: '1'
  },
  {
    id: 'e3',
    title: 'Examen Final - Segunda Guerra Mundial',
    type: 'quiz',
    date: '2026-06-30',
    course: 'Segunda Guerra Mundial',
    courseId: '3'
  },
  {
    id: 'e4',
    title: 'Presentación grupal',
    type: 'assignment',
    date: '2026-06-29',
    course: 'Revoluciones del Siglo XIX',
    courseId: '2'
  }
];

export const mockGrades: Grade[] = [
  {
    courseId: '1',
    courseName: 'Historia del Antiguo Perú',
    assignments: [
      { name: 'Análisis de la cultura Chavín', grade: 92, maxGrade: 100, weight: 0.3 },
      { name: 'Presentación Nazca', grade: 88, maxGrade: 100, weight: 0.2 }
    ],
    quizzes: [
      { name: 'Quiz: Culturas Pre-Incaicas', grade: 88, maxGrade: 100, weight: 0.25 },
      { name: 'Quiz: Imperio Inca', grade: 95, maxGrade: 100, weight: 0.25 }
    ],
    finalGrade: 90.5
  },
  {
    courseId: '2',
    courseName: 'Revoluciones del Siglo XIX',
    assignments: [
      { name: 'Ensayo Revolución Francesa', grade: 85, maxGrade: 100, weight: 0.4 }
    ],
    quizzes: [
      { name: 'Quiz: Causas de las revoluciones', grade: 90, maxGrade: 100, weight: 0.3 }
    ],
    finalGrade: 87.0
  }
];

export const mockMessages: Message[] = [
  {
    id: 'msg1',
    from: 'Prof. Carlos Mendoza',
    to: 'Ana García',
    subject: 'Excelente trabajo en tu ensayo',
    content: 'Ana, quiero felicitarte por tu excelente análisis de la cultura Chavín. Has demostrado comprensión profunda del tema.',
    date: '2026-03-16',
    read: false
  },
  {
    id: 'msg2',
    from: 'Sistema Cronos',
    to: 'Ana García',
    subject: 'Nuevo material disponible',
    content: 'Se ha publicado nuevo material en el módulo "El Imperio Inca" de tu curso Historia del Antiguo Perú.',
    date: '2026-03-20',
    read: true
  }
];

export const mockInstitutions: Institution[] = [
  {
    id: 'inst1',
    name: 'Colegio San Martín',
    plan: 'institutional',
    students: 450,
    teachers: 32,
    courses: 48,
    createdAt: '2025-01-15'
  },
  {
    id: 'inst2',
    name: 'Academia Pre-U',
    plan: 'premium',
    students: 120,
    teachers: 8,
    courses: 12,
    createdAt: '2025-08-22'
  },
  {
    id: 'inst3',
    name: 'Colegio Libertad',
    plan: 'institutional',
    students: 680,
    teachers: 45,
    courses: 72,
    createdAt: '2024-09-10'
  }
];
