import { Tutor, Booking } from '../types';

export const INITIAL_TUTORS: Tutor[] = [
  {
    id: 'tutor-1',
    name: 'Mariana Rostova',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    university: 'Universidad del Norte (Uninorte)',
    universityShort: 'Uninorte',
    major: 'Ingeniería de Sistemas y Computación',
    degreeLevel: 'Estudiante de 8° Semestre',
    gpa: '4.85 / 5.0 Promedio',
    honorTitle: 'Monitora Titular en Estructuras de Datos y Algoritmos',
    hourlyRate: 35000,
    rating: 4.98,
    reviewCount: 64,
    totalSessions: 215,
    verified: true,
    department: 'Ciencias de la Computación',
    availableToday: true,
    responseSpeed: '< 10 min',
    bio: 'Monitora en Uninorte especializada en árboles binarios de búsqueda, grafos, programación dinámica y preparación para parciales. Creo modelos mentales claros para resolver problemas sin memorizar.',
    courseCodes: ['Estructuras de Datos', 'Algoritmos II', 'Matemáticas Discretas', 'Cálculo Vectorial'],
    syllabusHighlights: [
      'Árboles AVL y Red-Black con rotaciones paso a paso',
      'Programación dinámica (memoización y tabulación)',
      'Algoritmos de caminos mínimos (Dijkstra y Floyd-Warshall)',
      'Resolución de pautas de parciales anteriores de Uninorte'
    ],
    availableSlots: [
      {
        date: 'Hoy (7 Oct)',
        times: ['14:00', '15:30', '17:00', '19:30']
      },
      {
        date: 'Mañana (8 Oct)',
        times: ['11:00', '13:00', '16:00']
      },
      {
        date: 'Jueves (9 Oct)',
        times: ['10:00', '14:00', '18:00']
      }
    ],
    campusLocation: 'Uninorte · Biblioteca Karl C. Parrish Jr., Sala de Estudio 204',
    reviews: [
      {
        id: 'rev-1',
        studentName: 'Mateo Char',
        studentMajor: 'Ingeniería Industrial (Uninorte)',
        rating: 5,
        comment: 'Mariana me explicó en 30 minutos lo que no entendí en 3 semanas de clase. Salvé el segundo parcial con 4.7.',
        date: 'Hace 2 días',
        course: 'Estructuras de Datos'
      },
      {
        id: 'rev-2',
        studentName: 'Valeria Pinedo',
        studentMajor: 'Sistemas 4° Semestre',
        rating: 5,
        comment: 'Las notas y los diagramas que me hizo en la pizarra fueron clave para el examen final.',
        date: 'Hace 1 semana',
        course: 'Algoritmos II'
      }
    ]
  },
  {
    id: 'tutor-2',
    name: 'Julián Castro',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    university: 'Universidad del Atlántico (Uniatlántico)',
    universityShort: 'Uniatlántico',
    major: 'Química y Farmacia',
    degreeLevel: 'Estudiante de 9° Semestre',
    gpa: '4.80 / 5.0 Promedio',
    honorTitle: 'Monitor Distinguido de Química Orgánica I y II',
    hourlyRate: 30000,
    rating: 4.96,
    reviewCount: 52,
    totalSessions: 178,
    verified: true,
    department: 'Ciencias Biológicas',
    availableToday: true,
    responseSpeed: '< 15 min',
    bio: 'Monitor en Uniatlántico experto en síntesis orgánica, mecanismos de reacción y estereoquímica. Te enseño el flujo de electrones para que dejes de machetear y entiendas la química.',
    courseCodes: ['Química Orgánica I', 'Química Orgánica II', 'Bioquímica General', 'Fisicoquímica'],
    syllabusHighlights: [
      'Mecanismos SN1, SN2, E1 y E2 con flechas de reacción',
      'Espectroscopía RMN e Infrarrojo (IR)',
      'Cinética enzimática y rutas metabólicas',
      'Preparación para previas y quices de laboratorio'
    ],
    availableSlots: [
      {
        date: 'Hoy (7 Oct)',
        times: ['13:30', '16:00', '18:00']
      },
      {
        date: 'Mañana (8 Oct)',
        times: ['09:30', '12:00', '15:00']
      },
      {
        date: 'Viernes (10 Oct)',
        times: ['11:00', '14:30', '17:00']
      }
    ],
    campusLocation: 'Uniatlántico Sede Norte · Bloque D, Cubículo de Estudio 3',
    reviews: [
      {
        id: 'rev-3',
        studentName: 'Camila Duarte',
        studentMajor: 'Biología (Uniatlántico)',
        rating: 5,
        comment: 'Química orgánica parecía imposible hasta que Julián me enseñó a razonar las reacciones. Saqué 4.8 en el examen.',
        date: 'Hace 4 días',
        course: 'Química Orgánica I'
      }
    ]
  },
  {
    id: 'tutor-3',
    name: 'Sofía Mendoza',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    university: 'Universidad de la Costa (CUC)',
    universityShort: 'CUC',
    major: 'Ingeniería Civil',
    degreeLevel: 'Estudiante de Último Año',
    gpa: '4.90 / 5.0 Promedio',
    honorTitle: 'Monitora de Cálculo Diferencial e Integral',
    hourlyRate: 32000,
    rating: 5.00,
    reviewCount: 39,
    totalSessions: 142,
    verified: true,
    department: 'Matemáticas',
    availableToday: false,
    responseSpeed: '< 20 min',
    bio: 'Apasionada por las matemáticas aplicadas y el análisis estructural. Te ayudo a dominar integrales triples, ecuaciones diferenciales y métodos numéricos con rigor y paciencia.',
    courseCodes: ['Cálculo I', 'Cálculo Multivariable', 'Ecuaciones Diferenciales', 'Estática'],
    syllabusHighlights: [
      'Teoremas de Green, Stokes y Gauss explicados visualmente',
      'Ecuaciones diferenciales lineales y transformada de Laplace',
      'Diagramas de corte y momento flector para vigas',
      'Talleres preparatorios de exámenes de la CUC'
    ],
    availableSlots: [
      {
        date: 'Mañana (8 Oct)',
        times: ['10:00', '13:30', '15:30', '18:00']
      },
      {
        date: 'Jueves (9 Oct)',
        times: ['09:00', '11:30', '16:00']
      }
    ],
    campusLocation: 'CUC · Biblioteca Bloque 2, Cubículo 10',
    reviews: [
      {
        id: 'rev-4',
        studentName: 'Diego Salazar',
        studentMajor: 'Ingeniería Ambiental (CUC)',
        rating: 5,
        comment: 'Sofía explica con una paciencia increíble. Gracias a ella entendí cálculo multivariable.',
        date: 'Hace 3 días',
        course: 'Cálculo Multivariable'
      }
    ]
  },
  {
    id: 'tutor-4',
    name: 'Camilo Gómez',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    university: 'Universidad Simón Bolívar (Unisimón)',
    universityShort: 'Unisimón',
    major: 'Comercio y Finanzas Internacionales',
    degreeLevel: 'Estudiante de 8° Semestre',
    gpa: '4.82 / 5.0 Promedio',
    honorTitle: 'Primer Puesto Semestral en Economía y Finanzas',
    hourlyRate: 28000,
    rating: 4.94,
    reviewCount: 47,
    totalSessions: 160,
    verified: true,
    department: 'Economía y Finanzas',
    availableToday: true,
    responseSpeed: '< 5 min',
    bio: 'Monitor en Unisimón para microeconomía, macroeconomía, matemáticas financieras y econometría. Convertimos fórmulas complejas en razonamientos prácticos para tus talleres.',
    courseCodes: ['Microeconomía II', 'Macroeconomía', 'Matemáticas Financieras', 'Econometría'],
    syllabusHighlights: [
      'Equilibrio de mercado y optimización con restricciones',
      'Modelos IS-LM y política monetaria/fiscal',
      'Tasas de interés, anualidades y amortizaciones en Excel',
      'Modelos de regresión lineal y pruebas estadísticas'
    ],
    availableSlots: [
      {
        date: 'Hoy (7 Oct)',
        times: ['15:00', '17:00', '19:00']
      },
      {
        date: 'Mañana (8 Oct)',
        times: ['14:00', '16:30']
      }
    ],
    campusLocation: 'Unisimón · Casa Bolivariana, Módulo de Tutorías 4',
    reviews: [
      {
        id: 'rev-5',
        studentName: 'Lucía Benítez',
        studentMajor: 'Administración de Empresas (Unisimón)',
        rating: 5,
        comment: 'Camilo me ayudó a resolver el taller de matemáticas financieras en una hora. Saqué 5.0.',
        date: 'Hace 5 días',
        course: 'Matemáticas Financieras'
      }
    ]
  },
  {
    id: 'tutor-5',
    name: 'Valentina Vergara',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    university: 'Universidad Libre (Barranquilla)',
    universityShort: 'Unilibre',
    major: 'Derecho y Ciencias Políticas',
    degreeLevel: 'Estudiante de 9° Semestre',
    gpa: '4.88 / 5.0 Promedio',
    honorTitle: 'Monitora de Derecho Constitucional y Argumentación',
    hourlyRate: 30000,
    rating: 4.97,
    reviewCount: 31,
    totalSessions: 110,
    verified: true,
    department: 'Humanidades y Redacción',
    availableToday: true,
    responseSpeed: '< 12 min',
    bio: 'Monitora en Unilibre especializada en redacción jurídica, argumentación constitucional, preparación de preparatorios y metodología de investigación para ensayos y tesis.',
    courseCodes: ['Derecho Constitucional', 'Teoría del Delito', 'Argumentación Jurídica', 'Redacción de Ensayos'],
    syllabusHighlights: [
      'Técnicas de ponderación y test de proporcionalidad',
      'Estructuración de demandas, tutelas y alegatos',
      'Normas APA y citación jurídica impecable',
      'Preparación de oratoria para audiencias simuladas'
    ],
    availableSlots: [
      {
        date: 'Hoy (7 Oct)',
        times: ['13:00', '16:00', '18:30']
      },
      {
        date: 'Mañana (8 Oct)',
        times: ['10:00', '15:00']
      }
    ],
    campusLocation: 'Unilibre Sede Principal · Hemeroteca, Sala de Lectura',
    reviews: [
      {
        id: 'rev-6',
        studentName: 'Lucas Ramos',
        studentMajor: 'Derecho 3° Año (Unilibre)',
        rating: 5,
        comment: 'Valentina me enseñó a redactar una acción de tutela impecable. Sabe muchísimo.',
        date: 'Hace 1 semana',
        course: 'Derecho Constitucional'
      }
    ]
  },
  {
    id: 'tutor-6',
    name: 'Mateo Polo',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    university: 'Universidad Autónoma del Caribe',
    universityShort: 'Uniautónoma',
    major: 'Ingeniería Mecatrónica',
    degreeLevel: 'Estudiante de 8° Semestre',
    gpa: '4.78 / 5.0 Promedio',
    honorTitle: 'Monitor de Física Mecánica y Circuitos Electrónicos',
    hourlyRate: 28000,
    rating: 4.93,
    reviewCount: 38,
    totalSessions: 125,
    verified: true,
    department: 'Física e Ingeniería',
    availableToday: false,
    responseSpeed: '< 15 min',
    bio: 'Monitor de física y circuitos en Uniautónoma. Explicaciones con diagramas de cuerpo libre, leyes de Kirchhoff, simulación en Proteus y MATLAB para pasar tus previas.',
    courseCodes: ['Física Mecánica', 'Física Electromagnética', 'Circuitos I', 'Control Automático'],
    syllabusHighlights: [
      'Leyes de Newton y conservación de la energía en ejercicios reales',
      'Leyes de Kirchhoff y teoremas de Thevenin/Norton',
      'Campos magnéticos y ley de Faraday explicada sin rodeos',
      'Revisión previa a quices y talleres de ingeniería'
    ],
    availableSlots: [
      {
        date: 'Mañana (8 Oct)',
        times: ['13:00', '15:00', '17:30']
      },
      {
        date: 'Jueves (9 Oct)',
        times: ['11:00', '14:00', '16:30']
      }
    ],
    campusLocation: 'Uniautónoma · Edificio de Posgrados, Sala de Estudio 3',
    reviews: [
      {
        id: 'rev-7',
        studentName: 'Joaquín Silva',
        studentMajor: 'Ingeniería Electrónica (Uniautónoma)',
        rating: 5,
        comment: 'Mateo me explicó teoremas de Thevenin con ejemplos prácticos. Todo quedó clarísimo para el parcial.',
        date: 'Hace 3 días',
        course: 'Circuitos I'
      }
    ]
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book-101',
    tutorId: 'tutor-1',
    tutorName: 'Mariana Rostova',
    tutorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    university: 'Universidad del Norte (Uninorte)',
    courseCode: 'Estructuras de Datos',
    format: 'Inmersión conceptual 1 a 1',
    date: 'Hoy (7 Oct)',
    timeSlot: '15:30',
    locationType: 'campus',
    campusRoom: 'Uninorte · Biblioteca Karl C. Parrish Jr., Sala de Estudio 204',
    notes: 'Revisión de rotaciones en árboles Red-Black y ejercicios del taller 3.',
    hourlyRate: 35000,
    totalPrice: 35000,
    status: 'confirmed',
    createdAt: '2026-10-06 14:20'
  },
  {
    id: 'book-102',
    tutorId: 'tutor-4',
    tutorName: 'Camilo Gómez',
    tutorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    university: 'Universidad Simón Bolívar (Unisimón)',
    courseCode: 'Matemáticas Financieras',
    format: 'Resolución de guías y problemas',
    date: 'Mañana (8 Oct)',
    timeSlot: '14:00',
    locationType: 'virtual',
    campusRoom: 'Sala Virtual de Estudio en Vivo',
    meetLink: 'https://tutora.room/finanzas-camilo',
    notes: 'Cálculo de cuotas con gradientes y tablas de amortización en Excel.',
    hourlyRate: 28000,
    totalPrice: 28000,
    status: 'confirmed',
    createdAt: '2026-10-05 18:45'
  }
];

export const UNIVERSITIES = [
  'Todas las universidades (Barranquilla)',
  'Universidad del Norte (Uninorte)',
  'Universidad del Atlántico (Uniatlántico)',
  'Universidad de la Costa (CUC)',
  'Universidad Simón Bolívar (Unisimón)',
  'Universidad Libre (Barranquilla)',
  'Universidad Autónoma del Caribe'
];

export const DEPARTMENTS = [
  'Todos',
  'Ciencias de la Computación',
  'Matemáticas',
  'Economía y Finanzas',
  'Física e Ingeniería',
  'Ciencias Biológicas',
  'Humanidades y Redacción'
];
