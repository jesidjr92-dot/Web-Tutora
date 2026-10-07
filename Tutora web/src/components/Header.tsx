import React from 'react';
import { Calendar, BookOpen, UserPlus, Compass, GraduationCap } from 'lucide-react';
import { UNIVERSITIES } from '../data/mockData';

interface HeaderProps {
  selectedUniversity: string;
  onSelectUniversity: (uni: string) => void;
  bookingCount: number;
  onOpenBookings: () => void;
  onOpenBecomeTutor: () => void;
  onOpenStudyRoomSandbox: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedUniversity,
  onSelectUniversity,
  bookingCount,
  onOpenBookings,
  onOpenBecomeTutor,
  onOpenStudyRoomSandbox,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#f7f9fb]/95 backdrop-blur-md border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo: Tutora con icono de gorro de graduación */}
        <div className="flex items-center gap-6">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-[#0f172a] text-[#d4f00d] flex items-center justify-center shadow-sm transition-transform duration-200 group-hover:scale-105">
              <GraduationCap className="w-6 h-6 text-[#d4f00d]" />
            </div>
            <div className="flex flex-col">
              <span className="font-headline font-bold text-xl tracking-tight text-[#0f172a] flex items-center gap-1.5 leading-none">
                Tutora
                <span className="w-2 h-2 rounded-full bg-[#d4f00d] inline-block animate-pulse"></span>
              </span>
              <span className="text-[11px] font-medium text-[#64748b] tracking-wider uppercase mt-1">
                Tutorías Universitarias · Barranquilla
              </span>
            </div>
          </a>

          {/* Selector de universidades de Barranquilla */}
          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-[#e2e8f0]">
            <Compass className="w-4 h-4 text-[#64748b]" />
            <select
              value={selectedUniversity}
              onChange={(e) => onSelectUniversity(e.target.value)}
              aria-label="Seleccionar universidad de Barranquilla"
              className="bg-[#ffffff] border border-[#e2e8f0] text-xs font-semibold text-[#0f172a] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#0f172a] focus:ring-2 focus:ring-[#d4f00d]/50 cursor-pointer shadow-xs transition-colors max-w-[240px] truncate"
            >
              {UNIVERSITIES.map((uni) => (
                <option key={uni} value={uni}>
                  {uni}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Acciones del encabezado */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Botón Sala de Estudio Sandbox */}
          <button
            onClick={onOpenStudyRoomSandbox}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-[#0f172a] bg-[#ffffff] border border-[#e2e8f0] hover:bg-[#f1f5f9] hover:border-[#cbd5e1] transition-all cursor-pointer shadow-xs"
            title="Abrir sala de estudio interactiva de prueba"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#3b82f6]" />
            <span>Sala de Estudio</span>
          </button>

          {/* Mis Sesiones */}
          <button
            onClick={onOpenBookings}
            className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-[#0f172a] bg-[#ffffff] border border-[#e2e8f0] hover:bg-[#f1f5f9] transition-all cursor-pointer shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5 text-[#0f172a]" />
            <span>Mis Sesiones</span>
            {bookingCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold rounded-full bg-[#d4f00d] text-[#0f172a] border border-[#0f172a]/10">
                {bookingCount}
              </span>
            )}
          </button>

          {/* Ser Tutor CTA */}
          <button
            onClick={onOpenBecomeTutor}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-[#0f172a] bg-[#d4f00d] hover:bg-[#c6e004] transition-all transform active:scale-95 shadow-sm font-headline cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5 text-[#0f172a]" />
            <span className="hidden xs:inline">Ofrecer Tutoría</span>
            <span className="xs:hidden">Ser Tutor</span>
          </button>
        </div>
      </div>
    </header>
  );
};
