import React, { useState } from 'react';
import { Tutor, Department } from '../types';
import { UNIVERSITIES, DEPARTMENTS } from '../data/mockData';
import { formatCOP } from '../utils/formatCurrency';
import { X, GraduationCap, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BecomeTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTutor: (newTutor: Tutor) => void;
}

export const BecomeTutorModal: React.FC<BecomeTutorModalProps> = ({
  isOpen,
  onClose,
  onAddTutor,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [eduEmail, setEduEmail] = useState('');
  const [university, setUniversity] = useState(UNIVERSITIES[1] || 'Universidad del Norte (Uninorte)');
  const [department, setDepartment] = useState<Department>('Ciencias de la Computación');
  const [major, setMajor] = useState('');
  const [gpa, setGpa] = useState('4.80 / 5.0 Promedio');
  const [honorTitle, setHonorTitle] = useState('Monitor de Cátedra · Cuadro de Honor');
  const [hourlyRate, setHourlyRate] = useState(30000);
  const [courseCodes, setCourseCodes] = useState('Cálculo I, Álgebra Lineal, Física I');
  const [bio, setBio] = useState('');
  const [syllabusPoints, setSyllabusPoints] = useState('Resolución de talleres, preparación de previas, conceptos clave');
  const [campusLocation, setCampusLocation] = useState('Biblioteca Uninorte · Módulos de Estudio');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !eduEmail.trim()) return;

    const parsedCourses = courseCodes
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    const parsedSyllabus = syllabusPoints
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const newTutor: Tutor = {
      id: `tutor-${Date.now()}`,
      name: name.trim(),
      avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80`,
      university,
      universityShort: university.split(' ')[0] || 'Uni',
      major: major.trim() || 'Ingeniería y Ciencias',
      degreeLevel: 'Estudiante Destacado',
      gpa: gpa.trim() || '4.80+ Promedio',
      honorTitle: honorTitle.trim() || 'Monitor de Departamento Verificado',
      hourlyRate: Number(hourlyRate),
      rating: 5.0,
      reviewCount: 1,
      totalSessions: 1,
      verified: true,
      department,
      availableToday: true,
      responseSpeed: '< 15 min',
      bio: bio.trim() || 'Monitor universitario en Barranquilla listo para ayudarte a dominar los temas del parcial y resolver talleres paso a paso.',
      courseCodes: parsedCourses.length > 0 ? parsedCourses : ['Asignatura Troncal'],
      syllabusHighlights: parsedSyllabus.length > 0 ? parsedSyllabus : ['Repaso de fundamentos', 'Resolución de guías'],
      availableSlots: [
        {
          date: 'Hoy (7 Oct)',
          times: ['15:00', '17:00', '19:00']
        },
        {
          date: 'Mañana (8 Oct)',
          times: ['11:00', '14:00', '16:00']
        }
      ],
      campusLocation: campusLocation.trim() || 'Biblioteca Central de la Universidad',
      reviews: [
        {
          id: `rev-${Date.now()}`,
          studentName: 'Compañero de Carrera',
          studentMajor: 'Recomendación Docente',
          rating: 5,
          comment: 'Excelente monitor, explica muy claro y resuelve dudas con paciencia.',
          date: 'Reciente',
          course: parsedCourses[0] || 'Asignatura Troncal'
        }
      ]
    };

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#d4f00d', '#0f172a', '#3b82f6']
      });
    } catch {
      // ignore
    }

    onAddTutor(newTutor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f172a]/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#ffffff] rounded-[1.5rem] border border-[#e2e8f0] shadow-2xl max-w-xl w-full overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Cabecera */}
        <div className="p-6 border-b border-[#e2e8f0] flex items-center justify-between bg-[#f8fafc]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0f172a] text-[#d4f00d] flex items-center justify-center font-bold">
              <GraduationCap className="w-6 h-6 text-[#d4f00d]" />
            </div>
            <div>
              <h2 className="font-headline font-bold text-lg text-[#0f172a]">
                Publica tus Asignaturas en Tutora
              </h2>
              <p className="text-xs text-[#64748b]">
                Enseña a compañeros de universidades de Barranquilla. Pago 100% en COP sin comisiones.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar modal de ser tutor"
            className="p-2 rounded-xl text-[#64748b] hover:text-[#0f172a] hover:bg-[#eceef0] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-1">
                Nombre Completo *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ej. Juan Pablo Char"
                className="w-full px-3 py-2 rounded-xl border border-[#e2e8f0] text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-1">
                Correo Institucional (.edu.co) *
              </label>
              <input
                type="email"
                required
                value={eduEmail}
                onChange={(e) => setEduEmail(e.target.value)}
                placeholder="jpchar@uninorte.edu.co"
                className="w-full px-3 py-2 rounded-xl border border-[#e2e8f0] text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-1">
                Universidad en Barranquilla
              </label>
              <select
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                aria-label="Universidad en Barranquilla"
                className="w-full px-3 py-2 rounded-xl border border-[#e2e8f0] text-xs text-[#0f172a] bg-white focus:outline-none focus:border-[#0f172a]"
              >
                {UNIVERSITIES.filter(u => u !== 'Todas las universidades (Barranquilla)').map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-1">
                Departamento Académico
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as Department)}
                aria-label="Departamento Académico"
                className="w-full px-3 py-2 rounded-xl border border-[#e2e8f0] text-xs text-[#0f172a] bg-white focus:outline-none focus:border-[#0f172a]"
              >
                {DEPARTMENTS.filter(d => d !== 'Todos').map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-1">
                Carrera y Semestre
              </label>
              <input
                type="text"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                placeholder="ej. Ingeniería de Sistemas, 8° Semestre"
                className="w-full px-3 py-2 rounded-xl border border-[#e2e8f0] text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-1">
                Tarifa por Hora (Pesos COP)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-[#64748b]">$</span>
                <input
                  type="number"
                  min="15000"
                  max="60000"
                  step="2000"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full pl-6 pr-3 py-2 rounded-xl border border-[#e2e8f0] text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
                />
              </div>
              <div className="text-[11px] text-[#586400] font-semibold mt-1">
                Tarifa mostrada: {formatCOP(hourlyRate)} COP / hr
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-1">
              Materias que Dominas y Aprobaste con Nota Alta *
            </label>
            <input
              type="text"
              required
              value={courseCodes}
              onChange={(e) => setCourseCodes(e.target.value)}
              placeholder="ej. Cálculo Vectorial, Estructuras de Datos, Física II"
              className="w-full px-3 py-2 rounded-xl border border-[#e2e8f0] text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
            />
            <span className="text-[11px] text-[#64748b]">Ingresa los nombres o códigos de las asignaturas separadas por coma.</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-1">
              Monitoría o Distinciones Académicas
            </label>
            <input
              type="text"
              value={honorTitle}
              onChange={(e) => setHonorTitle(e.target.value)}
              placeholder="ej. Monitor Titular en Uninorte · Matrícula de Honor"
              className="w-full px-3 py-2 rounded-xl border border-[#e2e8f0] text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-1">
              Metodología de Enseñanza
            </label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Explica cómo ayudas a resolver talleres, despejar dudas de fórmulas y preparar los parciales."
              className="w-full p-3 rounded-xl border border-[#e2e8f0] text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-1">
              Espacio de Estudio en tu Campus
            </label>
            <input
              type="text"
              value={campusLocation}
              onChange={(e) => setCampusLocation(e.target.value)}
              placeholder="ej. Uninorte · Biblioteca Karl C. Parrish Jr., Sala 204"
              className="w-full px-3 py-2 rounded-xl border border-[#e2e8f0] text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#d4f00d] hover:bg-[#c6e004] text-[#0f172a] font-bold text-xs font-headline cursor-pointer transition-transform active:scale-98 shadow-sm flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#0f172a]" />
              <span>Publicar Disponibilidad en Tutora</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
