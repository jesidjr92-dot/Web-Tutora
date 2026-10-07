export type Department = 
  | 'Todos'
  | 'Ciencias de la Computación'
  | 'Matemáticas'
  | 'Economía y Finanzas'
  | 'Física e Ingeniería'
  | 'Ciencias Biológicas'
  | 'Humanidades y Redacción';

export type SessionFormat = 
  | 'Inmersión conceptual 1 a 1'
  | 'Resolución de guías y problemas'
  | 'Preparación intensiva para exámenes'
  | 'Revisión de código y ensayos';

export type LocationType = 'virtual' | 'campus';

export interface Review {
  id: string;
  studentName: string;
  studentMajor: string;
  rating: number;
  comment: string;
  date: string;
  course: string;
}

export interface Tutor {
  id: string;
  name: string;
  avatarUrl: string;
  university: string;
  universityShort: string;
  major: string;
  degreeLevel: string; // e.g. 'Estudiante de Último Año', 'Candidata a Maestría', 'Candidato a Doctorado'
  gpa: string;
  honorTitle: string; // e.g. 'Jefe de Ayudantes en CS 61B', 'Cuadro de Honor'
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  totalSessions: number;
  verified: boolean;
  department: Department;
  availableToday: boolean;
  responseSpeed: string; // '< 10 min'
  bio: string;
  syllabusHighlights: string[];
  courseCodes: string[];
  availableSlots: {
    date: string; // e.g. 'Hoy (7 Oct)', 'Mañana (8 Oct)'
    times: string[];
  }[];
  campusLocation: string; // e.g. 'Biblioteca Central · Sala de Estudio 204'
  reviews: Review[];
}

export interface Booking {
  id: string;
  tutorId: string;
  tutorName: string;
  tutorAvatar: string;
  university: string;
  courseCode: string;
  format: SessionFormat;
  date: string;
  timeSlot: string;
  locationType: LocationType;
  campusRoom: string;
  notes: string;
  hourlyRate: number;
  totalPrice: number;
  status: 'confirmed' | 'in_progress' | 'completed';
  createdAt: string;
  meetLink?: string;
}

export interface Message {
  id: string;
  tutorId: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
}
